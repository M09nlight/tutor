import clsx from "clsx";
import React, { ComponentProps, FC, PropsWithChildren } from "react";

export enum ButtonBgEnum {
  LIGHT = "LIGHT",
  BLUE = "BLUE",
}
export enum ButtonSizeEnum {
  AUTO = "AUTO",
  FULL = "FULL",
}

export enum ButtonContextEnum {
  TEXT = "TEXT",
  ICON = "ICON",
}
interface ButtonProps {
  btnBg?: keyof typeof ButtonBgEnum;
  btnSize?: keyof typeof ButtonSizeEnum;
  btnContext?: keyof typeof ButtonContextEnum;
  disabled?: ComponentProps<"button">["disabled"];
  onClick?: ComponentProps<"button">["onClick"];
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  btnBg = ButtonBgEnum.BLUE,
  btnSize = ButtonSizeEnum.AUTO,
  btnContext = ButtonContextEnum.TEXT,
  ...buttonProps
}) => {
  const btnClasses = clsx("btn", {
    "btn--bg-blue": btnBg === ButtonBgEnum.BLUE,
    "btn--full": btnSize === ButtonSizeEnum.FULL,
    "btn--text": btnContext === ButtonContextEnum.TEXT,
    "btn--icon": btnContext === ButtonContextEnum.ICON,
  });
  return (
    <button className={btnClasses} {...buttonProps}>
      {children}
    </button>
  );
};

export default Button;
