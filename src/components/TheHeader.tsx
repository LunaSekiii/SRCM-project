import { Layout, Button } from "antd";

const { Header } = Layout;

export default function TheHeader() {
	return (
		<Header
			style={
				{
					// backgroundColor: "var(--p)",
				}
			}
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
			>
				12321
			</Button>
		</Header>
	);
}
