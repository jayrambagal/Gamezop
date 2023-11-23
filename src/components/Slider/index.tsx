"use client";
import React from "react";
import classes from "./style.module.css";
import clsx from "clsx";
import GameCard from "../GameCard/GameCard";
import Link from "next/link";
import Image from "next/image";
import { GAMEZOP_ROUTES, GAMEZOP_ROUTES_ICONS } from "@/utils/enum";
const TrendingSlider = ({ category, index }: any) => {
    const slideLeft = () => {
        let slider = document.getElementById(`slider${index}`);
        if (slider) {
            slider.scrollLeft = slider.scrollLeft - 500;
        }
    };

    const slideRight = () => {
        let slider = document.getElementById(`slider${index}`);
        if (slider) {
            slider.scrollLeft = slider.scrollLeft + 500;
        }

    };
    return (
        <>
            <div className={classes.HomePageCon}>
                <button className={clsx(classes.slideBtns, classes.slideBtnLeft)} title="scroll left" onClick={slideLeft}>
                    {"<"}
                </button>
                <button className={clsx(classes.slideBtns, classes.slideBtnRight)} title="scroll right" onClick={slideRight}>
                    {">"}
                </button>
                <div className={classes.headingContainer}>
                    <img style={{ width: '26px', height: '29px' }} src={GAMEZOP_ROUTES_ICONS[category.name]} alt="s" />
                    <h2 className={classes.categName} >{GAMEZOP_ROUTES[category.name]}</h2>

                    <div className={classes.viewAllCon}>
                        <h2 className={classes.viewAllHead}>View All</h2>
                        <button className={classes.viewAllBtn}>{'>'}</button>
                    </div>
                </div>

                <div className={classes.categoriesContainer} id={`slider${index}`}>
                    <div className={classes.catGamesWrapper} >
                        {category?.data.map((game: any, index: number) => (
                            <div className={classes.imageContainer}>
                                <GameCard name={game.name.en} image={game.assets.square} url={game.url} />
                            </div>

                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
export default TrendingSlider;
