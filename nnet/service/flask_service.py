#!/usr/bin/env python3

import os
import sys
import argparse

from flask import Flask
from flask_restful import Api
import gensim

from methods import NearbyWords, WordsDistance, CentralWord


MODEL_PATH = '../models/fasttext/fasttext.model'
model = gensim.models.keyedvectors.FastTextKeyedVectors.load(MODEL_PATH, mmap='r')
model.index2word = [item for item in model.vocab]


app = Flask(__name__, static_url_path='', static_folder='../static',)
api = Api(app)


api.add_resource(NearbyWords, '/nearby-words', resource_class_kwargs={'model': model})
api.add_resource(WordsDistance, '/words-distance', resource_class_kwargs={'model': model})
api.add_resource(CentralWord, '/central-word', resource_class_kwargs={'model': model})


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
