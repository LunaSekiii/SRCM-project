import React from "react";
import { Space, Table, Tag } from "antd";

const { Column } = Table;

interface DataType {
	key: React.Key;
	会议名称: string;
	会议日期: string;
	会议时间: string;
	参会人数: number;
	会议描述: string;
	地点: string;
	标签: string[];
}

const data: DataType[] = [
	{
		key: 11123213,
		会议名称: "14周周会",
		会议日期: "2023-05-30",
		会议时间: "13:00",
		参会人数: 9,
		会议描述: "确定研究方向",
		地点: "实训楼228",
		标签: ["大二"],
	},
	{
		key: 11123214,
		会议名称: "14周周会",
		会议日期: "2023-05-30",
		会议时间: "14:00",
		参会人数: 3,
		会议描述: "计划毕设",
		地点: "实训楼228",
		标签: ["大三"],
	},
];

export default function ConferenceView() {
	return (
		<Table dataSource={data}>
			<Column title="会议名称" dataIndex="会议名称" key="会议名称" />
			<Column title="会议日期" dataIndex="会议日期" key="会议日期" />
			<Column title="参会人数" dataIndex="参会人数" key="参会人数" />
			<Column title="会议描述" dataIndex="会议描述" key="会议描述" />
			<Column title="地点" dataIndex="地点" key="地点" />
			<Column
				title="标签"
				dataIndex="标签"
				key="标签"
				render={(tags: string[]) => (
					<>
						{tags.map((tag) => (
							<Tag color="blue" key={tag}>
								{tag}
							</Tag>
						))}
					</>
				)}
			/>
			<Column
				title="选项"
				key="action"
				render={() => (
					<Space size="middle">
						{/* <a>参加 {record["会议名称"]}</a> */}
						<a>编辑</a>
					</Space>
				)}
			/>
		</Table>
	);
}
