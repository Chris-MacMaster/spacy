from flask_sqlalchemy import SQLAlchemy
from .db import db, SCHEMA, environment, add_prefix_for_prod

follows = db.Table(
    "following_users",
    db.Model.metadata,

    # if environment == "production":
    #     __table_args__ = {'schema': SCHEMA}

    db.Column('id', db.Integer, primary_key=True),
    db.Column('follower_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('followed_id', db.Integer,db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),

)
