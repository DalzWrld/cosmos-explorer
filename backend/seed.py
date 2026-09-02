"""Creates a placeholder dev user (id=1) so Collections have an owner to
attach to before real auth/signup exists. Run once: python seed.py
"""
from app import create_app
from app.extensions import db
from app.models import User

app = create_app()

with app.app_context():
    if db.session.get(User, 1) is None:
        dev_user = User(username="dev", email="dev@cosmos-explorer.local")
        dev_user.set_password("dev-password")
        db.session.add(dev_user)
        db.session.commit()
        print(f"Created dev user with id={dev_user.id}")
    else:
        print("Dev user already exists.")