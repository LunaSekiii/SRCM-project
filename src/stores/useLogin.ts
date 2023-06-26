import { create } from "zustand";
import type { UserInfo } from "@/apis/conference";
import type { ConferenceInfo } from "@/apis/conference";
import { loginState } from "@/apis/user";
import { home } from "@/apis/home";

export interface HomeData {
	meetingList: {
		list: Array<ConferenceInfo>;
		hasMore: boolean;
	};
	userInfo: UserInfo;
}

// 登录权限管理

interface LoginState {
	userInfo: UserInfo | null;
	meetingList: HomeData["meetingList"] | null;
	getState: () => Promise<void>;
}

const useLogin = create<LoginState>((set, get) => ({
	userInfo: null,
	meetingList: null,
	getState: async () => {
		set(() => ({ userInfo: null, meetingList: null }));
		const homeInfo = (await home()) as HomeData;
		console.log("loginInfo", homeInfo);
		if (homeInfo)
			set(() => ({
				userInfo: homeInfo.userInfo,
				meetingList: homeInfo.meetingList,
			}));
	},
}));

export default useLogin;
