import Image from 'next/image'
import { AxiosResponse } from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { heroPropsType, videoType } from '../type'
import { useRouter } from 'next/router'


const Hero = ({movie}:heroPropsType) => {
    const axios = require('axios')
    const router = useRouter()
    let videoContainer = useRef<HTMLDivElement>(null)
    const [movieTrailerId, setMovieTrailerId] = useState<string>()
    const [isVideoPlay, setIsVideoPlay] = useState<boolean>(false)
    const [isMobileScreen, setIsScreenMobile] = useState<boolean>(false)
    useEffect(()=>{
        window.innerWidth >= 1024 ? setIsScreenMobile(true) : setIsScreenMobile(false)
    
        setTimeout(()=>{
        setIsVideoPlay(true)
        },1500)

        const getTrailer=async()=>{
             await axios.get(`https://api.themoviedb.org/3/movie/${movie!.id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY_V3}&language=en-US&append_to_response=videos`)
                .then((res:AxiosResponse)=>{
                    let currMovie = res.data
                    let currMovieTrailerId = currMovie.videos.results.find((video: videoType) => video.name === 'Official Trailer').key
                    setMovieTrailerId(currMovieTrailerId)
                })
                .catch((err:AxiosResponse)=>{
                    console.error(err)
                })
        }
       getTrailer()
    },[])
  return (
    <>
        <div className="relative w-[100vw] h-[65vh]" >
            <div ref={videoContainer} className="absolute top-0 left-0 right-0 w-[100vw] aspect-[16/12] pointer-events-none">
              {isVideoPlay && isMobileScreen && movieTrailerId!=='' ? 
              <div>
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
              </div>
            :
            <div className="w-full h-full">
              <Image className="opacity-30" src={`${process.env.NEXT_PUBLIC_GET_POSTER_URL}${movie!.poster_path}`} alt={movie?.title} layout="fill" priority/>
            </div>
            }
              {/* <Image className="opacity-30" src={`${process.env.NEXT_PUBLIC_GET_POSTER_URL}${movie?.poster_path}`} alt={movie?.title} layout="fill" priority/> */}
                <div className="absolute left-0  right-0 top-4 w-full h-4/5 flex justify-between">
                    <div className="w-2/3 h-full flex flex-col justify-end items-start px-8 translate-y-[9rem]">
                        <span className="text-9xl text-white font-bold">
                            {movie?.title}
                        </span>
                        <span className="text-4xl text-white my-6">
                            {movie?.overview}
                        </span>
                        <button className="flex justify-around items-center text-white text-xl bg-white/30 rounded-md px-4 py-2 my-4"
                            onClick={()=>{
                                router.push(`/movie/${movie?.id}`)
                            }}>
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path fill="white" d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372s372 166.6 372 372s-166.6 372-372 372z"/><path fill="white" d="M464 336a48 48 0 1 0 96 0a48 48 0 1 0-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"/></svg>
                            {' '}Learn More
                        </button>
                    </div>
                    <div className="w-1/3 h-full flex flex-col justify-end items-end ">
                        <span className="bg-white/20 py-2 px-6 text-white text-lg w-1/3 ">
                            {movie?.adult ? '18+' : '3+'}
                        </span>
                    </div>
                </div>
            </div>

        </div>
    </>
  )
}

export default Hero