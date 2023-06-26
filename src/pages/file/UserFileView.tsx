import { useEffect, useState } from "react";
import { getUserInfo, UserAllInfo } from "@/apis/user";

import UserInfoTable from "./UserInfoTable";
import FileList from "./FileList";

type Props = {
	userId?: number;
};

/**
 * 用户信息文件页面
 */
export default function UserFileView({ userId }: Props) {
	// 根据Id获取用户信息
	const [userInfo, setUserInfo] = useState<UserAllInfo["userInfo"]>();
	// 根据Id获取文件列表
	const [fileList, setFileList] = useState<UserAllInfo["fileList"]>();
	useEffect(() => {
		if (userId)
			getUserInfo(userId).then((userAllInfo) => {
				setUserInfo(userAllInfo.userInfo);
				setFileList(userAllInfo.fileList);
			});
	}, [userId]);
	return (
		<div
			style={{ height: "100%", position: "relative", overflowY: "auto" }}
		>
			<div
				style={{
					width: "100%",
					padding: "0 15vw",
				}}
			>
				<UserInfoTable userInfo={userInfo} />
				<FileList fileList={fileList} />
			</div>
		</div>
	);
}
