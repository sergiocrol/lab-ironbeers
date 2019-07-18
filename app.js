'use strict';

const express = require('express');
const hbs = require('hbs');
const path = require('path');

const app = express();
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
// dynamic views
app.set('views', path.join(__dirname, '/views'));
// static pages
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Get para cada una de las vistas
app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', async (req, res, next) => {
  try {
    const beers = await punkAPI.getBeers();
    console.log(beers);
    res.render('beers', { beers });
  } catch (error) {
    console.log(error);
  }
});

app.get('/random-beer', async (req, res, next) => {
  try {
    const randomBeer = await punkAPI.getRandom();
    res.render('randomBeers', randomBeer[0]);
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000);
