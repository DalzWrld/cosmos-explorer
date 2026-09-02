import os

from dotenv import load_dotenv
from flask import Flask

from app.extensions import bcrypt, cors, db, migrate

load_dotenv()