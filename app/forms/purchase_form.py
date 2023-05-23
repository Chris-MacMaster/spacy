from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, Email, ValidationError

class PurchaseForm(FlaskForm):
    quantity = IntegerField('quantity')
    product_id = IntegerField('product_id')
