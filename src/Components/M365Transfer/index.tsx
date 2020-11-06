import React, { useState } from 'react';
import "./index.css";

type singleCheckbox = {
    value: string,
    disable: boolean,
    selected: boolean
}

interface IMonthProps {
    leftDataArrProps: Array<singleCheckbox>,
    rightDateArrProps: Array<singleCheckbox>
}

function itemClickEvent(item: singleCheckbox, index: number, leftDataArr: Array<singleCheckbox>, changeSelectState: { (value: React.SetStateAction<string>): void; (arg0: string): void; }, selectState: string): Array<singleCheckbox> {
    if (!item.disable) {
        leftDataArr[index].selected = !leftDataArr[index].selected;
    }
    let allNum: number = leftDataArr.length;
    let disabledNum: number = 0;
    let selectedNum: number = 0;
    for (let i = 0; i < leftDataArr.length; i++) {
        if (leftDataArr[i].disable) {
            disabledNum++;
        } else {
            leftDataArr[i].selected && selectedNum++;
        }
    }
    if (disabledNum + selectedNum === allNum) {
        changeSelectState("all");
    } else if (selectedNum === 0) {
        changeSelectState("none");
    } else {
        changeSelectState("section");
    }

    return [...leftDataArr];
}

function sourceCheckboxEvent(selectState: string, changeSelectState: { (value: React.SetStateAction<string>): void; (arg0: string): void; }, leftDataArr: any[], changeLeftDataArr: { (value: React.SetStateAction<singleCheckbox[]>): void; (arg0: any): void; }) {
    if (selectState === "none") {
        changeSelectState("all");
        let newLeftDataArr = leftDataArr.map(item => {
            return {
                value: item.value,
                disable: item.disable,
                selected: item.disable ? false : true
            }
        });
        changeLeftDataArr(newLeftDataArr);
    } else if (selectState === "section") {
        changeSelectState("all");
        let newLeftDataArr = leftDataArr.map(item => {
            return {
                value: item.value,
                disable: item.disable,
                selected: item.disable ? false : true
            }
        });
        changeLeftDataArr(newLeftDataArr);
    } else if (selectState === "all") {
        changeSelectState("none");
        let newLeftDataArr = leftDataArr.map(item => {
            return {
                value: item.value,
                disable: item.disable,
                selected: false
            }
        });
        changeLeftDataArr(newLeftDataArr);
    }
}

function leftCheckboxEvent(e: React.MouseEvent<HTMLLIElement, MouseEvent>, item: { value?: string; disable: any; selected?: boolean; }, index: number, leftDataArr: any[], changeSelectState: { (value: React.SetStateAction<string>): void; (arg0: string): void; }, selectState: string, changeLeftDataArr: { (value: React.SetStateAction<singleCheckbox[]>): void; (arg0: any[]): void; }) {
    if (!item.disable) {
        leftDataArr[index].selected = !leftDataArr[index].selected;
    }
    let allNum: number = leftDataArr.length;
    let disabledNum: number = 0;
    let selectedNum: number = 0;
    for (let i = 0; i < leftDataArr.length; i++) {
        if (leftDataArr[i].disable) {
            disabledNum++;
        } else {
            leftDataArr[i].selected && selectedNum++;
        }
    }
    if (disabledNum + selectedNum === allNum) {
        changeSelectState("all");
    } else if (selectedNum === 0) {
        changeSelectState("none");
    } else {
        changeSelectState("section");
    }
    changeLeftDataArr([...leftDataArr]);
    e.preventDefault();
}

function arrowEvent(leftDataArr: any[], rightDataArr: any[], changeLeftDataArr: { (value: React.SetStateAction<singleCheckbox[]>): void; (value: React.SetStateAction<singleCheckbox[]>): void; }, changeRightDataArr: { (value: React.SetStateAction<singleCheckbox[]>): void; (value: React.SetStateAction<singleCheckbox[]>): void; }, arrow: string, changeLeftSelectState: { (value: React.SetStateAction<string>): void; (value: React.SetStateAction<string>): void; (arg0: string): void; }, changeRightSelectState: { (value: React.SetStateAction<string>): void; (value: React.SetStateAction<string>): void; (arg0: string): void; }) {
    if (arrow === "right") {
        let newLeftDataArr: any[] = [];
        leftDataArr.map(item => {
            if (item.selected) {
                rightDataArr.push({
                    value: item.value,
                    disable: false,
                    selected: false
                });
            } else {
                newLeftDataArr.push(item);
            }
        });
        changeLeftDataArr([...newLeftDataArr]);
        changeRightDataArr([...rightDataArr]);
        changeLeftSelectState('none');
    } else {
        let newRightDataArr: any[] = [];
        rightDataArr.map(item => {
            if (item.selected) {
                leftDataArr.push({
                    value: item.value,
                    disable: false,
                    selected: false
                });
            } else {
                newRightDataArr.push(item);
            }
        });
        changeLeftDataArr([...leftDataArr]);
        changeRightDataArr([...newRightDataArr]);
        changeRightSelectState('none');
    }
}

const M365Transfer: React.FC<IMonthProps> = ({ leftDataArrProps, rightDateArrProps }) => {
    let [leftDataArr, changeLeftDataArr] = useState(leftDataArrProps);
    let [rightDataArr, changeRightDataArr] = useState(rightDateArrProps);
    let [leftSelectState, changeLeftSelectState] = useState('none');
    let [rightSelectState, changeRightSelectState] = useState('none');

    let leftCheckboxClassName = "";
    if (leftSelectState === 'none') {
        leftCheckboxClassName = "";
    } else if (leftSelectState === "section") {
        leftCheckboxClassName = "m365-checkbox-inner-section";
    } else {
        leftCheckboxClassName = "m365-checkbox-checked-all";
    }

    let rightCheckboxClassName = "";
    if (rightSelectState === 'none') {
        rightCheckboxClassName = "";
    } else if (rightSelectState === "section") {
        rightCheckboxClassName = "m365-checkbox-inner-section";
    } else {
        rightCheckboxClassName = "m365-checkbox-checked-all";
    }

    return (
        <div className="M365Transfor-box" >
            <div className="M365Transfor-wrap M365Transfor-source">
                <div className="header">
                    <span>
                        {/* <input type="checkbox" name="check all source" /> */}
                        <span
                            onClick={() => {
                                sourceCheckboxEvent(leftSelectState, changeLeftSelectState, leftDataArr, changeLeftDataArr);
                            }}
                            className={"m365-checkbox-inner " + leftCheckboxClassName}></span>
                    </span>
                    <span className="title">Source</span>
                </div>
                <ul className="content">
                    {
                        leftDataArr.map((item, index) => {
                            return <li key={item.value} onClick={(e) => {
                                leftCheckboxEvent(e, item, index, leftDataArr, changeLeftSelectState, leftSelectState, changeLeftDataArr);
                            }}>
                                <input onClick={(e) => {
                                    return false;
                                }} style={{ cursor: item.disable ? "not-allowed" : "pointer" }} checked={item.selected} type="checkbox" name={item.value} id={item.value + index} disabled={item.disable} />
                                <label style={{ cursor: item.disable ? "not-allowed" : "pointer" }} htmlFor={item.value + index}>{item.value}</label>
                            </li>
                        })
                    }
                </ul>
            </div>
            <div className="M365Transfor-arrow">
                <button aria-label="move right"
                    style={{ cursor: leftSelectState === "none" ? "not-allowed" : "pointer" }}
                    onClick={() => arrowEvent(leftDataArr, rightDataArr, changeLeftDataArr, changeRightDataArr, "right", changeLeftSelectState, changeRightSelectState)}
                    disabled={leftSelectState === "none"}>&gt;</button>
                <br />
                <button aria-label="move left"
                    onClick={() => arrowEvent(leftDataArr, rightDataArr, changeLeftDataArr, changeRightDataArr, 'left', changeLeftSelectState, changeRightSelectState)}
                    style={{ cursor: leftSelectState === "none" ? "not-allowed" : "pointer" }}
                    disabled={rightSelectState === "none"}>&lt;</button>
            </div>
            <div className="M365Transfor-wrap M365Transfor-target">
                <div className="header">
                    <span>
                        {/* <input type="checkbox" name="check all source" /> */}
                        <span
                            onClick={() => {
                                sourceCheckboxEvent(rightSelectState, changeRightSelectState, rightDataArr, changeRightDataArr);
                            }}
                            className={"m365-checkbox-inner " + rightCheckboxClassName}></span>
                    </span>
                    <span className="title">Source</span>
                </div>
                <ul className="content">
                    {
                        rightDataArr.map((item, index) => {
                            return <li key={item.value} onClick={(e) => {
                                leftCheckboxEvent(e, item, index, rightDataArr, changeRightSelectState, rightSelectState, changeRightDataArr);
                            }}>
                                <input onClick={(e) => {
                                    return false;
                                }} style={{ cursor: item.disable ? "not-allowed" : "pointer" }} checked={item.selected} type="checkbox" name={item.value} id={item.value + index} disabled={item.disable} />
                                <label style={{ cursor: item.disable ? "not-allowed" : "pointer" }} htmlFor={item.value + index}>{item.value}</label>
                            </li>
                        })
                    }
                </ul>
            </div>
        </div >
    )
}

export default M365Transfer;