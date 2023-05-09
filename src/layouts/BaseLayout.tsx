import { useState } from "react";
import { Layout } from "antd";
import TheTitle from "@/components/TheTitle";
import { Outlet } from "react-router-dom";
import TheMenu from "@/components/TheMenu";
import TheHeader from "@/components/TheHeader";
const { Sider, Content } = Layout;

export default function BaseLayout() {
	const [collapsed, setCollapsed] = useState(false);
	return (
		<Layout style={{ minWidth: "100vw", minHeight: "100vh" }}>
			<Sider
				theme="light"
				collapsible
				collapsed={collapsed}
				onCollapse={(value) => setCollapsed(value)}
			>
				<TheTitle />
				<TheMenu />
			</Sider>
			<Layout>
				<TheHeader />
				<Content style={{ overflowY: "hidden" }}>
					<Outlet />
				</Content>
			</Layout>
		</Layout>
	);
}
