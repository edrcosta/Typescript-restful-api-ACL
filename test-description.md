# Backend Challenge

Hello, our challenge to say that we are happy for our vacancy and invite you to participate in the technician. 😁

What we provide:

- Your code
- Organization
- Good habits

### Challenge

For this test, you will create a REST API that allows users to register and login, with the following functions:

**Users**
- Register a new user
- List a user's information
- Change a user's name and type
- Delete a user
- Change a user's status (active and inactive)

**Tips**
- List all registered types

### Business rules
- The users table must contain the field names, password, type, email and status.
- A type table must have a description of the type.
- A user has only a single type
- Only root and admin users can register new users.
- Only root admin users can change any user information (including status);
- Only root users can delete users
- General type users only have access to a list of user information, as well as changing their own information.
- Login must be done with email and password.

##Requirements
- The project must be documented, mainly the architecture used and the routes for each task.
- The project must be built with Typescript
- The project must have unit test coverage

### 🚫 What can't? (please 🙏😂)

- use eslint-disable anywhere
- use any typing (no laziness!)
- leave any warning or error on the server console
- leave eslint errors
- commented codes
- console logs
- make only 1 commit with all code

### At end:

By, you must provide private access to test3.