# Chat App

Chat application with messages history, real-time messaging and file transfer as well as authorization
<br/><br/>

## Getting Started

To run the app you should:

1. Run ```npm i```
2. Edit ```mongoDB_URI``` in ```server/config.js``` to connect server with your database
3. Run ```gulp serve```
4. Open your browser on: ```http://localhost:9000/```.


## Demo

![chat app demo](./demo_gifs/6.Demo.gif)
<br/>
To see more detailed demo gifs, please visit ```./demo_gifs``` directory

<br/><br/>


## Project structure
```
.  
├── client                                  # client source files  
│   ├── app                                  
│   │   ├── auth                            # authorization components and services
│   │   ├── common                          # module with common components, directives, pipes used by other modules
│   │   ├── core                            # routes, guards, components, services of the AppModule
│   │   ├── feature_modules                 # feature modules, each of them includes its own components, directives, pipes, services and models
│   │   └── helpers                         # helper functions
│   ├── static_data                         # static data of the app
│   ├── config.js                           # configuration of the app
│   ├── boot.js                             # bootstrap file for AppModule
│   └── index.html  
├── dist                                    # compiled files   
├── server                                  # server source files
|   ├── models                              # Mongoose models
|   |   ├── room.model.js
|   |   └── user.model.js
|   ├── routes                              # server routes
|   |   ├── auth.js
|   |   └── room.js
|   |── tmp                                 # folder for uploaded files
|   ├── chat-config.js                      # chat configuration variables
|   ├── config.js                           # server configuration
|   ├── socket-handler.js                   # socket.io handlers and emitters
|   ├── usersInRooms.js                     # store for users that join/leave different chat rooms and simple API to manage the store
|   ├── index.js                            # main server file
├── tasks                                   # gulp tasks
├── postcss.config.js                       # PostCSS config file
├── gulpfile.babel.js                       # main gulp file
.
.
.
```
<br/><br/>

## Built With

Node.js, Express, socket.io, Mongoose, MongoDB, Angular 2, ES2015 with Babel, SemanticUI, PostCSS, SCSS, Gulp, Webpack, Express, angular2-babel-esnext-starter

<br/><br/>

## Authors

* Dominik Broj
