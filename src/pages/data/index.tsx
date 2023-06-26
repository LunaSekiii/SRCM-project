import { Card } from "antd";
import MeetingCount from "./charts/MeetingCount";
import DiskCapacity from "./charts/DiskCapacity";
import VisitVolume from "./charts/VisitVolume";
import ConferenceTimeLine from "./ConferenceTimeLine";
import TodoList from "./TodoList";
import ProjectProgress from "./ProjectProgress ";

import { home } from "@/apis/home";
import { useState, useEffect } from "react";
import type { HomeData } from "@/stores/useLogin";

export default function Data() {
	const [data, steData] = useState<HomeData>();
	useEffect(() => {
		home().then((res) => {
			console.log("reshome", res);
			steData(res as HomeData);
		});
	}, []);

	return (
		<>
			<div
				style={{
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignContent: "space-around",
					overflowY: "hidden",
				}}
			>
				<div
					style={{
						padding: "1rem",
						width: "100%",
						overflowX: "auto",
						display: "flex",
						// justifyContent: "space-around",
						gap: "10px",
						overflowY: "hidden",
					}}
				>
					<Card
						title='会议数量'
						bordered={false}
						style={{
							width: "35vw",
							minWidth: 600,
							height: "45vh",
							overflowX: "hidden",
						}}
					>
						<MeetingCount />
					</Card>
					<Card
						title='访客量'
						style={{
							width: "35vw",
							minWidth: 600,
							height: "45vh",
							overflowX: "hidden",
						}}
					>
						<VisitVolume />
					</Card>
					<Card
						title='磁盘容量'
						bordered={false}
						style={{
							width: "25vw",
							minWidth: 300,
							height: "45vh",
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
						// justifyContent: "space-around",
						gap: "10px",
						overflowY: "hidden",
					}}
				>
					<Card
						title='最近日程'
						bordered={false}
						style={{
							width: "35vw",
							minWidth: 400,
							height: "45vh",
							overflowX: "hidden",
						}}
					>
						<ConferenceTimeLine conferences={data?.meetingList} />
					</Card>
					<Card
						title='待办清单'
						bordered={false}
						style={{
							width: "35vw",
							minWidth: 500,
							height: "45vh",
							overflowX: "hidden",
						}}
					>
						<TodoList />
					</Card>
					<Card
						title='项目进度'
						bordered={false}
						style={{
							width: "35vw",
							minWidth: 400,
							height: "45vh",
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
