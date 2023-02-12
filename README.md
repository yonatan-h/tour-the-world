Title: tour-the-world (Gedion Ezra's Project).

Group members

1. Gedion Ezra UGR/0448/13
2. Haykel Muktar UGR/3709/13
3. Lensa Belete UGR/6233/13
4. Maria Tesfaye UGR/9011/13
5. Yonatan Haile UGR/0431/13

How to install and use this project on a local machine:
  -The local machine should have
    -mysql server installed
    -a mysql server user (all grants/privelages should be given to it)
    -an empty database (can be named "userdb")
    -nodejs installed
  
  1. Clone this repository on local machine.
  2. Go to the root of the repository (in the command line).
  3. run "npm install".
  4. go to /backend/src/app.module.ts
  5. go to the "username", "password", and "database" properties of the object given to "TypeOrmModule.forRoot" function
     set "username" to the username of the mysql user
     set "password" to the password of the mysql user
     set "database" to the name of the empty database
  6. run "npm run start:dev" to start as a development server
  7. open home.html in /src/home/html
  8. navigate and use the website
     
