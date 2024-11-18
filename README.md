In order to start the project, there are two main steps which is connecting the MongoDB database in the .env file in the server directories and , create and run two terminal.

For the .env file, this file is where the database connection is defined. The current version has a default .env file but if you want the project to connect to your own database, you can follow the steps below

1) The first step is to create the database on mongoDB atlas. You can find the step-by-step here : https://www.mongodb.com/docs/guides/atlas/cluster/
2) After getting the the connection string, copy paste it into the MONGO_URL. Set the following environment variables in your `.env` file:

```env
MONGO_URL = YOUR_CONNECTION_STRING
JWT_SECRET = YOUR_JWT_SECRET_PASSWORD
```
3) The jwt_secret you can type anything for example: testing
4) Now you have finished modifying the .env file.

Next, follow the steps below to start the project. 

On the first terminal
1) Change to client directories by typing in the `terminal` : ```cd client ```
2) Install the `packages` : ``` npm install ```
4) Next, `type` : ```npm run dev ``` , that will start the service
5) That's it, now the terminal for the front end is started
6) If you want to restart the terminal, press Ctrl + C

On the second terminal
1) Change to server directories by typing in the terminal : `cd server`
2) Install the `packages` : ``` npm install ```
3) Next, `type` : ```npm start``` , that will start the service
4) That's it, now the terminal for the back end is started
4) If you want to restart the terminal, press Ctrl + C

After starting both terminal, the website now should be up and running.

//KNOWN BUG//

Do take note that there is currently a known bug in the project. 
1) The bug is that after you freeze the account using the button on the user dasboard page, you may notice that you are not able to edit the notifications or profile.
2) In order to fix this, simply sign out on the settings tab and sign in again with the same account.
3) After signing in, you should now be able to update the profile and notifications once again.

// Creating Admin User //

If you are connecting to your own databse, there is no admin user by default.

In Order to create an admin user, do the steps below:
1) Login in to your mongodb atlas user.
2) Go to your Project -> Cluster -> Overview Collection.
3) Select a user from the database query, change `isAdmin` field to `true`.
4) Okay that's it, now the admin can access the AdminDashboardPage and use it.
