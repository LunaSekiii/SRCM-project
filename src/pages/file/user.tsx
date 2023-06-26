import { useParams } from "react-router-dom";
import UserFileView from "./UserFileView";

export default function UserFile() {
	const { id } = useParams();
	return <UserFileView userId={id as number | undefined} />;
}
