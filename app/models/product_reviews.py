from .db import db, environment, SCHEMA, add_prefix_for_prod

class ProductReview(db.Model):
    __tablename__ = 'product_reviews'

    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.Text, nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    stars = db.Column(db.Integer, nullable=False)

    products = db.relationship('Product', back_populates='product_reviews')
    #users = db.relationship('User', back_populates='product_reviews')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'productId': self.product_id,
            'review': self.review,
            'stars': self.stars
        }
