import os

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or b't\r\xa1\x8c\xb5c\x8c\xce\x87\xf35\x14\r\x15\x07\x8c'

    MONGODB_SETTINGS = { 'db' : 'UNIR_Enrollment' }


    
