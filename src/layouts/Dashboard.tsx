import React, { useState } from "react";
import "./dashboard.scss";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CloudOutlined,
} from "@ant-design/icons";
import { theme, Layout, Menu, Button } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation

interface DashboardProps {
  children: any;
}

const Dasboard: React.FC<DashboardProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
      <Layout className="layout">
        {/* <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" >
              <h3>Logo</h3>
            </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
          >
            <Menu.Item key="1" icon={<CloudOutlined />}>
              <Link to="/claims">Claims</Link>
            </Menu.Item>
          </Menu>
        </Sider> */}
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
               <Link style={{float:"right", marginRight:"41px"}} to={"/"}>Log Out</Link>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Dasboard;
