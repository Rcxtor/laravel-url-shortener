# TinyLink

TinyLink is a full-stack URL shortening application built with **Laravel and React**.

It allows users to create, manage, and track shortened URLs while also allowing visitors to create temporary guest links without creating an account. The application includes authentication, custom short codes, click tracking, URL statistics, password reset, and a React-based frontend.

## Live Demo

**Frontend:**
https://frontend-production-98e2.up.railway.app

**Backend API:**
https://laravel-url-shortener-production.up.railway.app

> The application is currently deployed with separate frontend and backend services on Railway. The hosting platform may change in the future.

---

# Features

## Authentication

* User registration
* User login
* Laravel Sanctum token authentication
* Authenticated user information
* Logout
* Forgot password
* Password reset through email

## URL Shortening

* Create shortened URLs
* Automatically generated 5-character short codes
* Custom short codes
* Unique short codes
* URL validation
* User-owned URLs
* URL listing with pagination
* View individual URL details
* Delete URLs

## Guest URL Shortening

Users can create a temporary shortened URL without creating an account.

Guest URLs:

* Do not require authentication
* Use automatically generated short codes
* Are limited to 5 successful visits
* Are automatically removed after reaching the limit
* Are not included in authenticated users' dashboards
* Cannot be managed like authenticated URLs

This allows visitors to quickly create a short link without being required to create an account.

## URL Statistics

Authenticated users can view statistics for their URLs, including:

* Short code
* Original URL
* Total click count
* Creation date

## Public Redirects

Short URLs can be accessed publicly without authentication.

When a short URL is visited:

1. TinyLink finds the URL using its short code.
2. The click count is increased.
3. The visitor is redirected to the original URL.

Guest URLs additionally check their visit limit before redirecting.

## Authorization

Users can only access and manage URLs that belong to them.

Laravel Policies are used to enforce URL ownership.

For example, a user cannot view or delete another user's URL.

---

# Technologies

## Backend

* PHP
* Laravel
* Laravel Sanctum
* Eloquent ORM
* MySQL
* REST API

## Frontend

* React
* React Router
* Axios
* Tailwind CSS
* Vite

## Tools & Deployment

* Git
* GitHub
* Railway
* Postman
* Mailpit for local email testing

---

# Application Architecture

TinyLink uses a separate frontend and backend architecture.

```text
                ┌─────────────────────┐
                │     React Frontend  │
                │     React + Vite    │
                └──────────┬──────────┘
                           │
                         Axios
                           │
                           ▼
                ┌─────────────────────┐
                │    Laravel Backend  │
                │      REST API       │
                └──────────┬──────────┘
                           │
                  ┌────────┴────────┐
                  │                 │
                  ▼                 ▼
             MySQL Database    Laravel Sanctum
```

The frontend and backend are deployed as separate Railway services while remaining in the same GitHub repository.

---

# Project Structure

```text
tinylink/
│
├── app/
├── bootstrap/
├── config/
├── database/
├── public/
├── resources/
├── routes/
├── storage/
├── composer.json
├── artisan
│
└── frontend/
    ├── src/
    ├── public/
    ├── package.json
    └── vite.config.js
```

The Laravel project is the backend root, while the React application is located inside the `frontend` directory.

---

# Authentication API

TinyLink uses Laravel Sanctum bearer tokens for authentication.

## Register

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

## Login

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

The response contains an authentication token.

Protected requests use:

```http
Authorization: Bearer {token}
```

## Logout

```http
POST /api/logout
```

Requires authentication.

## Current User

```http
GET /api/me
```

Requires authentication.

---

# Password Reset API

## Request Password Reset

```http
POST /api/forgot-password
```

Example:

```json
{
    "email": "test@example.com"
}
```

A password reset email is generated for the account.

## Reset Password

```http
POST /api/reset-password
```

Example:

```json
{
    "email": "test@example.com",
    "token": "reset-token",
    "password": "newpassword123",
    "password_confirmation": "newpassword123"
}
```

The password reset flow uses Laravel's password broker and a custom TinyLink password-reset notification.

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

A random 5-character short code will be generated.

Custom short codes can also be provided:

```json
{
    "url": "https://www.example.com",
    "short_code": "example"
}
```

## List URLs

```http
GET /api/urls
```

Returns the authenticated user's URLs with pagination.

Optional:

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

# Guest URL API

Guest users can create temporary URLs without authentication.

## Create Guest URL

```http
POST /api/guest-urls
```

Example request:

```json
{
    "url": "https://www.example.com"
}
```

A random 5-character short code is generated.

Guest URLs have a maximum of **5 successful visits**.

After the fifth successful visit, the guest URL is removed. Further requests to that short code return a 404 response.

---

# Public Short URL

Short URLs are publicly accessible without authentication.

```http
GET /{short_code}
```

Example:

```text
https://frontend-production-98e2.up.railway.app/example
```

For a normal authenticated URL:

1. The short code is searched in the database.
2. The click count is incremented.
3. The visitor is redirected to the original URL.

For a guest URL, TinyLink additionally checks whether the 5-visit limit has been reached.

---

# Short Code Availability

TinyLink provides a public endpoint for checking whether a short code exists:

```http
GET /api/check/{shortCode}
```

This is used by the frontend when handling short-code based routing.

---

# Database

The main `urls` table contains:

| Column         | Description                               |
| -------------- | ----------------------------------------- |
| `id`           | URL identifier                            |
| `user_id`      | Owner of the URL; nullable for guest URLs |
| `original_url` | Original destination URL                  |
| `short_code`   | Unique shortened URL code                 |
| `click_count`  | Number of successful redirects            |
| `created_at`   | Creation timestamp                        |
| `updated_at`   | Last update timestamp                     |

The relationship between users and URLs is:

```text
User
 └── hasMany Url

Url
 └── belongsTo User
```

Guest URLs use:

```text
user_id = NULL
```

This allows the application to distinguish guest URLs from authenticated user URLs without requiring a separate guest URL table.

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

#

---

# Assumptions

* Each short code must be unique.
* Automatically generated short codes are five characters long.
* Custom short codes must be alphanumeric and between 3 and 20 characters.
* A normal URL belongs to the user who created it.
* Guest URLs have no associated user.
* Users cannot access or delete URLs owned by other users.
* Click count increases when a public short URL is successfully accessed.
* Guest URLs expire after 5 successful visits.
* Guest URLs cannot use custom short codes.
* Guest URLs are not included in authenticated users' URL lists.
* Password reset links are generated using Laravel's password reset functionality.
* The frontend and backend use environment variables for their deployment-specific URLs.

---


# Project Purpose

TinyLink was built as a full-stack portfolio project to demonstrate practical experience with:

* REST API development
* Laravel
* React
* Authentication
* Database relationships
* Authorization
* API integration
* URL shortening
* Pagination
* CRUD operations
* Email-based password recovery
* Frontend routing
* Environment-based configuration
* Production deployment
* Working with a MySQL database
* Deploying a frontend and backend application
