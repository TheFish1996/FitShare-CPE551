# functions that will do everything related to pdf files in amazon s3
import boto3
import logging
from botocore.exceptions import ClientError
import os

s3 = boto3.resource('s3')


def uploadFile(file_name, data):

    try:
        s3.Bucket('fitshare-programs').put_object(Key=file_name,
                                                  Body=data, ACL='public-read')
        print "uploaded to s3"

    except ClientError as e:
        logging.error(e)
        return False
    return True
