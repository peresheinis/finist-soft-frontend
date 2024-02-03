import { Card, List, Typography, message } from "antd";
import { useQuery } from "react-query";
import { AccountsService } from "../services/api/AccountsService";
import { ApiError } from "../services/api/core/ApiError";
import { BankAccount, BankAccountType } from "../services/api/responses/BankAccount";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export interface HomePageProps {

}

export const HomePage: React.FC<HomePageProps> = () => {
    const userState = useSelector((state: RootState) => state.user.currentUser);

    const {
        isLoading: isAccountsLoading,
        isError: isAccountsLoadingError,
        isSuccess: isAccountsLoadingSuccess,
        data: accounts } = useQuery<
            Array<BankAccount>,
            ApiError
        >('getAccounts', AccountsService.GetAllAsync, {
            onSuccess: () => { },
            onError(error) {
                message.error(`${error.body.message}`);
            },
        });

    const accountType = (type: BankAccountType) => {
        switch (type) {
            case BankAccountType.Card: return "Счёт карты";
            case BankAccountType.OnDemand: return "Отложенный счёт";
            case BankAccountType.Urgent: return "Срочный счёт";
        }
    }

    return <>
        {userState && <Card><strong>{userState.fullName}</strong></Card>}
        {isAccountsLoading && <Typography.Text>Загрузка ваших счетов...</Typography.Text>}
        {isAccountsLoadingError && <Typography.Text>Не удалось загрузить ваши банковские счета, попробуйте перезагрузить страницу</Typography.Text>}
        {isAccountsLoadingSuccess && <List dataSource={accounts} renderItem={account =>
            <List.Item>{account.accountNumber} - {accountType(account.accountType)}</List.Item>
        }></List>}
    </>
}