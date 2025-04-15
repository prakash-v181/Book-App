'use strict';

// Application Dependencies
const express = require('express');
const pg = require('pg');
const superagent = require('superagent');
const methodOverride = require('method-override');
const app = express();

// Enviroment variables
require('dotenv').config();
const PORT = process.env.PORT || 3000;

// Database Setup
const client = new pg.Client(process.env.DATABASE_URL);

// Application Middleware
app.use(express.urlencoded({ extended: true, }));// default clientused to send html forms
app.use(express.static('./public'));// route to public folder with static files
// Set the view engine for server-side templating
app.set('view engine', 'ejs');
app.use(methodOverride(putDeleteMethods));// function to send (Put, Delete) http methods to server

// Routes
app.get('/', getFromDataBase);//books from DB
app.get('/search', getSearchForm);
app.post('/search/result', getApiBooks);// brings search result from the Google Books API
app.post('/select', getSelectForm);
app.post('/add', addToDataBase);
app.post('/detail/:book_id', showDetails);
app.delete('/detail/:book_id', deleteBook);
app.post('/update/:book_id', getUpdateForm);
app.put('/update/:book_id', updateDetails);

app.get('*', (request, response) => response.status(404).send('This route does not exist'));

/*************************** Functions ***************************/
function updateDetails(request, response){
  let { id, title, author, description, image_url, isbn } = request.body;
  const SQL = 'UPDATE books SET title=$1, author=$2, description=$3, image_url=$4, isbn=$5 WHERE id=$6;';
  const values = [title, author, description, image_url, isbn, request.params.book_id];
  client.query(SQL, values)
    .then(() => response.redirect(`/`))
    .catch(error => errorHandler(error, response));
}
function getUpdateForm(req, res){
  let { id, title, author, description, image_url, isbn } = req.body;
  res.render('pages/books/update', {book:req.body,});
}
function deleteBook(req, res){
  let sql = 'DELETE FROM books WHERE id=$1;';
  let values = [req.params.book_id];
  return client.query(sql, values)
    .then(res.redirect('/'))
    .catch(error => errorHandler(error, res));
}
function showDetails(req, res){ // select data from database to view its informations
  let SQL = `SELECT * FROM books WHERE id=${req.params.book_id};`;
  return client.query(SQL)
    .then(result => {
      res.render('pages/books/detail', {book:result.rows[0],});
    })
    .catch(error => errorHandler(error, res));
}
function addToDataBase(req, res){
  let {title, author, description, image_url, isbn} = req.body;
  let SQL = 'INSERT INTO books (title, author, description, image_url, isbn) VALUES ($1, $2, $3, $4, $5);';
  let values = [title, author, description, image_url, isbn];
  return client.query(SQL, values)
    .then(res.redirect('/'))// redirect to view detail page of that added book
    .catch(err => errorHandler(err, res));
}
function getSelectForm(req, res){
  let {title, author, description, image_url, isbn,} = req.body;
  res.render('pages/searches/new', {book:req.body,});
}
function getApiBooks(req, res){// search for books through Google API
  let url = searchUrl(req);
  superagent.get(url)
    .then(data => {
      return data.body.items.map(bookResult => new Books(bookResult.volumeInfo));
    })
    .then(results => {
      res.render('pages/searches/result', { booksArray: results, });
    })
    .catch(err => errorHandler(err, res));
}
function getSearchForm(req, res){
  res.render('pages/searches/form');
}
function getFromDataBase(req, res){ // display all contents of the database to the main page
  let sql = `SELECT * FROM books`;
  return client.query(sql)
    .then(data => {
      if (data.rows.rowCount === 0) {
        res.render('pages/searches/form');
      }else{
        res.render('pages/index', { booksArray: data.rows, rowCount : data.rowCount,});
      }
    })
    .catch(err => errorHandler(err, res));
}
/*************************** Api search ***************************/
function searchUrl(req) {
  let searchParam = req.body.search[1] === 'title' ? `${req.body.search[0]}+intitle` : `${req.body.search[0]}+inauthor`;
  return `https://www.googleapis.com/books/v1/volumes?q=${searchParam}`;
}
function Books(data) {
  this.title = data.title || 'Sorry title not available';// data.title ? data.title : 'no title';
  this.author = data.authors || 'Opss.. Author Unknown';
  this.description = data.description || 'Sorry no description available';
  this.image_url = data.imageLinks && data.imageLinks.thumbnail || 'Sorry no Image available';
  this.isbn = data.industryIdentifiers && data.industryIdentifiers[0].identifier || 'Sorry no ISBN available';// data.industryIdentifiers ? `ISBN: ${data.industryIdentifiers[0].identifier}` : 'No ISBN available';
}
/*************************** useful Functions ***************************/
function putDeleteMethods(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    let method = req.body._method;
    delete req.body._method;
    return method;
  }
}
function errorHandler(err, res){
  console.log(err);
  if (res) res.status(500).render('pages/error');
  // res.status(500).render('pages/error'), {err: 'oops'});
  // res.send(err);
}
client.connect()
  .then(() => {
    console.log('connected to database');
    app.listen(PORT, () => console.log(`listening on port ${PORT}`));
  })
  .catch(err => {
    throw `pg startup error: ${err}`;//.message
  });
// client.on('error', err => console.error(err));
