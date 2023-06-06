import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Descriptions, Button } from "antd";
import { getFileInfo, downladFile } from "@/apis/file";
import fileSizeFormat from "@/utils/fileSizeFormat";
import saveFile from "@/utils/saveFile";

interface UserInfo {
	userId: number;
	userInfoName: string;
	studentId: number;
	role: string;
	grade: string;
}

interface FileDTO {
	fileId: number;
	createTime: string;
	fileName: string;
	filePath: string;
	meetId: number;
	download: number;
	fileSize: number;
	userInfo: UserInfo;
}

export default function FileInfo() {
	const { id } = useParams();
	const [fileInfo, setFileInfo] = useState<FileDTO>();
	useEffect(() => {
		if (id) {
			(getFileInfo as (id: number) => Promise<FileDTO>)(Number(id)).then(
				(res) => {
					setFileInfo(res);
					console.log("info", res);
				}
			);
		}

		return () => {};
	}, [id]);
	if (!fileInfo) return <div>文件不存在</div>;
	return (
		<div
			className='data-view p-center'
			style={{ width: "calc(40vw + 150px)" }}
		>
			<Card>
				<FileDescription fileInfo={fileInfo} />
			</Card>
		</div>
	);
}

function FileDescription({ fileInfo }: { fileInfo: FileDTO }) {
	const download = async () => {
		const data = await downladFile(fileInfo.fileId);
		console.log("data", data);
		saveFile(data, fileInfo.fileName);
	};
	return (
		<Descriptions
			title='文件信息'
			bordered
			column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
		>
			<Descriptions.Item label='文件名' span={2}>
				{fileInfo.fileName}
			</Descriptions.Item>
			<Descriptions.Item label='文件格式'>
				{fileInfo.fileName.split(".")[
					fileInfo.fileName.split(".").length - 1
				] || "未知"}
			</Descriptions.Item>
			<Descriptions.Item label='文件Id'>
				#{fileInfo.fileId}
			</Descriptions.Item>
			<Descriptions.Item label='创建时间' span={2}>
				{fileInfo.createTime}
			</Descriptions.Item>
			<Descriptions.Item label='会议Id'>
				{fileInfo.meetId}
			</Descriptions.Item>
			{/* <Descriptions.Item label='Status' span={3}>
				<Badge status='processing' text='Running' />
			</Descriptions.Item> */}
			<Descriptions.Item label='上传用户'>
				{fileInfo.userInfo?.userInfoName || "无"}
			</Descriptions.Item>
			<Descriptions.Item label='文件大小'>
				{fileSizeFormat(fileInfo.fileSize)}
			</Descriptions.Item>
			<Descriptions.Item label='下载'>
				<Button type='primary' onClick={download}>
					下载文件
				</Button>
			</Descriptions.Item>
			{/* <Descriptions.Item label='图标'>
				<FileIcon
					type={
						fileInfo.fileName.split(".")[
							fileInfo.fileName.split(".").length - 1
						]
					}
				/>
			</Descriptions.Item> */}
		</Descriptions>
	);
}
