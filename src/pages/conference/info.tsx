import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getConferenceDetail, ConferenceInfo } from "@/apis/conference";
import ConferenceEdit from "./edit";

export default function ConferenceInfo() {
	const params = useParams();
	const conferenceId = Number(params.id);
	const [conferenceInfo, setConferenceInfo] = useState<ConferenceInfo>();
	useEffect(() => {
		getConferenceDetail(conferenceId as number).then((res) => {
			console.log("res", res);
			setConferenceInfo({
				...res.meetingDTO,
				meetingId: conferenceId as unknown as number,
			});
		});
	}, [conferenceId]);
	return <ConferenceEdit conferenceInfo={conferenceInfo as ConferenceInfo} />;
}
