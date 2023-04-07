from .db import db, environment, SCHEMA, add_prefix_for_prod

class ProductReview(db.Model):
    __tablename__ = 'product_reviews'

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String, nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('product.id')))

    product = db.relationship('Product', back_populates='product_reviews')

    def to_dict(self):
        return {
            'id': self.id,
            'text': self.text,
            'productId': self.product_id,
            'product': self.product
        }