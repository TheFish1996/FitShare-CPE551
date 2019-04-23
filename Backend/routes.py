#file that holds all the routes of the API

from flask import Blueprint


fitShare_api = Blueprint('fitshare_api', __name__)


@fitShare_api.route("/")
def hello():
    return "hello world"

@fitShare_api.route("/test")
def test():
    return "list of tests"

