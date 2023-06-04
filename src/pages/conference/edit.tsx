import { useState, useEffect } from "react";
import {
	message,
	Modal,
	Button,
	DatePicker,
	Form,
	Input,
	Radio,
	Space,
} from "antd";
import {
	ConferenceInfo,
	saveConference,
	deleteConference,
} from "@/apis/conference";
import locale from "antd/es/date-picker/locale/zh_CN";
import { useNavigate } from "react-router-dom";
import { ExclamationCircleOutlined } from "@ant-design/icons";

// const { TextArea } = Input;
const { confirm } = Modal;

export default function ConferenceEdit({
	conferenceInfo,
}: {
	conferenceInfo?: ConferenceInfo;
}) {
	const [info, setInfo] = useState<ConferenceInfo>();
	const navigate = useNavigate();
	const [form] = Form.useForm();
	useEffect(() => {
		if (conferenceInfo) {
			setInfo(conferenceInfo);
			form.setFieldsValue(conferenceInfo);
		}
	}, [conferenceInfo, form]);
	/**
	 * submit conference
	 */
	const submit = () => {
		const key = "delete";
		message.loading({
			key,
			content: "上传中...",
		});
		const info = { ...form.getFieldsValue() };
		info.beginTime = info.beginTime.format("YYYY-MM-DD HH:mm:ss");
		info.endTime = info.endTime.format("YYYY-MM-DD HH:mm:ss");
		console.log("info", info);
		if (conferenceInfo?.meetingId) {
			info.meetingId = conferenceInfo.meetingId;
		} else {
			info.meetingId = null;
		}
		saveConference(info)
			.then((res) => {
				if (res) {
					message.success({ key, content: "保存会议成功" });
				}
			})
			.catch(() =>
				message.error({ key, content: "保存会议异常，请重试" })
			);
	};

	const willDeleteConference = () => {
		confirm({
			icon: <ExclamationCircleOutlined />,
			content: <p>此操作将会删除会议，确定吗？</p>,
			okText: "确认",
			cancelText: "取消",
			onOk() {
				conferenceDelete();
			},
			onCancel() {
				message.warning("取消操作");
			},
		});
	};

	/**
	 * delete conference
	 */
	const conferenceDelete = () => {
		const key = "delete";
		message.loading({
			key,
			content: "删除中...",
		});
		deleteConference(conferenceInfo?.meetingId as number)
			.then(() => {
				message.success({ key, content: "删除成功" });
				navigate("/conference/view");
			})
			.catch(() => {
				message.error({ key, content: "删除会议异常，请重试" });
			});
	};

	const returnPage = () => {
		navigate("/conference/view");
	};

	return (
		<>
			<Form
				labelCol={{ span: 4 }}
				wrapperCol={{ span: 20 }}
				layout='horizontal'
				style={{
					width: "40rem",
					// marginTop: "1rem",
				}}
				size='large'
				initialValues={info}
				form={form}
				className='p-center'
			>
				<Form.Item label='会议名称' name='meetName'>
					<Input />
				</Form.Item>
				<Form.Item label='开始日期' name='beginTime'>
					<DatePicker showTime locale={locale} />
				</Form.Item>
				<Form.Item label='结束日期' name='endTime'>
					<DatePicker showTime locale={locale} />
				</Form.Item>
				<Form.Item label='主题' name='subject'>
					<Input />
				</Form.Item>
				{/* <Form.Item label='会议描述' name='content'>
					<TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
				</Form.Item> */}
				<Form.Item label='发布者' name='publisher'>
					<Input />
				</Form.Item>
				<Form.Item label='地点' name='location'>
					{/* <Cascader
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
									{
										value: "319",
										label: "319",
									},
								],
							},
						]}
					/> */}
					<Input />
				</Form.Item>

				<Form.Item label='标签' name='tag'>
					{/* <Select mode="tags" options={options} /> */}
					<Radio.Group>
						<Radio.Button value={1}>大一</Radio.Button>
						<Radio.Button value={2}>大二</Radio.Button>
						<Radio.Button value={3}>大三</Radio.Button>
						<Radio.Button value={4}>大四</Radio.Button>
					</Radio.Group>
				</Form.Item>
				<Form.Item wrapperCol={{ offset: 4, span: 20 }}>
					<Space>
						<Button type='primary' onClick={submit}>
							确认
						</Button>
						{conferenceInfo?.meetingId ? (
							<Button
								type='primary'
								danger
								onClick={willDeleteConference}
							>
								删除
							</Button>
						) : null}
						<Button onClick={returnPage}>返回</Button>
					</Space>
				</Form.Item>
			</Form>
		</>
	);
}
