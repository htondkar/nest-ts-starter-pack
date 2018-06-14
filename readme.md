## Nest-ts-starter

This repository is based on the official nestJS starter pack.
it offers more functionality out of the box, here's the list of
them:

1.  Pre-configured ORM.
2.  User model already implemented.
3.  JWT Authentication (passport).
4.  Role-based access control with declarative approach.
5.  Ownership access control
6.  Swagger integration.
7.  Base Service class which provides CRUD out of the box for all models.
8.  Base Entity class with commonly used properties already set.
9.  Validation pipe, auth guard, exception handling in services
10. Interceptors for removing un-wanted properties from response(sensitive data)

## Requirements

* node > 9.0.0
* Typescript
* Database(mysql, postgreSql, mongo, ...)

## how to use

just clone this repository and install dependencies using `yarn`, set your DB config in the
'ormconfig.json' then `yarn start` or if you have nodemon installed globally use `nodemon` in the root. open `http://localhost:3000` to see server running. you can access swagger docs in '/docs'

## Other scripts

check out package.json to see all the available scripts (test, format,... )

### contribute

pull requests are more than welcomed :).
