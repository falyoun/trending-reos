## Trending Github Repos base code

### Description
This code is written using NestJS to build a server for fetching trending repos in github

First, run `npm install` or `yarn` to load ***node_modules***

Hit the following command to run all services concurrently
```
npm run all-services
```
or
```
yarn all-services
```

In case you want to run specific service, hit the following
```
concurrently --kill-others "nest start <first_service_name> --watch" "nest start <second_service_name> --watch"
```


### Postman usage
You can use the attached postman collection to test the application as following:

> http://localhost:${port}/trending-repos?sort=${}&order=${}&created=${}
* This api reflects the base github api to fetch the trending git repos

> http://localhost:${port}/trending-repos-stats?sort=${}&order=${}&created=${}
* This endpoint returns the languages used by most trending repos on Github

### Notes
* Make sure you have `.env` file in the root directory of your project
* Inside `.env` file make sure you have the following
```
PORT=
SWAGGER_TITLE=
SWAGGER_DESCRIPTION=
SWAGGER_VERSION=
SWAGGER_TAG=
```