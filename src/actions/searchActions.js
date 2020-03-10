import { SEARCH_MOVIE, FETCH_MOVIES, FETCH_MOVIE, LOADING } from './types';
import axios from 'axios';
import { APIKey } from '../APIKey';

export const searchMovie = text => dispatch => {
    dispatch({
        type: SEARCH_MOVIE,
        payload: text
    })
};

export const fetchMovies = text => dispatch => {
    const url = 'https://api.themoviedb.org';

    axios.get(`${url}/3/search/movie?api_key=${APIKey}&language=en-US&query=${text}&page=1`)
        .then(resp => {
            console.log("test", resp);
            dispatch({
                type: FETCH_MOVIES,
                payload: resp.data.results
            })
        }).catch(err => console.log(err))


}

export const fetchMovie = id => dispatch => {
    const url = 'https://api.themoviedb.org';
    const movie = []

    axios.get(`${url}/3/movie/${id}?api_key=${APIKey}&language=en-US`)
        .then(resp => {
            movie.push(resp.data);
            console.log("test movieID", movie);
            dispatch({
                type: FETCH_MOVIE,
                payload: resp.data
            })
        }).catch(err => console.log(err))
};

export const setLoading = () => {
    return {
        type: LOADING
    };
};