import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { LoginRequest } from "../services/api/requests/LoginRequest";
import { ApiError } from "../services/api/core/ApiError";
import { AuthorizationService } from "../services/api/AuthorizationService";
import { Button, Card, Divider, Form, Input, Space, Spin, Typography, message } from "antd";

export interface LoginPageProps {

}

export type LoginFields = {
    phoneNumber: string;
    password: string;
};

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const { isLoading, isError, mutateAsync: signInAsync } = useMutation<
        string,
        ApiError,
        LoginRequest
    >((request) => AuthorizationService.SignInAsync(request), {
        onSuccess: () => navigate("/"),
        onError(error) {
            message.error(`${error.body.message}`);
        },
    });

    const handleSubmit = async (values: LoginFields) => {
        const request: LoginRequest = {
            phoneNumber: values.phoneNumber,
            password: values.password,
        };

        await signInAsync(request);
    };

    return (
        <div className=" flex justify-center items-center h-full">
            <Spin spinning={isLoading}>
                <Card title="Авторизация">
                    <Space
                        direction="vertical"
                        align="center"
                        className=" w-full"
                    >
                        <Typography.Text className="text-slate-400">
                            Заполните ваш номер телефона и пароль
                        </Typography.Text>

                        {isError && (
                            <Typography.Text type="danger">
                                Неправильный логин или пароль
                            </Typography.Text>
                        )}
                    </Space>

                    <Form
                        className="mt-5"
                        name="basic"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        style={{ maxWidth: 600 }}
                        onFinish={handleSubmit}
                    >
                        <Form.Item<LoginFields>
                            name="phoneNumber"
                            label="Номер телефона"
                            rules={[
                                {
                                    required: true,
                                    message: "Заполните номер телефона!",
                                },
                            ]}
                            children={<Input type="phone" />}
                        />

                        <Form.Item<LoginFields>
                            name="password"
                            label="Пароль"
                            rules={[
                                {
                                    required: true,
                                    message: "Заполните пароль!",
                                },
                            ]}
                            children={<Input.Password />}
                        />
                        <Divider />
                        <Form.Item>
                            <Button
                                className="w-full"
                                type="primary"
                                htmlType="submit"
                            >
                                Войти
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Spin>
        </div>
    );
};
export default LoginPage;