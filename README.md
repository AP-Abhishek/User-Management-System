# User Management System (React + Node.js)

A web application designed to manage users based on their roles using Role-Based Access Control (RBAC).

## The Backstory
This project demonstrates the implementation of Role-Based Access Control (RBAC). The primary focus is on backend architecture, specifically authentication, dynamic routing, and middleware authorization. The UI is designed to showcase core user management and admin privilege functionality cleanly and efficiently.

## Features
* **Role-Based Access Control (RBAC):** Restrict page access and API endpoints dynamically based on user roles (`admin` vs standard roles).
* **JWT Authentication:** Secure user authentication using JSON Web Tokens (JWT) with password hashing via `bcryptjs`.
* **Admin Controls:** Admins can view all registered users, modify user roles, toggle account active/inactive status, and delete accounts.
* **Role Management:** Full CRUD support for creating, editing, and deleting system roles with cascading updates to assigned users.
* **Profile Management:** Authenticated users can view their profile, update personal information, and change passwords.
* **Protected Routing:** React Router guard (`ProtectedRoute`) preventing unauthorized navigation and redirecting non-admin users to a custom `/forbidden` page.

## Tech Stack
- Frontend
    - React + Vite
    - Typescript
    - Tailwindcss
- Backend
    - Node.js + Express
    - Typescript
    - bcryptjs - hashing
    - jsonwebtoken - sessions
- Database
    - MongoDB Atlas (Cloud)

## Visit Website & Demo Credentials
Check out the live deployed application:
* **Live Demo:** [User Management System](https://user-management-system-frontend-by-tuttu.vercel.app/)

### Test Login Credentials (Read-Only Demo Mode)
| Role | Email | Password | Allowed Actions |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@test.com` | `1000` | Full Navigation, View Users & Roles |
| **User** | `user@test.com` | `1000` | View Profile & Restricted Routes Check |

> **Note:** To prevent database tampering on the public deployment, modification requests (create, edit, delete) are prohibited for demo accounts. Full write actions can be tested locally by seeding your own database.

## How to Clone and Run Locally

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/AP-Abhishek/User-Management-System.git
   cd User-Management-System
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   ```
1. Create ```.env``` file.
1. Add following varibles.
    ```
    PORT
    MONGODB_URL
    DB_NAME
    JWT_SECRET
    SALT_ROUNDS
   ```
   Run the backend server:
   ```bash
   npm run dev
   ```

3. **Frontend Setup:**
   Open a new terminal window, navigate to `frontend`, and install dependencies:
   ```bash
   cd frontend
   npm install
   ```
1. Create ```.env``` file.
1. Add following varibles.
    ```
    VITE_BACKEND_URL
    ```
1. Run frontend (Vite + React) - ```npm run dev```
1. Visit - ```http:localhost:5173``` or respective url to view.

<hr/>

## Future Enhancements
* Add fine-grained task and feature permission mapping for roles.
* Enhance UI dashboard with insights, widgets, and activity analytics.
* Add email verification and password reset workflows.

## Folder Structure

```
user-management-system
├─ backend
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ src
│  │  ├─ app.ts
│  │  ├─ controllers
│  │  │  ├─ roleController.ts
│  │  │  └─ userController.ts
│  │  ├─ db
│  │  │  ├─ connection.ts
│  │  │  └─ schema.ts
│  │  ├─ middlewares
│  │  │  ├─ authMiddleware.ts
│  │  │  └─ authorizeAdminMiddleware.ts
│  │  ├─ routes
│  │  │  ├─ roleRoutes.ts
│  │  │  └─ userRoutes.ts
│  │  ├─ scripts
│  │  ├─ server.ts
│  │  └─ utils
│  │     └─ auth.ts
│  ├─ tsconfig.json
│  └─ vercel.json
├─ frontend
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  ├─ favicon.png
│  │  ├─ forbidden.png
│  │  ├─ github.png
│  │  ├─ linkedin.png
│  │  ├─ profile.png
│  │  └─ roles.png
│  ├─ src
│  │  ├─ App.tsx
│  │  ├─ components
│  │  │  ├─ Footer.tsx
│  │  │  ├─ Header.tsx
│  │  │  └─ Navbar.tsx
│  │  ├─ context
│  │  │  └─ AuthProvider.tsx
│  │  ├─ index.css
│  │  ├─ layout.tsx
│  │  ├─ main.tsx
│  │  ├─ pages
│  │  │  ├─ Dashboard.tsx
│  │  │  ├─ Forbidden.tsx
│  │  │  ├─ Login.tsx
│  │  │  ├─ NotFound.tsx
│  │  │  ├─ Profile.tsx
│  │  │  ├─ Role.tsx
│  │  │  └─ User.tsx
│  │  └─ routes
│  │     └─ ProtectedRoute.tsx
│  ├─ tsconfig.app.json
│  ├─ tsconfig.json
│  ├─ tsconfig.node.json
│  └─ vite.config.ts
└─ README.md
```
