import React from "react";
import MACHINGUN from "../assets/MACHINGUN.png";
import styled from "styled-components";

type Props = {
  // currentDirection: boolean;
};

type Ref = HTMLImageElement | null;

const Player = React.forwardRef<Ref, Props>((props, ref) => {
  return (
    <StyledPlayer
      ref={ref}
      // currentDirection={props.currentDirection}
      className="playerImg"
      src={MACHINGUN}
      alt="Player"
    />
  );
});

const StyledPlayer = styled.img`
  height: 100px;
  width: 100px;
  grid-column: -5;
  grid-row: 6;
`;

export default Player;
