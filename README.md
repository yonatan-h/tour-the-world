Title: tour-the-world (Gedion Ezra's Project).

Group members

1. Gedion Ezra UGR/0448/13
2. Haykel Muktar UGR/3709/13
3. Lensa Belete UGR/6233/13
4. Maria Tesfaye UGR/9011/13
5. Yonatan Haile UGR/0431/13

For this project we decided to use the relational database MySQL. The reason we used MySQL is mainly for two reasons:
  1. It's a widely known relational database, so most people that will see our project will highly likely have MySQL
  2. It's easier to implement an offline system using this relational database than the rest.

How to install and use this project on a local machine:
  The local machine should have
    1. mysql server installed
    2. a mysql server user (all grants/privelages should be given to it)
    3. an empty database (can be named "userdb")
    4. nodejs installed
  
  1. Clone this repository on local machine.
  2. Go to the root of the repository (in the command line).
  3. run "npm install".
  4. go to /backend/src/app.module.ts
  5. go to the "username", "password", and "database" properties of the object given to "TypeOrmModule.forRoot" function
     5.1. set "username" to the username of the mysql user
     5.2. set "password" to the password of the mysql user
     5.3. set "database" to the name of the empty database
  6. run "npm run start:dev" to start as a development server
  7. open home.html in /src/home.html
  8. navigate and use the website
     
