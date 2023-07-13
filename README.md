# AthleteCareerQuiz

Link to routes API document.

https://docs.google.com/document/d/1l0rRpvS0S0u-bnfGYbfAGx-5jwGpA_jchp44zve0DQU/edit?usp=sharing

## Folder Architecture

```
server.js: main entry point for Express.js
config.js: config file for MongoDB credentials
sample-config.js: sample config file with no credentials

/client :frontend
	/public: static files
	/src: code for frontend
		/components: login and navbar components
		/images: holds pictures of sports players
		/pages: implementation for each page
			/video: holds home page video

/server: backend
	/controllers: implementation for each route
	/models: models for MongoDB
	/routes: route definitions for backend
	/static: static data
```

## Setup Process

### Software Requirements

- Node.js 16.13
- A MongoDB cloud cluster (edit config.js)
- Access to GitHub
- A browser

### Installation Process

1. Clone the repo
2. Switch to the dev branch
3. Open terminal in the repo's root directory and run the following code:

``` {bash}
npm install
npm audit fix
cd client
npm install
npm audit fix
cd ..
```

### Resetting the careers

**CAUTION: THIS WILL REMOVE ALL CAREERS IN THE CLOUD**

1. Open terminal in the repo's root directory
2. Run `npm run import-careers`
3. Wait a minute until text starts being printed
4. When text stops being printed, press Ctrl+C and then type `Y` and hit enter

### Running server only

1. Open terminal in the repo's root directory
2. Run `npm start`
3. After a while, the server will be ready on `http://localhost:3001`
4. Press Ctrl+C several times to stop the server

### Running client only

1. Open terminal in the repo's root directory
2. Run `cd client` to move to the client directory
3. Run `npm start`
4. Either wait for React to automatically open a new tab, or goto `http://localhost:3000`
5. Press Ctrl+C several times to stop the client

### Running both at the same time

1. Open terminal in the repo's root directory
2. Run `npm run start-dev`
3. Either wait for React to automatically open a new tab, or goto `http://localhost:3000`
4. Press Ctrl+C several times to stop both the client and the server

