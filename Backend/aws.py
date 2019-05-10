# functions that will do everything related to pdf files in amazon s3
import boto3
import logging
from botocore.exceptions import ClientError
import os

s3 = boto3.resource('s3') # create a reference to AWS S3 resources

cognito = boto3.client('cognito-idp') # create a reference to AWS cognito service

# function that will upload a file to our S3 bucket
def uploadFile(file_name, data):

    # try catch clause that will access the S3 bucket, upload pdf file, make it available for public read, return the download link
    try:
        s3.Bucket('fitshare-programs').put_object(Key=file_name,
                                                  Body=data, ACL='public-read')
        print "uploaded to s3"
        publicURL = "https://s3.amazonaws.com/fitshare-programs/%s" % file_name #this is bootleg and a hacky way - not advised at all.

        response = {
            "name": file_name,
            "file": publicURL
        }

    except ClientError as e:
        logging.error(e)
        return False
    return response


# AWS cognito function that will create new users
def createUser(email, password):

    # API CALL
    response = cognito.sign_up(
        ClientId='cognito client id goes here',
        Username=email,
        Password=password,

    )
    return response['UserSub'] # return UID

#AWS cognito function that will authenticate new users
def authenticateUser(email, password):

    # API CALL - server side authentication - returns an access token
    response = cognito.admin_initiate_auth(
        ClientId='cognito information here',
        UserPoolId='cognito user pool id goes here',
        AuthFlow='ADMIN_NO_SRP_AUTH',
        AuthParameters={
            'USERNAME': email,
            'PASSWORD': password
        },


    )
    authResult = response['AuthenticationResult'] 
    accessToken = authResult['AccessToken'] # access token is here

    #use the access token to find the user info here
    user = cognito.get_user(
        AccessToken=accessToken
    )

    # in this case our "username" is the UID we use to fetch rest of user data in our database.
    return user['Username']
