from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
# from app.models.follows import following_users
from .following_users import FollowingUsers
from sqlalchemy.sql import func
from sqlalchemy.orm import validates

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    bio = db.Column(db.Text)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())
    carts = db.relationship("Cart", backref="users")
    shops = db.relationship('Shop', backref='users')
    product_reviews = db.relationship('ProductReview', backref='users')


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'bio': self.bio,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }

    # followers = db.relationship(
    #     'User',
    #     secondary=FollowingUsers.__table__,
    #     primaryjoin=(FollowingUsers.follower_id == id),
    #     secondaryjoin=(FollowingUsers.followed_id == id),
    #     backref=db.backref('following', lazy='dynamic'),
    #     lazy='dynamic'
    # )
    # this relationship allows you to access both the collectino of following_users
    # that follow a given user(with user.followers), and the collection
    # of users that a user follows (with user.following)
