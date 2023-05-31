from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, URLField, FieldList, MultipleFileField
from wtforms.validators import DataRequired, URL, Length
from app.models import  User

from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.AWS_helpers import ALLOWED_EXTENSIONS



class CreateProductForm(FlaskForm):
    shop_id = IntegerField('shop_id', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    category = StringField('category', validators=[DataRequired()])
    available = IntegerField('available', validators=[DataRequired()])
    free_shipping = BooleanField('free_shipping')
    price = IntegerField('price', validators=[DataRequired()])
    # img_1 = StringField('img_1', validators=[DataRequired()])
    
    # url = StringField('url')
    #URL()
    # image = FileField("image", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    # image = MultipleFileField("image", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    image = MultipleFileField("image")
    # image = FieldList(FileField('image', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS)), Length(min=1, max=50)]), min_entries=1)

