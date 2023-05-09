import { useState, useEffect } from "react";
import { Descriptions } from "antd";

interface Info {
	name: string;
	type: string;
	size: string;
	uploader: string;
	uploadTime: string;
}

interface Infos {
	[propName: string]: Info;
}

const fileInfos: Infos = {
	"0-0": {
		name: "DLF资料",
		type: "文件夹",
		size: "100Mb",
		uploader: "user1",
		uploadTime: "2023-05-03",
	},
	"0-0-0": {
		name: "蓝牙设备文档",
		type: "文件夹",
		size: "30Mb",
		uploader: "user1",
		uploadTime: "2023-05-03",
	},
	"0-0-0-0": {
		name: "安装教程",
		type: "pdf",
		size: "10Mb",
		uploader: "user1",
		uploadTime: "2023-05-03",
	},
	"0-0-0-1": {
		name: "使用教程",
		type: "pdf",
		size: "20Mb",
		uploader: "user1",
		uploadTime: "2023-05-03",
	},
	"0-0-1": {
		name: "模型数据集",
		type: "zip",
		size: "70Mb",
		uploader: "user1",
		uploadTime: "2023-05-05",
	},
};

export default function FileInfo({ fileKey = "0-0" }: { fileKey: string }) {
	const [file, setFile] = useState(fileInfos[fileKey]);
	useEffect(() => {
		setFile(fileInfos[fileKey]);
	}, [fileKey]);

	return (
		<Descriptions
			title={file.name}
			bordered
			column={1}
			// column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
		>
			<Descriptions.Item label="类型">{file.type}</Descriptions.Item>
			<Descriptions.Item label="大小">{file.size}</Descriptions.Item>
			<Descriptions.Item label="上传者">
				{file.uploader}
			</Descriptions.Item>
			<Descriptions.Item label="上传时间">
				{file.uploadTime}
			</Descriptions.Item>
		</Descriptions>
	);
}
