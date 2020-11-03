import React from 'react';
import "./M365Steps.css";

type StepsProps = {
    current: number;
    stepsData: StepProps[];
    direction?: string;
}
type StepProps = {
    className?: string;
    description?: React.ReactNode;
    icon?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLElement>;
    status?: 'wait' | 'process' | 'finish' | 'error';
    disabled?: boolean;
    title?: React.ReactNode;
    subTitle?: React.ReactNode;
    style?: React.CSSProperties;
}

export default class M365Steps extends React.Component<StepsProps, any>{
    constructor(props: StepsProps) {
        super(props);
    }

    render() {
        let { current, stepsData, direction } = this.props;
        let flexDirection: string;
        if (direction === "horizontal") {
            flexDirection = "row";
        } else {
            flexDirection = "column";
        }

        const stepLength: number = stepsData.length;

        return (<div className="step-wrap">
            {
                stepsData.map((item, index) => {
                    if (index < current) {
                        return (
                            <div className="step-box active" key={"title" + index}>
                                <div className="title-box">
                                    <p className="title1">{item.title}</p>
                                    <p className="title2">{item.subTitle}</p>
                                </div>
                                {index + 1 === stepLength ? "" : <div className="line"></div>}
                            </div>);
                    } else {
                        return (
                            <div className="step-box" key={"title" + index}>
                                <div className="title-box">
                                    <p className="title1">{item.title}</p>
                                    <p className="title2">{item.subTitle}</p>
                                </div>
                                {index + 1 === stepLength ? "" : <div className="line"></div>}
                            </div>);
                    }
                })
            }
        </div>)
    }


}