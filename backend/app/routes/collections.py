from flask import Blueprint, jsonify, request

from app.extensions import db
from app.models import Collection

collections_bp = Blueprint("collections", __name__, url_prefix="/api/collections")

DEV_USER_ID = 1


@collections_bp.get("")
def list_collections():
    page = request.args.get("page", default=1, type=int)
    per_page = request.args.get("per_page", default=10, type=int)

    query = Collection.query.filter_by(user_id=DEV_USER_ID).order_by(
        Collection.created_at.desc()
    )
    paginated = query.paginate(page=page, per_page=per_page, error_out=False)

    return jsonify(
        {
            "collections": [c.to_dict() for c in paginated.items],
            "page": paginated.page,
            "per_page": paginated.per_page,
            "total": paginated.total,
            "total_pages": paginated.pages,
        }
    )

@collections_bp.post("")
def create_collection():
    data = request.get_json(silent=True) or {}
    name = (data.get("name") or "").strip()

    if not name:
        return jsonify({"error": "name is required"}), 400

    collection = Collection(
        user_id=DEV_USER_ID, name=name, description=data.get("description")
    )
    db.session.add(collection)
    db.session.commit()

    return jsonify(collection.to_dict()), 201

@collections_bp.get("/<int:collection_id>")
def get_collection(collection_id):
    collection = Collection.query.filter_by(
        id=collection_id, user_id=DEV_USER_ID
    ).first()

    if collection is None:
        return jsonify({"error": "Collection not found"}), 404

    return jsonify(collection.to_dict(include_discoveries=True))
