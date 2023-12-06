import { ComponentProps, forwardRef } from "react";
import "./input.scss";
import clsx from "clsx";

enum InputType {
  PASSWORD = "PASSWORD",
  CHECKBOX = "CHECKBOX",
  RADIO = "RADIO",
}

interface InputProps {
  id?: string;
  value?: ComponentProps<"input">["value"];
  placeholder?: ComponentProps<"input">["placeholder"];
  name: ComponentProps<"input">["name"];
  inputType?: keyof typeof InputType;
  type?: ComponentProps<"input">["type"];
  onChange?: ComponentProps<"input">["onChange"];
  onBlur?: ComponentProps<"input">["onBlur"];
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ inputType, ...inputProps }, ref) => {
    const inputClasses = clsx("input", {
      "input--password": inputType === InputType.PASSWORD,
      "input--checkbox":
        inputType === InputType.CHECKBOX || inputType === InputType.RADIO,
    });
    return <input ref={ref} {...inputProps} className={inputClasses} />;
  }
);
