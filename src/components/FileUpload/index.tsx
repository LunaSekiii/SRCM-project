import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";

const { Dragger } = Upload;

const props: UploadProps = {
	name: "file",
	multiple: true,
	// 携带cookie
	withCredentials: true,
	// action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
	action: (file) => {
		console.log("file", file);
		return "local/file/upload";
	},
	data: () => {
		return { meetingId: 1 };
	},
	// customRequest: (f) => {
	// 	console.log("f", f);
	// },
	onChange(info) {
		const { status } = info.file;
		if (status !== "uploading") {
			console.log(info.file, info.fileList);
		}
		if (status === "done") {
			message.success(`${info.file.name} 文件上传成功`);
		} else if (status === "error") {
			message.error(`${info.file.name} 文件上传失败`);
		}
	},
	onDrop(e) {
		console.log("Dropped files", e.dataTransfer.files);
	},
};

export default function FileUpload() {
	return (
		<Dragger {...props}>
			<p className="ant-upload-drag-icon">
				<InboxOutlined />
			</p>
			<p className="ant-upload-text">点击选择或拖动上传文件</p>
			<p className="ant-upload-hint">支持单个文件和批量文件上传</p>
		</Dragger>
	);
}
