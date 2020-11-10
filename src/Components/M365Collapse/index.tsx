import React, { useState, useEffect, ReactNode } from 'react';
import "./index.css";
import Panel from "./Panel";

interface CollapseProps {
    defaultActiveKey: string | number,
    onChange: (num: number) => void
}

interface CollapseInterface extends React.FC<CollapseProps> {
    Panel: typeof Panel;
}
type iProps = {
    header: string | Element,
    content: string | Element
}
type Panels = {
    props: iProps,
    key: number,
    value: any,
    index: any,
    array: any
}
type FinialPanels = Panels & ReactNode;

const M365Collapse: CollapseInterface = (props) => {
    let { onChange, defaultActiveKey } = props;
    // const panelArr:Array<ReactNode> = props.children;
    return (
        <div className="M365Panel-box">
            {
                props.children && (props.children instanceof Array) ? props.children.map((item, index) => {
                    return <Panel header={'header'} key={index} content={"content"} handel={() => onChange(index)} />
                }) : ''
            }
        </div >
    )
}

M365Collapse.Panel = Panel;
export default M365Collapse;