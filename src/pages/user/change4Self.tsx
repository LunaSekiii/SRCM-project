import React from "react";
import CenterCard from "@/layouts/CenterCard";
import { Form, Input, Button, message } from "antd";
import { updateUserInfo } from "@/apis/user";

const key = "changeSelfInfo";

export default function UserChange4Self() {
	const [form] = Form.useForm();
	const submit = () => {
		// 表单验证
		form.validateFields().then(() => {
			message.loading({ content: "修改中...", key });
			const userInfo = { ...form.getFieldsValue() };
			delete userInfo["password1"];
			console.log("userInfo", userInfo);
			updateUserInfo(userInfo).then((res) => {
				message.success({ content: "修改成功", key });
			});
		});
	};
	return (
		<CenterCard backPoint>
			<Form
				labelCol={{ span: 6 }}
				wrapperCol={{ span: 16 }}
				layout='horizontal'
				size='large'
				style={{ maxWidth: "50rem", width: "40rem", marginTop: "2rem" }}
				form={form}
				initialValues={{ grade: "", userRole: 0 }}
			>
				<Form.Item
					label='密码'
					name='password'
					rules={[
						{
							pattern: /[\d\D]{6}/,
							message: "密码不能少于六位",
						},
					]}
				>
					<Input type='password' />
				</Form.Item>

				<Form.Item
					label='确认密码'
					name='password1'
					required
					rules={[
						({ getFieldValue }) => ({
							validator(__, value) {
								if (getFieldValue("password") === value) {
									return Promise.resolve();
								}
								return Promise.reject("两次密码输入不一致");
							},
						}),
					]}
				>
					<Input type='password' />
				</Form.Item>
				<Form.Item label='修改'>
					<Button type='primary' onClick={submit}>
						确认修改
					</Button>
				</Form.Item>
			</Form>
		</CenterCard>
	);
}
