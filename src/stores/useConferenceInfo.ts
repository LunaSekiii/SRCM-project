import { create } from "zustand";
import { FileDTO, ConferenceInfo } from "@/apis/conference";
import { getConferenceDetail } from "@/apis/conference";

type UseConfernceInfo = {
	conferenceId: number | null;
	files: FileDTO[];
	conferenceInfo: ConferenceInfo | null;
	getConferenceInfo: (id: number) => void;
	stopGetConferenceInfo: () => void;
};

let timer: NodeJS.Timer;

/**
 * 缓存和自动更新会议信息
 */
const useConferenceInfo = create<UseConfernceInfo>((set, get) => ({
	conferenceId: null,
	files: [],
	conferenceInfo: null,
	getConferenceInfo: (id: number) => {
		// 更新会议id
		if (get().conferenceId != id) {
			set(() => ({
				conferenceId: id,
			}));
			getConferenceDetail(id).then((info) =>
				set(() => ({
					files: info.fileList,
					conferenceInfo: info.meetingDTO,
				}))
			);
			timer = setInterval(async () => {
				const info = await getConferenceDetail(id);
				set(() => ({
					files: info.fileList,
					conferenceInfo: info.meetingDTO,
				}));
			}, 5000);
		}
	},
	// 取消轮询
	stopGetConferenceInfo: () => {
		set(() => ({ conferenceId: null, files: [], conferenceInfo: null }));
		clearInterval(timer);
	},
}));

export default useConferenceInfo;
