import React, { useState } from 'react';
import "./index.css";

interface PanelProps {
    header: string | Element,
    key: string | number,
    content: string | Element,
    handel?: (key: number | string) => void
}

const Panel: React.FC<PanelProps> = ({ header, key, content, handel }) => {
    let [isUnfold, changeIsUnfold] = useState(false);
    return (
        <div className="M365Panel-wrap" key={key} >
            <div tabIndex={1} role="button" aria-label={"panel " + header}
                onClick={() => {
                    changeIsUnfold(!isUnfold);
                    handel && handel(key);
                }} className="M365Panel-header">{header}</div>
            <div className={isUnfold ? "M365Panel-content" : "M365Panel-content-empty"}>{content}</div>
        </div >
    );
}

export default Panel;