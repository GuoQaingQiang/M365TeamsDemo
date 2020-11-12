import React from 'react';
import "./index.css";

interface IMonthProps {
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

const M365Progress: React.FC<IMonthProps> = (props) => {
    let percentStyle = getPercentStyle(props.percent, props.status);
    return (
        <div className="M365Progress-box">
            <div className="M365Progress-left">
                <div className="M365Progress-gray"></div>
                <div className="M365Progress-percent" style={percentStyle} >
                    {props.status === "active" && props.percent !== 100 ?
                        <div className="M365Progress-active"></div> : ""}
                </div>
            </div>
            <div className="M365Progress-right">{props.percent + "%"}</div>
        </div >
    )
}

export default M365Progress;