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
import Footer from '../components/footer'


const Home: NextPage<homePagePropsType> = (props) => {
  let appBody = useRef<HTMLElement>(null)
  const [isMobileMenuOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix Clone With The Movie DB API</title>
        <meta name="description" content="Netflix Clone by Kevin Tivert" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar openMenu={()=>setIsOpen(!isMobileMenuOpen)} isMobileMenuOpen={isMobileMenuOpen} 
        closeMenu={()=>setIsOpen(false)}/>
      <main ref={appBody} className={`${styles.main} mt-16 ${isMobileMenuOpen? 'opacity-40' : 'opacity-100'}`}>
        <Hero movie={props.popularMoviesSelection?.[0]}/>
        <MoviePanel lazyLoad={false} PanelName={'Popular on Netflix'} moviesSelection={props.popularMoviesSelection}/>
        <MoviePanel lazyLoad={false} PanelName={'Trending on Netflix'} moviesSelection={props.trendingMoviesSelection}/>
        <MoviePanel lazyLoad={true} PanelName={'Action'} moviesSelection={props.actionMoviesSelection}/>
        <MoviePanel lazyLoad={true} PanelName={'Adventure'} moviesSelection={props.adventureMoviesSelection}/>
        <MoviePanel lazyLoad={true} PanelName={'Comedy'} moviesSelection={props.comedyMoviesSelection}/>
        <MoviePanel lazyLoad={true} PanelName={'Family'} moviesSelection={props.familyMoviesSelection}/>
        <MoviePanel lazyLoad={true} PanelName={'Fantasy'} moviesSelection={props.fantasyMoviesSelection}/>
        <MoviePanel lazyLoad={true} PanelName={'Romance'} moviesSelection={props.RomanceMoviesSelection}/>
        <MoviePanel lazyLoad={true} PanelName={'Sci-Fi'} moviesSelection={props.scifiMoviesSelection}/>
        <MoviePanel lazyLoad={true} PanelName={'History'} moviesSelection={props.historyMoviesSelection}/>
        <MoviePanel lazyLoad={true} PanelName={'Horror'} moviesSelection={props.horrorMoviesSelection}/>
      </main>
      <Footer/>
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