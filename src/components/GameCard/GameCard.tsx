"use client";
import React, { useState } from "react";
import classes from "./style.module.css";
import Image from "next/image";
import Link from "next/link";
import useFavorite from "../../store/AddToFavorite";

const GameCard = ({
    name,
    image,
    url,
    id,
    isFavourite,
}: {
    name?: string;
    image?: string;
    url?: string;
    id: string;
    isFavourite?: boolean;
}) => {
    const [addFavorite, setAddFavorite] = useState<boolean>(isFavourite ? isFavourite : false);
    const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
    const { addFav, removeFav } = useFavorite();
    const handleImageLoad = () => {
        setIsImageLoaded(true);
    };
    return (
        <div className={classes.gameCardContainer}>
            <Link
                href={url ? url : ""}
                style={{ zIndex: "0", textDecoration: "none" }}
            >
                <Image
                    width={100}
                    height={100}
                    src={image ? image : ""}
                    className={classes.cardImage}
                    style={{
                        width: "100%",
                        height: "auto",
                    }}
                    alt={name ? name : "alt"}
                    onLoad={handleImageLoad}
                    onError={handleImageLoad}
                />
                {!isImageLoaded && (
                    <div className={classes.skeletonBoxCon}>
                        <div style={{ height: "70%" }} className={classes.skeleton}></div>
                        <div style={{ height: "20%" }} className={classes.skeleton}></div>
                    </div>
                )}
                <h2 className={classes.cardName}>{name}</h2>
            </Link>
            {isImageLoaded && (
                <div
                    className={classes.favoriteIconCon}
                    onClick={() => {
                        if (!addFavorite) {
                            addFav({ id: id, name: name, image: image, url: url });
                        } else {
                            removeFav(id);
                        }
                        setAddFavorite(!addFavorite);
                    }}
                >
                    <Image
                        width={35}
                        height={35}
                        src={`https://static.gamezop.com/comet/assets/img/icons/${!addFavorite ? "grey-2" : "red"
                            }.svg`}
                        alt="favIcon"
                    />
                </div>
            )}
        </div>
    );
};

export default GameCard;
