# User Management System

### A web application designed to manage users based on their roles using Role-Based Access Control (RBAC).

This project demonstrates the implementation of Role-Based Access Control. The primary focus is on backend development, specifically authentication, routing, and middleware. The UI has been intentionally kept simple to prioritize core functionality.


***Visit website: [User Management System](https://user-management-system-frontend-by-tuttu.vercel.app/)***

<hr/>

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

<hr/>

## Folder Structure
```
- backend
    - src
        - controllers
            - roleController.ts
            - userController.ts
        - db
            - connection.ts
            - schema.ts
        - middlewares
            - authMiddleware.ts
            - authorizeAdminMiddleware.ts
        - utils
            - auth.ts
        - app.ts
        - server.ts
    - [ Configuration Files ]
- frontend
    - public
        - [ Images ]
    - src
        - components
            - Footer.tsx
            - Header.tsx
            - Navbar.tsx
        - context
            - AuthProvider.tsx
        - pages
            - Dashboard.tsx
            - Forbidden.tsx
            - Login.tsx
            - NotFound.tsx
            - Profile.tsx
            - Role.tsx
            - User.tsx
        - routes
            - ProtectedRoute.tsx
        - App.tsx
        - index.css
        - layout.tsx
        - main.tsx
    - index.html
    - [ Configuration Files ]
- .gitignore
- README.md
```

<hr/>

## Cloning Project
1. Clone Repository - ```git clone https://github.com/AP-Abhishek/User-Management-System.git```
1. Install backend packages
    ```
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
1. Run backend (Express) - ```npm run dev```
1. Go back to root directory. Install frontend packages.
    ```
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

## Future Enhancements:
- Add functionality for assigning specific tasks and privileges.
- Enhance the User Interface (UI).
- Integrate more widgets and data insights into the dashboard.