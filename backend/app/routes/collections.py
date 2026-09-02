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
