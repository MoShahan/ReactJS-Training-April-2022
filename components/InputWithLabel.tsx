import React, { useEffect, useRef } from "react";
import "./InputWithLabel.css";

type InputWithLabelProps = {
    children: React.ReactNode;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    searchText: string;
    type?: string;
    id: string;
    onSearchSubmit: () => void;
}

const InputWithLabel = ({
    children,
    onChange,
    searchText,
    type = "text",
    id,
    onSearchSubmit
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
            <form onSubmit={onSearchSubmit}>
                <label htmlFor={id}>{children}</label>
                <input
                    // ref={inputRef}
                    value={searchText}
                    id={id}
                    type={type}
                    onChange={onChange}
                />
                <button type="submit">Search</button>
            </form>
        </div>
    );
};

export default InputWithLabel;