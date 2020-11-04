import React, { useState } from 'react';
import './App.css';
import { Steps, Row, Col, DatePicker } from 'antd';
import 'antd/dist/antd.css';
import Sider from "./Components/Menu";

import M365Steps from "./Components/M365Steps/M365Steps";
import M365DatePicker from "./Components/DatePicker/index";
const { Step } = Steps;
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
function App() {
	const [currentStep, setcurrentStep] = useState(0);
	const [menuData, setMenuData] = useState(11);
	const stepsData: StepProps[] = [
		{ title: "step 1", subTitle: "This is a description." },
		{ title: "step 2", subTitle: "This is a description." },
		{ title: "step 3", subTitle: "This is a description." },
		{ title: "step 4", subTitle: "This is a description." }
	];
	return (
		<div className="App">
			{/* <h2 style={{ textAlign: 'center', height: '40px', lineHeight: '40px' }}>react+typescript+accessibility</h2>
			<Row>
				<Col span={6} >
					<Sider changeMenuData={(value: React.SetStateAction<number>) => { return setMenuData(value); }} />
				</Col>
				<Col span={18}>

				</Col>
			</Row> */}
			<h2>ant-design Steps component</h2>
			<Steps current={1}>
				<Step title="Finished" description="This is a description." />
				<Step title="In Progress" subTitle="Left 00:00:08" description="This is a description." />
				<Step title="Waiting" description="This is a description." />
			</Steps>
			<h2>my steps component</h2>
			<M365Steps current={currentStep} stepsData={stepsData}></M365Steps>

			<button onClick={() => {
				if (currentStep > 0) {
					setcurrentStep(currentStep - 1);
				}
			}}>Previous</button>
     		&nbsp;&nbsp;{currentStep}&nbsp;&nbsp;
			<button onClick={() => {
				if (currentStep < stepsData.length) {
					setcurrentStep(currentStep + 1);
				}
			}}>Next</button>
			<hr />
			<h2>ant-design DatePicker component</h2>
			<DatePicker onChange={(date, dateString) => {
				console.log(date, dateString);
			}} />
			<h2>my DatePicker component</h2>
			<M365DatePicker onChange={() => { return "aa" }} />
		</div>
	);
}

export default App;