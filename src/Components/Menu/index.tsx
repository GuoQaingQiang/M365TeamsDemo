import React from 'react';
import { Menu } from 'antd';

const { SubMenu } = Menu;
type SideProps = {
    changeMenuData: () => void;
}
export default class Sider extends React.Component<SideProps, any> {
    constructor(props: SideProps) {
        super(props);
    }
    handleClick = (e: any) => {
        this.props.changeMenuData();
    };
    render() {
        return (
            <Menu
                theme="dark"
                onClick={this.handleClick}
                style={{ width: 256 }}
                defaultSelectedKeys={['11']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >
                <SubMenu
                    key="sub1"
                    title={
                        <span>
                            <span>2020/11/04</span>
                        </span>
                    }
                >
                    <Menu.ItemGroup key="g1" title="Steps component">
                        <Menu.Item key="11">ant-design</Menu.Item>
                        <Menu.Item key="12">my</Menu.Item>
                    </Menu.ItemGroup>
                    <Menu.ItemGroup key="g2" title="DatePicker component">
                        <Menu.Item key="21">ant-design</Menu.Item>
                        <Menu.Item key="22">my</Menu.Item>
                    </Menu.ItemGroup>
                </SubMenu>
            </Menu>
        );
    }
}