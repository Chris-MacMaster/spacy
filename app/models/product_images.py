from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class ProductImage(db.Model):
    __tablename__ = 'product_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String)
    product_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('products.id')))
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())
    products = db.relationship('Product', back_populates='product_images')

    def to_dict(self):
        return {
            'id': self.id,
            'url': self.url,
            'productId': self.product_id,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
