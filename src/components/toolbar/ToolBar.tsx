import { activateUsers, deleteUsers, disableUsers } from "../../fetch/fetchService.ts";
import LogOut from "../logout/LogOut.tsx";
import { Response } from "../user/User.tsx";

interface ToolBarProps {
    handleAction: (action: (ids: string[]) => Promise<Response>) => void;
}

const ToolBar = ({ handleAction }: ToolBarProps) => {
    return (
        <div className="d-flex justify-content-between w-100">
            <div className="d-flex gap-3">
                <button onClick={() => handleAction(disableUsers)} className="btn btn-outline-primary">
                    Block
                    <i className="bi ${isPasswordLocked bi-lock ms-2"></i>
                </button>
                <button onClick={() => handleAction(activateUsers)} className="btn btn-outline-primary">
                    Activate
                    <i className="bi bi-unlock ms-2"></i>
                </button>
                <button onClick={() => handleAction(deleteUsers)} className="btn btn-outline-danger">
                    Delete
                    <i className="bi bi-trash ms-2"></i>
                </button>
            </div>
            <LogOut />
        </div>
    )
}

export default ToolBar;