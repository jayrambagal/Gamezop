"use client";
import React, { useState } from "react";
import classes from "./style.module.css";
import {
    GAMEZOP_LOGO,
    GAME_CATEGORIES_LISTS,
    NAVBAR_PROFILE,
} from "@/utils/constants/Navbar";
import Link from "next/link";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import Icons from "../icons/indes";
import { redirect } from "next/navigation";

const Navbar = () => {
    const router = useRouter();
    const [selectedCategorie, setSelectedCategorie] = useState<string>("");
    const [isSearch, setIsSearch] = useState(false);
    return (
        <main className={classes.navbarMainCon}>
            <nav className={classes.navbarContainer}>
                <Link href={"/"} className={classes.gamezopLogo}>
                    <img className="imageWidthHeight" src={GAMEZOP_LOGO} />
                </Link>

                <div className={classes.categorieCon}>
                    {GAME_CATEGORIES_LISTS.map((ele, idx) => (
                        <Link
                            href={ele.path}
                            className={clsx(
                                classes.categorieItemCon,
                                selectedCategorie === ele.name && classes.selectedCatItemCon
                            )}
                            onClick={() => {
                                setSelectedCategorie(ele.name);
                            }}
                            key={idx}
                        >
                            <img
                                src={selectedCategorie === ele.name ? ele.selectedIcon : ele.icon}
                                alt={ele.name}
                            />
                            <h4
                                className={clsx(
                                    classes.categorieItemName,
                                    selectedCategorie === ele.name && classes.selectedCatItem
                                )}
                            >
                                {ele.name}
                            </h4>
                        </Link>
                    ))}
                </div>
                <div className={classes.virticalLine}></div>
                {isSearch ? (
                    <div className={classes.searchBarCon} >
                        <span className={classes.searchLeftCon} >
                            <Icons.Search color={'rgb(44, 44, 44)'} />
                            <input className={classes.searchInputField} placeholder="Search for games" />
                        </span>
                        <img style={{ width: '22px', height: '22px', cursor: 'pointer' }} src="https://static.gamezop.com/comet/assets/img/cross.svg" alt="crossIcon" onClick={() => setIsSearch(false)} />
                    </div>
                ) : (
                    <div className={classes.searchBaseOption}>
                        <button className={classes.searchBtn} onClick={() => setIsSearch(true)}>
                            <Icons.Search />
                        </button>
                        <Link
                            href={"https://6302.read.astrozop.com/"}
                            className={classes.profileBtn}
                            target="_blank"
                        >
                            <img src={NAVBAR_PROFILE} alt="prfile" />
                        </Link>
                    </div>
                )}
            </nav>
            <nav className={classes.mobailNavCon}>
                <div className={classes.mobailCategorieCon}>
                    {GAME_CATEGORIES_LISTS.map((ele, idx) => (
                        <Link
                            href={ele.path}
                            className={clsx(
                                classes.categorieItemCon,
                                selectedCategorie === ele.name && classes.selectedCatItemCon
                            )}
                            onClick={() => {
                                setSelectedCategorie(ele.name);
                            }}
                            key={idx}
                        >
                            <img
                                src={selectedCategorie === ele.name ? ele.selectedIcon : ele.icon}
                                alt={ele.name}
                            />
                            <h4 className={clsx(classes.categorieItemName,
                                selectedCategorie === ele.name && classes.selectedCatItem)}
                            > {ele.name}</h4>
                        </Link>
                    ))}
                </div>
            </nav>
        </main>
    );
};

export default Navbar;
