import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { getUsers } from "../../fetch/fetchService.ts";
import Spinner from "../spinner/Spinner.tsx";
import ToolBar from "../toolbar/ToolBar.tsx";
import UserItem from "./UserItem.tsx";

interface User {
    id: string;
    username: string;
    email: string;
    isActive: boolean;
    lastLoginTime: Date;
    isChecked: boolean;
}

export interface Response {
    users: User[];
    statusCode: number;
    message: string | string[];
}

const User = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isAllUsersSelected, setIsAllUsersSelected] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getUsers()
            .then(response => {
                if (response.statusCode === 200) {
                    setUsers(response.users.map((user: User) => ({...user, isChecked: false})))
                }
            })
            .finally(() => setIsLoading(false));
    }, []);

    const handleAllCheckbox = (isChecked: boolean) => {
        setIsAllUsersSelected(isChecked);
        setUsers(users => users.map(user => ({...user, isChecked })));
    }

    const handleCheckboxChange = (id: string, isChecked: boolean) => {
        const newUsers = users.map(user => user.id === id ? {...user, isChecked} : user);
        const allChecked = newUsers.every(user => user.isChecked);
        const someUnchecked = newUsers.some(user => !user.isChecked);
        setUsers(newUsers);
        setIsAllUsersSelected(value => {
            if (someUnchecked) return false;
            if (allChecked) return true;

            return value;
        });
    }

    const handleAction = async (action: (ids: string[]) => Promise<Response>) => {
        const ids = users.filter(user => user.isChecked).map(user => user.id);
        setIsLoading(true);
        const response = await action(ids);
        if (response.statusCode === 200) setUsers(response.users.map((user: User) => ({...user, isChecked: false})))
        setIsAllUsersSelected(false);
        setIsLoading(false)
    }

    return (
        <div className="d-flex flex-column align-items-center px-5 py-3 gap-5">
            {isLoading && <Spinner />}
            <ToolBar handleAction={handleAction} />
            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">
                        <input
                            checked={isAllUsersSelected}
                            onClick={() => handleAllCheckbox(!isAllUsersSelected)}
                            type="checkbox"
                            className="form-check-input"
                        />
                    </th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Status</th>
                    <th scope="col">Last login time</th>
                </tr>
                </thead>
                <tbody>
                {
                    users
                        .sort((a, b) => new Date(b.lastLoginTime).getTime() - new Date(a.lastLoginTime).getTime())
                        .map(({ id, email, username, lastLoginTime, isActive, isChecked }: User) => (
                            <UserItem
                                key={id}
                                id={id}
                                username={username}
                                email={email}
                                isActive={isActive}
                                lastLoginTime={lastLoginTime}
                                isChecked={isChecked}
                                handleCheckboxChange={handleCheckboxChange} />
                        ))
                }
                </tbody>
            </table>
            <ToastContainer />
        </div>
    )
}

export default User;