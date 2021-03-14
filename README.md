<!-- PROJECT LOGO -->
<p align="center">
  <h3 align="center">My Books Angular NodeJS app</h3>

  <p align="center">
    A simple NodeJS, Express web app with an Angular front end
    <br />
  </p>
</p>
<br/>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#initialisation">Initialisation</a></li>
      </ul>
    </li>
  </ol>
</details>
<br/>


<!-- ABOUT THE PROJECT -->
## About The Project

The features that it provides are the following:
* User authentication.
* Displaying and querying a list of authors.
* Displaying a single author's data.
* Displaying a list of books based on queries related to that book's title or series.

### Built With

* [NodeJS](https://nodejs.org/en/)
* [ExpressJS](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/cloud/atlas)
* [Bootstrap](https://getbootstrap.com)
* [Angular](https://angular.io/api/common/SlicePipe)
* [NgRx](https://ngrx.io/)


<!-- GETTING STARTED -->
## Getting Started

In order to use this app a mongoDB Atlas API key is needed.

### Prerequisites

* [MongoDB Atlas API](https://www.mongodb.com/cloud/atlas)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/kikooOOoo16/MyBooksAppAngularNode.git
   ```
3. Install NPM packages in both the NodeJS server and the Angular app root directories
   ```sh
   npm install
   ```
4. Inside the server root directory add the MongoDB API key and a JSON web token secret (used for token creation, it can by any string) in a .env file under the following keys (`.env` file)
   ```JS
   MLAB_DATABASE_URL=mongodbAPIkey
   JSON_WEB_TOKEN_SECRET=jsonwebtokenstring
   ```
   
### Initialisation

1. The server's start script is configured with [nodemon](https://www.npmjs.com/package/nodemon). To start the server just run :
   ```sh
   npm run start:server
   ```
2. To start the Angular app just run  :
   ```sh
   ng serve
   ```
Note! : If you get the can't find module environment error in the Angular app when running ng serve, in the src folder just create the environments directory with the default environment.prod.ts and environment.ts files. The default values are: 
```TS
export const environment = {
  production: false
};
```

Note! : If you register a user, add books to the profile page books list and then restart the server while the seed() function is active in app.js, you will break the books list in the profile page. This happens because the book IDs saved in the user object in the DB no longer exist (seeder added new books to the DB resulting in new IDs for each book). Will update seed function to remove books list from user object in DB.
 
<!-- CONTACT -->
## Contact

Kristijan Pavlevski - kristijan.pavlevski@outlook.com

Project Link: [https://github.com/kikooOOoo16/MyBooksAppAngularNode](https://github.com/kikooOOoo16/MyBooksAppAngularNode)
