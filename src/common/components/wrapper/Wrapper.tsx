import React, { FC, PropsWithChildren } from "react";

interface WrapperProps {}

const Wrapper: FC<PropsWithChildren<WrapperProps>> = ({ children }) => {
  return <div className="wrapper">{children}</div>;
};

export default Wrapper;
