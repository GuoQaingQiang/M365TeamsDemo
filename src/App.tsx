import React, { useState } from 'react';
import './App.css';
import { Steps } from 'antd';
import 'antd/dist/antd.css';

import M365Steps from "./Components/M365Steps";
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

	const stepsData: StepProps[] = [
		{ title: "step 1", subTitle: "This is a description." },
		{ title: "step 2", subTitle: "This is a description." }
	]
	return (
		<div className="App">
			<h2>ant-design 自带Steps组件实例</h2>
			<Steps current={1}>
				<Step title="Finished" description="This is a description." />
				<Step title="In Progress" subTitle="Left 00:00:08" description="This is a description." />
				<Step title="Waiting" description="This is a description." />
			</Steps>
			<h2>自己的Steps组件实例</h2>
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
		</div>
	);
}

export default App;
