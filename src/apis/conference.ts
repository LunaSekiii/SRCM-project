import dayjs from "dayjs";
import xf from ".";

// 获取会议列表
interface confirenceRes {
	list: object[];
	hasMore: boolean;
}

export function getConferenceList(page: number, pageSize = 10) {
	return xf(
		`meeting/list?page=${page}&pageSize=${pageSize}`
	) as unknown as Promise<confirenceRes>;
}

// 会议详情信息
export interface ConferenceInfo {
	[propsName: string]: any;
	beginTime: dayjs.Dayjs;
	content?: string;
	endTime: dayjs.Dayjs;
	location: string;
	meetName: string;
	meetingId: number;
	publisher: UserInfo;
	subject: string;
	tag: number;
}

// 用户信息
export interface UserInfo {
	userId: number;
	userInfoName: string;
	studentId: number;
	role: { roleId: 0 | 1 | 2; roleName: string };
	grade: string;
}

// 会议文件信息
export interface FileDTO {
	fileId: number;
	createTime: string;
	fileName: string;
	filePath: string;
	meetId: number;
	download: number;
	fileSize: number;
	userInfo: UserInfo;
}

export type FileList = Array<FileDTO> | [];

export interface ConferenceRes {
	meetingDTO: ConferenceInfo;
	fileList: FileList;
}

export async function getConferenceDetail(meetingId: number) {
	const info = (await xf(`meeting/detail/${meetingId}`)) as ConferenceRes;

	info.meetingDTO.beginTime = dayjs(info.meetingDTO.beginTime);
	info.meetingDTO.endTime = dayjs(info.meetingDTO.endTime);
	return info as ConferenceRes;
}

export function saveConference(info: ConferenceInfo) {
	let finalInfo = {} as ConferenceInfo;
	let key: keyof ConferenceInfo;
	for (key in info) {
		if (info[key] != "null") {
			finalInfo[key] = info[key];
		}
	}
	return xf("meeting/save", {
		method: "POST",
		body: JSON.stringify(finalInfo),
		headers: { "Content-Type": "application/json" },
	});
}

// 保存会议内容
interface ConferenceContent {
	meetingId?: number;
	content: string;
}

export function saveConferenceContent(info: ConferenceContent) {
	return xf("meeting/save", {
		method: "POST",
		body: JSON.stringify(info),
		headers: { "Content-Type": "application/json" },
	});
}

// 删除会议
export function deleteConference(meetingId: number) {
	return xf(`meeting/delete/${meetingId}`, {
		method: "GET",
	});
}
