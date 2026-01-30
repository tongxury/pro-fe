import React, {useEffect, useState} from "react";
import {Input, InputProps} from "antd";
import type {TextAreaProps} from "antd/es/input/TextArea";

type CompositionInputProps = {
    value?: string;
    onChangeText: (text: string) => void;
    textarea?: boolean;
} & (InputProps | TextAreaProps);

const CompositionInput = ({
                              value,
                              onChangeText,
                              textarea = false,
                              ...rest
                          }: CompositionInputProps) => {
    const [keywordInput, setKeywordInput] = useState(value);
    const [isComposing, setIsComposing] = useState(false);

    useEffect(() => {
        setKeywordInput(value || "");
    }, [value]);

    const handleKeywordCommit = (value: string) => {
        onChangeText(value)
    };

    const handleKeywordChange = (value: string) => {
        if (!isComposing) {
            handleKeywordCommit(value);
        }
    };

    const commonProps = {
        placeholder: "输入关键词...",
        value: keywordInput,
        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const {value} = e.target;
            setKeywordInput(value);
            handleKeywordChange(value);
        },
        onCompositionStart: () => setIsComposing(true),
        onCompositionEnd: (e: React.CompositionEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setIsComposing(false);
            const value = e.currentTarget.value;
            setKeywordInput(value);
            handleKeywordCommit(value);
        },
        ...rest,
        style: {width: "100%", ...(rest as any).style}
    };

    return textarea ? (
        <Input.TextArea {...commonProps as TextAreaProps} />
    ) : (
        <Input {...commonProps as InputProps} />
    );
}


export default CompositionInput
