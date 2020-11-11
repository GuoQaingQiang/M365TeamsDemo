import React, { useState, useEffect, ReactNode } from 'react';
import "./index.css";

interface IMonthProps {
    placement: string | React.ReactNode, // top left right bottom
    title: string
}

function getStyle(placement: {} | null | undefined) {
    if (placement === "left") {
        return {
            transform: "translate(-102%, -100%)",
        }
    } else if (placement === "right") {
        return {
            marginLeft: "102%",
            transform: "translateY(-100%)"
        }
    } else if (placement === "top") {
        return {
            transform: "translateY(-200%)",
        }
    } else if (placement === "bottom") {
        return {
            transform: "translateY(0)",
        }
    }
}

function getArrow(placement: {} | null | undefined) {
    if (placement === "left") {
        return "arrow-left";
    } else if (placement === "right") {
        return "arrow-right";
    } else if (placement === "top") {
        return "arrow-bottom";
    } else if (placement === "bottom") {
        return "arrow-top";
    }
}

const M365Tootip: React.FC<IMonthProps> = (props) => {
    let { placement, title } = props;
    let style = getStyle(placement);

    return (
        <div className="M365Tooltip-box">
            {props.children}
            <div className="M365Tooltip-tooltip" style={style}>
                {title}
                {/* <span className={"arrow " + getArrow(placement)}></span> */}
            </div>
        </div >
    )
}

export default M365Tootip;