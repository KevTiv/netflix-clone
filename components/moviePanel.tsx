import { AxiosResponse } from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { MoviePanelProps, movieType, videoType } from '../type'
import styles from '../styles/Home.module.scss'

const MoviePanel = ({PanelName, moviesSelection, lazyLoad}:MoviePanelProps) => {
    let panelRef = useRef<HTMLDivElement>(null)
    const [showPanel, setShowPanel] = useState<boolean>(false)
    
    useEffect(()=>{
        const observer = new IntersectionObserver(([entry]) => {
            //Show Panel
            if (entry.isIntersecting) setShowPanel(true)
        },{
            root: null,
            rootMargin: "0px",
            threshold: 0.1
        }
        )

        if(panelRef.current) observer.observe(panelRef.current)

    },[panelRef])
  return (
    <>
        
            <div ref={panelRef} id={PanelName.toLowerCase()} className="w-full px-4 my-4 md:my-6 ">
                <h1 className="text-white/80 text-3xl md:text-4xl my-1 md:my-2 font-bold">{PanelName}</h1>
                {showPanel || !lazyLoad ? 
                    <div className="overflow-hidden w-[98%] h-full mx-4 ">
                            <div  className={`relative overflow-x-scroll overflow-y-hidden whitespace-nowrap py-10 ${styles.no_scrollbar}`}>
                                {moviesSelection?.map( (movie :movieType) =>{
                                    return(
                                        <MovieCard key={movie.id!} movie={movie} />
                                    )
                                })
                                }
                            </div>
                    </div>
                :null}
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
            }).catch((err:AxiosResponse)=>{
                console.error('movie=>',movie,err)
                setShowTrailer(false)
                setIsTrailerFound(false)
            })
        }

        getMovieTrailer()
    },[])
    return(
        <>
            <div ref={videoContainer}
                className={`relative inline-block w-[18rem] md:w-[20rem] aspect-[16/12] rounded-md mx-1 cursor-pointer transition-all ${trailerID ? 'hover:scale-y-[1.25] hover:scale-x-[1.5] hover:z-30 hover:shadow-lg ease-in-out duration-200' : ''}`}
                onMouseEnter={()=>{
                    setShowTrailer(true)
                }}
                onMouseLeave={()=>{
                    setShowTrailer(false)
                }}
                onClick={()=>{
                    router.push(`/movie/${movie.id}`)
                }}>
                {showTrailer && isMobileScreen && isTrailerFound && trailerID!==null ? 
                    <ReactPlayer className="pointer-events-none" url={`https://www.youtube.com/watch?v=${trailerID}`}
                        width={`100%`} height={`100%`}
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
