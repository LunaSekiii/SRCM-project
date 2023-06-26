import { useState, useRef, useEffect, useCallback } from "react";
import { MdEditor, ToolbarNames, ExposeParam } from "md-editor-rt";

import markdownModal from "./markdownModal";
import { message } from "antd";
import UploadFileTool from "./UploadFileTool";
import FileListTool from "./FileListTool";
import MeetingInfoTool from "./MeetingInfoTool copy";
import { saveConferenceContent } from "@/apis/conference";
import { uploadImg } from "@/apis/file";
import type { FileDTO } from "@/apis/conference";
import useEvents from "@/stores/useEvents";

interface Props {
	content?: string;
	meetingId?: number;
}

export default function Eidt({ content, meetingId }: Props) {
	const pubEvent = useEvents((state) => state.publish);
	const subEvent = useEvents((state) => state.subscribe);
	const unSubEvent = useEvents((state) => state.unSubscribe);

	const [text, setText] = useState<string>(
		meetingId ? (content as string) : markdownModal.conferenceDefault
	);
	useEffect(() => {
		if (content) setText(content);
	}, [content]);
	const editorRef = useRef<ExposeParam>();

	// 新增文件、插入文件链接事件
	const insertFileLink = (file: FileDTO) => {
		// 发布新增文件事件
		pubEvent("uploadFile", [file]);
		insertFileTag(file);
	};

	// 插入文件链接
	const insertFileTag = useCallback(
		(file: FileDTO) => {
			const fileName = file.fileName;
			const fileId = file.fileId;
			editorRef.current?.insert(() => ({
				targetValue: `\n[${fileName}](#/file/info/${fileId})\n`,
				select: false,
				deviationStart: fileName.length + fileId.toString.length + 8,
				deviationEnd: 0,
			}));
		},
		[editorRef]
	);

	useEffect(() => {
		subEvent("insertFileTag", insertFileTag);
		return () => {
			unSubEvent("insertFileTag", insertFileTag);
		};
	}, [insertFileTag]);

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
					meetingId={meetingId}
					key='uploadFile'
				/>,
				<FileListTool key='fileList' />,
				<MeetingInfoTool key='meetingInfo' />,
			]}
		/>
	);
}

const toolBars: ToolbarNames[] = [
	2,
	1,
	"-",
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
