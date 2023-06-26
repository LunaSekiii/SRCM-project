import useLogin from "@/stores/useLogin";
import UserFileView from "./UserFileView";

export default function SelfFile() {
	const myId = useLogin((state) => state.userInfo?.userId);
	return <UserFileView userId={myId} />;
}
