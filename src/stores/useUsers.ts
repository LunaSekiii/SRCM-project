import { create } from "zustand";
import { getUserList } from "@/apis/user";
import type { UserInfo } from "@/apis/conference";

interface usersState {
	/**
	 * 用户列表
	 */
	userList: Array<UserInfo> | null;
	/**
	 * 获取用户列表
	 * @returns Promise<Void>
	 */
	getUserList: () => Promise<void>;
}

const useUsers = create<usersState>((set, get) => ({
	userList: null,
	getUserList: async () => {
		const userList = await getUserList();
		set(() => ({
			userList,
		}));
	},
}));

export default useUsers;
