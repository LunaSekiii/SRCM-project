import { useState, useEffect, useCallback } from "react";
import {
	message,
	Modal,
	Button,
	DatePicker,
	Form,
	Input,
	Radio,
	Space,
	Select,
} from "antd";
import {
	ConferenceInfo,
	saveConference,
	deleteConference,
	UserInfo,
} from "@/apis/conference";
import locale from "antd/es/date-picker/locale/zh_CN";
import { useNavigate } from "react-router-dom";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import markdownModal from "@/components/ConferenceMarkdown/markdownModal";
import useUsers from "@/stores/useUsers";
import useEvents from "@/stores/useEvents";

// const { TextArea } = Input;
const { confirm } = Modal;

export default function ConferenceEdit({
	conferenceInfo,
}: {
	conferenceInfo?: ConferenceInfo;
}) {
	const [info, setInfo] = useState<ConferenceInfo>({
		content: markdownModal.conferenceDefault,
	} as ConferenceInfo);
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const subEvents = useEvents((state) => state.subscribe);
	const unSubEvents = useEvents((state) => state.unSubscribe);
	useEffect(() => {
		if (conferenceInfo) {
			console.log(
				"conferenceInfo?.publisher.userId",
				conferenceInfo.publisher?.userId
			);
			setInfo({
				...conferenceInfo,
				publisher: (conferenceInfo.publisher
					? conferenceInfo.publisher.userId
					: null) as unknown as UserInfo,
			});
			form.setFieldsValue({
				...conferenceInfo,
				publisher: conferenceInfo.publisher
					? conferenceInfo.publisher.userId
					: null,
			});
		}
	}, [conferenceInfo, form]);
	/**
	 * submit conference
	 */
	const submit = useCallback(
		(isNew: boolean) => {
			form.validateFields().then((res) => {
				const key = "submit";
				message.loading({
					key,
					content: "上传中...",
				});
				const info = { ...res };
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
							if (isNew) {
								navigate("/conference/view");
							}
						}
					})
					.catch((err) => {
						console.log("err", err);
						message.error({ key, content: "保存会议异常，请重试" });
					});
			});
		},
		[form]
	);
	useEffect(() => {
		subEvents("saveConferenceInfo", submit);
		return () => {
			unSubEvents("saveConferenceInfo", submit);
		};
	}, [submit]);

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

	const userList = useUsers((state) => state.userList);

	return (
		<>
			<Form
				labelCol={{ span: 4 }}
				wrapperCol={{ span: 20 }}
				layout='horizontal'
				style={{
					width: "40rem",
					// marginTop: "1rem",
					margin: "auto",
				}}
				size='large'
				initialValues={info}
				form={form}
			>
				<Form.Item
					label='会议名称'
					name='meetName'
					required
					rules={[{ required: true, message: "请填写会议名称" }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label='开始日期'
					name='beginTime'
					required
					rules={[{ required: true, message: "请选择开始日期" }]}
				>
					<DatePicker showTime locale={locale} />
				</Form.Item>
				<Form.Item
					label='结束日期'
					name='endTime'
					required
					rules={[{ required: true, message: "请填选择结束日期" }]}
				>
					<DatePicker showTime locale={locale} />
				</Form.Item>
				<Form.Item
					label='主题'
					name='subject'
					required
					rules={[{ required: true, message: "请填写会议主题" }]}
				>
					<Input />
				</Form.Item>
				{conferenceInfo ? null : (
					<Form.Item
						label='会议记录模板'
						name='content'
						// hidden={!!conferenceInfo}
					>
						<Select
							options={[
								{
									label: "默认会议记录模板",
									value: markdownModal.conferenceDefault,
								},
							]}
						/>
					</Form.Item>
				)}
				<Form.Item
					label='发布者'
					name='publisher'
					required
					rules={[{ required: true, message: "请选择会议发布者" }]}
				>
					<Select
						options={
							userList
								? userList.map((user) => ({
										value: user.userId,
										label: user.userInfoName,
								  }))
								: []
						}
					/>
				</Form.Item>
				<Form.Item label='地点' name='location'>
					<Input />
				</Form.Item>

				<Form.Item
					label='标签'
					name='tag'
					required
					rules={[{ required: true, message: "请选择标签" }]}
				>
					{/* <Select mode="tags" options={options} /> */}
					<Radio.Group>
						<Radio.Button value={1}>大一</Radio.Button>
						<Radio.Button value={2}>大二</Radio.Button>
						<Radio.Button value={3}>大三</Radio.Button>
						<Radio.Button value={4}>大四</Radio.Button>
						<Radio.Button value={0}>研究生</Radio.Button>
					</Radio.Group>
				</Form.Item>
				{conferenceInfo ? (
					<Form.Item wrapperCol={{ offset: 4, span: 20 }}>
						<Space>
							<Button
								type='primary'
								danger
								onClick={willDeleteConference}
							>
								删除
							</Button>
						</Space>
					</Form.Item>
				) : (
					<Form.Item wrapperCol={{ offset: 4, span: 20 }}>
						<Space>
							<Button
								type='primary'
								onClick={() => submit(!conferenceInfo)}
							>
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
				)}
			</Form>
		</>
	);
}
