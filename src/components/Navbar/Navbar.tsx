"use client";
import React, { useState } from "react";
import classes from "./style.module.css";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from 'next/navigation'
import Icons from "../icons/indes";
import { NAVBAR_CONTENT } from "@/utils/enum";
import { motion, useScroll } from "framer-motion";

const Navbar = () => {
    const { scrollYProgress } = useScroll();
    const pathname = usePathname()
    const [searchInput, setSearchInput] = useState<string>("");
    const [isSearch, setIsSearch] = useState<boolean>(false);

    return (
        <main className={classes.navbarMainCon}>
            <motion.div
                className="progress-bar"
                style={{ scaleX: scrollYProgress }}
            />
            {/* Desktop Navbar _____________________________________ */}
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
                            <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className={classes.searchInputField} placeholder="Search for games" />
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
            {/* Desktop + Mobail Navbar _____________________________________ */}
            <nav className={classes.mobailNavCon}>
                <div className={classes.mobailCategorieCon}>
                    {NAVBAR_CONTENT.categories.map((ele: any, idx: number) => (
                        <Link
                            href={ele.path}
                            className={clsx(
                                classes.categorieItemCon,
                                pathname === ele.path && pathname !== '/' && classes.selectedCatItemCon
                            )}
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
