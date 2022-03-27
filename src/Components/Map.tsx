import React from "react";
import styled from "styled-components";

type Props = {
  children: JSX.Element | JSX.Element[];
};

type Ref = HTMLImageElement | null | HTMLDivElement;

const Map = React.forwardRef<Ref, Props>((props, ref) => {
  return (
    <StyledMap ref={ref} className="gridMap">
      {props.children}
    </StyledMap>
  );
});

const StyledMap = styled.div`
  width: 100%;
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(6, 1fr);
  grid-template-columns: repeat(7, 1fr);
  place-items: end;
  justify-items: center;
`;

export default Map;
