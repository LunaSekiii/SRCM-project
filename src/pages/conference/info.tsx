import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getConferenceDetail, ConferenceInfo } from "@/apis/conference";
import ConferenceEdit from "./edit";
import { Collapse } from "antd";

import ConferenceMarkdown from "@/components/ConferenceMarkdown";

const { Panel } = Collapse;

export default function ConferenceInfo() {
	const params = useParams();
	const conferenceId = Number(params.id);
	const [conferenceInfo, setConferenceInfo] = useState<ConferenceInfo>();
	useEffect(() => {
		getConferenceDetail(conferenceId as number).then((res) => {
			console.log("res", res);
			setConferenceInfo({
				...res.meetingDTO,
				meetingId: conferenceId,
			});
		});
	}, [conferenceId]);
	return (
		<div
			style={{
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-around",
				overflowX: "hidden",
				overflowY: "auto",
			}}
		>
			<Collapse defaultActiveKey={["1"]} onChange={() => {}}>
				<Panel header='会议信息' key='1'>
					<div style={{ position: "relative", height: "500px" }}>
						<ConferenceEdit
							conferenceInfo={
								{
									...conferenceInfo,
									content: "null",
								} as ConferenceInfo
							}
						/>
					</div>
				</Panel>
			</Collapse>
			<ConferenceMarkdown
				content={conferenceInfo?.content}
				meetingId={conferenceId}
			/>
		</div>
	);
}
