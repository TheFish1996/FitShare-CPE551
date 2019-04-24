#main module that runs everything

from flask import Flask
from flask_pymongo import PyMongo
from routes import fitShare_api

app = Flask(__name__)
app.config['MONGO_DBNAME'] = 'FitShare'
app.config["MONGO_URI"] = "mongodb://localhost:27017/FitShare"
mongo = PyMongo(app)

app.register_blueprint(fitShare_api)


