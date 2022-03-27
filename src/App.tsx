/* eslint-disable @typescript-eslint/no-unused-expressions */
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
  let lineOrder = [line1Ref, line2Ref, line3Ref, line4Ref, line5Ref];

  let currentDir = false;
  // let startPos = { x: -5, y: 6 };

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

  const updateGrid = (dir: boolean) => {
    lineRefs.forEach((line) => {
      let lineRow;
      let lineCol;
      if (dir) {
        lineRow = +line.current.style.gridRow + 1;
        lineCol = +line.current.style.gridColumn + 1;
      } else {
        lineRow = +line.current.style.gridRow + 1;
        lineCol = +line.current.style.gridColumn - 1;
      }
      // console.log(line.current.style.gridRow);
      line.current.style.setProperty("grid-row", lineRow.toString());
      line.current.style.setProperty("grid-column", lineCol.toString());
    });
  };

  const sendToBack = () => {
    console.log("Sending to Back");
    let lastLine = +lineOrder[4].current.style.gridColumn;
    let secondlastLine = +lineOrder[4].current.style.gridColumn;
    console.log(secondlastLine);
    let randomBool = Math.random() > 0.5;
    if (randomBool) {
      lastLine = secondlastLine + 1;
    } else {
      lastLine = secondlastLine - 1;
    }
    +lineOrder[4].current.style.setProperty("grid-column", lastLine.toString());
    +lineOrder[4].current.style.setProperty("grid-row", "1");
  };

  let leftPos = { x: -6, y: 5 };
  let rightPos = { x: -4, y: 5 };
  const jump = (event: KeyboardEvent) => {
    //F -> Right, T -> Left
    //Space
    if (event.keyCode === 32) {
      if (currentDir) {
        if (+lineOrder[0].current.style.gridColumn === -6) {
          //Jump Success to Left
          let moveToBack = lineOrder.shift();
          lineOrder.push(moveToBack);
          updateGrid(true);
          sendToBack();
          // console.log("MADE JUMP");
        } else {
          //Jump Fail
          console.log("FAILED JUMP");
        }
      } else {
        if (+lineOrder[0].current.style.gridColumn === -4) {
          //Jump Success to Right
          let moveToBack = lineOrder.shift();
          lineOrder.push(moveToBack);
          updateGrid(false);
          sendToBack();
          // console.log("MADE JUMP");
        } else {
          //Jump Fail
          console.log("FAILED JUMP");
        }
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
