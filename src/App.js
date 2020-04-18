import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar.component"
import BooksList from "./components/books-list.component";
import BookInfo from "./components/books-info.component.js";
import AdminBooks from "./components/admin-books.component";

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Route path="/" exact component={BooksList} />
      <Route path="/bookinfo/:id" component={BookInfo} />
      <Route path="/admin" component={AdminBooks} />
    </Router>
  );
}

export default App;
