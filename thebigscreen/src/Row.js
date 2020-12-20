import React,{useState, useEffect} from 'react'
import axios from './axios'
import "./Row.css"
import Youtube from 'react-youtube'
import movieTrailer from 'movie-trailer'
import Popup from './Popup'

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {

    // const [movie, setMovie]= useState([]);

    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    //code which runs based on specific condition/variable

    useEffect(() => {
        //if [], run once when row loads and dont run it again, only page load
        //[movies] run everytime when row loads

        async function fetchData(){
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: "390",
        width:"100%",
        playerVars: {
            autoplay : 1,
        },
    };

    const handleClick = (movie) => {

        if(trailerUrl){
            setTrailerUrl('');
        }else{
            movieTrailer(movie?.name || "")
            .then(url => {
                const urlParams = new URLSearchParams (new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
            }).catch((error) => console.log(error));
        }
        
    }

    return (
        <div className='row'>
            <h2>{title}</h2>
            
            <div className="row__posters">
                {/* row posters */}

                {movies.map((movie) => (
                   

                    <img 
                    key={movie.id}
                    onClick={() => handleClick(movie)}
                    className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                    src={`${base_url}${isLargeRow? movie.poster_path : movie.poster_path}`} alt={movie.overview}/>
                   
                    
                ))}
                
            </div>
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
      </div>
    )
}

export default Row
