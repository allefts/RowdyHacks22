import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import "./App.css";

//Components
import Player from "./Components/Player";
import Map from "./Components/Map";
import Line from "./Components/Line";

type newLine = {
  name: string;
  x: number;
  y: number;
};

const App = () => {
  const playerRef = useRef<HTMLImageElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const line4Ref = useRef<HTMLDivElement>(null);
  const line5Ref = useRef<HTMLDivElement>(null);
  const line6Ref = useRef<HTMLDivElement>(null);

  let lineRefs = [line1Ref, line2Ref, line3Ref, line4Ref, line5Ref];

  let currentDir = false;
  let startPos = { x: -5, y: 6 };
  let leftPos = { x: -6, y: 5 };
  let rightPos = { x: -4, y: 5 };

  const changeDir = (event: KeyboardEvent) => {
    //Ctrl
    if (event.keyCode === 17) {
      // T -> Left
      // F -> Right
      currentDir = !currentDir;
      if (currentDir) {
        playerRef.current.style.transform = "scaleX(-1)";
      } else {
        playerRef.current.style.transform = "scaleX(1)";
      }
      jump(event);
    }
  };

  const jump = (event: KeyboardEvent) => {
    //Space
    if (event.keyCode === 32) {
      if (currentDir) {
      }
    } else {
    }
  };

  const initLines = () => {
    line6Ref.current.style.display = "none";
    let nextPos = { x: -5, y: 6 };
    lineRefs.forEach((line) => {
      //F -> Right, T -> Left
      let randomBool = Math.random() > 0.5;
      randomBool ? ++nextPos.x : --nextPos.x;
      --nextPos.y;
      if (nextPos.x === -9) {
        nextPos.x = -7;
      } else if (nextPos.x === -1) {
        nextPos.x = -3;
      }
      line.current.style.setProperty("grid-column", nextPos.x.toString());
      line.current.style.setProperty("grid-row", nextPos.y.toString());
    });
  };

  useEffect(() => {
    window.addEventListener("keyup", changeDir);
    window.addEventListener("keyup", jump);
    initLines();

    return () => {
      window.removeEventListener("keyup", changeDir);
      window.removeEventListener("keyup", jump);
    };
  });

  return (
    <StyledApp>
      <Map ref={gridRef}>
        <Player ref={playerRef} />
        <Line line="line" ref={line1Ref} />
        <Line line="line" ref={line2Ref} />
        <Line line="line" ref={line3Ref} />
        <Line line="line" ref={line4Ref} />
        <Line line="line" ref={line5Ref} />
        <Line line="line" ref={line6Ref} />
      </Map>
    </StyledApp>
  );
};

const StyledApp = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column-reverse;
`;

export default App;
