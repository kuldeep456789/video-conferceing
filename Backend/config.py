import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.environ.get("DATABASE_URL")

# Detect if the URL is local or cloud
# If local, disable SSL, if cloud (Neon/Heroku), use SSL
if DATABASE_URL and "localhost" in DATABASE_URL:
    # Local DB
    SQLALCHEMY_ENGINE_OPTIONS = {
        "pool_recycle": 1800,
        "connect_args": {"sslmode": "disable"}  # Disable SSL for local
    }
else:
    # Cloud DB
    SQLALCHEMY_ENGINE_OPTIONS = {
        "pool_recycle": 1800,
        "connect_args": {"sslmode": "require"}  # Require SSL for cloud
    }

class Config:
    SQLALCHEMY_DATABASE_URI = DATABASE_URL
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.environ.get("SECRET_KEY", "fallbacksecret")
    SQLALCHEMY_ENGINE_OPTIONS = SQLALCHEMY_ENGINE_OPTIONS
