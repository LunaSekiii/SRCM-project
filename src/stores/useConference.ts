import { create } from "zustand";
import { getConferenceList } from "@/apis/conference";
import dayjs from "dayjs";

interface Meeting {
	meetingId: number;
	meetName: string;
	beginTime: dayjs.Dayjs;
	endTime: dayjs.Dayjs;
	location: string;
	content: string;
	tag: number;
}

let isRequest = false;

const useConference = create((set, get: () => any) => ({
	list: [] as Meeting[],
	page: 1,
	hasMore: true,
	initConferenceList: async () => {
		if (isRequest) return;
		isRequest = true;
		const res = await getConferenceList(1);
		isRequest = false;
		set(() => ({
			list: res.list,
			hasMore: res.hasMore,
			page: 2,
		}));
	},
	getConferenceList: async () => {
		if ((get().hasMore === false, isRequest)) return;
		isRequest = true;
		const res = await getConferenceList(get().page);
		isRequest = false;
		set((state: { list: object[]; page: number }) => ({
			list: [...state.list, ...res.list],
			hasMore: res.hasMore,
			page: state.page + 1,
		}));
	},
}));

export default useConference;
