from datetime import datetime, timezone

from app.extensions import db, bcrypt


def utcnow():
    return datetime.now(timezone.utc)