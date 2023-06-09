# Etsy Clone

## Database Schema Design

Coming soon once finalized

## API Documentation

## USER AUTHENTICATION/AUTHORIZATION

### All endpoints that require authentication

All endpoints that require a current user to be logged in.

* Request: endpoints that require authentication
* Error Response: Require authentication
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Authentication required",
      "statusCode": 401
    }
    ```

### All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the
correct role(s) or permission(s).

* Request: endpoints that require proper authorization
* Error Response: Require proper authorization
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Forbidden",
      "statusCode": 403
    }
    ```

### Get the Current User

Returns the information about the current user that is logged in.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/session
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith",
        "bio": "OMG I LOVE CRAFTS"
      }
    }

    ```


### Log In a User

Logs in a current user with valid credentials and returns the current user's
information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /api/session
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "credential": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
      }
    }
    ```

* Error Response: Invalid credentials
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Invalid credentials",
      "statusCode": 401
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "credential": "Email or username is required",
        "password": "Password is required"
      }
    }
    ```


### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /api/users
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "username": "JohnSmith",
      "password": "secret password"
    }
    ```

* Error response: User already exists with the specified email
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "statusCode": 403,
      "errors": {
        "email": "User with that email already exists"
      }
    }
    ```

* Error response: User already exists with the specified username
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "statusCode": 403,
      "errors": {
        "username": "User with that username already exists"
      }
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "email": "Invalid email",
        "username": "Username is required",
        "firstName": "First Name is required",
        "lastName": "Last Name is required"
      }
    }
    ```


## PRODUCTS

### Get all Products

Returns all the products.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/products
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Products": [
        {
          "id": 1,
          "shop_id": 1,
          "name": "App Academy",
          "description": "123 Disney Lane",
          "category": "science",
          "available": 37,
          "price": 123.00,
          "avgRating": 4.5, //not a product column
          "previewImage": "image url/path", //not a product column
          "free_shipping": true,
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
        }
      ]
    }
    ```

### Get all Products owned by the Current User

Returns all the products created by the current user.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/products/current
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Products": [
        {
          "id": 1,
          "shop_id": 1,
          "name": "App Academy",
          "description": "123 Disney Lane",
          "category": "science",
          "available": 37,
          "price": 123.00,
          "avgRating": 4.5, //not a product column
          "previewImage": "image url/path", //not a product column
          "free_shipping": true,
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
        }
      ]
    }
    ```

### Get details of a Product from an id

Returns the details of a product specified by its id.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/products/:productId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
          "id": 1,
          "shop_id": 1,
          "name": "App Academy",
          "description": "123 Disney Lane",
          "category": "science",
          "available": 37,
          "price": 123.00,
          "avgRating": 4.5, //not a product column
          "previewImage": "image url/path", //not a product column
          "free_shipping": true,
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
      "ProductImages": [
        {
          "id": 1,
          "url": "image url",
          "preview": true
        },
        {
          "id": 2,
          "url": "image url",
          "preview": false
        }
      ],
      "Shop": {
        "id": 1,
        "name": "ShopGeneric",
        "city": "San Francisco",
        "state": "CA",
        "country": "USA",
      }
    }
    ```

* Error response: Couldn't find a product with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Product couldn't be found",
      "statusCode": 404
    }
    ```

### Create a Product

Creates and returns a new product.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/products/new
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        "shop_id": 1,
        "name": "science equipment",
        "description": "123 Disney Lane",
        "category": "science",
        "available": 37,
        "price": 123.00,
        "free_shipping": true
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "shop_id": 1,
      "name": "best product",
      "description": "text description",
      "category": "science",
      "available": 37,
      "price": 123.00,
      "free_shipping": true,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36"
    }
    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "shop_id": "Shop is required",
        "name": "Name must be less than 50 characters",
        "description": "Description is required",
        "category": "A category is required",
        "price": "Price is required",
        "available": "Number in stock is required",
        "free_shipping": "Free shipping status required"
      }
    }
    ```

### Add an Image to a Product based on the Product's id

Create and return a new image for a product specified by id.

* Require Authentication: true
* Require proper authorization: Product must belong to the current user
* Request
  * Method: POST
  * URL: /api/products/:productId/images
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "url": "image url",
      "preview": true
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "url": "image url",
      "preview": true
    }
    ```

* Error response: Couldn't find a Spot with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Spot couldn't be found",
      "statusCode": 404
    }
    ```

### Edit a Product

Updates and returns an existing product.

* Require Authentication: true
* Require proper authorization: Product must belong to the current user
* Request
  * Method: PUT
  * URL: /api/products/:productId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        "shop_id": 1,
        "name": "App Academy",
        "description": "123 Disney Lane",
        "category": "science",
        "available": 37,
        "price": 123.00,
        "free_shipping": true
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "shop_id": 1,
      "name": "App Academy",
      "description": "123 Disney Lane",
      "category": "science",
      "available": 37,
      "price": 123.00,
      "free_shipping": true,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-20 10:06:40"
    }
    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "shop_id": "Shop is required",
        "name": "Name must be less than 50 characters",
        "description": "Description is required",
        "category": "At least one category is required",
        "price": "Price is required",
        "available": "Number in stock is required",
        "free_shipping": "Free shipping status required"
      }
    }
    ```

* Error response: Couldn't find a Product with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Product couldn't be found",
      "statusCode": 404
    }
    ```

### Delete a Product

Deletes an existing product.

* Require Authentication: true
* Require proper authorization: Spot must belong to the current user
* Request
  * Method: DELETE
  * URL: /api/products/:productId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

## REVIEWS

### Get all Product Reviews of the Current User

Returns all the reviews written by the current user.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/reviews/current
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Reviews": [
        {
          "id": 1,
          "userId": 1,
          "shop_id": 1,
          "review": "This was an awesome product!",
          "stars": 5,
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36" ,
          "User": {
            "id": 1,
            "firstName": "John",
            "lastName": "Smith"
          },
          "Product": {
              "id": 1,
              "shop_id": 1,
              "name": "App Academy",
              "description": "123 Disney Lane",
              "category": "science",
              "available": 37,
              "price": 123.00,
              "free_shipping": true,
              "createdAt": "2021-11-19 20:39:36",
              "updatedAt": "2021-11-20 10:06:40"
          },
          "ReviewImages": [
            {
              "id": 1,
              "url": "image url"
            }
          ]
        }
      ]
    }
    ```

### Get all Reviews by a Products's id

Returns all the reviews that belong to a product specified by id.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/products/:productId/reviews
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Reviews": [
        {
          "id": 1,
          "userId": 1,
          "shop_id": 1,
          "review": "This was an awesome spot!",
          "stars": 5,
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36" ,
          "User": {
            "id": 1,
            "firstName": "John",
            "lastName": "Smith"
          },
          "ReviewImages": [
            {
              "id": 1,
              "url": "image url"
            }
          ],
        }
      ]
    }
    ```

* Error response: Couldn't find a Product with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Product couldn't be found",
      "statusCode": 404
    }
    ```

### Create a Review for a Product based on the Products's id

Create and return a new review for a product specified by id.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/products/:productId/reviews
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "review": "This was an awesome spot!",
      "stars": 5,
      "shop_id": 1
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "user_id": 1,
      "shop_id": 1,
      "product_id": 1,
      "review": "This was an awesome product!",
      "stars": 5,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36"
    }
    ```
* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "review": "Review text is required",
        "stars": "Stars must be an integer from 1 to 5",
        "shop_id": "Shop id is required"
      }
    }
    ```

* Error response: Couldn't find a Product with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Product couldn't be found",
      "statusCode": 404
    }
    ```

* Error response: Review from the current user already exists for the Product
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already has a review for this product",
      "statusCode": 403
    }
    ```

### Add an Image to a Review based on the Product Review's id

Create and return a new image for a product review specified by id.

* Require Authentication: true
* Require proper authorization: Review must belong to the current user
* Request
  * Method: POST
  * URL: /api/productReviews/:reviewId/images
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "url": "image url",
      "preview": true
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "url": "image url",
      "owner_id": 1,
      "review_id": 1,
    }
    ```

* Error response: Couldn't find a Review with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Review couldn't be found",
      "statusCode": 404
    }
    ```

* Error response: Cannot add any more images because there is a maximum of 10
  images per resource
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Maximum number of images for this resource was reached",
      "statusCode": 403
    }
    ```


### Edit a Product Review

Update and return an existing review.

* Require Authentication: true
* Require proper authorization: Review must belong to the current user
* Request
  * Method: PUT
  * URL: /api/productReviews/:reviewId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "review": "This was an awesome spot!",
      "stars": 5,
      "shop_id": 1
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "user_id": 1,
      "shop_id": 1,
      "review": "This was an awesome product!",
      "stars": 5,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-20 10:06:40"
    }
    ```

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "review": "Review text is required",
        "stars": "Stars must be an integer from 1 to 5",
        "shop_id": "Shop id is required"
      }
    }
    ```

* Error response: Couldn't find a Review with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Review couldn't be found",
      "statusCode": 404
    }
    ```

### Delete a Product Review

Delete an existing product review.

* Require Authentication: true
* Require proper authorization: Review must belong to the current user
* Request
  * Method: DELETE
  * URL: /api/productReviews/:reviewId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

* Error response: Couldn't find a Review with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Product Review couldn't be found",
      "statusCode": 404
    }
    ```


## SHOPS

### Get details of a Shop from an id

Returns the details of a spot specified by its id.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/shops/:shopId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "name": "Da best shop",
      "ownerId": 1,
      "address": "123 Disney Lane",
      "city": "San Francisco",
      "state": "California",
      "country": "United States of America",
      "description": "Place where web developers are created",
      "category": "Science",
      "sales": 1000,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36" ,
      "numReviews": 5, //not in table
      "avgStarRating": 4.5, //not in table
      "ShopImages": [
        {
          "id": 1,
          "url": "image url",
          "preview": true
        },
        {
          "id": 2,
          "url": "image url",
          "preview": false
        }
      ],
      "Owner": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith"
      }
    }
    ```

* Error response: Couldn't find a Spot with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Spot couldn't be found",
      "statusCode": 404
    }
    ```

### Create a Shop

Creates and returns a new spot.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/shops
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "name": "Da best shop",
      "ownerId": 1,
      "address": "123 Disney Lane",
      "city": "San Francisco",
      "state": "California",
      "country": "United States of America",
      "description": "Place where web developers are created",
      "category": "Science",
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "name": "Da best shop",
      "ownerId": 1,
      "address": "123 Disney Lane",
      "city": "San Francisco",
      "state": "California",
      "country": "United States of America",
      "description": "Place where web developers are created",
      "category": "Science",
      "sales": 0, //always 0
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36" ,
    }
    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "address": "Street address is required",
        "city": "City is required",
        "state": "State is required",
        "country": "Country is required",
        "category": "Category is required",
        "name": "Name must be less than 50 characters",
        "description": "Description is required"
      }
    }
    ```

### Add an Image to a Shop based on the Shop's id

Create and return a new image for a shop specified by id.

* Require Authentication: true
* Require proper authorization: Shop must belong to the current user
* Request
  * Method: POST
  * URL: /api/shops/:shopId/images
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "url": "image url",
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "url": "image url",
      "preview": true
    }
    ```

* Error response: Couldn't find a Spot with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Spot couldn't be found",
      "statusCode": 404
    }
    ```

### Get all Shops

Returns all the shops.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/shops
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Shops": [
            {
            "id": 1,
            "name": "Da best shop",
            "owner_id": 1,
            "address": "123 Disney Lane",
            "city": "San Francisco",
            "state": "California",
            "country": "United States of America",
            "description": "Place where web developers are created",
            "category": "Science",
            "sales": 1000,
            "createdAt": "2021-11-19 20:39:36",
            "updatedAt": "2021-11-19 20:39:36" ,
            "ShopImages": [
                {
                "id": 1,
                "url": "image url",
                },
                {
                "id": 2,
                "url": "image url",
                }
            ],
            }
      ]
    }
    ```

### Get all Shops owned by the Current User

Returns all the products created by the current user.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/shops/current
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Shops": [
            {
            "id": 1,
            "name": "Da best shop",
            "owner_id": 1,
            "address": "123 Disney Lane",
            "city": "San Francisco",
            "state": "California",
            "country": "United States of America",
            "description": "Place where web developers are created",
            "category": "Science",
            "sales": 1000,
            "createdAt": "2021-11-19 20:39:36",
            "updatedAt": "2021-11-19 20:39:36" ,
            "ShopImages": [
                {
                "id": 1,
                "url": "image url",
                },
                {
                "id": 2,
                "url": "image url",
                }
            ],
            }
      ]
    }
    ```

### Edit a Shop

Updates and returns an existing product.

* Require Authentication: true
* Require proper authorization: Product must belong to the current user
* Request
  * Method: PUT
  * URL: /api/shops/:shopId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        "name": "Da best shop",
        "owner_id": 1,
        "address": "123 Disney Lane",
        "city": "San Francisco",
        "state": "California",
        "country": "United States of America",
        "description": "Place where web developers are created",
        "category": "Science",
        "createdAt": "2021-11-19 20:39:36",
        "updatedAt": "2021-11-19 20:39:36" ,
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "shop_id": 1,
      "name": "Da best shop",
      "owner_id": 1,
      "address": "123 Disney Lane",
      "city": "San Francisco",
      "state": "California",
      "country": "United States of America",
      "description": "Place where web developers are created",
      "category": "Science",
      "sales": 1000, //users should probably not be allowed to edit sales
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36" ,
    }
    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "shop_id": "Shop is required",
        "name": "Name must be less than 50 characters",
        "address": "Address is required",
        "city": "City is required",
        "state": "State is required",
        "country": "Country is required",
        "description": "Description is required",
        "category": "At least one category is required",
      }
    }
    ```

* Error response: Couldn't find a Shop with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Shop couldn't be found",
      "statusCode": 404
    }
    ```

### Delete a Shop

Deletes an existing product.

* Require Authentication: true
* Require proper authorization: Spot must belong to the current user
* Request
  * Method: DELETE
  * URL: /api/shops/:shopId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

* Error response: Couldn't find a Shop with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Shop couldn't be found",
      "statusCode": 404
    }
    ```

## FOLLOWING USERS

### Follow a User by id

Create following relationship and return success status.

* Require Authentication: true
* Require proper authorization: User must be signed in
* Request
  * Method: POST
  * URL: /api/users/:userId/
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "followed_id": 2
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "user_id": 1,
      "followed_id": 2
    }
    ```

* Error response: Couldn't find a User with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User couldn't be found",
      "statusCode": 404
    }
    ```

### Get all followers of current user

Returns all the reviews written by the current user.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/users/current
  * Body: none

//WHERE user_id == "followed_id"


* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Followers": [
        {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith",
        "bio": "OMG I LOVE CRAFTS"
        }
      ]
    }
    ```

### Get all users client is following

Returns all the reviews written by the current user.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/users/current
  * Body: none

//WHERE user_id == "user_id"

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Following": [
        {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith",
        "bio": "OMG I LOVE CRAFTS"
        }
      ]
    }
    ```

### Delete Following relationship (Unfollow)

Returns all the reviews written by the current user.

* Require Authentication: true
* Request
  * Method: DELETE
  * URL: /api/followers/current
  * Body: none

//WHERE user_id == "user_id"

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Following": [
        {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith",
        "bio": "OMG I LOVE CRAFTS"
        }
      ]
    }
    ```

## FAVORITED SHOPS

