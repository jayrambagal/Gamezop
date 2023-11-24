"use client";
import React, { useState } from "react";
import classes from "./style.module.css";
import clsx from "clsx";
import GameCard from "../GameCard/GameCard";
import Link from "next/link";
import { CATEGORY_DETAILS } from "@/utils/enum";

const CategoryContainer = ({
    CategoryData,
    index,
}: {
    CategoryData: any;
    index: number;
}) => {
    const [showButton, setShowButton] = useState({ left: false, right: true });
    const slideLeft = () => {
        let slider = document.getElementById(`slider${index}`);
        if (slider) {
            slider.scrollLeft = slider.scrollLeft - 500;
            setShowButton({
                left: slider.scrollLeft > 500,
                right: slider.scrollLeft < 500,
            });
        }
    };

    const slideRight = () => {
        let slider = document.getElementById(`slider${index}`);
        if (slider) {
            slider.scrollLeft = slider.scrollLeft + 500;
            setShowButton({
                left: slider.scrollLeft >= 0,
                right: slider.scrollLeft < 500,
            });
        }
    };
    return (
        <div className={classes.HomePageCon}>
            {showButton.left && (
                <button
                    className={clsx(classes.slideBtns, classes.slideBtnLeft)}
                    title="scroll left"
                    onClick={slideLeft}
                >
                    {"<"}
                </button>
            )}
            {showButton.right && (
                <button
                    className={clsx(classes.slideBtns, classes.slideBtnRight)}
                    title="scroll right"
                    onClick={slideRight}
                >
                    {">"}
                </button>
            )}
            <div className={classes.headingContainer}>
                <img
                    style={{ width: "26px", height: "29px" }}
                    src={CATEGORY_DETAILS[CategoryData.name].icon}
                    alt="s"
                />
                <h2 className={classes.categName}>
                    {CATEGORY_DETAILS[CategoryData.name].name}
                </h2>

                <Link href={`/${CategoryData.name}`} className={classes.viewAllCon}>
                    <h2 className={classes.viewAllHead}>View All</h2>
                    <button className={classes.viewAllBtn}>{">"}</button>
                </Link>
            </div>

            <div className={classes.categoriesContainer} id={`slider${index}`}>
                <div className={classes.catGamesWrapper}>
                    {CategoryData?.data.map((game: any, index: number) => (
                        <div className={classes.imageContainer} key={index}>
                            <GameCard
                                name={game.name.en}
                                image={game.assets.square}
                                url={game.url}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default CategoryContainer;
