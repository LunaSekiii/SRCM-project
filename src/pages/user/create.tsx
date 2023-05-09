import AvatarUploader from "./avataUploader";
import { Button, Cascader, Form, Input } from "antd";

const { TextArea } = Input;

export default function UserCreate() {
	return (
		<>
			<Form
				labelCol={{ span: 4 }}
				wrapperCol={{ span: 14 }}
				layout="horizontal"
				style={{ maxWidth: "50rem", marginTop: "2rem" }}
			>
				<Form.Item label="头像">
					<AvatarUploader />
				</Form.Item>
				<Form.Item label="姓名">
					<Input />
				</Form.Item>

				<Form.Item label="介绍">
					<TextArea rows={4} />
				</Form.Item>
				<Form.Item label="专业/年级">
					<Cascader
						options={[
							{
								value: "人工智能",
								label: "人工智能",
								children: [
									{
										value: "20级",
										label: "20级",
									},
									{
										value: "21级",
										label: "21级",
									},
									{
										value: "22级",
										label: "22级",
									},
								],
							},
							{
								value: "大数据",
								label: "大数据",
								children: [
									{
										value: "20级",
										label: "20级",
									},
									{
										value: "21级",
										label: "21级",
									},
									{
										value: "22级",
										label: "22级",
									},
								],
							},
							{
								value: "机器人",
								label: "机器人",
								children: [
									{
										value: "20级",
										label: "20级",
									},
									{
										value: "21级",
										label: "21级",
									},
									{
										value: "22级",
										label: "22级",
									},
								],
							},
							{
								value: "教师",
								label: "教师",
							},
						]}
					/>
				</Form.Item>

				<Form.Item label="提交">
					<Button>确定</Button>
				</Form.Item>
			</Form>
		</>
	);
}
