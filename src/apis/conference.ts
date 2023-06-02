import dayjs from "dayjs";
import xf from ".";

interface confirenceRes {
	list: object[];
	hasMore: boolean;
}

export function getConferenceList(page: number, pageSize = 10) {
	return xf(
		`meeting/list?page=${page}&pageSize=${pageSize}`
	) as unknown as Promise<confirenceRes>;
}

export interface ConferenceInfo {
	beginTime: dayjs.Dayjs;
	content: string;
	endTime: dayjs.Dayjs;
	location: string;
	meetName: string;
	meetingId: number;
	publisher: string | null;
	subject: string;
	tag: number;
}

interface ConferenceRes {
	meetingDTO: ConferenceInfo;
}

export async function getConferenceDetail(meetingId: number) {
	const info = (await xf(`meeting/detail/${meetingId}`)) as ConferenceRes;

	info.meetingDTO.beginTime = dayjs(info.meetingDTO.beginTime);
	info.meetingDTO.endTime = dayjs(info.meetingDTO.endTime);
	return info as ConferenceRes;
}

export function saveConference(info: ConferenceInfo) {
	return xf("meeting/save", {
		method: "POST",
		body: JSON.stringify(info),
		headers: { "Content-Type": "application/json" },
	});
}

export function deleteConference(meetingId: number) {
	return xf(`meeting/delete/${meetingId}`, {
		method: "GET",
	});
}
