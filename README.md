# See It, Say It API
:guard::guard::guard:

A London based community blogging website where people can view and create blog posts about all things London!

This repo contains the backend API and server to run the website.

## Motivation

This project is part of the futureproof curriculum for LAP 1 project. We were tasked with the creation of a journals website. Our theme of a London blogging website was chosen as all collaborators are London based.

## Installation & Usage

### Installation

- Clone or download the repo.
- Run `npm install` to install dependencies.

### Usage

- Open the terminal 
    - Navigate to 
    - Run `npm start` to launch server.
    - Run `npm test` to launch test suite.
    - Run `npm run coverage` to create coverage report.

## Technologies 

- npm
- express
- nodemon
- jest 
- uid​
- dayjs
- Deployment: Heroku

## Process

- Started with half a day planning, created Figma and Trello board
- Split up tasks into backend and frontend
    - Frontend was split up into the different webpages
- Once backend completed, all collaborated on frontend
- Connected up frontend and backend
- Deployed website
- Went through site together to identify any changes/updates needed

## Tests

- Run with jest 
- 5 tests ran 
    - POST /api/posts
        - should response 201 with new cost data
    - GET /api/posts
        - should respond 200 wih all posts data
    - GET /api/posts/:id
        - should respond 200 with specific post data
        - should respond 404 when data is not found
    - POST /api/posts/:id/comments
        - should respond 201 with updated post data
    - Post /api/emojis 
        - should respond 201 with updated post data and emojis correctly modified after emoji clicked for first time

Jest coverage > 60%

## Challenges and Wins

### Challenges

#### Emojis: 

A challenge encountered was that user should be able to click emojis and data persist through navigation between pages, and successfully update the server​.
To allow this to happen, we needed to make sure receive correct shape of object in request, modifying existing data and returning updated data back to client​. 

It was important that we kept up communication as a pair and with front-end team throughout development stage, used data sent from client as a dynamic variable to access existing data and increment, used descriptive var names for easier maintenance, and also wrote code for possible feature of toggling emojis however didn’t have time to utilise this feature​

We managed to get the emoji count to persist throughout navigation. It took some time to decide how we were to implement the emoji functionality and how complicated we wanted it to be, so there may have been some time wasted going back and forth.

#### GitHub :face_with_spiral_eyes:

As all relatively new users of GitHub we inevitability encountered some problems! 

We wanted to update the file structure of our project mid way through but were getting lots of conflicts that were taking time​ to resolve one by one.

As a group we helped each other resolve conflicts, ensuring that no important changes were deleted. We each updated our file structure locally and pushed to a new branch on GitHub​

Our file structures were synced (finally). In the future we would set up the file structure at the beginning etc 

### Wins

We completed the mvp to produce a good final product in a timely manner. We ensured we stayed on focus and on task by regular communication. This was also helped by spending time planning, and having a very solid foundation of an idea before we started any coding.

## Bugs :bug:

None at the moment 

## Future Features 

Most additional features would run on the client side of this server:

###  Map feature 

We would like to add a map either onto the home page or as a separate page which adds the location each post is tagged to as a pin.
You would then be able to navigate around the map and select a post based on its location.
This could ne done using StaticMaps API.

### Add own image to post

Currently a random image will be chosen and generated for the posts. 
Would like to implement the ability for post creators to upload their own image with their post

### Deselect emoji 

Would have liked to give the option to deselect an emoji.
Also not being able to select the dislike emoji when the like emoji has been selected would be a good feature.

### Homepage filters

Being able to filter the homepage by different criteria such as:
- Date
- Emoji count
- Labels 

## Contributors

@adamminchella :man_technologist:
@liambrockpy :man_technologist:
@PollyFenne :woman_technologist:
@rnba12 :man_technologist:


