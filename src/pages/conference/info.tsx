import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
	getConferenceDetail,
	ConferenceInfo,
	FileDTO,
} from "@/apis/conference";
import ConferenceEdit from "./edit";
import FileBar from "./FileBar";
import { Collapse } from "antd";

import ConferenceMarkdown from "@/components/ConferenceMarkdown";

const { Panel } = Collapse;

export default function ConferenceInfo() {
	const params = useParams();
	const conferenceId = Number(params.id);
	const [conferenceInfo, setConferenceInfo] = useState<ConferenceInfo>();
	const [fileList, setFileList] = useState<Array<FileDTO>>();
	useEffect(() => {
		getConferenceDetail(conferenceId as number).then((res) => {
			console.log("res", res);
			setFileList(res.fileList as Array<FileDTO>);
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
			<Collapse defaultActiveKey={[]} onChange={() => {}}>
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
			<FileBar fileList={fileList!} />
		</div>
	);
}
