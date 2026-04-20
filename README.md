#🍔Food-Villa

A full-stack food ordering and delivery platform built using **React.js, Java, Spring Boot, and MySQL**.  
The system allows customers to order food online, managers to manage restaurants/menus, and delivery partners to handle deliveries with OTP verification.

---

## 🚀 Features

### 👤 Authentication & Security
- User Registration & Login
- Role-Based Access Control:
  - Customer
  - Manager
  - Delivery Partner
- Password Encryption using **BCrypt**

---

### 🍽️ Customer Module
- Browse Restaurants
- Search Restaurants
- View Food Menu
- Add to Cart
- Update Quantity
- Multi-Restaurant Cart Support
- Place Orders
- Cash on Delivery / Online Payment
- Order History
- Live Order Tracking:
  - Placed
  - Out for Delivery
  - Delivered

---

### 🏪 Manager Module
- Add Restaurant
- Manage Restaurants
- Add Food Items
- Delete Food Items
- Manage Menu Inventory

---

### 🚴 Delivery Partner Module
- Login Dashboard
- View Pending Orders
- Accept Delivery Orders
- View Address + Ordered Items
- OTP Verification at Delivery Time
- COD Handling
- Mark Order as Delivered
- Delivery Statistics

---

## 🛠️ Tech Stack

### Frontend
- React.js

### Backend
- Spring Boot
- Spring Data JPA
- Hibernate
- BCrypt Password Encoder

### Database
- MySQL

---

## 🧩 Project Architecture

```text
React Frontend
     ↓
REST APIs
     ↓
Spring Boot Backend
     ↓
MySQL Database
