"""Creates a placeholder dev user (id=1) so Collections have an owner to
attach to before real auth/signup exists. Run once: python seed.py
"""
from app import create_app
from app.extensions import db
from app.models import User