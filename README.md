# Getting Started
Follow these instructions to set up and run the project on your local machine.

# Prerequisites
- Node.js and npm (Node Package Manager)
- MongoDB installed and running
- Postman or any API testing tool
- Installation
Clone the repository to your local machine:

# Open terminal/shell

git clone https://github.com/your-username/your-project.git

# Navigate to the project directory:

`cd your-project`

# Install project dependencies:

```shell
npm install
```

# Configuration
Create a .env file in the project root directory to store environment variables if exist use it:

```shell
Copy code
JWT_SECRET=your_jwt_secret_key
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```
Replace your_jwt_secret_key with your JWT secret key and your_mongodb_connection_string with your MongoDB connection string.

# Running the Application
Start the application by running the following command:

```shell
npm start
```
The server will start, and you should see a message like:

```shell
Server is running on port 3000
Connected to MongoDB
Setting Up MongoDB
```
- Make sure you have MongoDB installed and running on your local machine. Update the .env file with your MongoDB connection string.

# Routes
- User Authentication
- Register User
Route: POST /auth/register

Description: Register a new user with a name, email, and password.
Request Body:
json
```shell
// use this while register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "yourpassword"
}

```
Response: "Registration successful!"

# User Login

Route: POST /auth/login

Description: Login with an email and password to get a JWT token.

Request Body:
json
```shell
// use for login
{
  "email": "john@example.com",
  "password": "yourpassword"
}

```
Response:
json

```shell
// get in login response
{
  "token": "your-jwt-token"
}

```
# Logout (Not Required for JWT)
Session-based logout is not required with JWT authentication.

Todo Operations (Protected Routes)
Make sure to include the JWT token in the x-auth-token header for all protected routes.

# Add Todo

Route: POST /todos/add

Description: Add a new todo with a title and description.

Request Body:
json

```shell
// todo add
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}

```
Response: "Todo added successfully!"


# List Todos
Route: GET /todos/list

Description: Get a list of all todos for the logged-in user.

```shell
// get in response like following data
[
    {
        "_id": "650b3453edf672169690a702",
        "title": "12113123",
        "description": "fsdfkakfjfkdf",
        "user": "650b28d3e262032a1219501f",
        "__v": 0
    },
    {
        "_id": "650b345aedf672169690a704",
        "title": "12113123",
        "description": "fsdfkakfjfkdf",
        "user": "650b28d3e262032a1219501f",
        "__v": 0
    },
    {
        "_id": "650b345dedf672169690a706",
        "title": "12113123",
        "description": "fsdfkakfjfkdf",
        "user": "650b28d3e262032a1219501f",
        "__v": 0
    },
    {
        "_id": "650b3734167e0adb8c50a6e0",
        "user": "650b28d3e262032a1219501f",
        "__v": 0
    }
]
```

Response: Array of todo objects.


# Update Todo
Route: PUT /todos/update/:id

Description: Update a todo's title and description by providing its ID.

Request Body:
json

``` shell
// for updating a specific todo and make sure you are login
{
  "title": "Updated title",
  "description": "Updated description"
}

```
Response: "Todo updated successfully!"

# Delete Todo
Route: DELETE /todos/delete/:id

- Description: Delete a todo by providing its ID.

Response: "Todo deleted successfully!"

# Thanks for reading ❤️