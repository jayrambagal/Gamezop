import React, { useState } from "react";
import { useSprings, animated, to as interpolate } from "@react-spring/web";
import { useDrag } from "react-use-gesture";
import classes from "./styles.module.css";
import { SpringCards } from "@/utils/enum";

//values that are later being interpolated into css
const to = (i: number) => ({
    x: 0,
    y: i * -4,
    scale: 1,
    rot: -10 + Math.random() * 20,
    delay: i * 100,
});
const from = (_i: number) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });
// interpolates rotation and scale into a css transform
const trans = (r: number, s: number) =>
    `perspective(1500px) rotateX(30deg) rotateY(${r / 10
    }deg) rotateZ(${r}deg) scale(${s})`;

function Cards() {
    const [gone] = useState(() => new Set()); // The set flags all the SpringCards that are flicked out
    const [props, api] = useSprings(SpringCards.length, (i) => ({
        ...to(i),
        from: from(i),
    })); // Create a bunch of springs

    const bind = useDrag(
        ({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
            const trigger = velocity > 0.2; // flick hard enough it should trigger the card to fly out
            const dir = xDir < 0 ? -1 : 1; // Direction should either point left or right
            if (!down && trigger) gone.add(index);
            api.start((i) => {
                if (index !== i) return; // We're only interested in changing spring-data for the current spring
                const isGone = gone.has(index);
                const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
                const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0);
                const scale = down ? 1.1 : 1; // Active SpringCards lift up a bit
                return {
                    x,
                    rot,
                    scale,
                    delay: undefined,
                    config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
                };
            });
            if (!down && gone.size === SpringCards.length)
                setTimeout(() => {
                    gone.clear();
                    api.start((i) => to(i));
                }, 600);
        }
    );

    const openInNewTab = (url: string) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }
    return (
        <div className={classes.container}>
            {props.map(({ x, y, rot, scale }, i) => (
                <animated.div className={classes.cards} key={i} style={{ x, y }}>
                    <animated.div
                        {...bind(i)}
                        style={{
                            transform: interpolate([rot, scale], trans),
                            backgroundImage: `url(${SpringCards[i].coverImg})`,
                        }}
                        // onClick={() => openInNewTab(cards[i].url)}
                        onDoubleClick={() => openInNewTab(SpringCards[i].url)}
                    />
                </animated.div>
            ))}
        </div>
    );
}

export default function DeckCards() {
    return (
        <div className={classes.mainSpringContainer}>
            <Cards />
        </div>
    );
}
