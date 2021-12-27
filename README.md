# Social Media API 

# Description 
  - Rest API built for social media using Express, Mongoose and MONGODB

# User Story
  - AS A social media startup
  I WANT an API for my social network that uses a NoSQL database
  SO THAT my website can handle large amounts of unstructured data
  
#Usage 
- Install MongoDB
- Clone this repo
- Install all needed dependencies with npm i in terminal 
- Run Npm Start in terminal 
- Use insomina or other testing app for REST API's to test

# Modes 
- User
- Thought
- Reaction 

# Endpoints 
User:
- Create a user: POST /api/users
- Get all users: GET /api/users
- Get user by ID: GET /api/users/id
- Update a user: PUT /api/users/id
- Delete a user: DELETE /api/users/id
- Add a friend: PUT /api/users/userId/friends/friendId
- Delete a friend: DELETE /api/users/:userId/friends/friendId

Thoughts:
- Create a thought: POST /api/thoughts
- Get all thoughts: GET /api/thoughts
- Get thought by ID: GET /api/thoughts/:id
- Update a thought: PUT /api/thoughts/:id
- Delete a thought: DELETE /api/thoughts/:id

Reaction:
- Add a reaction: PUT /api/thoughts/:id/reactions
- Delete a reaction: DELETE /api/thoughts/:id/reactions

# Technology Used 
- Express 
- MongoDB
- Mongoose 






