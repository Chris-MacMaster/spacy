from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class ProductReview(db.Model):
    __tablename__ = 'product_reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    review = db.Column(db.Text, nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    stars = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    products = db.relationship('Product', back_populates='product_reviews')
    #users = db.relationship('User', back_populates='product_reviews')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'productId': self.product_id,
            'review': self.review,
            'stars': self.stars,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
