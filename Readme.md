## Hotel Booking Implementation

This is a small app based on **NodeJS** back-end and **MongoDB** as data-store and **Redis** as cache-store.

## Description

1. ```You can do CRUD on "hotel" with information such as (name, city, numberOfRooms)```

2. ```You can do CRUD on "user" with information such as (name, city)```

3. ```User should be able to check the availability of rooms in hotels and book rooms within a given time range.```


## App Structure
    This is a barebone structure that is to be used after setting up the required ecosystem on the machine. I havent used docker scripts for deployment. So the app can just run by following the commands in scripts from package.json file.


## Response Status Codes
    All the response status codes and messages are stored in src/libs/statusCodes.js

## Running the app in development mode
    run the following commands after cloning the repository. App can be accessed at http://localhost:7000
    1. npm install
    2. npm run dev



## GENERATE DOCUMENTATION
    the docs are already generated in the out folder (using jsdoc) and can be opened by running
    the file out/index.html in a browser.
    still, to regenerate the docs use the following command
    -- **npm run docs** --

## Code Quality and Standards
    eslint with airbnb base is used for maintaining code standard.

## Loggging
    using sentry.io for tracking error log.
