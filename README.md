# Getting Started

##### Please fork the repository.

### Installation

```
npm i
```

### Starting docker services

```
docker-compose up
```

### URL

```
http://localhost:3000
```

### Run migrations

```
npm run migrate
```

### Run seeder

```
npm run seed
```

## Docker Services

Remove volumes

```
docker-compose down -v
```

# Test

## Use Material UI for all designs and css

##### We are looking for how you break up your code, manage state, can reuse existing code, and knowledge of sequelize/material ui and react. Bonus points for making the website scale well.

##### If you are unfamiliar with nextjs, api routes can be created under /pages/api. 
- https://nextjs.org/docs/api-routes/introduction

### Make a /users page

1. Create a /users route in the API and navigation
2. Get all users and display them in a table

### Make a /users/:id page

1. We are not trying to test for nextjs knowledge. You can create the route in the pages folder with /users/[id].
- https://nextjs.org/docs/routing/introduction
- https://nextjs.org/docs/routing/dynamic-routes
2. Have it display the user by that id.
3. If there is no user with that id display an error.
