# file that holds all the routes of the API

from flask import Blueprint, jsonify, request
from bson import json_util

import json
import aws
import index

fitShare_api = Blueprint('fitshare_api', __name__)

######################################################################################
#                                                                                    #
#           All FitShare GET Routes to RETRIEVE from cloud DB and cloud Services     #
#                                                                                    #
######################################################################################
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


######################################################################################
#                                                                                    #
#           All FitShare POST Routes to Update cloud DB and cloud Services           #
#                                                                                    #
######################################################################################
# route that uploads files to AWS S3/Updates DB
@fitShare_api.route("/api/upload", methods=['POST'])
def uploader():

    # check to see if the request has a file
    if 'file' not in request.files:
        print "no file part"

    else:

        # start parsing the request for data we need
        file = request.files['file']
        userID = request.form['userID']
        price = request.form['Price']

        intPrice = int(price)  # convert string to int for DB
        # call our AWS module to handle upload to S3 bucket - returns file url and name
        response = aws.uploadFile(file.filename, file)

        # create a reference to our mongo DB collections
        Users = index.mongo.db.Users
        allPrograms = index.mongo.db.Programs

        # go into users, update the courses they offer, push the new course they teaching/offering
        Users.update_one({'_id': userID}, {
            '$push': {'courses': {"name": request.form['programName'], "file": response['file']}}}, upsert=True)

        # an mongo db document model to insert the data we get from the request on client side
        insertionModel = {
            "name": request.form['programName'],
            "price": intPrice,
            "description": request.form['Description'],
            "trainer": request.form['Name'],
            "file": response['file']
        }

        allPrograms.insert_one(insertionModel)

        # retrieve and return the user that has all updated info.
        doc = Users.find_one({"_id": userID})
        user = json.loads(json_util.dumps(doc))

    return jsonify(user)

# route that contacts AWS cognito services to register user
@fitShare_api.route("/api/registerUser", methods=['POST'])
def registerUser():
    newUser = {}
    data = request.get_json()
    # use our AWS module's function to register use in Cognito - returns user UID
    response = aws.createUser(data['email'], data['password'])

    # parse other data from request
    newUser['Full-Name'] = data['name']
    newUser['email'] = data['email']

    Users = index.mongo.db.Users  # get a ref to user collection

    # insert the new user into the database - the _id is the UID generated from Cognito so all user UID's match
    Users.insert_one(
        {"_id": response, "email": data["email"], "name": data['name']})

    return 'done'

# route that authenticates a user in AWS Cognito
@fitShare_api.route("/api/authenticateUser", methods=['POST'])
def authenticateUser():
    data = request.get_json() #convert request so we can parse
    response = aws.authenticateUser(data['email'], data['password']) # use aws cognito module to get token/ authenticate on backend - returns user UID

    #now we search the database to get the user document and send it back for client 
    Users = index.mongo.db.Users
    doc = Users.find_one({"_id": response})
    user = json.loads(json_util.dumps(doc))

    return jsonify(user)


#Route that updates database for users purchased programs
@fitShare_api.route("/api/purchasedProgram", methods=['POST'])
def purchasedProgram():

    #convert and parse data
    data = request.get_json()
    userID = data['userID'] 
    programName = data['programName']

    #reference database info and UPSERT 
    Users = index.mongo.db.Users
    Users.update_one({'_id': userID}, {
                     '$push': {'purchasedPrograms': programName}}, upsert=True)

    # RETURN the updated user back to client
    user = Users.find_one({"_id": userID})
    updatedUser = json.loads(json_util.dumps(user))

    return jsonify(updatedUser)
