from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User




class CreateProductForm(FlaskForm):
    shop_id = IntegerField('shop_id', validators=[DataRequired(), Email()])
    name = StringField('name', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    category = StringField('category', validators=[DataRequired()])
    available = IntegerField('available', validators=[DataRequired()])
    free_shipping = BooleanField('free_shipping', validators=[DataRequired()])
    price = IntegerField('price', validators=[DataRequired()])