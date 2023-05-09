import { Avatar, List, Button } from "antd";

const data = [
	{
		title: "user1",
	},
	{
		title: "user2",
	},
	{
		title: "user3",
	},
	{
		title: "user4",
	},
	{
		title: "user5",
	},
	{
		title: "user6",
	},
	{
		title: "user7",
	},
	{
		title: "user8",
	},
	{
		title: "user9",
	},
	{
		title: "user10",
	},
	{
		title: "user11",
	},
	{
		title: "user12",
	},
	{
		title: "user13",
	},
	{
		title: "user14",
	},
	{
		title: "user15",
	},
	{
		title: "user16",
	},
	{
		title: "user17",
	},
	{
		title: "user18",
	},
];
export default function UserView() {
	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				overflowY: "auto",
				overflowX: "hidden",
			}}
		>
			<List
				itemLayout="horizontal"
				style={{
					maxHeight: "90vh",
					width: "900px",
					margin: "auto",
				}}
				dataSource={data}
				renderItem={(item, index) => (
					<List.Item key={index}>
						<List.Item.Meta
							avatar={
								<Avatar
									src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
								/>
							}
							title={<a>{item.title}</a>}
							description="人工智能学院"
						/>
						<Button>编辑</Button>
					</List.Item>
				)}
			/>
		</div>
	);
}
