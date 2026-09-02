from flask import Blueprint, jsonify, request

from app.extensions import db
from app.models import Collection

collections_bp = Blueprint("collections", __name__, url_prefix="/api/collections")
