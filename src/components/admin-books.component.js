import React, { Component } from 'react';
import axios from 'axios';

export default class AdminBooks extends Component {

    constructor(props) {
        super(props);

        this.onChangeIsbn = this.onChangeIsbn.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeAuthor = this.onChangeAuthor.bind(this);
        this.onChangePublicationYear = this.onChangePublicationYear.bind(this);
        this.onChangePublisher = this.onChangePublisher.bind(this);
        this.onChangeImage_url_s = this.onChangeImage_url_s.bind(this);
        this.onChangeImage_url_m = this.onChangeImage_url_m.bind(this);
        this.onChangeImage_url_l = this.onChangeImage_url_l.bind(this);
        this.onChangeCopies = this.onChangeCopies.bind(this);
        this.onChangeAvailable = this.onChangeAvailable.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            isbn: '',
            title: '',
            author: '',
            publication_year: 0,
            publisher: '',
            image_url_s: '',
            image_url_m: '',
            image_url_l: '',
            copies: 0,
            available: 0,
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/books/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        //books: response.data.map(user => books.isbn),
                        //isbn: response.data[0].isbn
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onChangeIsbn(e) {
        this.setState({
            isbn: e.target.value
        })
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        })
    }

    onChangeAuthor(e) {
        this.setState({
            author: e.target.value
        })
    }

    onChangePublicationYear(e) {
        this.setState({
            publication_year: e.target.value
        })
    }

    onChangePublisher(e) {
        this.setState({
            publisher: e.target.value
        })
    }

    onChangeImage_url_s(e) {
        this.setState({
            image_url_s: e.target.value
        })
    }

    onChangeImage_url_m(e) {
        this.setState({
            image_url_m: e.target.value
        })
    }

    onChangeImage_url_l(e) {
        this.setState({
            image_url_l: e.target.value
        })
    }

    onChangeCopies(e) {
        this.setState({
            copies: e.target.value
        })
    }

    onChangeAvailable(e) {
        this.setState({
            available: e.target.value
        })
    }

    onSubmit = async (e) => {
        e.preventDefault();

        const book = {
            isbn: this.state.isbn,
            title: this.state.title,
            author: this.state.author,
            publication_year: this.state.publication_year,
            publisher: this.state.publisher,
            image_url_s: this.state.image_url_s,
            image_url_m: this.state.image_url_m,
            image_url_l: this.state.image_url_l,
            copies: this.state.copies,
            available: this.state.available, // EDGE CASE NEEDS TO BE FIX: AVAILABLE CAN'T BE HIGHER THAN COPIES NOR NEGATIVE
        }

        console.log(book);

        await axios.post('http://localhost:5000/books/add', book)
            .then(res => console.log(res.data));

        window.location = '/';
    }

    render() {
        return (
            <div className="container" >
                <h3>Add a new Book (Admin)</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Isbn:</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.isbn}
                            onChange={this.onChangeIsbn}
                        />
                    </div>
                    <div className="form-group">
                        <label>Title: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.title}
                            onChange={this.onChangeTitle}
                        />
                    </div>
                    <div className="form-group">
                        <label>Author: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.author}
                            onChange={this.onChangeAuthor}
                        />
                    </div>
                    <div className="form-group">
                        <label>Publication Year: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.publicationYear}
                            onChange={this.onChangePublicationYear}
                        />
                    </div>
                    <div className="form-group">
                        <label>Publisher: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.publisher}
                            onChange={this.onChangePublisher}
                        />
                    </div>
                    <div className="form-group">
                        <label>Image_url_s: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.image_url_s}
                            onChange={this.onChangeImage_url_s}
                        />
                    </div>
                    <div className="form-group">
                        <label>Image_url_m: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.image_url_m}
                            onChange={this.onChangeImage_url_m}
                        />
                    </div>
                    <div className="form-group">
                        <label>Image_url_l: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.image_url_l}
                            onChange={this.onChangeImage_url_l}
                        />
                    </div>
                    <div className="form-group">
                        <label>Copies: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.copies}
                            onChange={this.onChangeCopies}
                        />
                    </div>
                    <div className="form-group">
                        <label>Available: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.available}
                            onChange={this.onChangeAvailable}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Add a Book" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}