import React, { ComponentProps, forwardRef } from "react";
import "./input.scss";
import clsx from "clsx";

enum InputType {
  PASSWORD = "PASSWORD",
}

interface InputProps {
  placeholder: ComponentProps<"input">["placeholder"];
  name: ComponentProps<"input">["name"];
  inputType?: keyof typeof InputType;
  type?: ComponentProps<"input">["type"];
  onChange: ComponentProps<"input">["onChange"];
  onBlur: ComponentProps<"input">["onBlur"];
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ inputType, ...inputProps }, ref) => {
    const inputClasses = clsx("input", {
      "input--password": inputType === InputType.PASSWORD,
    });
    return <input ref={ref} {...inputProps} className={inputClasses} />;
  }
);
