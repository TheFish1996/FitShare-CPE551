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

    except ClientError as e:
        logging.error(e)
        return False
    return True


def createUser(email, password):
    response = cognito.sign_up(
        ClientId='5g8jtg70mjk1fk7m4ls7d1diuv',
        Username=email,
        Password=password,
        
    )

    return response['UserSub']


