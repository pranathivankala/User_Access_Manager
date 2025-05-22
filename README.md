# User Access Management System

A full-stack web application for managing user access to software tools, with role-based authentication and approvals.

##  Tech Stack
- **Backend:** Node.js, Express.js, TypeORM, PostgreSQL
- **Frontend:** React + Vite
- **Authentication:** JWT, bcrypt
- **Roles:** Admin, Manager, Employee

##  Roles & Capabilities
- **Employee:** Register/Login, Request Software Access
- **Manager:** Review and Approve/Reject Requests
- **Admin:** Manage Software List

##  Key Features
- Secure JWT Auth with Role-based Routing
- Create Software (Admin)
- Submit Access Requests (Employee)
- Approve/Reject Requests (Manager)

##  API Overview
- `POST /api/auth/signup` – Register new user (default role: Employee)
- `POST /api/auth/login` – Login & receive JWT token
- `POST /api/software` – Add software (Admin only)
- `POST /api/requests` – Request access to software
- `PATCH /api/requests/:id` – Approve/Reject request (Manager only)

##  Database Schema
- **User:** id, username, password, role
- **Software:** id, name, description, accessLevels (array)
- **Request:** id, user, software, accessType, reason, status

##  Setup Instructions
```bash
# Backend
cd backend
npm install
# Create .env and configure DB + JWT_SECRET
npm run dev

# Frontend
cd ../frontend
npm install
npm run dev
