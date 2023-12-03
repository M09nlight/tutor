import React, { FC, PropsWithChildren } from "react";

interface ContainerProps {}

const Wrapper: FC<PropsWithChildren<ContainerProps>> = ({ children }) => {
  return <div className="wrapper">{children}</div>;
};

export default Wrapper;
