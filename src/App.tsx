import React, { useState } from 'react';
import './App.css';
import { Steps, Row, Col, DatePicker, Collapse, Tooltip, Progress, message, Button, Space } from 'antd';
import 'antd/dist/antd.css';
import Sider from "./Components/Menu";

import M365Steps from "./Components/M365Steps/M365Steps";
import M365DatePicker from "./Components/DatePicker/index";
import M365Transfer from "./Components/M365Transfer/index";
import M365Collapse from "./Components/M365Collapse/index";
import M365Tooltip from "./Components/M365Tooltip/index";
import M365Progress from "./Components/M365Progress/index";
import M365Message from "./Components/M365Message/index";
const { Step } = Steps;
const { Panel } = Collapse;
const M365Panel = M365Collapse.Panel;

function callback(key: any) {
	console.log(key);
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

const success = () => {
	message.success('This is a success message');
};

const error = () => {
	message.error('This is an error message');
};

const warning = () => {
	message.warning('This is a warning message');
};

const successM365 = () => {
	M365Message.success('This is a success message');
};

const errorM365 = () => {
	M365Message.error('This is an error message');
};

const warningM365 = () => {
	M365Message.warning('This is a warning message');
};
function App() {
	const [currentStep, setcurrentStep] = useState(0);
	const [menuData, setMenuData] = useState(11);
	const [panelNum, setPanelNum] = useState(0);
	const [percent, setPercent] = useState(50);
	const stepsData: StepProps[] = [
		{ title: "step 1", subTitle: "This is a description." },
		{ title: "step 2", subTitle: "This is a description." },
		{ title: "step 3", subTitle: "This is a description." },
		{ title: "step 4", subTitle: "This is a description." }
	];
	let leftDataArr = [{ value: "content1 ", disable: false, selected: false },
	{ value: "content2", disable: false, selected: false },
	{ value: "content3", disable: false, selected: false },
	{ value: "content4", disable: true, selected: false },
	{ value: "content5", disable: false, selected: false },
	{ value: "content6", disable: true, selected: false },
	{ value: "content7", disable: false, selected: false },
	{ value: "content8", disable: false, selected: false },
	{ value: "content9", disable: false, selected: false }]
	let rightDataArr = [{ value: "content10", disable: false, selected: false },
	{ value: "content11", disable: false, selected: false },
	{ value: "content12", disable: false, selected: false },
	{ value: "content13", disable: false, selected: false },
	{ value: "content14", disable: false, selected: false },
	{ value: "content15", disable: false, selected: false }]
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
			<hr />
			<h2>my Transfer component</h2>
			<Row>
				<Col style={{ wordBreak: 'break-all' }} span="10">左侧的数据：[{
					leftDataArr.map(item => {
						if (item.disable) {
							return <span className="m356Transform-disabled" key="item">{item.value},</span>
						} else {
							return <span className="m356Transform-indisabled" key="item">{item.value},</span>
						}
					})
				}]</Col>
				<Col style={{ wordBreak: 'break-all' }} span="10" push="2">右侧侧的数据：[{
					rightDataArr.map(item => {
						if (item.disable) {
							return <span className="m356Transform-disabled" key="item">{item.value},</span>
						} else {
							return <span className="m356Transform-indisabled" key="item">{item.value},</span>
						}
					})
				}]</Col>
			</Row>
			<M365Transfer
				leftDataArrProps={leftDataArr}
				rightDateArrProps={rightDataArr} />
			<hr />
			<h2>ant-design Collapse component</h2>
			<Collapse defaultActiveKey={['1']} onChange={callback}>
				<Panel header="This is panel header 1" key="1">
					<p>panel content</p>
				</Panel>
				<Panel header="This is panel header 2" key="2">
					<p>panel content</p>
				</Panel>
				<Panel header="This is panel header 3" key="3" disabled>
					<p>panel content</p>
				</Panel>
			</Collapse>
			<h2>my Collapse component</h2>
			<p>被选中的面板{panelNum}</p>
			<M365Collapse defaultActiveKey={panelNum} onChange={(num: number) => setPanelNum(num)}>
				<M365Panel key="1" header="panel header1" content="panel content1" />
				<M365Panel key="2" header="panel header2" content="panel content2" />
				<M365Panel key="3" header="panel header3" content="panel content3" />
			</M365Collapse>
			<hr />
			<h2>ant-design tooltip component</h2>
			<Tooltip title="prompt text">
				<span>Tooltip left</span>
			</Tooltip>
			<h2>my tooltip component</h2>
			<M365Tooltip title="prompt text" placement="left">
				<Button>Tooltip left</Button>
			</M365Tooltip>
			<br />
			<M365Tooltip title="prompt text" placement="right">
				<Button>Tooltip right</Button>
			</M365Tooltip>
			<br />

			<M365Tooltip title="prompt text" placement="top">
				<Button>Tooltip top</Button>
			</M365Tooltip>
			<br />

			<M365Tooltip title="prompt text" placement="bottom">
				<Button>Tooltip bottom</Button>
			</M365Tooltip>
			<br />
			<h2>ant-design Progress component</h2>
			<Progress percent={30} />
			<Progress percent={50} status="active" />
			<Progress percent={70} status="exception" />
			<Progress percent={100} />
			<Progress percent={50} showInfo={false} />

			<h2>my Progress component</h2>
			<Button aria-label="subtraction percent"
				onClick={() => {
					let newpercent = percent - 10 >= 0 ? percent - 10 : 0;
					setPercent(newpercent);
				}}>-</Button>
			<Button aria-label="Addition  percent"
				onClick={() => {
					let newpercent = percent + 10 <= 100 ? percent + 10 : 100;
					setPercent(newpercent);
				}}>+</Button>
			<section className="code-box-demo">
				<M365Progress percent={percent} />
				<M365Progress percent={percent} showInfo={false} />
				<M365Progress percent={percent} status="active" />
				<M365Progress percent={percent} status="exception" />
				<M365Progress percent={100} />

				<div style={{ width: '100px' }}>
					<M365Progress percent={percent} type="circle" />
				</div>

			</section>

			<h2>ant-design Message component</h2>
			<Space>
				<Button onClick={success}>Success</Button>
				<Button onClick={error}>Error</Button>
				<Button onClick={warning}>Warning</Button>
			</Space>

			<h2>my Message component</h2>
			<Space>
				<Button onClick={successM365}>Success</Button>
				<Button onClick={errorM365}>Error</Button>
				<Button onClick={warningM365}>Warning</Button>
			</Space>



		</div>
	);
}

export default App;