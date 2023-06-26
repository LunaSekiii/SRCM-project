import { Layout, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import TheUserInfo from "./UserInfo";
import useEvents from "@/stores/useEvents";

const { Header } = Layout;

export default function TheHeader() {
	// 发布侧栏开关事件
	const pubEvents = useEvents((state) => state.publish);
	const siderSwitch = () => {
		pubEvents("siderSwitch", []);
	};
	return (
		<Header
			style={{
				// backgroundColor: "var(--p)",
				display: "flex",
				// flexDirection: "column",
				alignItems: "center",
				justifyContent: "space-between",
				paddingLeft: "0px",
			}}
		>
			<Button
				type='text'
				// icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
				// onClick={() => setCollapsed(!collapsed)}
				style={{
					fontSize: "16px",
					width: 64,
					height: 64,
					color: "white",
				}}
				onClick={siderSwitch}
			>
				<MenuOutlined />
			</Button>
			{/* <Space> */}
			<TheUserInfo />
			{/* </Space> */}
		</Header>
	);
}
