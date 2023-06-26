import { useEffect, useState, Key } from "react";
import { UserAllInfo } from "@/apis/user";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import FileIcon from "@/components/FileList/FileIcon";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import fileSizeFormat from "@/utils/fileSizeFormat";

type FileList = UserAllInfo["fileList"];

type Props = {
	fileList?: FileList;
};

interface DataType {
	name: string;
	type: string;
	size: number;
	uploader: string;
	uploadTime: string;
	children?: DataType[];
}

type FileTitleProps = {
	fileId: number;
	fileName: string;
};

function FileTitle({ fileId, fileName }: FileTitleProps) {
	const navigate = useNavigate();
	return (
		<a
			onClick={() => {
				navigate(`/file/info/${fileId}`);
			}}
		>
			{fileName}
		</a>
	);
}

const columns: ColumnsType<FileList[number]> = [
	{
		title: "",
		dataIndex: "fileName",
		key: "icon",
		align: "center",
		render: (fileName: string) => (
			<FileIcon
				type={fileName.split(".")[fileName.split(".").length - 1]}
			/>
		),
	},
	{
		title: "文件名",
		dataIndex: "fileName",
		render: (fileName: string, file: FileList[number]) => (
			<FileTitle fileId={file.fileId} fileName={fileName} />
		),
	},
	{
		title: "大小",
		dataIndex: "fileSize",
		render: (size: number) => fileSizeFormat(size),
	},
	{
		title: "上传者",
		dataIndex: "userInfo",
		render: (userInfo: UserAllInfo["userInfo"]) => (
			// TODO:跳转用户信息详情
			<div>{userInfo.userInfoName}</div>
		),
	},
	{
		title: "上传时间",
		dataIndex: "createTime",
		render: (createTime: string) => (
			<p>{dayjs(createTime).format("YYYY年MM月DD日 HH:mm:ss")}</p>
		),
	},
];

/**
 * 文件列表页面
 */
export default function FileList({ fileList }: Props) {
	return (
		<div className='data-view'>
			{/* <Divider /> */}

			<Table
				// rowSelection={{
				// 	type: "checkbox",
				// 	...rowSelection,
				// }}
				loading={!fileList}
				columns={columns}
				dataSource={fileList}
				pagination={false}
				rowKey='fileId'
				scroll={{
					scrollToFirstRowOnChange: true,
					// y: "90vh",
					x: "max-content",
				}}
			/>
			{/* <FileUpload /> */}
		</div>
	);
}
