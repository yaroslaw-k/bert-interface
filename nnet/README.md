# FastText model backend microservice

* Usage example
```bash
cd service
python3 flask_service.py [--help] -p [port number, default 5000]
```

## Methods available

- `/nearby-words` - find **n_similar** words closest to a **request_word** in a model's vector space
    * query example `{'request_word': 'anyword', 'n_similar': 20}`
        - `request_word` - str, querying word
        - `n_similar` - int, number of similar words to return

    * returns `[['word1', similarity_score1], ..., ['wordN', similarity_scoreN]]`, where N = n_similar

- `/words-distance` - find distances between a **target** word and all the **words** in iterable object
    * query example `{'target': 'anyword', 'words': ['word1', ..., 'wordN']}`
        - `target` - str, querying word
        - `words` - iter, array of strings with words

    * returns `[['word1', distance1], ..., ['wordN', distanceN]]`

- `/central-word` - find the **central_word** given the query **words**
    * query example `{'words': ['word1', ..., 'wordN']}`
        - `words` - iter, array of strings with words

    * returns `'central_word'` which is not repeating any of the input words


## To run locally

* Install requirements
```bash
pip install -r requirements.txt
```

* Download model (4 files) from [here](https://yadi.sk/d/d1Zg8pd4hjfyaQ)

* Change `MODEL_PATH` parameter in `service/flask_service.py`

* Run server
```bash
cd service
python3 flask_service.py -p 8020
```


## Examples

* Run example request
```bash
# /nearby-words example
curl -i -H "Content-Type: application/json" -X POST -d '{"request_word": "пижама", "n_similar": 10}' 0.0.0.0:8020/nearby-words

# /words-distance example
curl -i -H "Content-Type: application/json" -X POST -d '{"target": "облако", "words": ["брюки", "кирпич", "голова"]}' 0.0.0.0:8020/words-distance

# /central-word example
curl -i -H "Content-Type: application/json" -X POST -d '{"words": ["ваниль", "крем", "пудинг"]}' 0.0.0.0:8020/central-word
```

## TO-DO
