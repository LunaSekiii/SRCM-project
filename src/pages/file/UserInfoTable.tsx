import React from "react";
import { UserInfo } from "@/apis/conference";
import { Button, Descriptions, Card } from "antd";
import { UserAvatar } from "@/components/UserInfo";
import useLogin from "@/stores/useLogin";
import { useNavigate } from "react-router-dom";

type UserInfoTableProps = {
	userInfo?: UserInfo;
};

/**
 * 用户信息表格
 */
export default function UserInfoTable({ userInfo }: UserInfoTableProps) {
	const navigate = useNavigate();
	const myInfo = useLogin((state) => state.userInfo);
	// TODO:空值处理
	if (!userInfo) return <>用户不存在</>;
	return (
		<Card className='data-view'>
			<div
				style={{
					width: "100%",
					display: "flex",
					flexWrap: "nowrap",
					alignItems: "center",
					justifyContent: "space-around",
					gap: "20px",
				}}
			>
				<Descriptions
					style={{ width: "100%" }}
					bordered
					column={{ xxl: 3, xl: 3, lg: 2, md: 2, sm: 1, xs: 1 }}
					title='用户信息'
				>
					<Descriptions.Item label='用户名'>
						{userInfo.userInfoName}
					</Descriptions.Item>
					<Descriptions.Item label='学号'>
						{userInfo.studentId || "无"}
					</Descriptions.Item>
					<Descriptions.Item label='年级'>
						{userInfo.grade ? `${userInfo.grade}级` : "无"}
					</Descriptions.Item>
					<Descriptions.Item label='账号权限'>
						{userInfo.role.roleName}
					</Descriptions.Item>
					{myInfo &&
					(myInfo.role.roleId !== 0 ||
						myInfo.userId == userInfo.userId) ? (
						<Descriptions.Item label='操作'>
							<Button
								type='primary'
								onClick={() => {
									navigate(`/user/change/${userInfo.userId}`);
								}}
							>
								编辑用户信息
							</Button>
						</Descriptions.Item>
					) : null}
				</Descriptions>
				<div>
					<UserAvatar userName={userInfo.userInfoName} big />
				</div>
			</div>
		</Card>
	);
}
