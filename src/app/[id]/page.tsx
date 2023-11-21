import { notFound } from "next/navigation"
import classes from './style.module.css'
import GameCard from "@/components/GameCard/GameCard"
import { GAMEZOP_ROUTES, GAMEZOP_ROUTES_ICONS } from "@/utils/enum"

async function getData(id: string) {
    try {
        const res = await fetch('https://pub.gamezop.com/v3/games?id=peSLSV')
        const data = await res.json()
        let idCheck = id
        if (id == 'puzzle-and-logic-games') {
            idCheck = 'puzzle & logic'
        } else if (id == 'sports-and-racing-games') {
            idCheck = 'sports & racing'
        }
        const categoriesData = await data.games.filter((ele: any) => {
            if (idCheck.split('-')[0] == ele.categories.en[0].toLowerCase()) {
                return ele
            }
        })
        if (categoriesData.length == 0) {
            notFound();
        }
        return categoriesData
    } catch (errror) {
        console.log(errror);
        notFound()
    }
}

export default async function name({ params }: { params: { id: string } }) {
    const data = await getData(params.id)
    const newId = params.id
    return (
        <main className={classes.categoriesContainer}>
            <section className={classes.gamesContainer}>
                <div className={classes.headingContainer}>
                    <img style={{ width: '26px', height: '29px' }} src={GAMEZOP_ROUTES_ICONS[newId]} alt="s" />
                    <h2 className={classes.categName} >{GAMEZOP_ROUTES[newId]}</h2>
                </div>

                <div className={classes.catGamesWrapper}>
                    {
                        data.map((game: any, index: number) => (
                            <figure className={classes.gameCardCon} key={index}>
                                <GameCard name={game.name.en} image={game.assets.square} url={game.url} />
                            </figure>
                        ))
                    }
                </div>
            </section>
        </main>
    )
}

