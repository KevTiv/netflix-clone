import { AxiosResponse } from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { MoviePanelProps, movieType, videoType } from '../type'
import styles from '../styles/Home.module.scss'

const MoviePanel = ({PanelName, moviesSelection}:MoviePanelProps) => {
    
    
  return (
    <>
        <div id={PanelName.toLowerCase()} className="w-full px-4 my-4 md:my-6 ">
            <h1 className="text-white/80 text-3xl md:text-4xl my-1 md:my-2 font-bold">{PanelName}</h1>
            <div className="overflow-hidden w-full h-full mx-4 ">
                {/* */}
                <div className={`relative overflow-x-scroll overflow-y-hidden whitespace-nowrap py-6 ${styles.no_scrollbar}`}>
                    {moviesSelection?.map( (movie :movieType) =>{
                        return(
                            <MovieCard key={movie.id!} movie={movie} />
                        )
                    })
                    }
                </div>
            </div>
        </div>
    </>
  )
}

type movieCardProps={
    movie: movieType
}
const MovieCard=({movie}:movieCardProps)=>{
    const axios = require('axios')
    const router = useRouter()
    let videoContainer = useRef<HTMLDivElement>(null)

    const [isMobileScreen, setIsMobileScreen] = useState<boolean>(false)
    const [trailerID, setTrailerID] = useState<string>()
    const [showTrailer, setShowTrailer] = useState<boolean>(false)
    const [isTrailerFound, setIsTrailerFound] = useState<boolean>(true)

    useEffect(()=>{
        window.innerWidth >= 1024 ? setIsMobileScreen(true) : setIsMobileScreen(false)
        const getMovieTrailer = async()=>{
            await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY_V3}&language=en-US&append_to_response=videos`)
            .then((res:AxiosResponse)=>{
                let currMovie = res.data
                let movieVideosDetail = currMovie?.videos.results.find((video: videoType) => video.name === 'Official Trailer')
                setTrailerID(movieVideosDetail?.key)

                if(trailerID!) setIsTrailerFound(false)
            })
        }

        getMovieTrailer()
    },[])
    return(
        <>
            <div 
                ref={videoContainer}
                onMouseEnter={()=>{
                    setShowTrailer(true)
                    
                }}
                onMouseLeave={()=>setShowTrailer(false)}
                className="relative inline-block w-[18rem] md:w-[20rem] aspect-[16/12] rounded-md bg-white/5 cursor-pointer hover:scale-y-[1.25] hover:scale-x-[1.025] hover:z-30 ease-in-out duration-200"
                onClick={()=>{
                    router.push(`/movie/${movie.id}`)
                }}>
                {showTrailer && isMobileScreen && isTrailerFound ? 
                    <ReactPlayer className="pointer-events-none" url={`https://www.youtube.com/watch?v=${trailerID}`}
                        width={`${videoContainer.current?.clientWidth}px`} height={`${videoContainer.current?.clientHeight}px`}
                        onEnded={()=>setShowTrailer(false)} volume={0} muted={true} 
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
                    <Image src={`${process.env.NEXT_PUBLIC_GET_POSTER_URL}${movie.poster_path}`} alt={`${movie.title}`} layout="fill" />
                }

                <div className="absolute bottom-1 left-1 w-9 md:w-14 aspect-[16/9] p-1 bg-black/50 rounded-xl">
                    <span className="relative inline-block w-full h-full">
                        <Image src="/tmdb.svg" alt="TMDB" layout="fill"/>
                    </span>
                </div>
            </div>
        </>
    )

}
export default MoviePanel
