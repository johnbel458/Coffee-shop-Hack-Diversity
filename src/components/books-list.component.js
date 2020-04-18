import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Book = props => (
    <tr>
        <td>
            <Link to={"/bookinfo/" + props.books._id}>{props.books.title}</Link>
        </td>
        <td>{props.books.author}</td>
        <td>{props.books.publication_year}</td>
        <td>{props.books.publisher}</td>
        <td>{props.books.copies}</td>
        <td>{props.books.available}</td>
        <td>
            <Link to={"/bookinfo/" + props.books._id}>Borrow or Return</Link>
        </td>
    </tr>
)

export default class BooksList extends Component {
    constructor(props) {
        super(props);

        this.state = { books: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/books/')
            .then(response => {
                this.setState({ books: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    booksList() {
        return this.state.books.map(currentbooks => {
            return <Book books={currentbooks} key={currentbooks._id} />;
        })
    }

    render() {
        return (
            <div className="container">
                <h3>Books</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <td>Title</td>
                            <td>Author</td>
                            <td>Publication_year</td>
                            <td>Publisher</td>
                            <td>Copies</td>
                            <td>Available</td>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.booksList()}
                    </tbody>
                </table>
            </div>
        )
    }
}