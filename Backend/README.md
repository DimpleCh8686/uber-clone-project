# Backend API Documentation  

## 📌 User Registration Endpoint  

### **🔗 Endpoint:**  
`POST /users/register`  

### **📝 Description**  
This endpoint allows users to register by providing their full name, email, and password.  

---

## 📥 Request  

### **🔗 HTTP Method**  
`POST`  

### **📄 Request URL**  
`/users/register`  

### **📄 Request Headers**  
```http
Content-Type: application/json
```

### **📄 Request Body (JSON)**  
The request body must be a JSON object containing the following fields:  

| Field         | Type   | Description                                  | Required |
|--------------|--------|----------------------------------------------|----------|
| `fullname`   | Object | Contains `firstname` and `lastname` fields. | ✅ Yes    |
| `firstname`  | String | Must be at least 3 characters long.         | ✅ Yes    |
| `lastname`   | String | Must be at least 3 characters long.         | ✅ Yes    |
| `email`      | String | Must be a valid and unique email address.   | ✅ Yes    |
| `password`   | String | Must be at least 6 characters long.         | ✅ Yes    |  

### **📌 Example Request**  

```http
POST /users/register HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

---

## 📤 Responses  

### ✅ **Success Response**  
If the registration is successful, a JWT token and user details are returned.  

- **Status Code:** `201 Created`  
- **Response Body:**  

```json
{
  "token": "jwt-token",
  "user": {
    "_id": "user-id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

---

### ❌ **Validation Errors**  
If the request contains invalid or missing data, a `400 Bad Request` error is returned.  

- **Status Code:** `400 Bad Request`  
- **Example Response:**  

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

---

## 🔍 **Notes**
- Ensure the provided email address is unique before registering the user.
- Passwords are securely **hashed** before being stored in the database.
- The generated `JWT token` should be stored and used for authentication in future requests.

## 📌 User Registration Endpoint  

### **🔗 Endpoint:**  
`POST /users/register`  

### **📝 Description**  
This endpoint allows users to register by providing their full name, email, and password.  

---

## 👥 Request  

### **🔗 HTTP Method**  
`POST`  

### **📄 Request URL**  
`/users/register`  

### **📄 Request Headers**  
```http
Content-Type: application/json
```

### **📄 Request Body (JSON)**  
The request body must be a JSON object containing the following fields:  

| Field        | Type   | Description                                  | Required |
|-------------|--------|----------------------------------------------|----------|
| `fullname`  | Object | Contains `firstname` and `lastname` fields. | ✅ Yes  |
| `firstname` | String | Must be at least 3 characters long.         | ✅ Yes  |
| `lastname`  | String | Must be at least 3 characters long.         | ✅ Yes  |
| `email`     | String | Must be a valid and unique email address.   | ✅ Yes  |
| `password`  | String | Must be at least 6 characters long.         | ✅ Yes  |  

### **📌 Example Request**  

```http
POST /users/register HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

---

## 👤 Responses  

### ✅ **Success Response**  
If the registration is successful, a JWT token and user details are returned.  

- **Status Code:** `201 Created`  
- **Response Body:**  

```json
{
  "token": "jwt-token",
  "user": {
    "_id": "user-id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

---

### ❌ **Validation Errors**  
If the request contains invalid or missing data, a `400 Bad Request` error is returned.  

- **Status Code:** `400 Bad Request`  
- **Example Response:**  

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

---

## 🔍 **Notes**
- Ensure the provided email address is unique before registering the user.
- Passwords are securely **hashed** before being stored in the database.
- The generated `JWT token` should be stored and used for authentication in future requests.

---

## 📌 User Login Endpoint  

### **🔗 HTTP Method**  
`POST`  

### **📄 Request URL**  
`/users/login`  

### **📝 Description**  
This endpoint allows users to authenticate using their email and password.  

---

## 👥 Request  

### **📄 Request Body (JSON)**  
The request body must be a JSON object containing the following fields:  

| Field       | Type   | Description                           | Required |
|------------|--------|---------------------------------------|----------|
| `email`    | String | Must be a valid email address.       | ✅ Yes  |
| `password` | String | Must be at least 6 characters long.  | ✅ Yes  |  

### **📌 Example Request**  

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

---

## 👤 Responses  

### ✅ **Success Response**  
If the authentication is successful, a JWT token and user details are returned.  

- **Status Code:** `200 OK`  
- **Response Body:**  

```json
{
  "token": "jwt-token",
  "user": {
    "_id": "user-id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

---

### ❌ **Validation Errors**  
If the request contains invalid or missing data, a `400 Bad Request` error is returned.  

- **Status Code:** `400 Bad Request`  
- **Example Response:**  

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

---

### ❌ **Authentication Errors**  
If the email or password is incorrect, a `401 Unauthorized` error is returned.  

- **Status Code:** `401 Unauthorized`  
- **Example Response:**  

```json
{
  "message": "Invalid email or password"
}
```

---

## 🔍 **Notes**
- Ensure that the email and password are correct.
- A JWT token is returned upon successful authentication.
