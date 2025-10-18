# Authentication Testing Guide

## ✅ Setup Complete!

Both servers are now running:
- **Frontend (Vite)**: http://localhost:3000
- **Backend (Express)**: http://localhost:5000

## 🧪 How to Test

### 1. **Test Sign Up**
1. Go to http://localhost:3000
2. Navigate to the Sign In page
3. Click on the "Sign Up" tab
4. Fill in the form:
   - Name: Your Name
   - Email: test@example.com
   - Password: password123 (minimum 6 characters)
   - Confirm Password: password123
5. Click "Create Account"
6. **Check the browser console (F12)** for request/response logs
7. **Check the backend server terminal** for database operations

### 2. **Verify in MongoDB Atlas**
1. Go to https://cloud.mongodb.com/
2. Log in to your account
3. Click "Browse Collections"
4. Navigate to: **CS** database → **users** collection
5. You should see your newly created user with:
   - name
   - email (lowercase)
   - password (hashed - not plain text!)
   - createdAt
   - updatedAt

### 3. **Test Sign In**
1. Go back to the Sign In page
2. Switch to "Sign In" tab
3. Enter the credentials you just created:
   - Email: test@example.com
   - Password: password123
4. Click "Sign In"
5. Should redirect to /checkout on success

### 4. **Test Error Cases**

#### Duplicate Email (Sign Up)
- Try to sign up again with the same email
- Should show error: "Email already registered"

#### Wrong Password (Sign In)
- Try to sign in with wrong password
- Should show error: "Invalid email or password"

#### Non-existent User (Sign In)
- Try to sign in with email that doesn't exist
- Should show error: "Invalid email or password"

#### Password Too Short (Sign Up)
- Try to sign up with password less than 6 characters
- Should show error: "Password must be at least 6 characters long"

#### Passwords Don't Match (Sign Up)
- Try to sign up with mismatched passwords
- Should show error: "Passwords do not match"

## 🔍 Debugging

### Check Browser Console
Open DevTools (F12) → Console tab to see:
- "Attempting signup with: {...}"
- "Signup response: {...}"
- Any network errors

### Check Backend Terminal
Look for these logs:
- ✅ "User created successfully: [ID]"
- ❌ "Email already exists: [email]"
- 🔐 "User signed in successfully: [email]"

### Common Issues

#### 1. **"Failed to fetch" Error**
- Make sure backend server is running on port 5000
- Check: http://localhost:5000/api/health
- Should return: `{"status":"Server is running","database":"Connected"}`

#### 2. **No Data in MongoDB**
- Verify backend terminal shows "✅ User created successfully"
- Check MongoDB Atlas connection
- Refresh the Collections view in Atlas

#### 3. **CORS Errors**
- Backend should have `cors()` middleware enabled
- Check backend terminal for startup messages

## 📝 What Happens Behind the Scenes

### Sign Up Flow:
1. Frontend validates password match & length
2. Sends POST request to `/api/auth/signup`
3. Backend validates all fields
4. Checks if email already exists
5. Hashes password with bcrypt
6. Saves user to MongoDB
7. Returns user data (without password)
8. Frontend stores userId, userName, userEmail in localStorage
9. Redirects to /checkout

### Sign In Flow:
1. Frontend sends POST request to `/api/auth/signin`
2. Backend finds user by email
3. Compares password hash using bcrypt
4. Updates lastLogin timestamp
5. Returns user data (without password)
6. Frontend stores user info in localStorage
7. Redirects to /checkout

## 🎯 Next Steps

### Security Enhancements (Optional):
- Add JWT tokens for session management
- Add email verification
- Add password reset functionality
- Add rate limiting
- Add 2FA authentication

### Features to Add:
- User profile page
- Change password functionality
- Delete account option
- OAuth (Google/Facebook) integration

## 💡 Tips

- Always check both browser console AND backend terminal when debugging
- Use unique emails for testing (test1@example.com, test2@example.com, etc.)
- MongoDB Atlas has a limit on free tier - don't create too many test users
- Clear localStorage if you want to test being "logged out"

## 🚀 Starting the Servers

If you need to restart:

```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend  
npm run dev
```

Happy testing! 🎉
