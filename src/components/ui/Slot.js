import React from "react";

export const Slot = (props) => {
  const { children, ...otherProps } = props;
  return React.cloneElement(children, otherProps);
};
