# social-server

API for social networking.

##techs

  * [Node.js](https://nodejs.org)
  * [Express](https://expressjs.com)
  * [MongoDB](https://www.mongodb.com)
  * [Mongoose](https://mongoosejs.com)
  * [bcrypt](https://www.npmjs.com/package/bcrypt)

##end-points 

### login

  * GET - (/api/auth/login) - Get all users

### users 

  * POST - (/api/auth/register)  - Create a new user
  * PUT - (/api/users/:id) - Update a user
  * DELETE - (/api/users/:id) - Delete a user
  * GET - (/api/users/:id) - Get a user
  * PUT - (/api/users/:id/follow) - Follow a user
  * PUT - (/api/users/:id/unfollow) - Unfollow a user

### posts

  * POST - (/api/posts) - Create a new post
  * PUT - (/api/posts/:id) - Update a post
  * DELETE - (/api/posts/:id) - Delete a post
  * PUT - (/api/posts/:id) - Like, dislike a post
  * GET - (/api/posts/:id) - Get a post
  * GET - (/api/posts/timeline/all) - Get all posts from a user

