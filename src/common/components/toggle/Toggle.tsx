import clsx from "clsx";
import React, { FC, PropsWithChildren, useState } from "react";

interface ToggleProps {
  defaultState: boolean;
  titleName: string;
}

const Toggle: FC<PropsWithChildren<ToggleProps>> = ({
  defaultState = false,
  children,
  titleName,
}) => {
  const [toggle, setToggle] = useState(defaultState);
  const toggleClasses = clsx("footer-list__body", {
    "footer-list__body--active": toggle,
  });
  const headingClasses = clsx("footer-list__title footer-list__title--toggle", {
    "footer-list__title--active": toggle,
  });
  return (
    <>
      <h2 className={headingClasses} onClick={() => setToggle(!toggle)}>
        {titleName}
      </h2>
      <div className={toggleClasses}>{children}</div>
    </>
  );
};

export default Toggle;
