export type movieType = {
    adult?: boolean,
    backdrop_path?: string,
    genre_ids?: number[],
    id?: number,
    original_language?: string,
    original_title?: string,
    overview?: string,
    popularity?: number,
    poster_path?: string,
    release_date?: string,
    title?: string,
    video?: boolean,
    vote_average?: number,
    vote_count?: number
}
export type MoviePanelProps={
    PanelName: string,
    moviesSelection?: movieType[],
}
export type homePagePropsType={
  popularMoviesSelection?: movieType[]
  trendingMoviesSelection?: movieType[]
  actionMoviesSelection?: movieType[], 
  adventureMoviesSelection?: movieType[], 
  comedyMoviesSelection?: movieType[],
  familyMoviesSelection?: movieType[], 
  fantasyMoviesSelection?: movieType[], 
  RomanceMoviesSelection?: movieType[], 
  scifiMoviesSelection?: movieType[], 
  historyMoviesSelection?: movieType[], 
  horrorMoviesSelection?: movieType[], 
}

export type moviePageProps = {
  movie: movieDetailPropsType,
  movieTrailerId: string,
  similarMoviesSelection: movieType[]
}

export type movieDetailPropsType={
  adult?: boolean,
  backdrop_path?: string,
  belongs_to_collection?: {},
  budget?: number,
  genres?: genre[],
  homepage?: string,
  id?: number,
  imdb_id?: string,
  original_language?: string,
  original_title?: string,
  overview?: string,
  popularity?: number,
  poster_path?: string,
  production_companies?: prod_company[],
  production_countries?: prod_country[],
  release_date?: string,
  revenue?: number,
  runtime?: number,
  spoken_languages?: lang[],
  status?: string,
  tagline?: string,
  title?: string,
  video?: false,
  vote_average?: number,
  vote_count?: number
}

type genre={
    id: number, 
    name: string
}

type prod_company={
    id: number,
    logo_path: string,
    name: string,
    origin_country: string
}

type prod_country={
    iso_3166_1: string, 
    name: string
}
type lang={
    english_name: string, 
    iso_639_1: string, 
    name: string
}

export type videoType={
    iso_639_1: string,
    iso_3166_1: string,
    name: string,
    key: string,
    site: string,
    size: number,
    type: string,
    official: boolean,
    published_at: string,
    id: string
}