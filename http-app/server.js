const http = require('http');

const restaurants = [
  { id: 1, name: 'Spice Garden', cuisine: 'Indian' },
  { id: 2, name: 'Green Bowl', cuisine: 'Healthy' }
];

const orders = {
  1001: { restaurant: 'Spice Garden', status: 'Out for delivery', time: '15 minutes' }
};

function html(title, content) {
  return `<!DOCTYPE html>
<html>
<head><title>${title}</title></head>
<body>
  <h1>QuickBite Food Delivery</h1>
  <nav><a href="/">Home</a> | <a href="/restaurants">Restaurants</a> | <a href="/order/1001">Track Order</a></nav>
  <hr>
  ${content}
</body>
</html>`;
}

function send(res, statusCode, content) {
  res.writeHead(statusCode, { 'Content-Type': 'text/html' });
  res.end(content);
}

function handleRequest(req, res) {
  const path = new URL(req.url, `http://${req.headers.host}`).pathname;

  if (req.method !== 'GET') {
    return send(res, 405, html('405', '<h2>405 - Method Not Allowed</h2>'));
  }

  if (path === '/') {
    return send(res, 200, html('Home', '<h2>Welcome to QuickBite</h2><p>Order tasty food from local restaurants.</p>'));
  }

  if (path === '/restaurants') {
    const list = restaurants.map((restaurant) =>
      `<li><a href="/restaurant/${restaurant.id}">${restaurant.name}</a> - ${restaurant.cuisine}</li>`
    ).join('');
    return send(res, 200, html('Restaurants', `<h2>Restaurants</h2><ul>${list}</ul>`));
  }

  const restaurantMatch = path.match(/^\/restaurant\/(\d+)$/);
  if (restaurantMatch) {
    const restaurant = restaurants.find((item) => item.id === Number(restaurantMatch[1]));
    if (!restaurant) return send(res, 404, html('404', '<h2>Restaurant not found</h2>'));
    return send(res, 200, html(restaurant.name, `<h2>${restaurant.name}</h2><p>Cuisine: ${restaurant.cuisine}</p>`));
  }

  const orderMatch = path.match(/^\/order\/(\d+)$/);
  if (orderMatch) {
    const order = orders[orderMatch[1]];
    if (!order) return send(res, 404, html('404', '<h2>Order not found</h2>'));
    return send(res, 200, html('Order Status', `<h2>Order Status</h2><p>Restaurant: ${order.restaurant}</p><p>Status: ${order.status}</p><p>Arrival: ${order.time}</p>`));
  }

  send(res, 404, html('404', '<h2>Page not found</h2>'));
}

http.createServer(handleRequest).listen(3000, () => {
  console.log('HTTP app running at http://localhost:3000');
});
