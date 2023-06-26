import { useState, useEffect } from "react";
import { Button, Select, Form, Input, Radio, message } from "antd";
import { saveUser, UserInfo4Admin } from "@/apis/user";
import dayjs from "dayjs";
import { UserInfo } from "@/apis/conference";
import { useNavigate } from "react-router-dom";

export default function UserEdit({ userInfo }: { userInfo?: UserInfo }) {
	const [gradeList] = useState(
		getGradeList().map((grade) => ({
			value: grade,
			label: `${grade}级`,
		}))
	);
	const [form] = Form.useForm();

	useEffect(() => {
		form.setFieldsValue(userInfo);
	}, [userInfo]);

	const navigate = useNavigate();
	const key = "submitUser";

	const submit = () => {
		form.validateFields()
			.then((res) => {
				const data = { ...res };
				message.loading({ content: "保存用户...", key });
				console.log("submit", data);
				saveUser(data).then((res) => {
					message.success({ content: "保存用户成功", key });
					navigate("/user/view");
				});
			})
			.catch((err) => console.log("err", err));
	};

	return (
		<>
			<Form
				labelCol={{ span: 6 }}
				wrapperCol={{ span: 16 }}
				layout='horizontal'
				size='large'
				style={{ maxWidth: "50rem", width: "40rem", marginTop: "2rem" }}
				form={form}
				initialValues={{ grade: "", userRole: 0 }}
				// className='p-center'
			>
				<Form.Item
					label='姓名'
					name='userInfoName'
					required
					rules={[{ required: true, message: "请填写用户姓名" }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label='学号'
					name='studentId'
					rules={[
						{
							validator: (__, value) =>
								(form.getFieldValue("userName") &&
									form.getFieldValue("password")) ||
								value ||
								userInfo
									? Promise.resolve()
									: Promise.reject(
											"学号或【账号与密码】至少填写一个"
									  ),
						},
					]}
				>
					<Input placeholder='学号或【账号与密码】至少填写一个' />
				</Form.Item>

				{userInfo ? null : (
					<Form.Item label='账号' name='userName'>
						<Input placeholder='不填写默认为学号' />
					</Form.Item>
				)}

				<Form.Item label='密码' name='password'>
					<Input
						placeholder={
							userInfo ? "不填写则不修改密码" : "不填写默认为学号"
						}
					/>
				</Form.Item>

				<Form.Item label='年级' name='grade' required>
					<Select
						options={[{ value: "", label: "其他" }, ...gradeList]}
					/>
				</Form.Item>

				<Form.Item label='权限' name='userRole'>
					<Radio.Group defaultValue={0} buttonStyle='solid'>
						<Radio.Button value={0}>普通用户</Radio.Button>
						<Radio.Button value={1}>组长</Radio.Button>
						{/* <Radio.Button value={2}>老师</Radio.Button> */}
					</Radio.Group>
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 6, span: 16 }}>
					<Button type='primary' onClick={submit}>
						{userInfo ? "修改" : "创建用户"}
					</Button>
				</Form.Item>
			</Form>
		</>
	);
}

/**
 * 计算当前年级可选列表
 */
const getGradeList = () => {
	const now = dayjs();
	let grade = now.year();
	// 判断新学年是否开始
	if (now.month() < 8) {
		grade--;
	}
	let count;
	let gradeList = [];
	for (count = 0; count < 6; count++) {
		gradeList.push(grade.toString().slice(2, 4));
		grade--;
	}
	return gradeList;
};
