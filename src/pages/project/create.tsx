import { Button, DatePicker, Form, Input, InputNumber } from "antd";

const { TextArea } = Input;

export default function ProjectCreate() {
	return (
		<>
			<Form
				labelCol={{ span: 6 }}
				wrapperCol={{ span: 16 }}
				layout='horizontal'
				style={{
					maxWidth: "50rem",
					minWidth: "40rem",
					marginTop: "2rem",
				}}
				className='p-center'
			>
				<Form.Item label='项目名称'>
					<Input />
				</Form.Item>
				<Form.Item label='截至日期'>
					<DatePicker />
				</Form.Item>

				<Form.Item label='参与人数'>
					<InputNumber />
				</Form.Item>
				<Form.Item label='项目描述'>
					<TextArea rows={4} />
				</Form.Item>
				<Form.Item label='负责人'>
					<Input />
				</Form.Item>

				<Form.Item label='提交'>
					<Button>确认</Button>
				</Form.Item>
			</Form>
		</>
	);
}
