import { Card } from "antd";
import MeetingCount from "./charts/MeetingCount";
import DiskCapacity from "./charts/DiskCapacity";
import VisitVolume from "./charts/VisitVolume";
import ConferenceTimeLine from "./ConferenceTimeLine";
import TodoList from "./TodoList";
import ProjectProgress from "./ProjectProgress ";

import { home } from "@/apis/home";
import { getConferenceList } from "@/apis/conference";

export default function Data() {
	getConferenceList(0).then((res) => {
		console.log("res", res);
	});
	home().then((res) => console.log("res", res));
	return (
		<>
			<div
				style={{
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
				}}
			>
				<div
					style={{
						padding: "1rem",
						width: "100%",
						overflowX: "auto",
						display: "flex",
						justifyContent: "space-around",
						gap: "10px",
					}}
				>
					<Card
						title='会议数量'
						bordered={false}
						style={{
							width: 700,
							minWidth: 600,
							overflowX: "hidden",
						}}
					>
						<MeetingCount />
					</Card>
					<Card
						title='访客量'
						style={{
							width: 700,
							minWidth: 600,
							overflowX: "hidden",
						}}
					>
						<VisitVolume />
					</Card>
					<Card
						title='磁盘容量'
						bordered={false}
						style={{
							width: 300,
							minWidth: 300,
							overflowX: "hidden",
						}}
					>
						<DiskCapacity />
					</Card>
				</div>

				<div
					style={{
						padding: "1rem",
						width: "100%",
						overflowX: "auto",
						display: "flex",
						justifyContent: "space-around",
						gap: "10px",
					}}
				>
					<Card
						title='最近日程'
						bordered={false}
						style={{
							width: 500,
							minWidth: 400,
							height: 600,
							overflowX: "hidden",
						}}
					>
						<ConferenceTimeLine />
					</Card>
					<Card
						title='待办清单'
						bordered={false}
						style={{
							width: 600,
							minWidth: 500,
							height: 600,
							overflowX: "hidden",
						}}
					>
						<TodoList />
					</Card>
					<Card
						title='项目进度'
						bordered={false}
						style={{
							width: 500,
							minWidth: 400,
							height: 600,
							overflowX: "hidden",
						}}
					>
						<ProjectProgress />
					</Card>
				</div>
			</div>
		</>
	);
}
