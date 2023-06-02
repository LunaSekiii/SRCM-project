import AvatarUploader from "./avataUploader";
import { Button, Cascader, Form, Input } from "antd";

const { TextArea } = Input;

export default function UserCreate() {
	return (
		<>
			<Form
				labelCol={{ span: 6 }}
				wrapperCol={{ span: 16 }}
				layout='horizontal'
				style={{ maxWidth: "50rem", width: "40rem", marginTop: "2rem" }}
				className='p-center'
			>
				<Form.Item label='头像'>
					<AvatarUploader />
				</Form.Item>
				<Form.Item label='姓名'>
					<Input />
				</Form.Item>

				<Form.Item label='介绍'>
					<TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
				</Form.Item>
				<Form.Item label='专业/年级'>
					<Cascader
						displayRender={(label) => label.join(" ")}
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

				<Form.Item wrapperCol={{ offset: 6, span: 16 }}>
					<Button type='primary'>提交</Button>
				</Form.Item>
			</Form>
		</>
	);
}
