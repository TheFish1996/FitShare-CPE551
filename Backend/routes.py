# file that holds all the routes of the API

from flask import Blueprint, jsonify, request
from bson import json_util

import json
import aws
import index

fitShare_api = Blueprint('fitshare_api', __name__)


@fitShare_api.route("/")
def hello():
    return "done"


@fitShare_api.route("/api/allPrograms")
def getAllPrograms():
    allPrograms = index.mongo.db.Programs
    response = []

    output = allPrograms.find({})
    for document in output:
        newDoc = json.loads(json_util.dumps(document))
        response.append(newDoc)
    return jsonify(response)


@fitShare_api.route("/api/sponsoredPrograms")
def getSponsoredPrograms():
    sponsoredPrograms = index.mongo.db.SponsoredPrograms
    response = []

    output = sponsoredPrograms.find({})
    for document in output:
        newDoc = json.loads(json_util.dumps(document))
        response.append(newDoc)

    return jsonify(response)


@fitShare_api.route("/api/discoverTrainers")
def discoverTrainers():
    trainers = index.mongo.db.Users
    response = []

    output = trainers.find({})
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
        aws.uploadFile(file.filename, file)
    return "done"


@fitShare_api.route("/api/registerUser", methods=['POST'])
def registerUser():
    newUser = {}
    data = request.get_json()
    response = aws.createUser(data['email'], data['password'])

    newUser['Full-Name'] = data['name']
    newUser['email'] = data['email']
    Users = index.mongo.db.Users

    Users.insert_one(
        {"_id": response, "email": data["email"], "name": data['name']})

    return 'done'


@fitShare_api.route("/api/authenticateUser", methods=['POST'])
def authenticateUser():
    data = request.get_json()
    response = aws.authenticateUser(data['email'], data['password'])
    Users = index.mongo.db.Users
    doc = Users.find_one({"_id": response})
    user = json.loads(json_util.dumps(doc))

    return jsonify(user)


@fitShare_api.route("/api/purchasedProgram", methods=['POST'])
def purchasedProgram():
    data = request.get_json()
    userID = '57ddbb99-1407-40ab-ae7a-003ff42097af'
    testProgram = "Some Test Program"
    Users = index.mongo.db.Users
    doc = Users.find_one_and_update(
        {'_id': userID}, {'$inc': {'purchasedPrograms': 1}})
    user = Users.find_one({"_id": userID})
    updatedUser = json.loads(json_util.dumps(user))

    return jsonify(updatedUser)
