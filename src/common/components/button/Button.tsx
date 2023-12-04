import clsx from "clsx";
import React, { FC, PropsWithChildren } from "react";

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
  disabled?: boolean;
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  btnBg = ButtonBgEnum.BLUE,
  btnSize = ButtonSizeEnum.AUTO,
  btnContext = ButtonContextEnum.TEXT,
  disabled = false,
}) => {
  console.log(btnBg);

  const btnClasses = clsx("btn", {
    "btn--bg-blue": btnBg === ButtonBgEnum.BLUE,
    "btn--full": btnSize === ButtonSizeEnum.FULL,
    "btn--text": btnContext === ButtonContextEnum.TEXT,
    "btn--icon": btnContext === ButtonContextEnum.ICON,
  });
  return (
    <button className={btnClasses} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
