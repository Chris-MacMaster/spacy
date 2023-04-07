from flask_sqlalchemy import SQLAlchemy
from .db import db, SCHEMA, environment, add_prefix_for_prod

class ReviewImage(db.Model):
    __tablename__ = "review_image"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    url = db.Column(db.String)
    review_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('review.id')))

    def to_dict(self):
        return {
            'id': self.id,
            'url': self.url,
            'reviewId': self.review_id,
        }
