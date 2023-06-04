import { Space, Table, Tag, Button } from "antd";
import dayjs from "dayjs";
import useConference from "@/stores/useConference";
import { shallow } from "zustand/shallow";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const { Column } = Table;

interface Meeting {
	meetingId: number;
	meetName: string;
	beginTime: dayjs.Dayjs;
	endTime: dayjs.Dayjs;
	location: string;
	content: string;
	tag: number;
}

const tagsMessage = ["研究生", "大一", "大二", "大三", "大四"];

export default function ConferenceView() {
	const { list, initConferenceList, getConferenceList } = useConference(
		(state: any) => ({
			list: state.list,
			initConferenceList: state.initConferenceList,
			getConferenceList: state.getConferenceList,
		}),
		shallow
	);
	useEffect(() => {
		initConferenceList();
	}, [initConferenceList]);
	const navigate = useNavigate();
	return (
		<Table
			dataSource={list}
			rowKey={(meeting) => meeting.meetingId}
			style={{
				margin: "20px",
				borderRadius: "10px",
				overflow: "hidden",
			}}
			loading={list.length == 0}
			scroll={{ scrollToFirstRowOnChange: true, y: "60vh" }}
		>
			<Column title='会议名称' dataIndex='meetName' />
			{/* <Column title="会议日期" dataIndex="beginTime" /> */}
			<Column
				title='开始日期'
				render={(__, meeting: Meeting) => {
					return dayjs(meeting.beginTime).format(
						"YYYY年MM月DD日 HH:mm:ss"
					);
				}}
			/>
			<Column
				title='结束日期'
				render={(__, meeting: Meeting) => {
					return dayjs(meeting.endTime).format(
						"YYYY年MM月DD日 HH:mm:ss"
					);
				}}
			/>
			{/* <Column title='内容' dataIndex='content' /> */}
			<Column title='地点' dataIndex='location' />
			<Column title='主题' dataIndex='subject' />
			<Column title='发表人' dataIndex='publisher' />
			<Column
				title='标签'
				render={(__, meeting: Meeting) => {
					return (
						<Tag color='blue'>
							{tagsMessage[meeting.tag] || "老师"}
						</Tag>
					);
				}}
			/>
			<Column
				title='选项'
				render={(__, meeting: Meeting) => (
					<Space size='middle'>
						{}
						<Button
							type='primary'
							onClick={() => {
								navigate(`../info/${meeting.meetingId}`);
							}}
						>
							详情
						</Button>
					</Space>
				)}
			/>
		</Table>
	);
}
