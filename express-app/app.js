const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();
const PORT = 3001;

const restaurants = [
  { id: 1, name: 'Spice Garden', cuisine: 'Indian' },
  { id: 2, name: 'Green Bowl', cuisine: 'Healthy' }
];

const orders = {
  1001: { id: 1001, restaurant: 'Spice Garden', status: 'Out for delivery', delivered: false }
};

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerHelper('lowercase', (value) => value.toLowerCase());
app.set('view options', { layout: 'layouts/main' });
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.render('home', { title: 'Home' }));
app.get('/restaurants', (req, res) => res.render('restaurants', { title: 'Restaurants', restaurants }));

app.get('/restaurant/:id', (req, res) => {
  const restaurant = restaurants.find((item) => item.id === Number(req.params.id));
  if (!restaurant) return res.status(404).render('error', { title: 'Restaurant not found', message: 'We could not find that restaurant.' });
  res.render('restaurant', { title: restaurant.name, restaurant });
});

app.get('/order/:id', (req, res) => {
  const order = orders[req.params.id];
  if (!order) return res.status(404).render('error', { title: 'Order not found', message: 'We could not find that order.' });
  res.render('order', { title: `Order #${order.id}`, order });
});

app.use((req, res) => res.status(404).render('error', { title: 'Page not found', message: 'The page you requested does not exist.' }));

app.listen(PORT, () => console.log(`Express app running at http://localhost:${PORT}`));
