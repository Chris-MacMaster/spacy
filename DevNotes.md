App was been refactored to use tailwind css
Previous main branch has been place in archive branch, if any legacy code is needed for reference

4/6
We should probably commit to either camel or snake case
--copy undo seeder funcs and replace table name
--must set schema on table
--keys in wtform must be the same as those in react frontend

Tables simplified

Full CRUD
--Shops
✅get all shops
✅get all of users shops
✅delete a shop
✅get shop by id
✅create a shop
✅update shop


--Products
✅get all products
✅get user products
✅get product by id
✅DELETE PRODUCT BY ID
🔲UPDATE PRODUCT -CHRIS MAC
🔲CREATE PRODUCT -CHRIS MAC

--Reviews
✅get all reviews
✅get reviews by id
✅delete review
✅create review
🔲update review

--Cart
✅delete cart
✅create cart
✅update cart
🔲checkout/empty cart


Partial CRUD
--Product Images [C]
✅Create Product image

--Review Image [C]
🔲Create Review Image

--Shop Image [C]
🔲Create shop Image

--Followers [CRD]
🔲Follow a user
🔲unfollow user
✅get following relationships


FRONT END

Navigate
✅Landing
✅Shop Details
--✅Policies Modal
✅user details
✅product details
✅product search results
✅user cart

FORMS
✅delete cart
✅create cart
✅update cart

🔲create product
🔲update product
✅create review
--🔲add url field to create review
🔲update review


-delete review should redirect to product page
---bottom margin on create review is overlapping footer
-confirm delete modal on delete product
-after deleting reviews, reviews are duplicated
---page redirects to 404
--conditional statement on

Dylan ----redirect after item added to cart

Christopher ---edit product creation url
-review form error messages

ChrisL ---custom README
       ---create product form
       ---post a review



FONTS
font-family: 'Libre Baskerville', serif;
font-family: 'Marcellus', serif;
font-family: 'Mulish', sans-serif;
font-family: 'Orbitron', sans-serif;
font-family: 'Thasadith', sans-serif;
