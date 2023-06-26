import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
	getConferenceDetail,
	ConferenceInfo,
	FileDTO,
} from "@/apis/conference";
import ConferenceEdit from "./edit";
import FileBar from "./FileBar";
import { Modal } from "antd";
import useLogin from "@/stores/useLogin";
import useEvents from "@/stores/useEvents";

import ConferenceMarkdown from "@/components/ConferenceMarkdown";

export default function ConferenceInfo() {
	const params = useParams();
	const conferenceId = Number(params.id);
	const [conferenceInfo, setConferenceInfo] = useState<ConferenceInfo>();
	const [fileList, setFileList] = useState<Array<FileDTO>>();
	const myInfo = useLogin((state) => state.userInfo);
	// 模态框
	const [idModalOpen, setIsModalOpen] = useState(true);
	const pubEvents = useEvents((state) => state.publish);
	const subEvents = useEvents((state) => state.subscribe);
	const unSubEvents = useEvents((state) => state.unSubscribe);
	const modalSwitch = useCallback(() => {
		setIsModalOpen((s) => !s);
	}, [setIsModalOpen]);
	useEffect(() => {
		subEvents("conferenceModalSwitch", modalSwitch);
		return () => {
			unSubEvents("conferenceModalSwitch", modalSwitch);
		};
	}, [modalSwitch]);

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
	if (!conferenceInfo) return null;
	if (myInfo?.userId != conferenceInfo.publisher?.userId) {
		return (
			<ConferenceMarkdown
				isPreview
				content={conferenceInfo?.content}
				meetingId={conferenceId}
			/>
		);
	}

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
			<Modal
				title='会议信息'
				open={idModalOpen}
				width={"50vw"}
				okText='确定'
				onOk={() => {
					pubEvents("saveConferenceInfo", []);
					modalSwitch();
				}}
				cancelText='取消'
				onCancel={modalSwitch}
			>
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
			</Modal>
			{/* </Panel>
			</Collapse> */}
			<ConferenceMarkdown
				content={conferenceInfo?.content}
				meetingId={conferenceId}
			/>
			<FileBar fileList={fileList!} />
		</div>
	);
}
