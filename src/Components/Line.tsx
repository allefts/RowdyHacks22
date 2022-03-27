import React from "react";
import styled from "styled-components";

type Props = {
  line: string;
};

type Ref = HTMLDivElement | null;

const Line = React.forwardRef<Ref, Props>((props, ref) => {
  // console.log(x, y);
  return <StyledLine ref={ref} className={props.line} />;
});

const StyledLine = styled.div`
  width: 100%;
  height: 10px;
  background: white;
  border-radius: 6px;
`;

export default Line;
