export interface UserProps {
    id: string;
    username: string;
    email: string;
    isActive: boolean;
    lastLoginTime: Date;
    isChecked: boolean;
    handleCheckboxChange: (id: string, isChecked: boolean) => void;
}

const UserItem = ({
    id,
    username,
    email,
    isActive,
    isChecked,
    lastLoginTime,
    handleCheckboxChange
}: UserProps) => {
    return (
        <tr className="text-primary" key={id}>
            <td>
                <input
                    onClick={() => handleCheckboxChange(id, !isChecked)}
                    type="checkbox"
                    checked={isChecked}
                    className="form-check-input"
                />
            </td>
            <td>{username}</td>
            <td>{email}</td>
            <td>
                <span className={`badge ${isActive ? 'bg-success' : 'bg-danger'}`}>
                    {isActive ? "Active" : "Disabled"}
                </span>
            </td>
            <td>{new Date(lastLoginTime).toLocaleString()}</td>
        </tr>
    )
}

export default UserItem;