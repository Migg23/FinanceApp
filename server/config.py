class Config:
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:@localhost/finance_user' #finance_user is database name
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'your-secret-key'