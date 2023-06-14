import React from "react";
import { Table, Button, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { FileAddOutlined, DeleteOutlined } from "@ant-design/icons";

import type { FileDTO } from "@/apis/conference";

const columns: ColumnsType<FileDTO> = [
	{
		title: "文件名",
		dataIndex: "fileName",
		width: "60%",
	},

	{
		title: "插入与删除",
		dataIndex: "fileId",
		align: "center",
		render: (id: number) => <FileActives />,
		width: "40%",
	},
];

export default function SideFileList({ data }: { data: Array<FileDTO> }) {
	return (
		<div
			className='data-view'
			style={{
				margin: 0,
				width: "100%",
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
				dataSource={data}
			/>
		</div>
	);
}

function FileActives() {
	return (
		<Space>
			<Button
				type='primary'
				shape='circle'
				size='large'
				title='插入文件标签'
			>
				<FileAddOutlined />
			</Button>
			<Button type='primary' shape='circle' size='large' title='删除文件'>
				<DeleteOutlined />
			</Button>
		</Space>
	);
}
