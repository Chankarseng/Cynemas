# Cynemas

Cynemas is a personal dashboard that allows users to know what movies / tv shows are on which streaming services with a glance.

![image](https://user-images.githubusercontent.com/22534579/139796506-9569e132-61a9-4198-add0-b894a0c85732.png)

## Setup

To run this project, install it locally using NPM :

```
$ npm install
$ npm start
```

### To have the API work

Rename folder functions_example to functions,
Then replace the API_URL and API_KEY in each functions file to your API_KEY retrieved from [TMDB API](https://themoviedb.org)

With another instance, run the following command

```
$ npm run lambda-serve
```

## Technologies used

This project is created with :

- Create-React-App
- Chakra-UI
- Netlify functions
- Swiper
- React-Select
