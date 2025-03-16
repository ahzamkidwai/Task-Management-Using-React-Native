# Project Name

## Overview
This project consists of a **Frontend** built with React Native Expo and a **Backend** developed using Node.js, Express.js, and MongoDB. The app is designed to provide a seamless user experience across mobile platforms while leveraging a robust backend for data management.

## Folder Structure
```
├── Frontend  # React Native Expo (Mobile App)
└── Backend   # Node.js, Express.js, MongoDB (API Server)
```

## Prerequisites
Ensure you have the following installed before running the project:
- **Node.js** (Latest LTS version recommended)
- **npm** or **yarn**
- **MongoDB Atlas** (for cloud database) or **MongoDB local server**
- **Android Emulator** (or a physical device for React Native testing)
- **Expo Go App** (for testing on a physical device)

## Getting Started

### 1️⃣ Setting Up the Frontend

```sh
cd Frontend
npm install
npm run android
```
- Make sure you have an **Android emulator** running or connect a physical Android device with USB debugging enabled.
- If using an **iOS device**, use `npm run ios` (requires macOS and Xcode installed).
- To start the project in the Expo development environment, use:
  ```sh
  npx expo start
  ```

### 2️⃣ Setting Up the Backend

```sh
cd Backend
npm install
```
#### Configure MongoDB:
- Create a **MongoDB Atlas** account and set up a database.
- Inside the `Backend` folder, create a `.env` file and add the following:
  ```env
  MONGO_URI=your_mongodb_connection_string
  PORT=5000
  JWT_SECRET=your_secret_key
  ```
- Run the backend server:
  ```sh
  npm run dev
  ```
- The backend will run on **http://localhost:5000**.

## API Endpoints
| Method | Endpoint                   | Description            |
|--------|----------------------------|------------------------|
| POST   | /api/auth/signin           | Sign in a user        |
| POST   | /api/auth/register         | Register a new user   |
| POST   | /api/task/createTask       | Create a new task     |
| PUT    | /api/task/updateTask/:id   | Update a task by ID   |
| GET    | /api/task/getTask          | Retrieve all tasks    |
| DELETE | /api/task/deleteTask/:id   | Delete a task by ID   |

## Technologies Used
### **Frontend:**
- React Native (Expo)
- React Navigation
- Context API (for state management)
- React Native Paper (for UI components)
- React Native Gesture Handler
- React Native Async Storage

### **Backend:**
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose (for MongoDB interactions)
- JWT (Authentication)
- bcrypt.js (Password hashing)
- dotenv (Environment variables)

## Deployment (Optional)
### **Frontend:**
- To publish the app using Expo:
  ```sh
  expo publish
  ```
- To generate a standalone APK:
  ```sh
  eas build -p android --profile preview
  ```

### **Backend:**
- Deploy using **Vercel**.
- Ensure the MongoDB Atlas connection string is set in the hosting environment.

## Contribution
Feel free to fork this repository and submit a pull request with improvements or bug fixes.

## License
This project is licensed under the MIT License.

---
_Developed with ❤️ by [Your Name]_

