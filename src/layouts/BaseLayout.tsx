import { useState, useEffect, useCallback } from "react";
import { Layout } from "antd";
import TheTitle from "@/components/TheTitle";
import { Outlet } from "react-router-dom";
import TheMenu from "@/components/TheMenu";
import TheHeader from "@/components/TheHeader";
const { Sider, Content } = Layout;
import useTheme from "@/stores/useTheme";
import useEvents from "@/stores/useEvents";

// 初始化数据
import useUsers from "@/stores/useUsers";
import useLogin from "@/stores/useLogin";

export default function BaseLayout() {
	// 初始化登录状态
	const getLoginState = useLogin((state) => state.getState);
	// 初始化用户数据
	const getUserList = useUsers((state) => state.getUserList);
	useEffect(() => {
		getLoginState();
		getUserList();
	}, []);

	const [collapsed, setCollapsed] = useState(false);
	const theme = useTheme((state) => state.theme);

	// 侧栏开关事件
	const siderSwitch = useCallback(() => {
		setCollapsed((sollapsed) => !sollapsed);
	}, [setCollapsed]);

	// 订阅侧栏开关消息
	const subEvents = useEvents((state) => state.subscribe);
	const unSubEvents = useEvents((state) => state.unSubscribe);
	useEffect(() => {
		subEvents("siderSwitch", siderSwitch);
		return () => {
			unSubEvents("siderSwitch", siderSwitch);
		};
	}, [siderSwitch]);

	return (
		<Layout
			style={{
				minWidth: "100vw",
				minHeight: "100vh",
				maxHeight: "100vh",
			}}
		>
			<Sider
				theme={theme}
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
