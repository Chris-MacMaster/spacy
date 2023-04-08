from flask_sqlalchemy import SQLAlchemy
from .db import db, SCHEMA, environment, add_prefix_for_prod

class FollowingUsers(db.Model):
    __tablename__ = 'following_users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    follower_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)
    followed_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)


# follows = db.Table(
#     "following_users",
#     db.Model.metadata,

#     # if environment == "production":
#     #     __table_args__ = {'schema': SCHEMA}

#     db.Column('id', db.Integer, primary_key=True),
#     db.Column('follower_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
#     db.Column('followed_id', db.Integer,db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),

# )
