1. MEMBER & AUTH ENDPOINTS

1.1 User Registration

POST /api/auth/register
Content-Type: application/json
example:
{
  "userId": "U1001",
  "name": "Kanikasri",
  "email": "kanikasri@example.com",
  "phone": "8825607688",
  "password": "Kanika@123"
}

1.2 User Login

POST /api/auth/login
Content-Type: application/json
example:
{
  "email": "kanikasri@example.com",
  "password": "Kanika@123"
}

1.3 Forgot Password

POST /api/auth/forgot-password
Content-Type: application/json
example:
{
  "email": "kanikasri@example.com"
}

1.4 Reset Password

POST /api/auth/reset-password
Content-Type: application/json
example:
{
  "token": "reset_jwt_token_here",
  "newPassword": "NewPassword@123"
}