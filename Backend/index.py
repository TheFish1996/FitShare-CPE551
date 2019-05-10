# main module that runs everything

from flask import Flask
from flask_pymongo import PyMongo
from routes import fitShare_api
from flask_cors import CORS

app = Flask(__name__)
app.config['MONGO_DBNAME'] = 'FitShare'
app.config["MONGO_URI"] = "mongo db URI goes here"
mongo = PyMongo(app)
CORS(app)

app.register_blueprint(fitShare_api)
