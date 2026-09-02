import os

from dotenv import load_dotenv
from flask import Flask

from app.extensions import bcrypt, cors, db, migrate

load_dotenv()

def create_app(config_overrides=None):
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
        "DATABASE_URL", "sqlite:///dev.db"
    )
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "dev-secret-key")

    if config_overrides:
        app.config.update(config_overrides)

    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)

    frontend_origin = os.environ.get("FRONTEND_ORIGIN", "http://localhost:5173")
    cors.init_app(app, resources={r"/api/*": {"origins": frontend_origin}})

    from app.routes.collections import collections_bp
    from app.routes.health import health_bp

    app.register_blueprint(health_bp)
    app.register_blueprint(collections_bp)

    from app.errors import register_error_handlers
    register_error_handlers(app)

    from app import (
        models,  # noqa: F401  (ensures models are registered with SQLAlchemy)
    )

    return app
