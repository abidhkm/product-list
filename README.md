# Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to run the app

### Prerequisites

    Clone and open the repository on IDES
    Install node >= 18

Run below scripts on the root folder to run the app

1. yarn install
2. yarn start

## Available Scripts

In the project directory, you can run:

### `yarn start`

It starts the mock server on port 3001 first and runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `yarn start:server`

Runs the mock server on port 3001 using db.json file and expose the endpoint `/products`

### `yarn fix:format`

Runs the prettier to fix the formatting on the repository.
Rules for formatting can be found in `.prettierrc.json`
