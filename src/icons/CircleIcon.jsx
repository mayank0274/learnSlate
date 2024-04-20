import { Icon } from "@chakra-ui/react";

import React from "react";

export const CircleIcon = ({ width, height }) => {
  return (
    <Icon viewBox="0 0 200 200" color="red.500" height={height} width={width}>
      <path
        fill="currentColor"
        d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
      />
    </Icon>
  );
};
