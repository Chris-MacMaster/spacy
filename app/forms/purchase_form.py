from flask_wtf import FlaskForm
from wtforms import IntegerField

class PurchaseForm(FlaskForm):
    quantity = IntegerField('quantity')
    product_id = IntegerField('product_id')
