import Image from 'next/image'
import { useRouter } from 'next/router'
import { MouseEventHandler } from 'react'
import { MoviePanelProps, movieType } from '../type'

const MoviePanel = ({PanelName, moviesSelection}:MoviePanelProps) => {
    const router = useRouter()
  return (
    <>
        <div className="w-full my-4 md:my-6">
            <h1 className="text-white/80 text-3xl md:text-4xl my-1 md:my-2 font-bold">{PanelName}</h1>
            <div className="overflow-hidden w-[92.5vw] h-full mx-2">
                <div className="overflow-x-scroll overflow-y-hidden whitespace-nowrap">
                    {moviesSelection?.map( (movie :movieType) =>{
                        return(
                            <span key={movie.id} className="relative inline-block w-[18rem] md:w-[20rem] aspect-[16/9]  bg-white/5 mx-0.5"
                                onClick={()=>{
                                    router.push(`/movie/${movie.id}`)
                                }}>
                                <Image src={`${process.env.NEXT_PUBLIC_GET_POSTER_URL}${movie.poster_path}`} 
                                    alt={`movie.title`} layout="fill"/>
                                <span className="absolute bottom-1 left-1 w-9 md:w-14 aspect-[16/9] bg-black/50 rounded-xl">
                                    <Image src="/tmdb.svg" alt="TMDB" layout="fill"/>
                                </span>
                            </span>
                        )
                    })
                    }
                </div>
            </div>
            
        </div>
    </>
  )
}

export default MoviePanel
