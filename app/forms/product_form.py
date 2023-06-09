from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, MultipleFileField
from wtforms.validators import DataRequired

class CreateProductForm(FlaskForm):
    shop_id = IntegerField('shop_id', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    category = StringField('category', validators=[DataRequired()])
    available = IntegerField('available', validators=[DataRequired()])
    free_shipping = BooleanField('free_shipping')
    price = IntegerField('price', validators=[DataRequired()])
    image = MultipleFileField("image")
    
