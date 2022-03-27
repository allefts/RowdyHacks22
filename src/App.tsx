/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import "./App.css";

//Components
import Player from "./Components/Player";
import Map from "./Components/Map";
import Line from "./Components/Line";

const App = () => {
  const playerRef = useRef<HTMLImageElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const scoreRef = useRef<HTMLHeadingElement>(null);

  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const line4Ref = useRef<HTMLDivElement>(null);
  const line5Ref = useRef<HTMLDivElement>(null);

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
    // console.log("Sending to Back");
    let lastLine = +lineOrder[4].current.style.gridColumn;
    let secondlastLine = +lineOrder[3].current.style.gridColumn;
    let randomBool = Math.random() > 0.5;
    if (randomBool) {
      lastLine = secondlastLine + 1;
    } else {
      lastLine = secondlastLine - 1;
    }
    +lineOrder[4].current.style.setProperty("grid-column", lastLine.toString());
    +lineOrder[4].current.style.setProperty("grid-row", "1");
  };

  let currScore = 0;
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
          scoreRef.current.innerText = `Current Score: ${++currScore}`;
        } else {
          //Jump Fail
          alert("FAILED OR BUG");
          scoreRef.current.innerText = `Current Score: 0`;
        }
      } else {
        if (+lineOrder[0].current.style.gridColumn === -4) {
          //Jump Success to Right
          let moveToBack = lineOrder.shift();
          lineOrder.push(moveToBack);
          updateGrid(false);
          sendToBack();
          scoreRef.current.innerText = `Current Score: ${++currScore}`;
        } else {
          alert("FAILED OR BUG");
          scoreRef.current.innerText = `Current Score: 0`;
          //Jump Fail
        }
      }
    } else {
    }
  };

  const initLines = () => {
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
      <h1 className="scoreCount" ref={scoreRef}>
        Current Score:
      </h1>
      <div className="instructions">
        <h3>Instructions:</h3>
        <h3>CTRL: Rotate & Jump</h3>
        <h3>SPACE: Jump</h3>
      </div>
      <Map ref={gridRef}>
        <Player ref={playerRef} />
        <Line line="line" ref={line1Ref} />
        <Line line="line" ref={line2Ref} />
        <Line line="line" ref={line3Ref} />
        <Line line="line" ref={line4Ref} />
        <Line line="line" ref={line5Ref} />
      </Map>
    </StyledApp>
  );
};

const StyledApp = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column-reverse;

  .scoreCount {
    position: absolute;
    top: 0;
  }

  .instructions {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

export default App;
