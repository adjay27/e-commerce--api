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

#### User

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
Update User Profile
```bash
PUT /user/edit:id
```
Update the profile information of a user. 
### Products Routes

```bash
GET /api/products
```

Retrieve all products

```bash
GET /api/products/{id}
```

Retrieve a product by id
