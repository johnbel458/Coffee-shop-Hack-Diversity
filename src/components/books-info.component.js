import React, { Component } from 'react';
import axios from 'axios';

export default class BooksInfo extends Component {
    constructor(props) {
        super(props);

        this.onChangeAvailable = this.onChangeAvailable.bind(this);
        this.onSubmitBorrow = this.onSubmitBorrow.bind(this);
        this.onSubmitReturn = this.onSubmitReturn.bind(this);

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
        axios.get('http://localhost:5000/books/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    isbn: response.data.isbn,
                    title: response.data.title,
                    author: response.data.author,
                    publication_year: response.data.publication_year,
                    publisher: response.data.publisher,
                    image_url_s: response.data.image_url_s,
                    image_url_m: response.data.image_url_m,
                    image_url_l: response.data.image_url_l,
                    copies: response.data.copies,
                    available: response.data.available,
                })
            })
            .catch(function (error) {
                console.log(error.response);
            })
    }

    onChangeAvailable(e) {
        this.setState({
            available: e.target.value
        })
    }

    onSubmitBorrow = async (e) => {
        e.preventDefault();

        if (this.state.available == 0) {
            console.log('not enough');// SHOULD DISPLAY A MESSAGE IN THE SCREEN THAT SAYS IT CAN'T
        }
        else {
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
                available: this.state.available - 1,
            }

            console.log(book);

            await axios.post('http://localhost:5000/books/update/' + this.props.match.params.id, book)
                .then(res => console.log(res.data));

            window.location.reload(true);
        }
    }

    onSubmitReturn = async (e) => {
        e.preventDefault();
        if (this.state.available == this.state.copies) {
            console.log('too much enough'); // SHOULD DISPLAY A MESSAGE IN THE SCREEN THAT SAYS IT CAN'T
        }
        else {
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
                available: this.state.available + 1,
            }

            console.log(book);

            await axios.post('http://localhost:5000/books/update/' + this.props.match.params.id, book)
                .then(res => console.log(res.data));

            window.location.reload(true);
        }
    }

    render() {

        return (
            <div className="container" >
                <h3>Add a new Book (Admin)</h3>
                &nbsp;&nbsp;&nbsp;
                <form>
                    <div className="form-group">
                        <img src={this.state.image_url_l} alt="" align="right"></img>
                    </div>
                    <div className="form-group">
                        <label>Isbn: {this.state.isbn} </label>
                    </div>
                    <div className="form-group">
                        <label>Title: {this.state.title}</label>
                    </div>
                    <div className="form-group">
                        <label>Publication Year: {this.state.publication_year}</label>
                    </div>
                    <div className="form-group">
                        <label>Publisher: {this.state.publisher}</label>
                    </div>
                    <div className="form-group">
                        <label>Copies: {this.state.copies}</label>
                    </div>
                    <div className="form-group">
                        <label>Available: {this.state.available}</label>
                    </div>
                </form>
                <div>
                    <form onSubmit={this.onSubmitBorrow}>
                        <div className="form-group">
                            <input type="submit" value="Borrow" className="btn btn-primary" />
                        </div>
                    </form>
                    <form onSubmit={this.onSubmitReturn}>
                        <div className="form-group">
                            <input type="submit" value="Return" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
                <div>
                    <a href="/">Go Back</a>
                </div>
            </div>
        )
    }
}