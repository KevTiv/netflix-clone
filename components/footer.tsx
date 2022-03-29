import Image from 'next/image'
import styles from '../styles/Home.module.scss'

const Footer = () => {
  return (
    <>
        <footer className={`text-white flex justify-around py-4 items-center bg-white/10`}>
            <div className="flex justify-center items-center">
                <span>
                    Powered by{' '}
                </span>
                <a className="cursor-pointer"
                href="https://www.themoviedb.org/documentation/api"
                target="_blank"
                rel="noopener noreferrer"
                >
                <span className={styles.logo}>
                    <Image src="/tmdb.svg" alt="TMDB Logo" width={72} height={16} />
                </span>
                </a>
                <a className="cursor-pointer"
                href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
                >
                    <span className={styles.logo}>
                        <Image src="/vercel.svg" alt="TMDB Logo" width={72} height={16} />
                    </span>
                </a>
            </div>
            
            <span>Created by Kevin Tivert</span>
            <a className="cursor-pointer"
                href="https://github.com/KevTiv/netflix-clone"
                target="_blank"
                rel="noopener noreferrer"
            >
                Github Repository
            </a>
      </footer>
    </>
  )
}

export default Footer