import { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { movieType } from '../type'

type searchResultPropsType={
    searchQuery? : string
}
const SearchResult = ({searchQuery}:searchResultPropsType) => {
    const router = useRouter()
    const axios = require('axios')

    const [results, setResult] = useState<movieType[]>()
    const [revealResults, setRevealResult] = useState<boolean>(false)

    useEffect(()=>{
        const fetchQueryResult = async ()=>{
            await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY_V3}&language=en-US&query=${searchQuery}&page=1&include_adult=false`)
            .then((res:AxiosResponse)=>{
                let queryRes = res.data.results

                //Limit result array to 15 elems
                if(queryRes.length <= 15){
                    setResult(queryRes)
                }else{
                    setResult(queryRes.slice(0,15))
                }
                setRevealResult(true)
            })
            .catch((err:AxiosResponse)=>{
                console.error('Something went wrong with search input',err)
            })
        }
        if(searchQuery === '' || searchQuery === null || searchQuery === undefined){
            setRevealResult(false)
            return
        } 
        fetchQueryResult()
    },[searchQuery])
  return (
    <>
        {revealResults? 
            <div className="absolute left-0 top-10 w-[100vw] md:w-full h-fit bg-black/80">
                <ul>
                    {results?.map((movie)=>{
                        return(
                            <>
                                <li className="text-white text-xl py-2 pl-4 cursor-pointer" 
                                    onClick={()=>{router.push(`/movie/${movie.id}`)}}
                                >{movie.title}</li>
                            </>
                        )
                    })}
                </ul>
            </div>
        :null}
    </>
  )
}

export default SearchResult