import {InputHTMLAttributes} from "react";
import {Input as AntdInput} from 'antd'

interface InputProps extends InputHTMLAttributes<any> {
}

const Input = ({type, value, onChange}: InputProps) => {
    return (
        <>
            <AntdInput type={type} value={value} onChange={onChange}/>
        </>
    );
};

export default Input;
