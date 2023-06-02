import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { login } from "@/apis/user";

export default function Login() {
	const onFinish = (form: { username: string; password: string }) => {
		login(form.username, form.password);
	};
	return (
		<div
			style={{
				width: "300px",
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)",
			}}
		>
			<h1
				style={{
					width: "100%",
					textAlign: "center",
					marginBottom: "3rem",
				}}
			>
				科研会议管理系统
			</h1>
			<Form
				name="normal_login"
				className="login-form"
				initialValues={{ remember: true }}
				layout="horizontal"
				onFinish={onFinish}
			>
				<Form.Item
					name="username"
					rules={[{ required: true, message: "请输入用户名！" }]}
				>
					<Input
						prefix={
							<UserOutlined className="site-form-item-icon" />
						}
						placeholder="用户名"
					/>
				</Form.Item>
				<Form.Item
					name="password"
					rules={[{ required: true, message: "请输入密码" }]}
				>
					<Input
						prefix={
							<LockOutlined className="site-form-item-icon" />
						}
						type="password"
						placeholder="密码"
					/>
				</Form.Item>
				{/* <Form.Item>
				<Form.Item name="remember" valuePropName="checked" noStyle>
					<Checkbox>Remember me</Checkbox>
				</Form.Item>

				<a className="login-form-forgot" href="">
					Forgot password
				</a>
			</Form.Item> */}

				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						className="login-form-button"
					>
						登陆
					</Button>
					或者 <a href="">注册</a>
				</Form.Item>
			</Form>
		</div>
	);
}
