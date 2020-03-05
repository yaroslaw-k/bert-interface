#!/usr/bin/env python3

import os
import sys
import json
import argparse
from collections.abc import Iterable

from flask import Flask
from flask_restful import Resource, Api, reqparse
import gensim
import numpy as np


MODEL_PATH = '../models/fasttext/gensim_no_trainables.model'
model = gensim.models.keyedvectors.FastTextKeyedVectors.load(MODEL_PATH, mmap='r')
model.index2word = [item for item in model.vocab]


app = Flask(__name__, static_url_path='', static_folder='../static',)
api = Api(app)


class NearbyWords(Resource):
    def __init__(self):
        self._required_features = ['request_word', 'n_similar']
        self.reqparse = reqparse.RequestParser()
        for feature in self._required_features:
            self.reqparse.add_argument(feature,
                                       required=True,
                                       location='json',
                                       help='No {} provided'.format(feature))
        super(NearbyWords, self).__init__()

    def post(self):
        global model
        args = self.reqparse.parse_args()
        query, topn = [args[f] for f in self._required_features]
        if not isinstance(query, str):
            return json.dumps('Please provide correct request_word parameter')
        try:
            similarities = model.similar_by_word(query, topn=int(topn))
            return similarities
        except ValueError:
            return json.dumps("Can't convert n_similar to int")


class WordsDistance(Resource):
    def __init__(self):
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
        global model
        args = self.reqparse.parse_args()
        target, words = [args[f] for f in self._required_features]

        if not isinstance(words, Iterable) and isinstance(words, str):
            return json.dumps("Please send parameter 'words' as an iterable")
        if not isinstance(target, str):
            return json.dumps("Please send parameter 'target' as a string")

        distances = model.distances(target, words)
        return [(key, value.astype(float)) for (key, value) in zip(words, distances)]


class CentralWord(Resource):
    def __init__(self):
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
        global model
        args = self.reqparse.parse_args()
        words = [args[f] for f in self._required_features]
        words = words[0]  # TODO: try to parse as a list of strings (not list of lists)
        query_size = len(words)

        if not isinstance(words, Iterable) and isinstance(words, str):
            return json.dumps("Please send parameter 'words' as an iterable")

        vectors = list()
        for word in words:
            vectors.append(model[word])  # get vector per word in query

        # find central embedding for all the given words
        central_vector = np.mean([np.array(item) for item in vectors], axis=0)
        central_word_candidates = model.most_similar(positive=[central_vector], topn=(query_size + 1))
        central_word = self._filter_one_candidate(central_word_candidates, words)
        return central_word

    @staticmethod
    def _filter_one_candidate(list_of_cand, query):
        for candidate, score in list_of_cand:
            if candidate not in query:
                return candidate


api.add_resource(NearbyWords, '/nearby-words')
api.add_resource(WordsDistance, '/words-distance')
api.add_resource(CentralWord, '/central-word')

@app.route('/')
def root():
    return app.send_static_file('index.html')


if __name__ == '__main__':
    # get port value as an argument
    parser = argparse.ArgumentParser()
    parser.add_argument('-p', '--port', dest='port', type=int, action='store', required=False, default=5000,
                        help='Run API at this port')
    args = parser.parse_args()

    # run microservice at specified port
    app.run(debug=False, host='0.0.0.0', port=args.port)
