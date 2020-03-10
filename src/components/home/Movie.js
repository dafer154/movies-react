import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchMovie, setLoading } from '../../actions/searchActions';

import Spinner from '../layout/Spinner';

export class Movie extends Component {
    componentDidMount() {
        this.props.fetchMovie(this.props.match.params.id);
        this.props.setLoading();
    }
    render() {
        const { loading, movie } = this.props;
        console.log('movieeeeee aaa', movie.original_title);

        const imageMovie = `https://image.tmdb.org/t/p/w300${movie.poster_path}`

        let movieInfo = (
            <div className="container">
                <div className="row">
                    <div className="col-md-4 card card-body">
                        <img src={imageMovie} className="thumbnail" alt="Poster" />
                    </div>
                    <div className="col-md-8">
                        <h2 className="mb-4">{movie.original_title}</h2>
                        <ul className="list-group">
                            <li className="list-group-item">
                                <strong>Released:</strong> {movie.release_date}
                            </li>
                            <li className="list-group-item">
                                <strong>Rated:</strong> {movie.vote_average}
                            </li>
                            <li className="list-group-item">
                                <strong>IMDB Rating:</strong> {movie.popularity}
                            </li>
                            <li className="list-group-item">
                                <strong>Budget:</strong> {movie.budget}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="card card-body bg-dark my-5 text-light">
                        <div className="col-md-12">
                            <h3>About </h3>
                            {movie.original_title}
                            <hr />
                            <a
                                href={movie.homepage}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                            >
                                View on IMDB
                      </a>
                            <Link to="/" className="btn btn-default text-light">
                                Go Back To Search
                      </Link>
                        </div>
                    </div>
                </div>
            </div>
        );

        let content = loading ? <Spinner /> : movieInfo;
        return <div>{content}</div>;
    }
}

const mapStateToProps = state => ({
    loading: state.movies.loading,
    movie: state.movies.movie
});

export default connect(
    mapStateToProps,
    { fetchMovie, setLoading }
)(Movie);