import { useState, useEffect, useRef } from "react";
import { MdPreview, MdCatalog } from "md-editor-rt";

type MarkdownPreviewProps = {
	content?: string;
	meetingId: number;
};

export default function MarkdownPreview({
	content,
	meetingId,
}: MarkdownPreviewProps) {
	const [id] = useState("previewMarkdown");
	const [scrollElement] = useState(document.documentElement);
	const [text, setText] = useState("");
	const preview = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (content) setText(content);
		console.log("cccc", preview.current);
	}, [content]);
	return (
		<div
			style={{
				position: "relative",
				width: "100%",
				height: "100%",
				overflowY: "auto",
				display: "flex",
				padding: "0px 10vw",
			}}
			ref={preview}
		>
			<MdCatalog
				style={{ minWidth: "100px", background: "#f9f9f9" }}
				editorId={id}
				scrollElement={preview.current as HTMLElement}
			/>
			<MdPreview
				// style={{ width: "80%" }}
				editorId={id}
				modelValue={text}
			/>
		</div>
	);
}
