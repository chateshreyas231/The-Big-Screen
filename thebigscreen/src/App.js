import './App.css';
import React,{ useEffect } from 'react';
import Row from './Row';
import requests from './requests';
import Banner from './Banner';
import Nav from './Nav';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Login from './Login';

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(()=>{
    auth.onAuthStateChanged(authUser => {
      console.log('THE USER IS >>> ', authUser);

      if(authUser){

       dispatch({
         type: 'SET_USER',
         user: authUser
       })
      }
      else{
       dispatch({
         type:'SET_USER',
         user: null
       })
      }
    })
 }, [])

  return (
    <div>
    

    {
      user?(
        <>
        <div className="app">
        {/* Navigation Bar */}
        <Nav />
        {/* Banners */}
        <Banner />
        {/* Rows */}
        <Row title="Netflix Orignals" fetchUrl={requests.fetchNetflixOriginals} isLargeRow={true}/>
        <Row title="Trending Now" fetchUrl={requests.fetchTrending}/>
        <Row title="Top Rated" fetchUrl={requests.fetchTopRated}/>
        <Row title="Action Movies" fetchUrl={requests.fetchActionMovies}/>
        <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies}/>
        <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies}/>
        <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies}/>
        <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries}/>
        </div>
        </>
      ):(
        <Login/>
      )
    }
        
    </div>

  );
  
}

export default App;
