import os


class Config:
    DATABASE_URL = os.getenv(
        "DATABASE_URL", "postgresql://root:root@localhost:5432/mashgin_db"
    )

    SQLALCHEMY_DATABASE_URI = DATABASE_URL
    SQLALCHEMY_TRACK_MODIFICATIONS = False
