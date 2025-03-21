import React, { useState, useId, useEffect } from "react";

interface InputProps {
    label: string;
    setValue: (value: string) => void;
    value: string;
    placeholder: string;
    error: string;
    type: string;
    rules: string;
}

const Input = ({
    label,
    value,
    placeholder,
    error,
    setValue,
    type,
    rules
}: InputProps) => {
    const [isInputValid, setIsInputValid] = useState(true);
    const [isPasswordLocked, setIsPasswordLocked] = useState(true);
    const [inputType, setInputType] = useState('text');
    const id = useId();
    const pattern = new RegExp(rules);

    useEffect(() => {
        setInputType(type === 'password' ? 'password' : 'text');
    }, [type]);

    const handleInputType = () => {
        setIsPasswordLocked(!isPasswordLocked);
        setInputType(isPasswordLocked ? 'text' : 'password');
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        setIsInputValid(pattern.test(e.target.value));
    }

    return (
        <div className="d-flex flex-column">
            <label className="form-label" htmlFor={id}>{label}</label>
            <div className="input-group">
                <input
                    value={value}
                    onChange={handleInputChange}
                    onBlur={(e) => setIsInputValid(pattern.test(e.target.value))}
                    className="form-control"
                    placeholder={placeholder}
                    type={inputType}
                    id={id}
                />
                {type === "password" && (
                    <span className="input-group-text">
                        <i
                            onClick={handleInputType}
                            className={`bi ${isPasswordLocked ? "bi-lock" : "bi-unlock"}`}
                        />
                   </span>
                )}
            </div>
            <small className={`text-danger ${isInputValid ? 'invisible' : 'visible'}`}>
                {error}
            </small>
        </div>
    )
}

export default Input;