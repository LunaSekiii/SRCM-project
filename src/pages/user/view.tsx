import { Avatar, List, Button, Space } from "antd";
import type { UserInfo } from "@/apis/conference";
import { useNavigate } from "react-router-dom";
import { UserAvatar } from "@/components/UserInfo";

interface UserViewProp {
	userList: UserInfo[] | null;
}

export default function UserView({ userList }: UserViewProp) {
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
				itemLayout='horizontal'
				loading={!userList}
				size='large'
				style={{
					maxHeight: "80vh",
					height: "70vh",
					width: "900px",
					margin: "auto",
					overflowY: "auto",
				}}
				dataSource={userList || []}
				renderItem={(item, index) => (
					<UserItem item={item} index={index} />
				)}
			/>
		</div>
	);
}

interface UserItemProp {
	item: UserInfo;
	index: number;
}

const UserItem = ({ item, index }: UserItemProp) => {
	const navigation = useNavigate();
	const openInfo = (id: number) => {
		navigation(`/file/user/${id}`);
	};

	return (
		<List.Item key={index}>
			<List.Item.Meta
				avatar={<UserAvatar userName={item.userInfoName} />}
				title={<a>{item.userInfoName}</a>}
				description={item.role.roleName}
			/>
			<Space>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "end",
						color: "gray",
					}}
				>
					<span>{item.grade}</span>
					<span>{item.studentId}</span>
				</div>
				<Button
					type='primary'
					onClick={() => {
						openInfo(item.userId);
					}}
				>
					用户信息
				</Button>
			</Space>
		</List.Item>
	);
};
