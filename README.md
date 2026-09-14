# Online Food Delivery System

This assignment contains two separate implementations of the same food delivery case study.

## Project structure

- `http-app`: Node.js built-in `http` module only. No Express.
- `express-app`: Express.js routing with Handlebars templates.

## Requirements

Install Node.js LTS from https://nodejs.org/.

## Implementation A: Node.js HTTP module

Open a terminal in the project folder and run:

```text
cd http-app
node server.js
```

Open http://localhost:3000.

Routes:

- `GET /`
- `GET /restaurants`
- `GET /restaurant/1`
- `GET /order/1001`

The server manually checks the HTTP method and URL, then sends the response with `http.createServer()`.

## Implementation B: Express.js and Handlebars

Open a second terminal and run:

```text
cd express-app
npm install
npm start
```

Open http://localhost:3001.

Routes:

- `GET /`
- `GET /restaurants`
- `GET /restaurant/1`
- `GET /order/1001`
- `GET /styles.css`

Use these invalid examples to see a `404 Not Found` response:

- http://localhost:3001/restaurant/999
- http://localhost:3001/order/9999

## HTTP module vs Express.js

| Area | Node.js HTTP module | Express.js |
| --- | --- | --- |
| Routing | URLs and methods are checked manually | Routes are declared clearly with `app.get()` |
| Code complexity | More repeated request and response code | Less boilerplate and easier request handling |
| Maintainability | Fine for a small learning example, harder as routes grow | Middleware and route structure are easier to extend |
| Scalability | Can scale, but more server code must be maintained manually | Common routing and middleware patterns support larger applications |

The HTTP implementation is useful for learning how a web server works. Express is more convenient for a real application because it provides a cleaner structure for routes, middleware, and responses.
