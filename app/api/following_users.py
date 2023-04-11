from flask import Blueprint
from app.models import db, FollowingUsers
from flask_login import current_user, login_required

following_users = Blueprint('/following-users', __name__)

