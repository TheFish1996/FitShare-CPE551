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
        data = request.form['Description']
        print data
        # userID = data['userID']
        # programName = data['programName']
        # price = data['price']
        response = aws.uploadFile(file.filename, file)
        Users = index.mongo.db.Users
        allPrograms = index.mongo.db.Programs
        # Users.update_one({'_id': userID}, {
        #     '$push': {'courses2': {programName: response}}}, upsert=True)

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
    userID = data['userID']
    programName = data['programName']
    Users = index.mongo.db.Users
    Users.update_one({'_id': userID}, {
                     '$push': {'purchasedPrograms': programName}}, upsert=True)
    user = Users.find_one({"_id": userID})
    updatedUser = json.loads(json_util.dumps(user))

    return jsonify(updatedUser)


@fitShare_api.route("/api/rewriter")
def rewriter():
    users = index.mongo.db.Users
    response = []

    output = users.find({})
    for document in output:
        userID = document["_id"]
        users.update_one({'_id': userID}, {
            '$push': {'courses': {'name': "Fit Share Test Program", 'file': 'https://s3.amazonaws.com/fitshare-programs/fit-test.pdf'}}}, upsert=True)

    return 'DONE'
