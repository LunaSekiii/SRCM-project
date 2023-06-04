import { useState, useRef, useEffect } from "react";
import { MdEditor, ToolbarNames, ExposeParam } from "md-editor-rt";

import markdownModal from "./markdownModal";
import { message } from "antd";
import UploadFileTool from "./UploadFileTool";
import FileListTool from "./FileListTool";
import { saveConferenceContent } from "@/apis/conference";
import { uploadImg } from "@/apis/file";

interface Props {
	content?: string;
	meetingId?: number;
}

export default function Eidt({ content, meetingId }: Props) {
	const [text, setText] = useState<string>(
		meetingId ? (content as string) : markdownModal.conferenceDefault
	);
	useEffect(() => {
		if (content) setText(content);
	}, [content]);
	const editorRef = useRef<ExposeParam>();
	const insertFileLink = (fileName: string, fileId: number) => {
		editorRef.current?.insert(() => ({
			targetValue: `\n[${fileName}](#/${fileId})\n`,
			select: false,
			deviationStart: fileName.length + fileId.toString.length + 8,
			deviationEnd: 0,
		}));
	};
	// 编辑器保存事件
	const messageKey = "saveContent";
	const onSave = (content: string) => {
		message.loading({ key: messageKey, content: "保存中..." });
		saveConferenceContent({ content, meetingId })
			.then((res) => {
				if (res)
					message.success({ key: messageKey, content: "保存成功" });
			})
			.catch((err) => {
				console.error(err);
				message.error({ key: messageKey, content: "保存失败，请重试" });
			});
	};

	// 上传图片
	type UploadImg = (
		files: Array<File>,
		callback: (urls: Array<string>) => void
	) => void;
	const onUploadImg: UploadImg = async (files, callback) => {
		message.loading({ key: "imageUpload", content: "图片上传中..." });
		const resA = await Promise.all(
			files.map((file) => {
				let fd = new FormData();
				fd.append("image", file);
				return uploadImg(fd) as Promise<{ imagePath: string }>;
			})
		);
		console.log("图片上传", resA);
		message.success({ key: "imageUpload", content: "图片上传成功" });
		callback(resA.map((res) => "http://10.60.102.53:8080" + res.imagePath));
	};

	return (
		<MdEditor
			modelValue={text}
			onChange={setText}
			onSave={onSave}
			onUploadImg={onUploadImg}
			toolbars={toolBars}
			ref={editorRef}
			style={{
				height: "100%",
				maxHeight: "100vh",
				overflowY: "auto",
			}}
			defToolbars={[
				<UploadFileTool
					insertFileLink={insertFileLink}
					key='uploadFile'
				/>,
				<FileListTool key='fileList' />,
			]}
		/>
	);
}

const toolBars: ToolbarNames[] = [
	"bold",
	"underline",
	"italic",
	"-",
	"strikeThrough",
	"sub",
	"sup",
	"quote",
	"unorderedList",
	"orderedList",
	"task",
	"-",
	"codeRow",
	"code",
	"link",
	"table",
	"mermaid",
	"katex",
	"-",
	"image",
	0,
	"-",
	1,
	"-",
	"revoke",
	"next",
	"save",
	"=",
	"pageFullscreen",
	"fullscreen",
	"preview",
	// "htmlPreview",
	"catalog",
	// "github",
];
