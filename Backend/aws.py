# functions that will do everything related to pdf files in amazon s3
import boto3
import logging
from botocore.exceptions import ClientError
import os

s3 = boto3.resource('s3')

cognito = boto3.client('cognito-idp')


def uploadFile(file_name, data):

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

# TODO: add logic for user already exists


def createUser(email, password):
    response = cognito.sign_up(
        ClientId='5g8jtg70mjk1fk7m4ls7d1diuv',
        Username=email,
        Password=password,

    )
    return response['UserSub']


# TODO: add logic for wrong username or pass
def authenticateUser(email, password):
    response = cognito.admin_initiate_auth(
        ClientId='5g8jtg70mjk1fk7m4ls7d1diuv',
        UserPoolId='us-east-1_asQ9AQdYt',
        AuthFlow='ADMIN_NO_SRP_AUTH',
        AuthParameters={
            'USERNAME': email,
            'PASSWORD': password
        },


    )

    authResult = response['AuthenticationResult']
    accessToken = authResult['AccessToken']
    user = cognito.get_user(
        AccessToken=accessToken
    )

    return user['Username']
