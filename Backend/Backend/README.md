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

## 📌 User Profile Endpoint

## 📥 Request  

### **🔗 HTTP Method**  
`GET`  

### **📄 Request URL**  
`/users/profile`  

### **📝 Description**  
This endpoint is used to retrieve the authenticated user's profile information.

### **📄 Request Headers**  
```http
Authorization: Bearer token (required)
```

### **📌 Example Request**  

```http
GET /users/profile
Authorization: Bearer jwt-token
```

### ✅ **Success Response**  
- **Status Code:** `200 OK`  
- **Response Body:**  

```json
{
  "_id": "user-id",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
}
```

### ❌ **Authentication Errors**  
- **Status Code:** `401 Unauthorized`  
- **Response Body:**  

```json
{
  "message": "Authentication failed"
}
```

---

## 📌 User Logout Endpoint

## 📥 Request  

### **🔗 HTTP Method**  
`GET`  

### **📄 Request URL**  
`/users/logout`  

### **📝 Description**  
This endpoint is used to log out the authenticated user. It clears the authentication token.

### **📄 Request Headers**  
```http
Authorization: Bearer token (required)
```

### ✅ **Success Response**  
- **Status Code:** `200 OK`  
- **Response Body:**  

```json
{
  "message": "Logged out successfully"
}
```
### ❌ **Authentication Errors**  
- **Status Code**: 401 Unauthorized
- **Body**:
  ```json
  {
    "message": "Authentication failed"
  }
  ```

## 🔍 **Notes**
- Ensure that the request includes a valid JWT token.
---


## 📌 Captain Registration Endpoint  

### **🔗 Endpoint:**  
`POST /captains/register`  

### **📝 Description**  
This endpoint allows captains to register by providing their full name, email, password, and vehicle details.  

---

## 📅 Request  

### **🔗 HTTP Method**  
`POST`  

### **🔗 Request URL**  
`/captains/register`  

### **🔗 Request Headers**  
```http
Content-Type: application/json
```

### **🔗 Request Body (JSON)**  
The request body must be a JSON object containing the following fields:  

| Field        | Type   | Description                                      | Required |
|-------------|--------|--------------------------------------------------|----------|
| `fullname`  | Object | Contains `firstname` and `lastname` fields.     | ✅ Yes  |
| `firstname` | String | Must be at least 3 characters long.             | ✅ Yes  |
| `lastname`  | String | Must be at least 3 characters long.             | ✅ Yes  |
| `email`     | String | Must be a valid and unique email address.       | ✅ Yes  |
| `password`  | String | Must be at least 6 characters long.             | ✅ Yes  |
| `vehicle`   | Object | Contains vehicle details.                        | ✅ Yes  |
| `color`     | String | Must be at least 3 characters long.             | ✅ Yes  |
| `plate`     | String | Must be at least 3 characters long.             | ✅ Yes  |
| `capacity`  | Number | Must be at least 1 passenger.                   | ✅ Yes  |
| `vehicleType` | String | Must be one of 'car', 'motorcycle', or 'auto'. | ✅ Yes  |

### **📌 Example Request**  

```http
POST /captains/register HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

---

## 👤 Responses  

### ✅ **Success Response**  
If the registration is successful, a JWT token and captain details are returned.  

- **Status Code:** `201 Created`  
- **Response Body:**  

```json
{
  "token": "jwt-token",
  "captain": {
    "_id": "captain-id",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehicle": {
      "color": "red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
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
      "msg": "Please enter a valid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Firstname must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    },
    {
      "msg": "Color must be at least 3 characters long",
      "param": "vehicle.color",
      "location": "body"
    },
    {
      "msg": "Plate must be at least 3 characters long",
      "param": "vehicle.plate",
      "location": "body"
    },
    {
      "msg": "Capacity must be at least 1 passenger",
      "param": "vehicle.capacity",
      "location": "body"
    },
    {
      "msg": "Invalid vehicle type",
      "param": "vehicle.vehicleType",
      "location": "body"
    }
  ]
}
```

---

## 🔍 **Notes**
- Ensure that the email is unique.
- Passwords are hashed before being stored in the database.

---

## 📌 Captain Login Endpoint

## 📅 Request  

### **🔗 HTTP Method**  
`POST`  

### **🔗 Request URL**  
`/captains/login`  

### **📝 Description**  
This endpoint is used to authenticate a captain. It requires the captain's email and password.

---

## 📥 Request  

### **📄 Request Body (JSON)**  
The request body must be a JSON object containing the following fields:

| Field       | Type   | Description                           | Required |
|------------|--------|---------------------------------------|----------|
| `email`    | String | Must be a valid email address.       | ✅ Yes  |
| `password` | String | Must be at least 6 characters long.  | ✅ Yes  |

### **📌 Example Request**  

```json
{
  "email": "jane.doe@example.com",
  "password": "password123"
}
```

---

## 📤 Responses  

### ✅ **Success Response**  
- **Status Code:** `200 OK`
- **Response Body:**  

```json
{
  "token": "jwt-token",
  "captain": {
    "_id": "captain-id",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehicle": {
      "color": "red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

---

### ❌ **Validation Errors**  
- **Status Code:** `400 Bad Request`
- **Response Body:**  

```json
{
  "errors": [
    {
      "msg": "Please enter a valid email",
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

## 📌 Captain Profile Endpoint

## 📅 Request  

### **🔗 HTTP Method**  
`GET`  

### **🔗 Request URL**  
`/captains/profile`  

### **📄 Request Headers**  
```http
Authorization: Bearer token (required)
```

### ✅ **Success Response**  
- **Status Code:** `200 OK`
- **Response Body:**  

```json
{
  "_id": "captain-id",
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane.doe@example.com",
  "vehicle": {
    "color": "red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### ❌ **Authentication Errors**
- **Status Code**: 401 Unauthorized
- **Body**:
  ```json
  {
    "message": "Authentication failed"
  }
  ```

## 🔍 **Notes**
- Ensure that the request includes a valid JWT token.

---

## 📌 **Captain Logout Endpoint**

## 📅 Request  

### **🔗 HTTP Method**  
`GET`  

### **🔗 Request URL**  
`/captains/logout`  

### **✅ Success Response**  
- **Status Code:** `200 OK`
- **Response Body:**  

```json
{
  "message": "Logged out successfully"
}
```


### ❌ **Authentication Errors** 
- **Status Code**: 401 Unauthorized
- **Body**:
  ```json
  {
    "message": "Authentication failed"
  }
  ```

## 🔍 **Notes**
- Ensure that the request includes a valid JWT token.

## 📌 Maps Endpoints

### 1. Get Coordinates

**Endpoint:** `GET /maps/get-coordinates`  
**Description:** Returns latitude and longitude for a given address string.

#### Request

- **Headers:**
  ```
  Authorization: Bearer <token>
  ```
- **Query Parameters:**
  | Name    | Type   | Required | Description                  |
  |---------|--------|----------|------------------------------|
  | address | string |   Yes    | Address to geocode (min 3 chars) |

**Example:**
```
GET /maps/get-coordinates?address=New+York
Authorization: Bearer <token>
```

#### Responses

- **200 OK**
  ```json
  {
    "ltd": 40.7127753,
    "lng": -74.0059728
  }
  ```
- **400 Bad Request**
  ```json
  { "errors": [ { "msg": "...", "param": "address", ... } ] }
  ```
- **404 Not Found**
  ```json
  { "message": "Coordinates not found" }
  ```
- **401 Unauthorized**
  ```json
  { "message": "Unauthorized" }
  ```

---

### 2. Get Distance and Time

**Endpoint:** `GET /maps/get-distance-time`  
**Description:** Returns distance and estimated travel time between two locations.

#### Request

- **Headers:**
  ```
  Authorization: Bearer <token>
  ```
- **Query Parameters:**
  | Name        | Type   | Required | Description                        |
  |-------------|--------|----------|------------------------------------|
  | origin      | string |   Yes    | Origin address (min 3 chars)       |
  | destination | string |   Yes    | Destination address (min 3 chars)  |

**Example:**
```
GET /maps/get-distance-time?origin=Delhi&destination=Mumbai
Authorization: Bearer <token>
```

#### Responses

- **200 OK**
  ```json
  {
    "distance": { "text": "1,423 km", "value": 1423000 },
    "duration": { "text": "1 day 1 hour", "value": 90000 },
    "status": "OK"
  }
  ```
- **400 Bad Request**
  ```json
  { "errors": [ { "msg": "...", "param": "...", ... } ] }
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Internal server error" }
  ```
- **401 Unauthorized**
  ```json
  { "message": "Unauthorized" }
  ```

---

### 3. Get Autocomplete Suggestions

**Endpoint:** `GET /maps/get-suggestions`  
**Description:** Returns address autocomplete suggestions for a given input string.

#### Request

- **Headers:**
  ```
  Authorization: Bearer <token>
  ```
- **Query Parameters:**
  | Name  | Type   | Required | Description                      |
  |-------|--------|----------|----------------------------------|
  | input | string |   Yes    | Partial address (min 3 chars)    |

**Example:**
```
GET /maps/get-suggestions?input=New
Authorization: Bearer <token>
```

#### Responses

- **200 OK**
  ```json
  [
    "New York, NY, USA",
    "Newark, NJ, USA",
    "New Delhi, Delhi, India"
  ]
  ```
- **400 Bad Request**
  ```json
  { "errors": [ { "msg": "...", "param": "input", ... } ] }
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Internal server error" }
  ```
- **401 Unauthorized**
  ```json
  { "message": "Unauthorized" }
  ```

---

**Note:** All `/maps` endpoints require a valid JWT token in the `Authorization` header.

## 📌 Maps Endpoints

### 1. Get Coordinates

**Endpoint:** `GET /maps/get-coordinates`  
**Description:** Returns latitude and longitude for a given address string.

#### Request

- **Headers:**
  ```
  Authorization: Bearer <token>
  ```
- **Query Parameters:**
  | Name    | Type   | Required | Description                  |
  |---------|--------|----------|------------------------------|
  | address | string |   Yes    | Address to geocode (min 3 chars) |

**Example:**
```
GET /maps/get-coordinates?address=New+York
Authorization: Bearer <token>
```

#### Responses

- **200 OK**
  ```json
  {
    "ltd": 40.7127753,
    "lng": -74.0059728
  }
  ```
- **400 Bad Request**
  ```json
  { "errors": [ { "msg": "...", "param": "address", ... } ] }
  ```
- **404 Not Found**
  ```json
  { "message": "Coordinates not found" }
  ```
- **401 Unauthorized**
  ```json
  { "message": "Unauthorized" }
  ```

---

### 2. Get Distance and Time

**Endpoint:** `GET /maps/get-distance-time`  
**Description:** Returns distance and estimated travel time between two locations.

#### Request

- **Headers:**
  ```
  Authorization: Bearer <token>
  ```
- **Query Parameters:**
  | Name        | Type   | Required | Description                        |
  |-------------|--------|----------|------------------------------------|
  | origin      | string |   Yes    | Origin address (min 3 chars)       |
  | destination | string |   Yes    | Destination address (min 3 chars)  |

**Example:**
```
GET /maps/get-distance-time?origin=Delhi&destination=Mumbai
Authorization: Bearer <token>
```

#### Responses

- **200 OK**
  ```json
  {
    "distance": { "text": "1,423 km", "value": 1423000 },
    "duration": { "text": "1 day 1 hour", "value": 90000 },
    "status": "OK"
  }
  ```
- **400 Bad Request**
  ```json
  { "errors": [ { "msg": "...", "param": "...", ... } ] }
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Internal server error" }
  ```
- **401 Unauthorized**
  ```json
  { "message": "Unauthorized" }
  ```

---

### 3. Get Autocomplete Suggestions

**Endpoint:** `GET /maps/get-suggestions`  
**Description:** Returns address autocomplete suggestions for a given input string.

#### Request

- **Headers:**
  ```
  Authorization: Bearer <token>
  ```
- **Query Parameters:**
  | Name  | Type   | Required | Description                      |
  |-------|--------|----------|----------------------------------|
  | input | string |   Yes    | Partial address (min 3 chars)    |

**Example:**
```
GET /maps/get-suggestions?input=New
Authorization: Bearer <token>
```

#### Responses

- **200 OK**
  ```json
  [
    "New York, NY, USA",
    "Newark, NJ, USA",
    "New Delhi, Delhi, India"
  ]
  ```
- **400 Bad Request**
  ```json
  { "errors": [ { "msg": "...", "param": "input", ... } ] }
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Internal server error" }
  ```
- **401 Unauthorized**
  ```json
  { "message": "Unauthorized" }
  ```

---

**Note:** All `/maps` endpoints require a valid JWT token in the `Authorization` header.

## 📌 Maps Endpoints

### 1. Get Coordinates

**Endpoint:** `GET /maps/get-coordinates`  
**Description:** Returns latitude and longitude for a given address string.

#### Request

- **Headers:**
  ```
  Authorization: Bearer <token>
  ```
- **Query Parameters:**
  | Name    | Type   | Required | Description                  |
  |---------|--------|----------|------------------------------|
  | address | string |   Yes    | Address to geocode (min 3 chars) |

**Example:**
```
GET /maps/get-coordinates?address=New+York
Authorization: Bearer <token>
```

#### Responses

- **200 OK**
  ```json
  {
    "ltd": 40.7127753,
    "lng": -74.0059728
  }
  ```
- **400 Bad Request**
  ```json
  { "errors": [ { "msg": "...", "param": "address", ... } ] }
  ```
- **404 Not Found**
  ```json
  { "message": "Coordinates not found" }
  ```
- **401 Unauthorized**
  ```json
  { "message": "Unauthorized" }
  ```

---

### 2. Get Distance and Time

**Endpoint:** `GET /maps/get-distance-time`  
**Description:** Returns distance and estimated travel time between two locations.

#### Request

- **Headers:**
  ```
  Authorization: Bearer <token>
  ```
- **Query Parameters:**
  | Name        | Type   | Required | Description                        |
  |-------------|--------|----------|------------------------------------|
  | origin      | string |   Yes    | Origin address (min 3 chars)       |
  | destination | string |   Yes    | Destination address (min 3 chars)  |

**Example:**
```
GET /maps/get-distance-time?origin=Delhi&destination=Mumbai
Authorization: Bearer <token>
```

#### Responses

- **200 OK**
  ```json
  {
    "distance": { "text": "1,423 km", "value": 1423000 },
    "duration": { "text": "1 day 1 hour", "value": 90000 },
    "status": "OK"
  }
  ```
- **400 Bad Request**
  ```json
  { "errors": [ { "msg": "...", "param": "...", ... } ] }
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Internal server error" }
  ```
- **401 Unauthorized**
  ```json
  { "message": "Unauthorized" }
  ```

---

### 3. Get Autocomplete Suggestions

**Endpoint:** `GET /maps/get-suggestions`  
**Description:** Returns address autocomplete suggestions for a given input string.

#### Request

- **Headers:**
  ```
  Authorization: Bearer <token>
  ```
- **Query Parameters:**
  | Name  | Type   | Required | Description                      |
  |-------|--------|----------|----------------------------------|
  | input | string |   Yes    | Partial address (min 3 chars)    |

**Example:**
```
GET /maps/get-suggestions?input=New
Authorization: Bearer <token>
```

#### Responses

- **200 OK**
  ```json
  [
    "New York, NY, USA",
    "Newark, NJ, USA",
    "New Delhi, Delhi, India"
  ]
  ```
- **400 Bad Request**
  ```json
  { "errors": [ { "msg": "...", "param": "input", ... } ] }
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Internal server error" }
  ```
- **401 Unauthorized**
  ```json
  { "message": "Unauthorized" }
  ```

---

**Note:** All `/maps` endpoints require a valid JWT token in the `Authorization` header.

## 📌 Maps Endpoints

### 1. Get Coordinates

**Endpoint:** `GET /maps/get-coordinates`  
**Description:** Returns latitude and longitude for a given address string.

#### Request

- **Headers:**
  ```
  Authorization: Bearer <token>
  ```
- **Query Parameters:**
  | Name    | Type   | Required | Description                  |
  |---------|--------|----------|------------------------------|
  | address | string |   Yes    | Address to geocode (min 3 chars) |

**Example:**
```
GET /maps/get-coordinates?address=New+York
Authorization: Bearer <token>
```

#### Responses

- **200 OK**
  ```json
  {
    "ltd": 40.7127753,
    "lng": -74.0059728
  }
  ```
- **400 Bad Request**
  ```json
  { "errors": [ { "msg": "...", "param": "address", ... } ] }
  ```
- **404 Not Found**
  ```json
  { "message": "Coordinates not found" }
  ```
- **401 Unauthorized**
  ```json
  { "message": "Unauthorized" }
  ```

---

### 2. Get Distance and Time

**Endpoint:** `GET /maps/get-distance-time`  
**Description:** Returns distance and estimated travel time between two locations.

#### Request

- **Headers:**
  ```
  Authorization: Bearer <token>
  ```
- **Query Parameters:**
  | Name        | Type   | Required | Description                        |
  |-------------|--------|----------|------------------------------------|
  | origin      | string |   Yes    | Origin address (min 3 chars)       |
  | destination | string |   Yes    | Destination address (min 3 chars)  |

**Example:**
```
GET /maps/get-distance-time?origin=Delhi&destination=Mumbai
Authorization: Bearer <token>
```

#### Responses

- **200 OK**
  ```json
  {
    "distance": { "text": "1,423 km", "value": 1423000 },
    "duration": { "text": "1 day 1 hour", "value": 90000 },
    "status": "OK"
  }
  ```
- **400 Bad Request**
  ```json
  { "errors": [ { "msg": "...", "param": "...", ... } ] }
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Internal server error" }
  ```
- **401 Unauthorized**
  ```json
  { "message": "Unauthorized" }
  ```

---

### 3. Get Autocomplete Suggestions

**Endpoint:** `GET /maps/get-suggestions`  
**Description:** Returns address autocomplete suggestions for a given input string.

#### Request

- **Headers:**
  ```
  Authorization: Bearer <token>
  ```
- **Query Parameters:**
  | Name  | Type   | Required | Description                      |
  |-------|--------|----------|----------------------------------|
  | input | string |   Yes    | Partial address (min 3 chars)    |

**Example:**
```
GET /maps/get-suggestions?input=New
Authorization: Bearer <token>
```

#### Responses

- **200 OK**
  ```json
  [
    "New York, NY, USA",
    "Newark, NJ, USA",
    "New Delhi, Delhi, India"
  ]
  ```
- **400 Bad Request**
  ```json
  { "errors": [ { "msg": "...", "param": "input", ... } ] }
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Internal server error" }
  ```
- **401 Unauthorized**
  ```json
  { "message": "Unauthorized" }
  ```

---

**Note:** All `/maps` endpoints require a valid JWT token in the `Authorization` header.

## 📌 Maps Endpoints

### 1. Get Coordinates

**Endpoint:** `GET /maps/get-coordinates`  
**Description:** Returns latitude and longitude for a given address string.

#### Request

- **Headers:**
  ```
  Authorization: Bearer <token>
  ```
- **Query Parameters:**
  | Name    | Type   | Required | Description                  |
  |---------|--------|----------|------------------------------|
  | address | string |   Yes    | Address to geocode (min 3 chars) |

**Example:**
```
GET /maps/get-coordinates?address=New+York
Authorization: Bearer <token>
```

#### Responses

- **200 OK**
  ```json
  {
    "ltd": 40.7127753,
    "lng": -74.0059728
  }
  ```
- **400 Bad Request**
  ```json
  { "errors": [ { "msg": "...", "param": "address", ... } ] }
  ```
- **404 Not Found**
  ```json
  { "message": "Coordinates not found" }
  ```
- **401 Unauthorized**
  ```json
  { "message": "Unauthorized" }
  ```

---

### 2. Get Distance and Time

**Endpoint:** `GET /maps/get-distance-time`  
**Description:** Returns distance and estimated travel time between two locations.

#### Request

- **Headers:**
  ```
  Authorization: Bearer <token>
  ```
- **Query Parameters:**
  | Name        | Type   | Required | Description                        |
  |-------------|--------|----------|------------------------------------|
  | origin      | string |   Yes    | Origin address (min 3 chars)       |
  | destination | string |   Yes    | Destination address (min 3 chars)  |

**Example:**
```
GET /maps/get-distance-time?origin=Delhi&destination=Mumbai
Authorization: Bearer <token>
```

#### Responses

- **200 OK**
  ```json
  {
    "distance": { "text": "1,423 km", "value": 1423000 },
    "duration": { "text": "1 day 1 hour", "value": 90000 },
    "status": "OK"
  }
  ```
- **400 Bad Request**
  ```json
  { "errors": [ { "msg": "...", "param": "...", ... } ] }
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Internal server error" }
  ```
- **401 Unauthorized**
  ```json
  { "message": "Unauthorized" }
  ```

---

### 3. Get Autocomplete Suggestions

**Endpoint:** `GET /maps/get-suggestions`  
**Description:** Returns address autocomplete suggestions for a given input string.

#### Request

- **Headers:**
  ```
  Authorization: Bearer <token>
  ```
- **Query Parameters:**
  | Name  | Type   | Required | Description                      |
  |-------|--------|----------|----------------------------------|
  | input | string |   Yes    | Partial address (min 3 chars)    |

**Example:**
```
GET /maps/get-suggestions?input=New
Authorization: Bearer <token>
```

#### Responses

- **200 OK**
  ```json
  [
    "New York, NY, USA",
    "Newark, NJ, USA",
    "New Delhi, Delhi, India"
  ]
  ```
- **400 Bad Request**
  ```json
  { "errors": [ { "msg": "...", "param": "input", ... } ] }
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Internal server error" }
  ```
- **401 Unauthorized**
  ```json
  { "message": "Unauthorized" }
  ```

---

**Note:** All `/maps` endpoints require a valid JWT token in the `Authorization` header.
## 📌 Maps Endpoints

### 1. Get Coordinates

**Endpoint:** `GET /maps/get-coordinates`  
**Description:** Returns latitude and longitude for a given address string.

#### Request

- **Headers:**
  ```
  Authorization: Bearer <token>
  ```
- **Query Parameters:**
  | Name    | Type   | Required | Description                  |
  |---------|--------|----------|------------------------------|
  | address | string |   Yes    | Address to geocode (min 3 chars) |

**Example:**
```
GET /maps/get-coordinates?address=New+York
Authorization: Bearer <token>
```

#### Responses

- **200 OK**
  ```json
  {
    "ltd": 40.7127753,
    "lng": -74.0059728
  }
  ```
- **400 Bad Request**
  ```json
  { "errors": [ { "msg": "...", "param": "address", ... } ] }
  ```
- **404 Not Found**
  ```json
  { "message": "Coordinates not found" }
  ```
- **401 Unauthorized**
  ```json
  { "message": "Unauthorized" }
  ```

---

### 2. Get Distance and Time

**Endpoint:** `GET /maps/get-distance-time`  
**Description:** Returns distance and estimated travel time between two locations.

#### Request

- **Headers:**
  ```
  Authorization: Bearer <token>
  ```
- **Query Parameters:**
  | Name        | Type   | Required | Description                        |
  |-------------|--------|----------|------------------------------------|
  | origin      | string |   Yes    | Origin address (min 3 chars)       |
  | destination | string |   Yes    | Destination address (min 3 chars)  |

**Example:**
```
GET /maps/get-distance-time?origin=Delhi&destination=Mumbai
Authorization: Bearer <token>
```

#### Responses

- **200 OK**
  ```json
  {
    "distance": { "text": "1,423 km", "value": 1423000 },
    "duration": { "text": "1 day 1 hour", "value": 90000 },
    "status": "OK"
  }
  ```
- **400 Bad Request**
  ```json
  { "errors": [ { "msg": "...", "param": "...", ... } ] }
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Internal server error" }
  ```
- **401 Unauthorized**
  ```json
  { "message": "Unauthorized" }
  ```

---

### 3. Get Autocomplete Suggestions

**Endpoint:** `GET /maps/get-suggestions`  
**Description:** Returns address autocomplete suggestions for a given input string.

#### Request

- **Headers:**
  ```
  Authorization: Bearer <token>
  ```
- **Query Parameters:**
  | Name  | Type   | Required | Description                      |
  |-------|--------|----------|----------------------------------|
  | input | string |   Yes    | Partial address (min 3 chars)    |

**Example:**
```
GET /maps/get-suggestions?input=New
Authorization: Bearer <token>
```

#### Responses

- **200 OK**
  ```json
  [
    "New York, NY, USA",
    "Newark, NJ, USA",
    "New Delhi, Delhi, India"
  ]
  ```
- **400 Bad Request**
  ```json
  { "errors": [ { "msg": "...", "param": "input", ... } ] }
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Internal server error" }
  ```
- **401 Unauthorized**
  ```json
  { "message": "Unauthorized" }
  ```

---

**Note:** All `/maps` endpoints require a valid JWT token in the `Authorization` header.

## 📌 Maps Endpoints

### 1. Get Coordinates

**Endpoint:** `GET /maps/get-coordinates`  
**Description:** Returns latitude and longitude for a given address string.

#### Request

- **Headers:**
  ```
  Authorization: Bearer <token>
  ```
- **Query Parameters:**
  | Name    | Type   | Required | Description                  |
  |---------|--------|----------|------------------------------|
  | address | string |   Yes    | Address to geocode (min 3 chars) |

**Example:**
```
GET /maps/get-coordinates?address=New+York
Authorization: Bearer <token>
```

#### Responses

- **200 OK**
  ```json
  {
    "ltd": 40.7127753,
    "lng": -74.0059728
  }
  ```
- **400 Bad Request**
  ```json
  { "errors": [ { "msg": "...", "param": "address", ... } ] }
  ```
- **404 Not Found**
  ```json
  { "message": "Coordinates not found" }
  ```
- **401 Unauthorized**
  ```json
  { "message": "Unauthorized" }
  ```

---

### 2. Get Distance and Time

**Endpoint:** `GET /maps/get-distance-time`  
**Description:** Returns distance and estimated travel time between two locations.

#### Request

- **Headers:**
  ```
  Authorization: Bearer <token>
  ```
- **Query Parameters:**
  | Name        | Type   | Required | Description                        |
  |-------------|--------|----------|------------------------------------|
  | origin      | string |   Yes    | Origin address (min 3 chars)       |
  | destination | string |   Yes    | Destination address (min 3 chars)  |

**Example:**
```
GET /maps/get-distance-time?origin=Delhi&destination=Mumbai
Authorization: Bearer <token>
```

#### Responses

- **200 OK**
  ```json
  {
    "distance": { "text": "1,423 km", "value": 1423000 },
    "duration": { "text": "1 day 1 hour", "value": 90000 },
    "status": "OK"
  }
  ```
- **400 Bad Request**
  ```json
  { "errors": [ { "msg": "...", "param": "...", ... } ] }
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Internal server error" }
  ```
- **401 Unauthorized**
  ```json
  { "message": "Unauthorized" }
  ```

---

### 3. Get Autocomplete Suggestions

**Endpoint:** `GET /maps/get-suggestions`  
**Description:** Returns address autocomplete suggestions for a given input string.

#### Request

- **Headers:**
  ```
  Authorization: Bearer <token>
  ```
- **Query Parameters:**
  | Name  | Type   | Required | Description                      |
  |-------|--------|----------|----------------------------------|
  | input | string |   Yes    | Partial address (min 3 chars)    |

**Example:**
```
GET /maps/get-suggestions?input=New
Authorization: Bearer <token>
```

#### Responses

- **200 OK**
  ```json
  [
    "New York, NY, USA",
    "Newark, NJ, USA",
    "New Delhi, Delhi, India"
  ]
  ```
- **400 Bad Request**
  ```json
  { "errors": [ { "msg": "...", "param": "input", ... } ] }
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Internal server error" }
  ```
- **401 Unauthorized**
  ```json
  { "message": "Unauthorized" }
  ```

---

**Note:** All `/maps` endpoints require a valid JWT token in the `Authorization` header.
## 📌 Maps Endpoints

### 1. Get Coordinates

**Endpoint:** `GET /maps/get-coordinates`  
**Description:** Returns latitude and longitude for a given address string.

#### Request

- **Headers:**
  ```
  Authorization: Bearer <token>
  ```
- **Query Parameters:**
  | Name    | Type   | Required | Description                  |
  |---------|--------|----------|------------------------------|
  | address | string |   Yes    | Address to geocode (min 3 chars) |

**Example:**
```
GET /maps/get-coordinates?address=New+York
Authorization: Bearer <token>
```

#### Responses

- **200 OK**
  ```json
  {
    "ltd": 40.7127753,
    "lng": -74.0059728
  }
  ```
- **400 Bad Request**
  ```json
  { "errors": [ { "msg": "...", "param": "address", ... } ] }
  ```
- **404 Not Found**
  ```json
  { "message": "Coordinates not found" }
  ```
- **401 Unauthorized**
  ```json
  { "message": "Unauthorized" }
  ```

---

### 2. Get Distance and Time

**Endpoint:** `GET /maps/get-distance-time`  
**Description:** Returns distance and estimated travel time between two locations.

#### Request

- **Headers:**
  ```
  Authorization: Bearer <token>
  ```
- **Query Parameters:**
  | Name        | Type   | Required | Description                        |
  |-------------|--------|----------|------------------------------------|
  | origin      | string |   Yes    | Origin address (min 3 chars)       |
  | destination | string |   Yes    | Destination address (min 3 chars)  |

**Example:**
```
GET /maps/get-distance-time?origin=Delhi&destination=Mumbai
Authorization: Bearer <token>
```

#### Responses

- **200 OK**
  ```json
  {
    "distance": { "text": "1,423 km", "value": 1423000 },
    "duration": { "text": "1 day 1 hour", "value": 90000 },
    "status": "OK"
  }
  ```
- **400 Bad Request**
  ```json
  { "errors": [ { "msg": "...", "param": "...", ... } ] }
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Internal server error" }
  ```
- **401 Unauthorized**
  ```json
  { "message": "Unauthorized" }
  ```

---

### 3. Get Autocomplete Suggestions

**Endpoint:** `GET /maps/get-suggestions`  
**Description:** Returns address autocomplete suggestions for a given input string.

#### Request

- **Headers:**
  ```
  Authorization: Bearer <token>
  ```
- **Query Parameters:**
  | Name  | Type   | Required | Description                      |
  |-------|--------|----------|----------------------------------|
  | input | string |   Yes    | Partial address (min 3 chars)    |

**Example:**
```
GET /maps/get-suggestions?input=New
Authorization: Bearer <token>
```

#### Responses

- **200 OK**
  ```json
  [
    "New York, NY, USA",
    "Newark, NJ, USA",
    "New Delhi, Delhi, India"
  ]
  ```
- **400 Bad Request**
  ```json
  { "errors": [ { "msg": "...", "param": "input", ... } ] }
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Internal server error" }
  ```
- **401 Unauthorized**
  ```json
  { "message": "Unauthorized" }
  ```

---

**Note:** All `/maps` endpoints require a valid JWT token in the `Authorization` header.

## 📌 Maps Endpoints

### 1. Get Coordinates

**Endpoint:** `GET /maps/get-coordinates`  
**Description:** Returns latitude and longitude for a given address string.

#### Request

- **Headers:**
  ```
  Authorization: Bearer <token>
  ```
- **Query Parameters:**
  | Name    | Type   | Required | Description                  |
  |---------|--------|----------|------------------------------|
  | address | string |   Yes    | Address to geocode (min 3 chars) |

**Example:**
```
GET /maps/get-coordinates?address=New+York
Authorization: Bearer <token>
```

#### Responses

- **200 OK**
  ```json
  {
    "ltd": 40.7127753,
    "lng": -74.0059728
  }
  ```
- **400 Bad Request**
  ```json
  { "errors": [ { "msg": "...", "param": "address", ... } ] }
  ```
- **404 Not Found**
  ```json
  { "message": "Coordinates not found" }
  ```
- **401 Unauthorized**
  ```json
  { "message": "Unauthorized" }
  ```

---

### 2. Get Distance and Time

**Endpoint:** `GET /maps/get-distance-time`  
**Description:** Returns distance and estimated travel time between two locations.

#### Request

- **Headers:**
  ```
  Authorization: Bearer <token>
  ```
- **Query Parameters:**
  | Name        | Type   | Required | Description                        |
  |-------------|--------|----------|------------------------------------|
  | origin      | string |   Yes    | Origin address (min 3 chars)       |
  | destination | string |   Yes    | Destination address (min 3 chars)  |

**Example:**
```
GET /maps/get-distance-time?origin=Delhi&destination=Mumbai
Authorization: Bearer <token>
```

#### Responses

- **200 OK**
  ```json
  {
    "distance": { "text": "1,423 km", "value": 1423000 },
    "duration": { "text": "1 day 1 hour", "value": 90000 },
    "status": "OK"
  }
  ```
- **400 Bad Request**
  ```json
  { "errors": [ { "msg": "...", "param": "...", ... } ] }
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Internal server error" }
  ```
- **401 Unauthorized**
  ```json
  { "message": "Unauthorized" }
  ```

---

### 3. Get Autocomplete Suggestions

**Endpoint:** `GET /maps/get-suggestions`  
**Description:** Returns address autocomplete suggestions for a given input string.

#### Request

- **Headers:**
  ```
  Authorization: Bearer <token>
  ```
- **Query Parameters:**
  | Name  | Type   | Required | Description                      |
  |-------|--------|----------|----------------------------------|
  | input | string |   Yes    | Partial address (min 3 chars)    |

**Example:**
```
GET /maps/get-suggestions?input=New
Authorization: Bearer <token>
```

#### Responses

- **200 OK**
  ```json
  [
    "New York, NY, USA",
    "Newark, NJ, USA",
    "New Delhi, Delhi, India"
  ]
  ```
- **400 Bad Request**
  ```json
  { "errors": [ { "msg": "...", "param": "input", ... } ] }
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Internal server error" }
  ```
- **401 Unauthorized**
  ```json
  { "message": "Unauthorized" }
  ```

---

**Note:** All `/maps` endpoints require a valid JWT token in the `Authorization` header.

## 📌 Maps Endpoints

### 1. Get Coordinates

**Endpoint:** `GET /maps/get-coordinates`  
**Description:** Returns latitude and longitude for a given address string.

#### Request

- **Headers:**
  ```
  Authorization: Bearer <token>
  ```
- **Query Parameters:**
  | Name    | Type   | Required | Description                  |
  |---------|--------|----------|------------------------------|
  | address | string |   Yes    | Address to geocode (min 3 chars) |

**Example:**
```
GET /maps/get-coordinates?address=New+York
Authorization: Bearer <token>
```

#### Responses

- **200 OK**
  ```json
  {
    "ltd": 40.7127753,
    "lng": -74.0059728
  }
  ```
- **400 Bad Request**
  ```json
  { "errors": [ { "msg": "...", "param": "address", ... } ] }
  ```
- **404 Not Found**
  ```json
  { "message": "Coordinates not found" }
  ```
- **401 Unauthorized**
  ```json
  { "message": "Unauthorized" }
  ```

---

### 2. Get Distance and Time

**Endpoint:** `GET /maps/get-distance-time`  
**Description:** Returns distance and estimated travel time between two locations.

#### Request

- **Headers:**
  ```
  Authorization: Bearer <token>
  ```
- **Query Parameters:**
  | Name        | Type   | Required | Description                        |
  |-------------|--------|----------|------------------------------------|
  | origin      | string |   Yes    | Origin address (min 3 chars)       |
  | destination | string |   Yes    | Destination address (min 3 chars)  |

**Example:**
```
GET /maps/get-distance-time?origin=Delhi&destination=Mumbai
Authorization: Bearer <token>
```

#### Responses

- **200 OK**
  ```json
  {
    "distance": { "text": "1,423 km", "value": 1423000 },
    "duration": { "text": "1 day 1 hour", "value": 90000 },
    "status": "OK"
  }
  ```
- **400 Bad Request**
  ```json
  { "errors": [ { "msg": "...", "param": "...", ... } ] }
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Internal server error" }
  ```
- **401 Unauthorized**
  ```json
  { "message": "Unauthorized" }
  ```

---

### 3. Get Autocomplete Suggestions

**Endpoint:** `GET /maps/get-suggestions`  
**Description:** Returns address autocomplete suggestions for a given input string.

#### Request

- **Headers:**
  ```
  Authorization: Bearer <token>
  ```
- **Query Parameters:**
  | Name  | Type   | Required | Description                      |
  |-------|--------|----------|----------------------------------|
  | input | string |   Yes    | Partial address (min 3 chars)    |

**Example:**
```
GET /maps/get-suggestions?input=New
Authorization: Bearer <token>
```

#### Responses

- **200 OK**
  ```json
  [
    "New York, NY, USA",
    "Newark, NJ, USA",
    "New Delhi, Delhi, India"
  ]
  ```
- **400 Bad Request**
  ```json
  { "errors": [ { "msg": "...", "param": "input", ... } ] }
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Internal server error" }
  ```
- **401 Unauthorized**
  ```json
  { "message": "Unauthorized" }
  ```

---

**Note:** All `/maps` endpoints require a valid JWT token in the `Authorization` header.

## 📌 Maps Endpoints

### 1. Get Coordinates

**Endpoint:** `GET /maps/get-coordinates`  
**Description:** Returns latitude and longitude for a given address string.

#### Request

- **Headers:**
  ```
  Authorization: Bearer <token>
  ```
- **Query Parameters:**
  | Name    | Type   | Required | Description                  |
  |---------|--------|----------|------------------------------|
  | address | string |   Yes    | Address to geocode (min 3 chars) |

**Example:**
```
GET /maps/get-coordinates?address=New+York
Authorization: Bearer <token>
```

#### Responses

- **200 OK**
  ```json
  {
    "ltd": 40.7127753,
    "lng": -74.0059728
  }
  ```
- **400 Bad Request**
  ```json
  { "errors": [ { "msg": "...", "param": "address", ... } ] }
  ```
- **404 Not Found**
  ```json
  { "message": "Coordinates not found" }
  ```
- **401 Unauthorized**
  ```json
  { "message": "Unauthorized" }
  ```

---

### 2. Get Distance and Time

**Endpoint:** `GET /maps/get-distance-time`  
**Description:** Returns distance and estimated travel time between two locations.

#### Request

- **Headers:**
  ```
  Authorization: Bearer <token>
  ```
- **Query Parameters:**
  | Name        | Type   | Required | Description                        |
  |-------------|--------|----------|------------------------------------|
  | origin      | string |   Yes    | Origin address (min 3 chars)       |
  | destination | string |   Yes    | Destination address (min 3 chars)  |

**Example:**
```
GET /maps/get-distance-time?origin=Delhi&destination=Mumbai
Authorization: Bearer <token>
```

#### Responses

- **200 OK**
  ```json
  {
    "distance": { "text": "1,423 km", "value": 1423000 },
    "duration": { "text": "1 day 1 hour", "value": 90000 },
    "status": "OK"
  }
  ```
- **400 Bad Request**
  ```json
  { "errors": [ { "msg": "...", "param": "...", ... } ] }
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Internal server error" }
  ```
- **401 Unauthorized**
  ```json
  { "message": "Unauthorized" }
  ```

---

### 3. Get Autocomplete Suggestions

**Endpoint:** `GET /maps/get-suggestions`  
**Description:** Returns address autocomplete suggestions for a given input string.

#### Request

- **Headers:**
  ```
  Authorization: Bearer <token>
  ```
- **Query Parameters:**
  | Name  | Type   | Required | Description                      |
  |-------|--------|----------|----------------------------------|
  | input | string |   Yes    | Partial address (min 3 chars)    |

**Example:**
```
GET /maps/get-suggestions?input=New
Authorization: Bearer <token>
```

#### Responses

- **200 OK**
  ```json
  [
    "New York, NY, USA",
    "Newark, NJ, USA",
    "New Delhi, Delhi, India"
  ]
  ```
- **400 Bad Request**
  ```json
  { "errors": [ { "msg": "...", "param": "input", ... } ] }
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Internal server error" }
  ```
- **401 Unauthorized**
  ```json
  { "message": "Unauthorized" }
  ```

---

**Note:** All `/maps` endpoints require a valid JWT token in the `Authorization` header.
## 📝 Error Handling

All endpoints return appropriate HTTP status codes and error messages for invalid input, authentication errors, and server errors. Always check the response for an `errors` array or a `message` field.

---

## 📚 See Also

- [Maps Endpoints](#maps-endpoints) for location and route-related APIs.
- [User Endpoints](#user-endpoints) for registration and authentication.

---

### Get Fare Estimate

**Endpoint:** `GET /rides/get-fare`  
**Description:** Returns fare estimates for all vehicle types (`auto`, `car`, `moto`) between a pickup and destination location. Useful for showing users the price before booking a ride.

#### Request

- **Headers:**  
  `Authorization: Bearer <token>`

- **Query Parameters:**

  | Name        | Type   | Required | Description                        |
  |-------------|--------|----------|------------------------------------|
  | pickup      | string |   Yes    | Pickup location (min 3 characters) |
  | destination | string |   Yes    | Destination location (min 3 chars) |

**Example Request:**
```
GET /rides/get-fare?pickup=Connaught+Place,+Delhi&destination=Indira+Gandhi+International+Airport,+Delhi
Authorization: Bearer <token>
```

#### Responses

- **200 OK**
  ```json
  {
    "auto": 120,
    "car": 180,
    "moto": 90
  }
  ```
  *(Values are examples; actual fares depend on distance and duration.)*

- **400 Bad Request**
  ```json
  { "errors": [ { "msg": "Invalid pickup address", ... } ] }
  ```

- **401 Unauthorized**
  ```json
  { "message": "Unauthorized" }
  ```

- **500 Internal Server Error**
  ```json
  { "message": "Error message" }
  ```

#### Notes

- All vehicle types are returned in a single response for easy comparison.
- Fares are calculated based on distance and estimated duration between the two locations.
- Requires user authentication.

---

## Ride Endpoints

### Create Ride
- **POST** `/rides/create`
- Requires: `Authorization: Bearer <token>`
- User requests a ride.

**Request Body:**
```json
{
  "pickup": "Connaught Place, Delhi",
  "destination": "Indira Gandhi International Airport, Delhi",
  "vehicleType": "car"
}
```

**Success Response:**
- `201 Created`
```json
{
  "_id": "ride-id",
  "user": "user-id",
  "pickup": "Connaught Place, Delhi",
  "destination": "Indira Gandhi International Airport, Delhi",
  "fare": 350,
  "status": "pending",
  "otp": "123456"
}
```

---

### Get Fare Estimate

- **GET** `/rides/get-fare`
- Requires: `Authorization: Bearer <token>`
- Returns fare estimates for all vehicle types.

**Query Parameters:**
- `pickup` (string, required)
- `destination` (string, required)

**Example:**
```
GET /rides/get-fare?pickup=Connaught+Place,+Delhi&destination=Indira+Gandhi+International+Airport,+Delhi
Authorization: Bearer <token>
```

**Success Response:**
```json
{
  "auto": 120,
  "car": 180,
  "moto": 90
}
```

---

### Confirm Ride

- **POST** `/rides/confirm`
- Requires: `Authorization: Bearer <captain-token>`
- Captain accepts a ride.

**Request Body:**
```json
{ "rideId": "ride-id" }
```

**Success Response:**
- `200 OK`
```json
{
  "_id": "ride-id",
  "status": "accepted",
  ...
}
```

---

### Start Ride

- **GET** `/rides/start-ride`
- Requires: `Authorization: Bearer <captain-token>`
- Captain starts the ride with OTP.

**Query Parameters:**
- `rideId` (string, required)
- `otp` (string, required)

**Success Response:**
- `200 OK`
```json
{
  "_id": "ride-id",
  "status": "ongoing",
  ...
}
```

---

### End Ride

- **POST** `/rides/end-ride`
- Requires: `Authorization: Bearer <captain-token>`

**Request Body:**
```json
{ "rideId": "ride-id" }
```

**Success Response:**
- `200 OK`
```json
{
  "_id": "ride-id",
  "status": "completed",
  ...
}
```

---

---

## Live Tracking & Socket Events

This backend uses **Socket.IO** for real-time updates (location, ride status, etc).

### Socket Events

- **join**:  
  Sent by user/captain after connecting.  
  Payload: `{ userId, userType }`

- **update-location-captain**:  
  Sent by captain to update their live location.  
  Payload: `{ userId, location: { ltd, lng } }`

- **new-ride**:  
  Sent by server to captain when a new ride is created nearby.

- **ride-confirmed**:  
  Sent by server to user when a captain accepts the ride.

- **ride-started**:  
  Sent by server to user when the ride starts.

- **ride-ended**:  
  Sent by server to user when the ride ends.

**Note:**  
- Captains must regularly send their location using `update-location-captain` for live tracking and to be discoverable for ride requests.
- Socket IDs are stored in the database for targeted real-time communication.

---

## Error Handling

All endpoints return appropriate HTTP status codes and error messages for invalid input, authentication errors, and server errors.  
Check for an `errors` array or a `message` field in the response.

---

## See Also

- [Socket.IO Docs](https://socket.io/docs/)

---

**This documentation covers all backend endpoints, ride and maps logic, and real-time tracking.