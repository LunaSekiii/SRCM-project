import React from "react";
import {
	Button,
	Cascader,
	DatePicker,
	TimePicker,
	Form,
	Input,
	InputNumber,
	Select,
} from "antd";
import type { SelectProps } from "antd";

const { TextArea } = Input;

const options: SelectProps["options"] = [
	{ value: "大一", label: "大一" },
	{ value: "大二", label: "大二" },
	{ value: "大三", label: "大三" },
	{ value: "大四", label: "大四" },
];

export default function ConferenceCreate() {
	return (
		<>
			<Form
				labelCol={{ span: 4 }}
				wrapperCol={{ span: 14 }}
				layout="horizontal"
				style={{ maxWidth: "50rem", marginTop: "2rem" }}
			>
				<Form.Item label="会议名称">
					<Input />
				</Form.Item>
				<Form.Item label="会议日期">
					<DatePicker />
				</Form.Item>

				<Form.Item label="会议时间">
					<TimePicker format={"HH:mm"} />
				</Form.Item>

				<Form.Item label="参会人数">
					<InputNumber />
				</Form.Item>
				<Form.Item label="会议描述">
					<TextArea rows={4} />
				</Form.Item>
				<Form.Item label="地点">
					<Cascader
						options={[
							{
								value: "实训楼",
								label: "实训楼",
								children: [
									{
										value: "228",
										label: "228",
									},
									{
										value: "217",
										label: "217",
									},
								],
							},
						]}
					/>
				</Form.Item>

				<Form.Item label="标签">
					<Select mode="tags" options={options} />
				</Form.Item>
				<Form.Item label="上传">
					<Button>Button</Button>
				</Form.Item>
			</Form>
		</>
	);
}
