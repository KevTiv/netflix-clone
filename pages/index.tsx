import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

import { AxiosResponse } from 'axios'
import { homePagePropsType } from '../type'

import Navbar from '../components/navbar'
import MoviePanel from '../components/moviePanel'
import { useEffect, useRef, useState } from 'react'
import Hero from '../components/hero'


const Home: NextPage<homePagePropsType> = (props) => {
  let appBody = useRef<HTMLElement>(null)
  const [isMobileMenuOpen, setIsOpen] = useState<boolean>(false)
  const [highlightedHeroMovie, setHighlightedHeroMovie] = useState<number>(0)
  useEffect(()=>{
    const highlightPopularMovie=()=> setHighlightedHeroMovie(Math.floor(Math.random() * props.popularMoviesSelection!.length))
    
    if(props.popularMoviesSelection)  highlightPopularMovie()
  },[])
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix Clone With The Movie DB API</title>
        <meta name="description" content="Netflix Clone by Kevin Tivert" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar setIsOpen={()=>setIsOpen(!isMobileMenuOpen)} isMobileMenuOpen={isMobileMenuOpen} 
        closeMenu={()=>setIsOpen(false)}/>
      <main ref={appBody} className={`${styles.main} mt-16 ${isMobileMenuOpen? 'opacity-40' : 'opacity-100'}`}>
        <Hero movie={props.popularMoviesSelection?.[highlightedHeroMovie]}/>
        <MoviePanel PanelName={'Popular on Netflix'} moviesSelection={props.popularMoviesSelection}/>
        <MoviePanel PanelName={'Trending on Netflix'} moviesSelection={props.trendingMoviesSelection}/>
        <MoviePanel PanelName={'Action'} moviesSelection={props.actionMoviesSelection}/>
        <MoviePanel PanelName={'Adventure'} moviesSelection={props.adventureMoviesSelection}/>
        <MoviePanel PanelName={'Comedy'} moviesSelection={props.comedyMoviesSelection}/>
        <MoviePanel PanelName={'Family'} moviesSelection={props.familyMoviesSelection}/>
        <MoviePanel PanelName={'Fantasy'} moviesSelection={props.fantasyMoviesSelection}/>
        <MoviePanel PanelName={'Romance'} moviesSelection={props.RomanceMoviesSelection}/>
        <MoviePanel PanelName={'Sci-Fi'} moviesSelection={props.scifiMoviesSelection}/>
        <MoviePanel PanelName={'History'} moviesSelection={props.historyMoviesSelection}/>
        <MoviePanel PanelName={'Horror'} moviesSelection={props.horrorMoviesSelection}/>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/tmdb.svg" alt="TMDB Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home

export async function getServerSideProps(){
    const axios = require('axios')

    let popularMoviesSelection, trendingMoviesSelection, 
      actionMoviesSelection, adventureMoviesSelection, comedyMoviesSelection,
      familyMoviesSelection, fantasyMoviesSelection, RomanceMoviesSelection,
      scifiMoviesSelection, historyMoviesSelection, horrorMoviesSelection 

    // Popular
    await axios.get(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY_V3}`)
    .then(( res:AxiosResponse)=>{
        popularMoviesSelection = res.data.results.slice(0,20)

        // movieTrailerId = movie.videos.results.find((video: videoType) => video.name === 'Official Trailer').key
        // console.log('movieTrailerID==>',movieTrailerId)
    })
    .catch((err:AxiosResponse)=>{
      console.error('Error fetching Popular movie selection ',err)
    })
    // Trending
    await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY_V3}`)
    .then((res:AxiosResponse)=>{
      trendingMoviesSelection = res.data.results.slice(10,20)
    })
    .catch((err:AxiosResponse)=>{
      console.error('Error fetching Trending movie selection ',err)
    })
    // Action
    await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY_V3}&with_genres=28`)
    .then((res:AxiosResponse)=>{
      actionMoviesSelection = res.data.results.slice(5,20)
    })
    .catch((err:AxiosResponse)=>{
      console.error('Error fetching Action movie selection ',err)
    })
    // Adventure
    await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY_V3}&with_genres=12`)
    .then((res:AxiosResponse)=>{
      adventureMoviesSelection = res.data.results.slice(0,20)
    })
    .catch((err:AxiosResponse)=>{
      console.error('Error fetching Adventure movie selection ',err)
    })
    // Comedy
    await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY_V3}&with_genres=35`)
    .then((res:AxiosResponse)=>{
      comedyMoviesSelection = res.data.results.slice(0,20)
    })
    .catch((err:AxiosResponse)=>{
      console.error('Error fetching Comedy movie selection ',err)
    })
    // Family
    await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY_V3}&with_genres=10751`)
    .then((res:AxiosResponse)=>{
      familyMoviesSelection = res.data.results.slice(15,20)
    })
    .catch((err:AxiosResponse)=>{
      console.error('Error fetching Family movie selection ',err)
    })
    // Fantasy
    await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY_V3}&with_genres=14`)
    .then((res:AxiosResponse)=>{
      fantasyMoviesSelection = res.data.results.slice(5,20)
    })
    .catch((err:AxiosResponse)=>{
      console.error('Error fetching Fantasy movie selection ',err)
    })
    // Romance
    await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY_V3}&with_genres=10749`)
    .then((res:AxiosResponse)=>{
      RomanceMoviesSelection = res.data.results.slice(0,20)
    })
    .catch((err:AxiosResponse)=>{
      console.error('Error fetching Romance movie selection ',err)
    })
    // Sci-Fi
    await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY_V3}&with_genres=878`)
    .then((res:AxiosResponse)=>{
      scifiMoviesSelection = res.data.results.slice(0,20)
    })
    .catch((err:AxiosResponse)=>{
      console.error('Error fetching Sci-Fi movie selection ',err)
    })
    // History
    await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY_V3}&with_genres=36`)
    .then((res:AxiosResponse)=>{
      historyMoviesSelection = res.data.results.slice(0,20)
    })
    .catch((err:AxiosResponse)=>{
      console.error('Error fetching History movie selection ',err)
    })
    // Horror
    await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY_V3}&with_genres=27`)
    .then((res:AxiosResponse)=>{
      horrorMoviesSelection = res.data.results.slice(0,20)
    })
    .catch((err:AxiosResponse)=>{
      console.error('Error fetching Horror movie selection ',err)
    })

    return {
      props: {
        popularMoviesSelection, trendingMoviesSelection, actionMoviesSelection, 
        adventureMoviesSelection, comedyMoviesSelection, familyMoviesSelection, 
        fantasyMoviesSelection, RomanceMoviesSelection, scifiMoviesSelection, 
        historyMoviesSelection, horrorMoviesSelection 
      }
    }
}