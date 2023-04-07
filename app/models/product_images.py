from .db import db, environment, SCHEMA, add_prefix_for_prod

class ProductImage(db.Model):
    __tablename__ = 'product_images'

    id = db.Column(db.Integer, primary_key = True)
    url = db.Column(db.String)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('product.id')))

    product = db.relationship('Product', back_populates='product_images')

    def to_dict(self):
        return {
            'id': self.id,
            'url': self.url,
            'productId': self.product_id,
        }
