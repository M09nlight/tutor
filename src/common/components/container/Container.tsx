import React, { FC, PropsWithChildren } from "react";

interface ContainerProps {}

const Container: FC<PropsWithChildren<ContainerProps>> = ({ children }) => {
  return <div className="container">{children}</div>;
};

export default Container;
