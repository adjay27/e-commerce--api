# E-COMMERCE API DOCUMENTATION

## Overview

Welcome to e-commerce API Documentation. This API provides endpoints for managing products, orders, and users in a basic eCommerce system.

## Base URL

The base URL for accessing the e-commerce API is:

```link
http://localhost:{port}/api
```

## Authentication

e-commerce API uses API keys for authentication. You need to include your API key in the headers in some request.

#### Authentication Header

```makefile
Authorization: YOUR_API_KEY
```

#### Token Request

Request a token

```bash
POST /auth/login
```

Handles user authentication requests. Example body request:

```json
{
  "email": "example@mail.com",
  "password": "password"
}
```

Example of response success generating token

```json
{
  "message": "Successfully logged in!",
  "currentUser": "Gloria Sipes",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzA4MjQwNDg1LCJleHAiOjE3MDgzMjY4ODV9.10Iy6SFmByTMWjmgTUbH7jo3HZwSBIW-dOqTlN2Xsfc"
}
```

## Endpoints

### User Routes

Register User

```bash
POST /user/register
```

Handles user register requests. Example body request:

```json
{
  "name": "anjay2",
  "email": "aditya1@gmail.com",
  "password": "password"
}
```

Retrieve User Profile

```
GET /user/info
```

Retrieve the profile information of a user by their ID inside token.

Response body user info

```json
{
  "id": 4,
  "name": "Gloria Sipes",
  "email": "else.crist27@hotmail.com",
  "role_id": 2,
  "role": {
    "name": "regular_user"
  },
  "is_blocked": false
}
```

Retrieve All User in database

```bash
GET /user/all
```

This endpoint can accessible only for account with `role_id : 1` / Seller

Update User Profile

```bash
PUT /user/edit:id
```

Example request body edit user profile

```json
{
  "name": "anjayAfterEdit",
  "email": "aditya1@gmail.com",
  "password": "password"
}
```

Update the profile information of a user.

Delete User Profile

```bash
DELETE /user/delete:id
```

response body

```json
{
  "message": "User Deleted Successfully",
  "results": {
    "id": 6,
    "name": "anjayAfterEdit",
    "email": "aditya1@gmail.com",
    "password": "password",
    "is_blocked": false,
    "role_id": 2,
    "created_at": "2024-02-18T07:20:59.452Z",
    "updated_at": "2024-02-18T07:24:50.319Z"
  }
}
```

### Products Routes

```bash
GET /products
```

Retrieve all products

```bash
GET /products/:id
```

Retrieve a product by id

Add a product

```bash
POST /products/add
```

Edit a product

```bash
PUT /products/edit/:id
```

Example request body add a product. Can also be used for edit request body edit product

```json
{
  "name": "Nothing",
  "description": "its nothing just nothing",
  "price": 100,
  "category_id": 1
}
```

Delete a product

```bash
DELETE /products/delete/:id
```

Delete a product by their ID

### Cart Routes

Retrieve a cart per user based on token headers

```bash
GET /cart
```

Add product to cart

```bash
POST /cart/add
```

Example body request adding product to cart

```json
{
  "product_id": 2,
  "quantity": 1
}
```

Delete cart

```bash
DELETE /cart
```

Delete any product inside a cart

### Order Routes

Retrieve Order

```bash
GET /order
```

Retrieve order record from database

Create order

```bash
POST /order
```

Checkout all product inside the cart. Cart must not empty

### Payment

Simulate payment process

```bash
POST /payment/pay
```

example of body request

```json
{
  "order_id": 1,
  "cardNumber": "4012888888881881",
  "cvv": 201,
  "expiryMonth": "02",
  "expiryYear": "2024"
}
```

example success response payment

```json
{
  "success": true,
  "message": "Payment success",
  "order": {
    "id": 1,
    "user_id": 4,
    "date": "2024-02-18T07:34:53.000Z",
    "number": "ORD/176",
    "payment_status": "PAID",
    "total": 1499.99,
    "created_at": "2024-02-18T07:34:52.772Z",
    "updated_at": "2024-02-18T14:45:33.581Z"
  }
}
```




