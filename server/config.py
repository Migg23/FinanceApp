class Config:
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:@localhost/usersinformation' #userinformation is database name
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'your-secret-key'