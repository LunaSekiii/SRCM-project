import React, { useEffect, useState } from "react";
import { Avatar, Space, Dropdown, MenuProps, message } from "antd";
import { blue } from "@ant-design/colors";
import useLogin from "@/stores/useLogin";
import { UserInfo } from "@/apis/conference";
import { logout } from "@/apis/user";
import { useNavigate } from "react-router-dom";

// 退出登录
function GoUserLogout() {
	const navigate = useNavigate();
	const getState = useLogin((state) => state.getState);
	const key = "logout";
	const userLogout = () => {
		message.loading({
			key,
			content: "退出登录...",
		});
		logout().then((res) => {
			if (res) {
				message.success({ content: "已退出登录", key });
				// navigate("/login");
				getState();
			} else {
				message.error({ content: "退出登录异常，请重试", key });
			}
		});
	};
	return <a onClick={userLogout}>退出登录</a>;
}
// 编辑账号信息
function GoUserInfo({ userId }: { userId: number }) {
	const navigate = useNavigate();
	const editSelfInfo = () => {
		navigate(`/file/user/${userId}`);
	};
	// TODO: 账号权限管理
	return <a onClick={editSelfInfo}>账号信息</a>;
}

// 跳转登录
function GoUserLogin() {
	const navigate = useNavigate();
	return (
		<a
			onClick={() => {
				navigate("/login");
			}}
		>
			登录
		</a>
	);
}

// 用户操作选项
function getUserTools(userInfo: UserInfo | null) {
	let items: MenuProps["items"];
	if (userInfo) {
		items = [
			{
				key: "1",
				label: <GoUserInfo userId={userInfo?.userId} />,
			},
			{
				key: "2",
				label: <GoUserLogout />,
			},
		];
	} else {
		items = [
			{
				key: "1",
				label: <GoUserLogin />,
			},
		];
	}
	return { items };
}

/**
 * 用户登录信息
 */
export default function TheUserInfo() {
	const userInfo = useLogin((state) => state.userInfo);
	const [items, setItems] = useState(getUserTools(userInfo));
	useEffect(() => {
		setItems(getUserTools(userInfo));
		console.log("userInfo", userInfo);
	}, [userInfo]);
	return (
		<Dropdown menu={items} placement='bottom'>
			<div>
				<UserTitle userInfoName={userInfo?.userInfoName || "未登录"} />
			</div>
		</Dropdown>
	);
}

/**
 * 用户名展示组件
 */
function UserTitle({ userInfoName }: { userInfoName: string }) {
	return (
		<Space
			style={{
				color: "white",
				lineHeight: "100%",
			}}
			align='center'
		>
			<UserAvatar userName={userInfoName} />
			{userInfoName}
		</Space>
	);
}

type UserAvatarProps = {
	userName: string;
	big?: boolean;
};

export function UserAvatar({ userName, big = false }: UserAvatarProps) {
	const length = userName.length;
	return (
		<Avatar
			style={{ backgroundColor: blue.primary }}
			size={
				big
					? { xs: 50, sm: 50, md: 100, lg: 100, xl: 100, xxl: 100 }
					: {}
			}
		>
			{userName.slice(length >= 2 ? length - 2 : 0, length)}
		</Avatar>
	);
}
