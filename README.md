In order to start the project, there are two main steps which is creating a .env file in the server directories and , create and run two terminal.

For the .env file, this file is where the database connection is defined. I have not included it in the project repository due to security reason.
1) The first step is to create the database on mongoDB atlas. You can find the step-by-step here : https://www.mongodb.com/docs/guides/atlas/cluster/
2) After getting the the connection string, copy paste it into the MONGo_URL. The .env file should look something like this :

MONGO_URL = YOUR_CONNECTION_STRING
JWT_SECRET = YOUR_JWT_SECRET_PASSOWRD

3) The jwt_secret you can type anything for example: testing
4) Now you have finished creating the .env file.

Next, follow the steps below to start the project. 

On the first terminal
1) Change to client directories by typing in the terminal : cd client
2) Next, type : npm run dev , that will start the service
3) That's it, now the terminal for the front end is started
4) If you want to restart the terminal, press Ctrl + C

On the second terminal
1) Change to server directories by typing in the terminal : cd server
2) Next, type : npm start , that will start the service
3) That's it, now the terminal for the back end is started
4) If you want to restart the terminal, press Ctrl + C

After starting both terminal, the website now should be up and running.

KNOWN BUG
Do take note that there is currently a known bug in the project. 
1) The bug is that after you freeze the account using the button, you may notice that you are not able to edit the notifications or profile.
2) In order to fix this, simply sign out and sign in again with the same account.
3) After signing in, you should now be able to update the profile once again.
