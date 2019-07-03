import React from "react";
import {Input, Button} from "antd";

const inputStyle ={
    padding: "10px"
}

export function renderField({ input, label, style, type, meta: { touched, error, warning } }) {
    return (
        <div>
            <label>{label}</label>
            <div>
                <Input {...input} type={type}  style={style}/>
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    );
}
