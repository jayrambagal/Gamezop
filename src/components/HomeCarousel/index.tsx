"use client";
import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from './style.module.css'
import { useRouter } from 'next/navigation'
const HomeCarousel = (CarouselData: any) => {
    const router = useRouter()
    const [isHover, setIsHover] = useState<boolean>(false);
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
                    interval={2000}
                    showThumbs={false}
                >
                    {CarouselData.CarouselData.map((imgsData: any, idx: number) => (
                        <div className={classes.crousel} key={idx} onMouseEnter={() => setIsHover(true)}
                            onMouseLeave={() => setIsHover
                                (false)}>
                            <span>
                                <img src={imgsData?.data[1]?.assets.wall} alt={`image${idx}`} />
                            </span>
                            {isHover && <div

                                className={classes.isHoverCon}
                            >
                                <h1 className={classes.heading}>{imgsData?.data[1]?.name.en}</h1>
                                <p className={classes.subHeading}>{imgsData?.data[1]?.description.en}
                                </p>
                                <div className={classes.infoContainer}>
                                    <h3 className={classes.subTitle}>Rating : {imgsData?.data[1]?.rating}</h3>
                                    <h3 className={classes.subTitle}>Active Players : {imgsData?.data[1]?.numberOfRatings}</h3>
                                </div>

                                <button onClick={() => router.push(imgsData?.data[1].url)} className={classes.playBtn}>Play</button>
                            </div>}
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
};

export default HomeCarousel;
