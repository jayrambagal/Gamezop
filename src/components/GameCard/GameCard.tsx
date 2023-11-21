import React from 'react'
import classes from './style.module.css'
import Image from 'next/image'
import Link from 'next/link'

const GameCard = ({ name, image, url }: { name?: string, image?: string, url?: string }) => {
    return (
        <Link href={url ? url : ''} className={classes.gameCardContainer}>
            <figure style={{ zIndex: '0' }} >
                <Image width={100} height={100} src={image ? image : ''} className={classes.cardImage} style={{
                    width: '100%',
                    height: 'auto',
                }} alt={name ? name : 'alt'} />
                <h2 className={classes.cardName}>{name}</h2>
            </figure>
            <div className={classes.favoriteIconCon} >
                <Image width={35} height={35} src={`https://static.gamezop.com/comet/assets/img/icons/${true ? 'grey-2' : 'red'}.svg`} alt='favIcon' />
            </div>
        </Link>
    )
}

export default GameCard
