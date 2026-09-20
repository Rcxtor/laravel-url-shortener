# TinyLink API

TinyLink is a RESTful URL shortening API built with Laravel, MySQL, Laravel Sanctum, and Eloquent ORM.

It allows authenticated users to create and manage shortened URLs, while anyone can access a shortened URL and be redirected to the original URL.

## Features

* User registration and login
* Token-based authentication with Laravel Sanctum
* Logout and authenticated user information
* URL shortening with automatically generated short codes
* Custom short codes
* URL listing with pagination
* URL details
* URL deletion
* User-based URL authorization
* Public short URL redirection
* Click count tracking
* URL statistics
* Database seeder with test data
* Postman API collection

## Technologies

* PHP
* Laravel
* MySQL
* Laravel Sanctum
* Eloquent ORM
* REST API
* Postman

---

## Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/Rcxtor/laravel-url-shortener
cd tinylink
```

### 2. Install dependencies

```bash
composer install
```

### 3. Configure environment

Copy the example environment file:

```bash
cp .env.example .env
```

Generate the application key:

```bash
php artisan key:generate
```

### 4. Configure the database

Create a MySQL database and update the database settings in `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=tinylink
DB_USERNAME=root
DB_PASSWORD=
```

Use the appropriate database credentials for your local environment.

### 5. Run migrations and seed test data

```bash
php artisan migrate --seed
```

This creates the required database tables and inserts sample users and URLs.


### 6. Start the development server

```bash
php artisan serve
```

The API will be available at:

```text
http://127.0.0.1:8000
```

---

# Authentication

TinyLink uses Laravel Sanctum bearer tokens for API authentication.

### Register

```http
POST /api/register
```

Example request:

```json
{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "password_confirmation": "password123"
}
```

### Login

```http
POST /api/login
```

Example request:

```json
{
    "email": "test@example.com",
    "password": "password123"
}
```

The login response contains an authentication token.

For protected endpoints, send the token using:

```http
Authorization: Bearer {token}
```

### Logout

```http
POST /api/logout
```

Requires authentication.

### Current User

```http
GET /api/me
```

Requires authentication.

---

# URL API

All URL management endpoints require authentication.

## Create URL

```http
POST /api/urls
```

Example:

```json
{
    "url": "https://www.example.com"
}
```

A random short code will be generated.

Custom short codes can also be provided:

```json
{
    "url": "https://www.example.com",
    "short_code": "example"
}
```

Example response:

```json
{
    "success": true,
    "message": "URL shortened successfully",
    "data": {
        "id": 1,
        "original_url": "https://www.example.com",
        "short_code": "example",
        "click_count": 0
    }
}
```

## List URLs

```http
GET /api/urls
```

Returns the authenticated user's URLs with pagination.

Optional parameter:

```text
GET /api/urls?per_page=10
```

## Show URL

```http
GET /api/urls/{id}
```

Returns details for a URL owned by the authenticated user.

## URL Statistics

```http
GET /api/urls/{id}/stats
```

Example response:

```json
{
    "success": true,
    "message": "URL statistics retrieved successfully",
    "data": {
        "url_id": 1,
        "short_code": "example",
        "original_url": "https://www.example.com",
        "click_count": 5,
        "created_at": "2026-09-18T..."
    }
}
```

## Delete URL

```http
DELETE /api/urls/{id}
```

Deletes a URL owned by the authenticated user.

---

# Public Redirect

Short URLs are publicly accessible and do not require authentication.

```http
GET /{short_code}
```

Example:

```text
http://127.0.0.1:8000/example
```

The request:

1. Finds the URL using the short code.
2. Increments the click count.
3. Redirects the visitor to the original URL.

If the short code does not exist, Laravel returns a 404 response.

---

# Authorization

Users can only view and delete URLs that belong to them.

URL ownership is enforced using a Laravel Policy.

For example, if User A attempts to access or delete a URL belonging to User B, the request is denied.

---

# Database

The main `urls` table contains:

| Column         | Description                |
| -------------- | -------------------------- |
| `id`           | URL identifier             |
| `user_id`      | Owner of the shortened URL |
| `original_url` | Original destination URL   |
| `short_code`   | Unique shortened URL code  |
| `click_count`  | Number of redirects        |
| `created_at`   | Creation timestamp         |
| `updated_at`   | Last update timestamp      |

The `users` and `urls` models have an Eloquent relationship:

```text
User
 └── hasMany Url

Url
 └── belongsTo User
```

---

# API Response Format

Successful responses generally follow:

```json
{
    "success": true,
    "message": "Operation completed successfully",
    "data": {}
}
```

Error responses generally follow:

```json
{
    "success": false,
    "message": "Error message"
}
```

---

# Postman Collection

A Postman collection containing the API endpoints is included in the repository:

```text
postman/TinyLink_API.postman_collection.json
```

The collection includes:

* Register
* Login
* Logout
* Current User
* Create URL
* List URLs
* Show URL
* URL Statistics
* Delete URL
* Short URL Redirect

The collection uses a stored bearer token variable for authenticated requests.

---

# Seeder Test Data

The database seeder creates sample test data that can be used to test the API.

After running:

```bash
php artisan migrate --seed
```

you can use the seeded account to log in and test the protected endpoints.

---

# Assumptions

* Each short code must be unique.
* Automatically generated short codes are five characters long.
* Custom short codes must be alphanumeric and between 3 and 20 characters.
* A URL belongs to the user who created it.
* Users cannot access or delete URLs owned by other users.
* Click count increases whenever a public short URL is successfully accessed.
* The application is intended to run in a local development environment for this assessment.



---

# Running the Application

After setup, the basic workflow is:

```bash
php artisan migrate --seed
php artisan serve
```

Then use the included Postman collection to register/login and test the API endpoints.
