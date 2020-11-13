import React, { useEffect, useRef } from 'react';
import "./index.css";

interface IMonthProps {
    type?: string, // line circle dashboard
    percent: number,
    showInfo?: boolean,
    status?: string  // success exception normal active
}

type percentStyle = {
    width: string,
    background?: string,
}
function getPercentStyle(percent: number, status: string | undefined): percentStyle {
    let styleObj: percentStyle = { width: percent + "%" };
    if (percent === 100) {
        styleObj.background = "#52c41a";
    }
    if (status === "exception") {
        styleObj.background = "#ff4d4f";
    }
    return styleObj
}

function draw(ctx: any, angle: number, percent: number | undefined): void {
    /* 清空画布(或部分清空) */
    let timer = setInterval(function () {
        ctx.clearRect(0, 0, 100, 100);

        ctx.beginPath();
        ctx.lineCap = "round";
        ctx.lineWidth = 8;
        ctx.arc(50, 50, 42, 0, angle * Math.PI);
        ctx.fillText(percent + "%", 35, 55);
        ctx.strokeStyle = "#1890ff";
        ctx.font = "14px Verdana";
        ctx.stroke();
        if (percent) {
            if (angle <= 2 * percent / 100) {
                angle += 0.05;
                angle.toFixed(2);
            } else {
                clearInterval(timer)
            }
        }
    }, 25)
}


const M365Progress: React.FC<IMonthProps> = (props) => {
    let percentStyle = getPercentStyle(props.percent, props.status);
    const M365ProgressCircleBox = useRef(null);
    useEffect(() => {
        const canvas: any = M365ProgressCircleBox.current;

        if (Object.prototype.toString.call(canvas) !== "[object Null]") {
            var ctx = canvas ? canvas.getContext("2d") : null;
            draw(ctx, 0, props.percent);
        }
    })
    return (
        <div className="M365Progress-box">
            {props.type === "circle" ?
                <canvas id="M365Progress-circle-box"
                    ref={M365ProgressCircleBox}
                    width={100}
                    height={100}
                    className="M365Progress-circle-box" /> :
                <>
                    <div className="M365Progress-left">
                        <div className="M365Progress-gray"></div>
                        <div className="M365Progress-percent" style={percentStyle} >
                            {props.status === "active" && props.percent !== 100 ?
                                <div className="M365Progress-active"></div> : ""}
                        </div>
                    </div>
                    <div className="M365Progress-right">{props.percent + "%"}
                    </div>
                </>}

        </div >
    )
}

export default M365Progress;