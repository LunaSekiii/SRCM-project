import React from "react";
import { Table, Divider } from "antd";
import type { ColumnsType } from "antd/es/table";
import FileIcon from "./FileIcon";
import FileUpload from "../FileUpload";

interface DataType {
	key: React.Key;
	name: string;
	type: string;
	size: number;
	uploader: string;
	uploadTime: string;
	children?: DataType[];
}

function clickFile(record: DataType) {
	return () => console.log("record", record);
}

const columns: ColumnsType<DataType> = [
	{
		title: "",
		dataIndex: "type",
		align: "center",
		render: (type: string) => <FileIcon type={type} />,
	},
	{
		title: "文件名",
		dataIndex: "name",
		render: (text: string, record: DataType) => (
			<a onClick={clickFile(record)}>{text}</a>
		),
	},
	{
		title: "大小",
		dataIndex: "size",
	},
	{
		title: "上传者",
		dataIndex: "uploader",
	},
	{
		title: "上传时间",
		dataIndex: "uploadTime",
	},
];

const data: DataType[] = [
	{
		key: "1",
		name: "文件1",
		type: "folder",
		size: 32,
		uploader: "user1",
		uploadTime: "2023-03-05",
	},
	{
		key: "2",
		name: "文件2",
		type: "zip",
		size: 42,
		uploader: "user1",
		uploadTime: "2023-03-05",
	},
	{
		key: "3",
		name: "文件3",
		type: "ppt",
		size: 32,
		uploader: "Sydney No. 1 Lake Park",
		uploadTime: "2023-03-05",
	},
	{
		key: "4",
		name: "文件4",
		type: "word",
		size: 99,
		uploader: "Sydney No. 1 Lake Park",
		uploadTime: "2023-03-05",
	},
	{
		key: "11",
		name: "文件4",
		type: "word",
		size: 99,
		uploader: "Sydney No. 1 Lake Park",
		uploadTime: "2023-03-05",
	},
	{
		key: "10",
		name: "文件4",
		type: "jpg",
		size: 99,
		uploader: "Sydney No. 1 Lake Park",
		uploadTime: "2023-03-05",
	},
	{
		key: "9",
		name: "文件4",
		type: "word",
		size: 99,
		uploader: "Sydney No. 1 Lake Park",
		uploadTime: "2023-03-05",
	},
	{
		key: "8",
		name: "文件4",
		type: "7z",
		size: 99,
		uploader: "Sydney No. 1 Lake Park",
		uploadTime: "2023-03-05",
	},
	{
		key: "7",
		name: "文件4",
		type: "png",
		size: 99,
		uploader: "Sydney No. 1 Lake Park",
		uploadTime: "2023-03-05",
	},
	{
		key: "5",
		name: "文件4",
		type: "word",
		size: 99,
		uploader: "Sydney No. 1 Lake Park",
		uploadTime: "2023-03-05",
	},
	{
		key: "6",
		name: "文件4",
		type: "doc",
		size: 99,
		uploader: "Sydney No. 1 Lake Park",
		uploadTime: "2023-03-05",
	},
];

// rowSelection object indicates the need for row selection
const rowSelection = {
	onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
		console.log(
			`selectedRowKeys: ${selectedRowKeys}`,
			"selectedRows: ",
			selectedRows
		);
	},
	getCheckboxProps: (record: DataType) => ({
		disabled: record.name === "Disabled User", // Column configuration not to be checked
		name: record.name,
	}),
};

export default function FileList() {
	return (
		<div className='data-view'>
			{/* <Divider /> */}

			<Table
				rowSelection={{
					type: "checkbox",
					...rowSelection,
				}}
				columns={columns}
				dataSource={data}
			/>
			{/* <FileUpload /> */}
		</div>
	);
}
