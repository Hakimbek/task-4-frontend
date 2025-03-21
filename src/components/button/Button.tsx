import { memo } from "react";

interface ButtonProps {
    type: 'submit' | 'button';
    style: string;
    isDisabled: boolean;
    isLoading: boolean;
    text: string;
}

const Button = ({ type, style, isDisabled, isLoading, text }: ButtonProps) => {
    return (
        <button
            type={type}
            className={`${style} ${isDisabled && 'disabled'}`}>
            {text}
            <span className={`spinner-border mx-2 position-absolute mt-1 spinner-border-sm ${!isLoading && 'invisible'}`} />
        </button>
    )
}

export default memo(Button);