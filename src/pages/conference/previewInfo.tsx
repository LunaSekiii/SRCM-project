import { useEffect } from "react";
import ConferenceMarkdown from "@/components/ConferenceMarkdown";
import FileBar from "./FileBar";
import { ConferenceInfo, FileDTO } from "@/apis/conference";
import useConferenceInfo from "@/stores/useConferenceInfo";
import { shallow } from "zustand/shallow";

type ConferencePreviewInfoProp = {
	conferenceId: number;
};

export default function ConferencePreviewInfo({
	conferenceId,
}: ConferencePreviewInfoProp) {
	const {
		getConferenceInfo,
		stopGetConferenceInfo,
		fileList,
		conferenceInfo,
	} = useConferenceInfo(
		(state) => ({
			getConferenceInfo: state.getConferenceInfo,
			stopGetConferenceInfo: state.stopGetConferenceInfo,
			fileList: state.files,
			conferenceInfo: state.conferenceInfo,
		}),
		shallow
	);

	useEffect(() => {
		getConferenceInfo(conferenceId);
		return () => {
			stopGetConferenceInfo();
		};
	}, [conferenceId]);

	return (
		<>
			<ConferenceMarkdown
				isPreview
				content={conferenceInfo?.content}
				meetingId={conferenceId}
			/>
			<FileBar fileList={fileList!} preview meetingId={conferenceId} />
		</>
	);
}
