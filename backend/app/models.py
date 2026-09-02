from datetime import datetime, timezone

from app.extensions import bcrypt, db


def utcnow():
    return datetime.now(timezone.utc)


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=utcnow, nullable=False)

    collections = db.relationship(
        "Collection", back_populates="user", cascade="all, delete-orphan"
    )

    def set_password(self, plaintext_password):
        self.password_hash = bcrypt.generate_password_hash(plaintext_password).decode(
            "utf-8"
        )

    def check_password(self, plaintext_password):
        return bcrypt.check_password_hash(self.password_hash, plaintext_password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "created_at": self.created_at.isoformat(),
        }


class Collection(db.Model):
    __tablename__ = "collections"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime(timezone=True), default=utcnow, nullable=False)

    user = db.relationship("User", back_populates="collections")
    saved_discoveries = db.relationship(
        "SavedDiscovery", back_populates="collection", cascade="all, delete-orphan"
    )

    def to_dict(self, include_discoveries=False):
        data = {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "description": self.description,
            "created_at": self.created_at.isoformat(),
            "discovery_count": len(self.saved_discoveries),
        }
        if include_discoveries:
            data["saved_discoveries"] = [
                d.to_dict() for d in self.saved_discoveries
            ]
        return data


class SavedDiscovery(db.Model):
    __tablename__ = "saved_discoveries"

    VALID_SOURCES = ("apod", "neo", "library")

    id = db.Column(db.Integer, primary_key=True)
    collection_id = db.Column(
        db.Integer, db.ForeignKey("collections.id"), nullable=False
    )
    source = db.Column(db.String(20), nullable=False)
    source_id = db.Column(db.String(120), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    note = db.Column(db.Text, nullable=True)
    thumbnail_url = db.Column(db.String(500), nullable=True)
    saved_at = db.Column(db.DateTime(timezone=True), default=utcnow, nullable=False)

    collection = db.relationship("Collection", back_populates="saved_discoveries")

    def to_dict(self):
        return {
            "id": self.id,
            "collection_id": self.collection_id,
            "source": self.source,
            "source_id": self.source_id,
            "title": self.title,
            "note": self.note,
            "thumbnail_url": self.thumbnail_url,
            "saved_at": self.saved_at.isoformat(),
        }