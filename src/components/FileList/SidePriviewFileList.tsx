import { useEffect, useState, useCallback } from "react";
import { Table, Button, Space, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
	FileAddOutlined,
	DeleteOutlined,
	QuestionCircleOutlined,
} from "@ant-design/icons";
import useEvents from "@/stores/useEvents";
import type { FileDTO } from "@/apis/conference";
import { deleteFile } from "@/apis/file";

const columns: ColumnsType<FileDTO> = [
	{
		title: "文件名",
		dataIndex: "fileName",
		width: "60%",
	},
	{
		title: "上传者",
		dataIndex: "userInfo",
		render: (userInfo: FileDTO["userInfo"]) => (
			<div>{userInfo.userInfoName}</div>
		),
	},
	// {
	// 	title: "上传时间",
	// 	dataIndex: "createTime",
	// 	render: (createTime: FileDTO["createTime"]) => <div>{createTime}</div>,
	// },
	// {
	// 	title: "插入与删除",
	// 	dataIndex: "fileId",
	// 	align: "center",
	// 	render: (__, file: FileDTO) => <FileActives file={file} />,
	// 	width: "40%",
	// },
];

export default function SidePreviewFileList({
	data,
}: {
	data: Array<FileDTO>;
}) {
	const [fileData, setFileData] = useState(data);
	const subsEvent = useEvents((state) => state.subscribe);
	const unSubsEvent = useEvents((state) => state.unSubscribe);
	// 新增文件事件
	const addFile = useCallback(
		(file: FileDTO) => {
			setFileData((d) => [...d, file]);
		},
		[setFileData]
	);
	useEffect(() => {
		subsEvent("uploadFile", addFile);
		return () => {
			unSubsEvent("uploadFile", addFile);
		};
	}, [addFile]);
	// 删除文件事件
	const deleteFile = useCallback(
		(file: FileDTO) => {
			// console.log("test", file);
			const fileList = [...fileData];
			let fileKey;
			for (fileKey in fileList) {
				if (fileList[fileKey].fileId == file.fileId) {
					delete fileList[fileKey];
				}
			}
			setFileData(() => fileList);
		},
		[setFileData]
	);
	useEffect(() => {
		subsEvent("deleteFile", deleteFile);
		return () => {
			unSubsEvent("deleteFile", deleteFile);
		};
	}, [deleteFile, subsEvent, unSubsEvent]);

	useEffect(() => {
		setFileData(data);
	}, [data]);
	return (
		<div
			className='data-view'
			style={{
				margin: 0,
				width: "100%",
				height: "85%",
			}}
		>
			{/* <Divider /> */}

			<Table
				// rowSelection={{
				// 	type: "checkbox",
				// 	...rowSelection,
				// }}
				style={{
					width: "100%",
				}}
				rowKey='fileId'
				columns={columns}
				dataSource={fileData}
			/>
		</div>
	);
}

function FileActives({ file }: { file: FileDTO }) {
	const pubEvent = useEvents((state) => state.publish);
	const insertFileTag = () => {
		pubEvent("insertFileTag", [file]);
	};
	return (
		<Space>
			<Button
				type='primary'
				shape='circle'
				size='large'
				title='插入文件标签'
				onClick={insertFileTag}
			>
				<FileAddOutlined />
			</Button>

			<Popconfirm
				title='删除文件？'
				description='文件删除后将不能访问'
				icon={<QuestionCircleOutlined style={{ color: "red" }} />}
				okText='确认'
				cancelText='取消'
				// TODO: 文件删除时删除文档中的引用
				onConfirm={async () => {
					const res = await deleteFile(file.fileId);
					if (res) {
						message.success("删除成功");
						pubEvent("deleteFile", [file]);
						return true;
					} else {
						message.error("删除失败");
						return false;
					}
				}}
			>
				<Button
					type='primary'
					shape='circle'
					danger
					size='large'
					title='删除文件'
					// onClick={deleteFile}
				>
					<DeleteOutlined />
				</Button>
			</Popconfirm>
		</Space>
	);
}
