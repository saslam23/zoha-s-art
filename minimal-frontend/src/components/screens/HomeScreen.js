import React, { useState } from 'react'
import { useTransition, animated } from "react-spring";
import { items, artItems } from "../../HomeScreenData";


function Polygon({ items }) {
    const transition = useTransition(items, items => items.id, {
        trail: 250,
        from: { opacity: 0, transform: 'translate3d(0, -40px, 0)', display: "inline-block" },
        enter: { transform: 'translate3d(0, 0px, 0)', opacity: 1 },
    })
    return (
        transition.map(({ item, key, props }) =>
            <animated.div key={key} style={props}>
                <h1 className="title" style={{ paddingLeft: "2rem" }}>{item.text}</h1>
            </animated.div>)
    )
}

function PolygonTwo({ items }) {
    const transition = useTransition(items, items => items.id, {
        trail: 500,
        from: { opacity: 0, transform: 'translate3d(0, -40px, 0)', display: "inline-block" },
        enter: { transform: 'translate3d(0, 0px, 0)', opacity: 1 },
    })
    return (
        transition.map(({ item, key, props }) =>
            <animated.div key={key} style={props}>
                <h1 className="title" style={{ paddingLeft: "2rem", paddingTop: "5rem" }}>{item.text}</h1>
            </animated.div>)
    )
}


const Home = () => {
    return (
        <div style={{ textAlign: "center" }}>
            <Polygon items={items} />
            <br></br>
            <PolygonTwo items={artItems} />
        </div>

    )
}


export default Home;