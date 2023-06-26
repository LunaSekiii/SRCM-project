import Edit from "./Edit";
import MarkdownPreview from "./MarkdownPreview";
import "md-editor-rt/lib/style.css";

interface Props {
	isPreview?: boolean;
	content?: string;
	meetingId?: number;
}

export default function ConferenceMarkdown({
	isPreview = false,
	content,
	meetingId,
}: Props) {
	if (isPreview)
		return <MarkdownPreview content={content} meetingId={meetingId!} />;
	return (
		<>
			<Edit content={content} meetingId={meetingId} />
		</>
	);
}
