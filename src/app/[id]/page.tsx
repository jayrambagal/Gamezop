import classes from './style.module.css'
import GameCard from "@/components/GameCard/GameCard"
import { CATEGORY_DETAILS } from "@/utils/enum"
import { getDataById } from "@/services"
async function getCategorieData(id: string) { return getDataById(id) }

export default async function name({ params }: { params: { id: string } }) {
    const data = await getCategorieData(params.id)
    const newId = params.id
    return (
        <main className={classes.categoriesContainer}>
            <section className={classes.gamesContainer}>
                <div className={classes.headingContainer}>
                    <img style={{ width: '26px', height: '29px' }} src={CATEGORY_DETAILS[newId].icon} alt="s" />
                    <h2 className={classes.categName} >{CATEGORY_DETAILS[newId].name}</h2>
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

