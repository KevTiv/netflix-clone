import { AxiosResponse } from 'axios'
import { NextPage } from 'next'
import Image from 'next/image'
import {useRouter} from 'next/router'
import { useEffect, useState, useRef } from 'react'
import { movieDetailPropsType, moviePageProps, videoType } from '../../type'
import MoviePanel from '../../components/moviePanel'
import ReactPlayer from 'react-player'


const Movie:NextPage<moviePageProps> = ({movie, movieTrailerId, similarMoviesSelection}) => {
  const router = useRouter()
  const videoContainer = useRef<HTMLDivElement>(null)
  
  const [isVideoPlay, setIsVideoPlay] = useState<boolean>(false)
  const [isScreenMobile, setIsMobileScreen] = useState<boolean>(false)

  useEffect(()=>{
    window.innerWidth >= 1024 ? setIsMobileScreen(true) : setIsMobileScreen(false)
    
    setTimeout(()=>{
      setIsVideoPlay(true)
    },1500)

    console.log(movieTrailerId)
  },[])
  return (
    <>
      <div className=" relative w-full h-[100vh]">
        <div>
          <div ref={videoContainer} className="relative w-[100vw] aspect-[16/12]" >
            {isVideoPlay && isScreenMobile && movieTrailerId!==null ? 
              <ReactPlayer className="pointer-events-none" url={`https://www.youtube.com/watch?v=${movieTrailerId}`}
                width={`${videoContainer.current?.clientWidth}px`} height={`${videoContainer.current?.clientHeight}px`}
                onEnded={()=>setIsVideoPlay(false)} volume={0} muted={true} 
                config={{
                    youtube: {
                        playerVars: { 
                            autoplay: 1,
                            controls: 0,
                            mute: 1,
                          }
                    }
                }}
              />
            :
              <Image className="opacity-30" src={`${process.env.NEXT_PUBLIC_GET_POSTER_URL}${movie.poster_path}`} alt={movie.title} layout="fill" priority/>
            }

          </div>
            <div className="z-10 w-full h-32 absolute top-8 left-0 flex justify-center items-center">
              <span className="relative z-10 w-32 md:w-44 aspect-[16/9] ">
                <Image src={'/netflix-logo.png'} alt={'Netflix'} layout="fill" />
              </span>
            </div>
            <span onClick={()=>router.push('/')} className="z-10 absolute w-8 md:w-14 aspect-1 top-8 right-4 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                <path fill="white" d="M18.36 19.78L12 13.41l-6.36 6.37l-1.42-1.42L10.59 12L4.22 5.64l1.42-1.42L12 10.59l6.36-6.36l1.41 1.41L13.41 12l6.36 6.36z"/>
              </svg>
            </span>
        </div>
        
        <div className="w-[100vw] h-1/2 relative">
          <div className="absolute -top-20 lg:-top-[20rem] w-full h-full lg:py-8">
            <div className="flex justify-center items-center lg:justify-start lg:ml-14">
              <h1 className="text-white text-[2rem] leading-7 md:text-7xl scale-110 font-bold">
                {movie.title}
              </h1>
            </div>
            <div className="text-white my-4 md:my-6 lg:my-9 md:text-3xl lg:text-xl lg:justify-start lg:ml-12">
              <div className="flex justify-center items-center lg:justify-start my-3">
                <span className="flex justify-center items-center">
                  {movie.vote_average} Ratings
                </span>
                  {movie.adult ? <span className="mx-4 border-2 border-white/25 rounded-md px-4 py-2">18+</span> : <span className="mx-4 border-2 border-white/25 rounded-md px-4 py-2">3+</span>}
                <span>
                  {movie.release_date?.slice(0,4)}
                </span>
                <span className="mx-4">
                  {movie.runtime} Min.
                </span>
              </div>
              <div className="hidden lg:grid col-span-8 gap-2 ">
                <div className="hidden grid-cols-5 lg:flex justify-center items-center">
                  {movie.overview}
                </div>
                <div className="hidden grid-cols-3 col-start-6 lg:flex flex-col">
                  <div className="hidden lg:flex justify-start items-center">
                    <span className="text-white/70">Genres:</span>
                    {movie.genres?.map((genre, index) => {
                      return(
                        <span key={index} className="mx-1.5">
                          {genre.name}
                        </span>
                      )
                    })}
                  </div>
                  <div className="hidden lg:flex justify-start items-center">
                    <span className="text-white/70">Production Companies:</span>
                    {movie.production_companies?.map((company, index) => {
                      return(
                        <span key={index} className="mx-1.5">
                          {company.name}
                        </span>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center ">
              <button className="text-white text-3xl md:text-5xl font-bold bg-red-600 border-none px-10 py-4 my-4 rounded-md"
                onClick={()=>router.push(movie.homepage ? movie.homepage : `/movie/${movie.id}`)}>Go to Movie Website</button>
            </div>
            {similarMoviesSelection ? 
              <div className="mx-2 lg:mx-4">
                <MoviePanel PanelName={`Similar to ${movie.title}`} moviesSelection={similarMoviesSelection}/>       
              </div>
              :
              null 
            } 
            
          </div>
        </div>
          
      </div>
    </>
  )
}

export default Movie

export async function getServerSideProps(context:any){
  const axios = require('axios')
  let movie, movieTrailerId, similarMoviesSelection

  movieTrailerId = null

  await axios.get(`https://api.themoviedb.org/3/movie/${context.params.id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY_V3}&language=en-US&append_to_response=videos`)
  .then((res:AxiosResponse)=>{
    movie = res.data
    movieTrailerId = movie.videos.results.find((video: videoType) => video.name === 'Official Trailer').key
  })
  .catch((err:AxiosResponse)=>{
    console.error(err)
  })
  

  await axios.get(`https://api.themoviedb.org/3/movie/${context.params.id}/similar?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY_V3}&language=en-US&page=1`)
  .then((res:AxiosResponse)=>{
    // similarMoviesSelection = JSON.stringify(res.data.slice(0,20))
    similarMoviesSelection = res.data.results.slice(0,20)
  })
  .catch((err:AxiosResponse)=>{
    console.error(err)
    
  })

  return {
      props: {
        movie,
        movieTrailerId,
        similarMoviesSelection
      }
    }
}

