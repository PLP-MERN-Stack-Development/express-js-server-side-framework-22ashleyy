🛍️ **Product API**

A simple **Express.js + MongoDB API** for managing products.  
Includes **CRUD routes**, **middleware** (logging, authentication, validation), and **error handling**.

---

## 🚀 How to Run the Server

**1️⃣ Install dependencies**
```bash
npm install
```

**2️⃣ Create a `.env` file** in your project root  
```
MONGO_URI=mongodb+srv://<your-connection-string>
API_KEY=yourSecretKey
PORT=3000
```

**3️⃣ Start the server**
```bash
npm run dev
```

Server will run on:  
👉 [http://localhost:3000](http://localhost:3000)

---

## 🧠 Middleware Used

- **Request Logging:** Logs every request (method, URL, and timestamp)  
- **Authentication:** Uses an `x-api-key` header to restrict access to protected routes  
- **Validation:** Checks that all required product fields (`name`, `price`, `category`) exist before saving  
- **Error Handling:** Returns consistent JSON error messages for invalid or failed requests  

---

## 📦 API Endpoints

### ➤ `GET /`
**Returns a welcome message.**  
**Response:**
```json
"Welcome to the Product API! Go to /api/products to see all products."
```

---

### ➤ `GET /api/products`
**Get all products.**  

### ➤ `GET /api/products/:id`
**Get a single product by its ID.**  

### ➤ `POST /api/products`
**Create a new product.**

### ➤ `PUT /api/products/:id`
**Update an existing product by ID.**

### ➤ `DELETE /api/products/:id`
**Delete a product by its ID.**  


## ⚠️ Error Responses / Status Codes

### 400 – Validation Error
Occurs when required fields (`name`, `price`, `category`) are missing or invalid.

### 404 – Not Found
Occurs when a product with the specified ID does not exist.

### 500 – Internal Server Error
Occurs when an unexpected error happens on the server (e.g., database connection issues).