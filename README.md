### docker commands

```
docker ps -a // list docker containers

docker start  <docker container name> // start the docker db

docker exec -it backend-database bash // open docker terminal

psql -U postgres // to enter the database

\c 'backenddb' // or the name of the database we want to access

```

# api endpoints

Authenticate User

Endpoint: POST /api/v1/auth/login
Description: Authenticates a user with email and password.
Logout

Endpoint: GET /api/v1/auth/logout
Description: Logs out the authenticated user.
Check Authentication Status

Endpoint: GET /api/v1/auth/status
Description: Retrieves the authentication status of the user.
User Registration

Endpoint: POST /api/v1/users/register
Description: Registers a new user with email, password, and full name.
Add Friend

Endpoint: POST /api/v1/friend/add
Description: Adds a new friend to the user's friend list.
Get Friends

Endpoint: GET /api/v1/friend/get
Description: Retrieves the list of friends for the authenticated user.
Search Users

Endpoint: POST /api/v1/users/usersearch
Description: Searches for users by a given term.
Accept Friendship

Endpoint: POST /api/v1/friend/accept
Description: Accepts a friend request from another user.
Remove/Reject Friend

Endpoint: POST /api/v1/friend/remove
Description: Removes or rejects a friend request.

# databse schema

users = {
user_id:XXXXXX,
full_name:XXXXX,
email:XXXXXXXX,
hashed_password:XXXXXXXX,
created_at:XXXXXXX
role: default user,
}

friends ={
friendship_id:XXXXXXX,
user1_id:XXXXXXXXX,
user2_id:XXXXXXXXX,
status: pending || accepted || blocked
}

session = {
sid is the session id — this is the what cookies reference.
sess contains the session as a JSON object
expire contains the expiration timestamp for the current session
}
