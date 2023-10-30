from flask_sqlalchemy import SQLAlchemy
from .db import db, SCHEMA, environment, add_prefix_for_prod
from sqlalchemy.sql import func


class FollowingUsers(db.Model):
    __tablename__ = 'following_users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), primary_key=True)
    followed_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), primary_key=True)
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'followerId': self.follower_id,
            'followedId': self.followed_id,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
