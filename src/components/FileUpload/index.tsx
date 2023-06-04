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
	// 显示已经上传文件列表
	// showUploadList: false,
	// 文件删除接口
	onRemove: () => {
		return false;
	},
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
		console.log("uploadFileIds", uploadFileIds(info.fileList));
	},
	onDrop(e) {
		console.log("Dropped files", e.dataTransfer.files);
	},
};

function callbackProps(
	afterUpload: ((files: Array<any>) => void) | undefined
): UploadProps {
	const onChange = (info: any) => {
		const { status } = info.file;
		console.log("info", info);
		if (status !== "uploading") {
			console.log(info.file, info.fileList);
		}
		if (status === "done") {
			message.success(`${info.file.name} 文件上传成功`);
			if (afterUpload) {
				afterUpload(uploadFileIds(info.fileList));
			}
		} else if (status === "error") {
			message.error(`${info.file.name} 文件上传失败`);
		}
		console.log("uploadFileIds", uploadFileIds(info.fileList));
	};
	return { ...props, onChange };
}

const uploadFileIds = (flieList: Array<any>) => {
	return flieList.map((file) => {
		if (file.status != "done") return -1;
		return file.response?.result;
	});
};

export default function FileUpload({
	afterUpload,
}: {
	afterUpload?: (files: Array<any>) => void;
}) {
	return (
		<Dragger {...callbackProps(afterUpload)}>
			<p className='ant-upload-drag-icon'>
				<InboxOutlined />
			</p>
			<p className='ant-upload-text'>点击选择或拖动上传文件</p>
			<p className='ant-upload-hint'>支持单个文件和批量文件上传</p>
		</Dragger>
	);
}
