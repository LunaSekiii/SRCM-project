import { useState, useEffect } from "react";
import UserEdit from "./edit";
import { useParams } from "react-router-dom";
import type { UserInfo } from "@/apis/conference";
import { getUserInfo } from "@/apis/user";
import CenterCard from "@/layouts/CenterCard";
import useLogin from "@/stores/useLogin";
import NotAuthorized from "../NotAuthorized";
import UserChange4Self from "./change4Self";

export default function UserChenge4admin() {
	const myInfo = useLogin((state) => state.userInfo);
	const { id } = useParams();
	const [userInfo, setUserInfo] = useState<UserInfo>();
	useEffect(() => {
		if (id)
			getUserInfo(id as unknown as number).then((res) => {
				setUserInfo(res.userInfo);
				console.log("res", res);
			});
	}, [id]);
	// TODO:空值处理
	if (!userInfo) return null;
	if (
		!myInfo ||
		(myInfo.role.roleId == 0 && myInfo.userId != userInfo?.userId)
	)
		return <NotAuthorized />;
	if (myInfo.role.roleId == 0) {
		// 普通用户修改自己的信息
		return <UserChange4Self />;
	}
	return (
		<CenterCard backPoint>
			<UserEdit userInfo={userInfo} />
		</CenterCard>
	);
}
