import React from "react";
import { Space, Table } from "antd";

const { Column } = Table;

interface DataType {
	key: React.Key;
	项目名称: string;
	截至日期: string;
	会议时间: string;
	参与人数: number;
	项目简介: string;
	负责人: string;
	标签: string[];
}

const data: DataType[] = [
	{
		key: 11123213,
		项目名称: "DFL",
		截至日期: "2023-05-30",
		会议时间: "13:00",
		参与人数: 5,
		项目简介: "免携带设备定位",
		负责人: "user1",
		标签: ["大二"],
	},
	{
		key: 11123214,
		项目名称: "智能驾驶",
		截至日期: "2023-05-30",
		会议时间: "14:00",
		参与人数: 5,
		项目简介: "多模态处理",
		负责人: "user2",
		标签: ["大三"],
	},
];

export default function ProjectView() {
	return (
		<Table dataSource={data}>
			<Column title="项目名称" dataIndex="项目名称" key="项目名称" />
			<Column title="截至日期" dataIndex="截至日期" key="截至日期" />
			<Column title="参与人数" dataIndex="参与人数" key="参与人数" />
			<Column title="项目简介" dataIndex="项目简介" key="项目简介" />
			<Column title="负责人" dataIndex="负责人" key="负责人" />

			<Column
				title="操作"
				key="action"
				render={(_: any /*, record: DataType */) => (
					<Space size="middle">
						{/* <a>参加 {record["项目名称"]}</a> */}
						<a>查看详情</a>
						<a>编辑</a>
					</Space>
				)}
			/>
		</Table>
	);
}
