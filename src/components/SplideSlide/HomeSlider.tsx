"use client";
import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from './style.module.css'
const HomeSlider = () => {
    const [isHover, setIsHover] = useState<boolean>(false);
    const imgArray = [
        "https://static.gamezop.com/rkb--Io78Ux/wall.png",
        "https://static.gamezop.com/ry3vtunu/wall.png",
        "https://static.gamezop.com/B1JBaM1D9y7/wall.png",
        "https://static.gamezop.com/QPcVkaHi1/wall.png",
        "https://static.gamezop.com/HkxcskEs5/wall.png",
        "https://static.gamezop.com/SJ8X6zyPcyX/wall.png",
    ];
    return (
        <div>
            <div className={classes.sliderContainer}>
                <Carousel
                    infiniteLoop={true}
                    onClickItem={() => ""}
                    transitionTime={1000}
                    stopOnHover={true}
                    swipeable={true}
                    autoPlay={true}
                    interval={2500}
                >
                    {imgArray.map((img, idx) => (
                        <div key={idx}>
                            <span>
                                <img src={img} alt={`image${idx}`} />
                            </span>
                            <div

                                className={classes.isHoverCon}
                            >
                                <h1 className={classes.heading}>Tower Buster</h1>
                                <p className={classes.subHeading}>The war is here. It's the need of the hour. Block by block,
                                    tower after tower, it's time you prove your tank's dominance
                                    \u0026 power!
                                </p>
                                <div className={classes.infoContainer}>
                                    <h3 className={classes.subTitle}>Rating: 4.5</h3>
                                    <span className={classes.verticalLine}></span>
                                    <h3 className={classes.subTitle}>Game Plays: 3321</h3>
                                </div>

                                <button className={classes.playBtn}>Play</button>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
};

export default HomeSlider;
