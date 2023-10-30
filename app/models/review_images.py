from .db import db, SCHEMA, environment, add_prefix_for_prod
from sqlalchemy.sql import func


class ReviewImage(db.Model):
    __tablename__ = "review_images"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String, nullable=False)
    review_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('product_reviews.id')))
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    product_review = db.relationship('ProductReview', back_populates='image')

    def to_dict(self):
        return {
            'id': self.id,
            'url': self.url,
            'reviewId': self.review_id,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
