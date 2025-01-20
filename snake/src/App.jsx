/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from 'react';
import './App.css';
import Button from './components/button';
import Menu from './components/menu';
import Food from './components/food';
import Snake from './components/snake';
import Score from './components/score';

const getFood = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};

function App() {
  const initialState = {
    food: getFood(),
    direction: "RIGHT",
    speed: 100,
    route: "menu",
    snakePosition: [[0, 0], [0, 2]],
    score: 0,
  };

  const [state, setState] = useState(initialState);


  useEffect(() => {
    const onKeyDown = (e) => {
      e.preventDefault();
      switch (e.key) {
        case "ArrowLeft":
          setState((prevState) => ({ ...prevState, direction: "LEFT" }));
          break;
        case "ArrowRight":
          setState((prevState) => ({ ...prevState, direction: "RIGHT" }));
          break;
        case "ArrowUp":
          setState((prevState) => ({ ...prevState, direction: "UP" }));
          break;
        case "ArrowDown":
          setState((prevState) => ({ ...prevState, direction: "DOWN" }));
          break;
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);


  const moveSnake = useCallback(() => {
    let position = [...state.snakePosition];
    let head = position[position.length - 1]; // Last element of the snake
    if (state.route === "game") {
      switch (state.direction) {
        case "RIGHT":
          head = [head[0] + 2, head[1]];
          break;
        case "LEFT":
          head = [head[0] - 2, head[1]];
          break;
        case "UP":
          head = [head[0], head[1] - 2];
          break;
        case "DOWN":
          head = [head[0], head[1] + 2];
          break;
      }
      position.push(head); // Add new head to the snake
      position.shift(); // Remove the tail of the snake to maintain size
      setState((prevState) => ({ ...prevState, snakePosition: position }));
    }
  }, [state.direction, state.snakePosition, state.route]);

  
  useEffect(() => {
    const interval = setInterval(() => moveSnake(), state.speed);

    return () => clearInterval(interval);
  }, [moveSnake, state.speed]);

  const onSnakeOutofBounds = () => {
    let head = state.snakePosition[state.snakePosition.length - 1];
    if (state.route === "game") {
      if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
        gameOver();
      }
    }
  };

  const onSnakeCollapsed = () => {
    let position = [...state.snakePosition];
    let head = position[position.length - 1];
    position.pop();
    position.forEach((dot) => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        gameOver();
      }
    });
  };

  const onSnakeEats = () => {
    let head = state.snakePosition[state.snakePosition.length - 1];
    let food = state.food;
    if (head[0] === food[0] && head[1] === food[1]) {
      setState((prevState) => ({ ...prevState, food: getFood(),score: state.score + 1 }));
      increaseSnake();
      increaseSpeed();
    }
  };

  const increaseSnake = () => {
    let newSnake = [...state.snakePosition];
    newSnake.unshift([]);
    setState((prevState) => ({ ...prevState, snakePosition: newSnake }));
  };

  const increaseSpeed = () => {
    if (state.speed > 10) {
      setState((prevState) => ({ ...prevState, speed: state.speed - 5 }));
    }
  };

  const onRouteChange = () => {
    setState((prevState) => ({
      ...prevState,
      route: "game",
    }));
  };

  const gameOver = () => {
    alert("GAME OVER");
    setState(initialState);
  };

  const onDown = () => {
    let position = [...state.snakePosition];
    let head = position[position.length - 1];
    head = [head[0], head[1] + 2];
    position.push(head);
    position.shift();
    setState((prevState) => ({
      ...prevState,
      snakePosition: position,
      direction: "DOWN",
    }));
  };

  const onUp = () => {
    let position = [...state.snakePosition];
    let head = position[position.length - 1];
    head = [head[0], head[1] - 2];
    position.push(head);
    position.shift();
    setState((prevState) => ({
      ...prevState,
      snakePosition: position,
      direction: "UP",
    }));
  };

  const onLeft = () => {
    let position = [...state.snakePosition];
    let head = position[position.length - 1];
    head = [head[0] - 2, head[1]];
    position.push(head);
    position.shift();
    setState((prevState) => ({
      ...prevState,
      snakePosition: position,
      direction: "LEFT",
    }));
  };

  const onRight = () => {
    let position = [...state.snakePosition];
    let head = position[position.length - 1];
    head = [head[0] + 2, head[1]];
    position.push(head);
    position.shift();
    setState((prevState) => ({
      ...prevState,
      snakePosition: position,
      direction: "RIGHT",
    }));
  };

  useEffect(() => {
    onSnakeOutofBounds();
    onSnakeCollapsed();
    onSnakeEats();
  }, [state.snakePosition, state.food, onSnakeOutofBounds, onSnakeCollapsed, onSnakeEats]);

  return (
    <>
      {state.route === "menu" ? (
        <div>
          <Menu onRouteChange={onRouteChange} />
        </div>
      ) : (
        <div>
          <div className="game-area">
            <Snake position={state.snakePosition} />
            <Food position={state.food} />
          </div>
          <Button
            onDown={onDown}
            onLeft={onLeft}
            onRight={onRight}
            onUp={onUp}
          />
          <Score currentScore = {state.score}/>
        </div>
      )}
    </>
  );
}

export default App;
