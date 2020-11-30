# NodeJS Typescript boilerplate

## Features

* Typescript
* Swagger documentation with swagger express middleware
* Domain Driven Design
* ACL Layer
* Event-Listener Layer
* Request validation
* Error handling middleware
* Response translation
* Data fetch filter layer
* Auth layer with default JWT provider
* Caching mechanism with node-cache
* Dependency Injection with Inversify
* Testing

## Modules included

* Core
* Integration
    * Auth
* Acl
* User
* API

## Quick Start

Get started developing...

```shell
# install deps
npm install

# run in development mode
npm run dev

# run tests
npm run test
```

---

## Install Dependencies

Install all package dependencies (one time operation)

```shell
npm install
```

## Run It
#### Run in *development* mode:
Runs the application is development mode. Should not be used in production

```shell
npm run dev
```

or debug it

```shell
npm run dev:debug
```

#### Run in *production* mode:

Compiles the application and starts it in production production mode.

```shell
npm run compile
npm start
```

## Test It

Run the Mocha unit tests

```shell
npm test
```

or debug them

```shell
npm run test:debug
```


## Debug It

#### Debug the server:

```
npm run dev:debug
```

#### Debug Tests

```
npm run test:debug
```
