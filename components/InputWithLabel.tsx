import React, { useEffect, useRef } from "react";
import "./InputWithLabel.css";

type InputWithLabelProps = {
    children: React.ReactNode;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    searchText: string;
    type?: string;
    id: string;
}

const InputWithLabel = ({
    children,
    onChange,
    searchText,
    type = "text",
    id
}: InputWithLabelProps) => {

    // const inputRef = useRef<HTMLInputElement>(null);

    // imperitive react
    // useEffect(() => {
    //     if (inputRef.current) {
    //         inputRef.current.focus();
    //     };
    // }, []);

    return (
        <div>
            <label htmlFor={id}>{children}</label>
            <input
                // ref={inputRef}
                value={searchText}
                id={id}
                type={type}
                onChange={onChange}
            />
        </div>
    );
};

export default InputWithLabel;