import { Spin } from "antd";
import { useQuery } from "react-query";
import { Navigate } from "react-router-dom";
import { AuthorizationService } from "../services/api/AuthorizationService";
import { ApiError } from "../services/api/core/ApiError";
import { UserState } from "../services/api/responses/UserState";
import { useDispatch } from "react-redux";
import { setUser } from "../store/reducers/userSlice";

export interface PrivateLayoutProps {
    element: React.ReactNode;
}

export const PrivateLayout: React.FC<PrivateLayoutProps> = ({ element }) => {
    const dispatch = useDispatch();

    const { isLoading, isError, isSuccess } = useQuery<UserState, ApiError>('userState', AuthorizationService.GetStateAsync, {
        onSuccess(data) {
            dispatch(setUser(data));
        },
    });

    return <>
        {isLoading && <Spin spinning={isLoading}></Spin>}
        {isError && <Navigate to='/login' />}
        {isSuccess && element}
    </>
}

export default PrivateLayout;