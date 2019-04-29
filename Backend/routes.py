# file that holds all the routes of the API

from flask import Blueprint, jsonify, request
from bson import json_util

import json
import awsS3
import index

fitShare_api = Blueprint('fitshare_api', __name__)


@fitShare_api.route("/")
def hello():
    return "done"


@fitShare_api.route("/api/allPrograms")
def getAllPrograms():
    allPrograms = index.mongo.db.allPrograms
    response = []

    output = allPrograms.find({})
    for document in output:
        newDoc = json.loads(json_util.dumps(document))
        response.append(newDoc)
    return jsonify(response)


@fitShare_api.route("/api/sponsoredPrograms")
def getSponsoredPrograms():
    sponsoredPrograms = index.mongo.db.sponsoredPrograms
    response = []

    output = sponsoredPrograms.find({})
    for document in output:
        newDoc = json.loads(json_util.dumps(document))
        response.append(newDoc)

    return jsonify(response)


@fitShare_api.route("/api/upload", methods=['POST'])
def uploader():
    print "hit route"
    if 'file' not in request.files:
        print "no file part"
    else:
        file = request.files['file']
        awsS3.uploadFile(file.filename, file)
    return "done"
