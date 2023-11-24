"use client";
import React, { useState } from "react";
import classes from "./style.module.css";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from 'next/navigation'
import Icons from "../icons/indes";
import { NAVBAR_CONTENT } from "@/utils/enum";

const Navbar = () => {
    const pathname = usePathname()
    const [selectedCategorie, setSelectedCategorie] = useState<string>("");
    const [isSearch, setIsSearch] = useState<boolean>(false);

    return (
        <main className={classes.navbarMainCon}>
            <nav className={classes.navbarContainer}>
                <Link href={"/"} className={clsx(classes.gamezopLogo, isSearch && classes.gamezopLogoHide)}>
                    <img className="imageWidthHeight" src={NAVBAR_CONTENT.logo} />
                </Link>

                <div className={classes.categorieCon}>
                    {NAVBAR_CONTENT.categories.map((ele: any, idx: number) => (
                        <Link
                            href={ele.path}
                            className={clsx(
                                classes.categorieItemCon,
                                pathname === ele.path && pathname !== '/' && classes.selectedCatItemCon
                            )}
                            onClick={() => {
                                setSelectedCategorie(ele.name);
                            }}
                            key={idx}
                        >
                            <img
                                src={pathname === ele.path && pathname !== '/' ? ele.selectedIcon : ele.icon}
                                alt={ele.name}
                            />
                            <h4
                                className={clsx(
                                    classes.categorieItemName,
                                    pathname === ele.path && pathname !== '/' && classes.selectedCatItem
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
                            href={NAVBAR_CONTENT.profile.url}
                            className={classes.profileBtn}
                            target="_blank"
                        >
                            <img src={NAVBAR_CONTENT.profile.image} alt="prfile" />
                        </Link>
                    </div>
                )}
            </nav>
            <nav className={classes.mobailNavCon}>
                <div className={classes.mobailCategorieCon}>
                    {NAVBAR_CONTENT.categories.map((ele: any, idx: number) => (
                        <Link
                            href={ele.path}
                            className={clsx(
                                classes.categorieItemCon,
                                pathname === ele.path && pathname !== '/' && classes.selectedCatItemCon
                            )}
                            onClick={() => {
                                setSelectedCategorie(ele.name);
                            }}
                            key={idx}
                        >
                            <img
                                src={pathname === ele.path && pathname !== '/' ? ele.selectedIcon : ele.icon}
                                alt={ele.name}
                            />
                            <h4 className={clsx(classes.categorieItemName,
                                pathname === ele.path && pathname !== '/' && classes.selectedCatItem)}
                            > {ele.name}</h4>
                        </Link>
                    ))}
                </div>
            </nav>
        </main>
    );
};

export default Navbar;
