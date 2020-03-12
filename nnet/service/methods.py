import json

from collections.abc import Iterable
from flask_restful import Resource, reqparse
import numpy as np


class NearbyWords(Resource):
    def __init__(self, model):
        self.model = model
        self._required_features = ['request_word', 'n_similar']
        self.reqparse = reqparse.RequestParser()
        for feature in self._required_features:
            self.reqparse.add_argument(feature,
                                       required=True,
                                       location='json',
                                       help='No {} provided'.format(feature))
        super(NearbyWords, self).__init__()

    def post(self):
        args = self.reqparse.parse_args()
        query, topn = [args[f] for f in self._required_features]
        if not isinstance(query, str):
            return json.dumps('Please provide correct request_word parameter')
        try:
            similarities = self.model.similar_by_word(query, topn=int(topn))
            return similarities
        except ValueError:
            return json.dumps("Can't convert n_similar to int")


class WordsDistance(Resource):
    def __init__(self, model):
        self.model = model
        self._required_features = ['target', 'words']
        self.reqparse = reqparse.RequestParser()
        for feature in self._required_features:
            type_ = str
            if feature == 'words':
                type_ = list
            self.reqparse.add_argument(feature,
                                       required=True,
                                       type=type_,
                                       location='json',
                                       help='No {} provided'.format(feature))
        super(WordsDistance, self).__init__()

    def post(self):
        args = self.reqparse.parse_args()
        target, words = [args[f] for f in self._required_features]

        if not isinstance(words, Iterable) and isinstance(words, str):
            return json.dumps("Please send parameter 'words' as an iterable")
        if not isinstance(target, str):
            return json.dumps("Please send parameter 'target' as a string")

        distances = []
        for word in words:
            if word in self.model.vocab:
                distances.append(self.model.distance(target, word))
            else:
                # OOV word - compare manually
                word_vector = self.model.word_vec(word)
                target_vector = self.model.word_vec(target)
                # compute cosine similarity
                similarity_ = np.dot(target_vector, word_vector) / (np.linalg.norm(target_vector, 2) * np.linalg.norm(word_vector, 2))
                # appending abs(1 - similarity_) to distances
                distances.append(abs(1 - similarity_))

        return [(key, value.astype(float)) for (key, value) in zip(words, distances)]


class CentralWord(Resource):
    def __init__(self, model):
        self.model = model
        self._required_features = ['words']
        self.reqparse = reqparse.RequestParser()
        type_ = list
        for feature in self._required_features:
            self.reqparse.add_argument(feature,
                                       required=True,
                                       type=type_,
                                       location='json',
                                       help='No {} provided'.format(feature))
        super(CentralWord, self).__init__()

    def post(self):
        args = self.reqparse.parse_args()
        words = [args[f] for f in self._required_features]
        words = words[0]  # TODO: try to parse as a list of strings (not list of lists)
        query_size = len(words)

        if not isinstance(words, Iterable) and isinstance(words, str):
            return json.dumps("Please send parameter 'words' as an iterable")

        vectors = list()
        for word in words:
            vectors.append(self.model[word])  # get vector per word in query

        # find central embedding for all the given words
        central_vector = np.mean([np.array(item) for item in vectors], axis=0)
        central_word_candidates = self.model.most_similar(positive=[central_vector], topn=(query_size + 1))
        central_word = self._filter_one_candidate(central_word_candidates, words)
        return central_word

    @staticmethod
    def _filter_one_candidate(list_of_cand, query):
        for candidate, score in list_of_cand:
            if candidate not in query:
                return candidate
