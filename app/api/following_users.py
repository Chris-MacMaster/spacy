from flask import Blueprint
from app.models import db, FollowingUsers
from flask_login import current_user, login_required

following_users = Blueprint('/following-users', __name__)

@following_users.route('/current')
@login_required
def get_followers_and_following():
    """return followers and following in state for user"""
    if current_user.is_authenticated:
        followers = FollowingUsers.query.filter(FollowingUsers.follower_id == current_user.id)
        following = FollowingUsers.query.filter(FollowingUsers.followed_id == current_user.id)
        followersdata = [f.to_dict() for f in followers] if followers else None
        followingdata = [f.to_dict() for f in following] if following else None

        return { "Following": followingdata, "Followed": followersdata}, 200
