# API Testing Guide - All Endpoints

**Base URL:** `http://localhost:5000/api/v1`

---

# 1.1 Member Login
POST /admin/login
Content-Type: application/json
{
  "email": "admin@avenstek.com",
  "password": "password123"
}

# 1.2 Get All Users
GET admin/users
Authorization: Bearer <token>

# 1.3 Get User By ID
GET admin/users/:id
Authorization: Bearer <token>
Example:
admin/users/65a1234567890

# 1.4 Block User
PATCH admin/users/:id/block
Authorization: Bearer <token>
Example:
admin/users/65a1234567890/block

# 1.5 Unblock User
PATCH admin/users/:id/unblock
Authorization: Bearer <token>
Example:
admin/users/65a1234567890/unblock

# 1.6 Delete User
DELETE admin/users/:id
Authorization: Bearer <token>
Example:
admin/users/65a1234567890