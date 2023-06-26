import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Tooltip, Space } from "antd";
import { login } from "@/apis/user";
import { useNavigate } from "react-router-dom";

export default function Login() {
	const navigate = useNavigate();
	const key = "login";
	const onFinish = (form: { username: string; password: string }) => {
		login(form.username, form.password).then((res) => {
			message.loading({ content: "登录中...", key });
			if (res?.userId) {
				navigate("/data");
				message.success({
					content: `登录成功，欢迎你，${res.userInfoName}`,
					key,
				});
			}
		});
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
				name='normal_login'
				className='login-form'
				initialValues={{ remember: true }}
				layout='horizontal'
				size='large'
				onFinish={onFinish}
			>
				<Form.Item
					name='username'
					rules={[{ required: true, message: "请输入用户名！" }]}
				>
					<Input
						prefix={
							<UserOutlined className='site-form-item-icon' />
						}
						placeholder='用户名'
					/>
				</Form.Item>
				<Form.Item
					name='password'
					rules={[{ required: true, message: "请输入密码" }]}
				>
					<Input
						prefix={
							<LockOutlined className='site-form-item-icon' />
						}
						type='password'
						placeholder='密码'
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
					<Space>
						<Button
							type='primary'
							htmlType='submit'
							className='login-form-button'
						>
							登陆
						</Button>
						或者
						<Tooltip
							placement='bottom'
							title='请联系管理员创建账号 邮箱xxxxxxx@xx.com'
						>
							<a>获取账号</a>
						</Tooltip>
					</Space>
				</Form.Item>
			</Form>
		</div>
	);
}
