"use client"
import classes from './style.module.css'
import GameCard from "@/components/GameCard/GameCard"
import { CATEGORY_DETAILS } from "@/utils/enum"
import useFavorite from '@/store/AddToFavorite'

export default function Favourites() {
    const { FavItems } = useFavorite()
    return (
        <main className={classes.categoriesContainer}>
            <section className={classes.gamesContainer}>
                <div className={classes.headingContainer}>
                    <img style={{ width: '26px', height: '29px' }} src={CATEGORY_DETAILS["my-favourites"].icon} alt="s" />
                    <h2 className={classes.categName} >{CATEGORY_DETAILS["my-favourites"].name}</h2>
                </div>

                {FavItems.length > 0 ? <div className={classes.catGamesWrapper}>
                    {
                        FavItems.map((game: any, index: number) => (
                            <figure className={classes.gameCardCon} key={index}>
                                <GameCard name={game.name} image={game.image} url={game.url} id={game.id} isFavourite={true} />
                            </figure>
                        ))
                    }
                </div> :
                    <div className={classes.emptyContainer}>
                        <img className={classes.emptyImage} src='https://www.gamezop.com/_next/image?url=https%3A%2F%2Fstatic.gamezop.com%2Fcomet%2Fassets%2Fimg%2Fno_history.png&w=2048&q=75' alt='' />
                        <p className={classes.emptyPara}>You haven't favourited any games yet. Favourite the games you love and find them here easily anytime!</p>
                    </div>
                }

            </section>
        </main>
    )
}

