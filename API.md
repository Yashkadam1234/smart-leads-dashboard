# Smart Leads Dashboard API Documentation

Base URL:

```txt
http://localhost:5000/api
```

---

# Authentication

## POST `/auth/register`

### Auth Required
No

### Request Body

| Field | Type | Required |
|---|---|---|
| name | string | ✅ |
| email | string | ✅ |
| password | string | ✅ |

### Example Request

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Success Response

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "jwt_token",
    "user": {
      "_id": "123",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "sales"
    }
  }
}
```

---

## POST `/auth/login`

### Auth Required
No

### Request Body

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "jwt_token",
    "user": {
      "_id": "123",
      "role": "sales"
    }
  }
}
```

---

## GET `/auth/me`

### Auth Required
Yes

### Headers

```txt
Authorization: Bearer <token>
```

### Response

```json
{
  "success": true,
  "data": {
    "_id": "123",
    "name": "John"
  }
}
```

---

# Leads

## GET `/leads`

### Auth Required
Yes

### Query Parameters

| Param | Type |
|---|---|
| page | number |
| limit | number |
| search | string |
| status | string |
| source | string |
| sort | latest \| oldest |

### Example Request

```txt
/api/leads?page=1&limit=10&status=qualified
```

### Response

```json
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 24,
    "totalPages": 3
  }
}
```

---

## POST `/leads`

### Auth Required
Yes

### Request Body

```json
{
  "name": "Rahul",
  "email": "rahul@gmail.com",
  "status": "new",
  "source": "website"
}
```

### Response

```json
{
  "success": true,
  "message": "Lead created successfully"
}
```

---

## GET `/leads/:id`

### Auth Required
Yes

### Response

```json
{
  "success": true,
  "data": {
    "_id": "123",
    "name": "Rahul"
  }
}
```

---

## PATCH `/leads/:id`

### Auth Required
Yes

### Request Body

```json
{
  "status": "qualified"
}
```

### Response

```json
{
  "success": true,
  "message": "Lead updated successfully"
}
```

---

## DELETE `/leads/:id`

### Auth Required
Yes

### Role Required
Admin

### Response

```json
{
  "success": true,
  "message": "Lead deleted successfully"
}
```

---

## GET `/leads/export`

### Auth Required
Yes

### Role Required
Admin

### Response

CSV File Download

---

# Error Responses

## Unauthorized

```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

## Validation Error

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": []
}
```

## Not Found

```json
{
  "success": false,
  "message": "Resource not found"
}
```