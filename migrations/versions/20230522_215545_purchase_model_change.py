"""purchase model change

Revision ID: fe7dd917fe2f
Revises: 96a93aa5ad56
Create Date: 2023-05-22 21:55:45.807163

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = 'fe7dd917fe2f'
down_revision = '96a93aa5ad56'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('purchases', schema=None) as batch_op:
        batch_op.alter_column('cart_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    if environment == "production":
        op.execute(f"ALTER TABLE purchases SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('purchases', schema=None) as batch_op:
        batch_op.alter_column('cart_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    if environment == "production":
        op.execute(f"ALTER TABLE purchases SET SCHEMA {SCHEMA};")

    # ### end Alembic commands ###
