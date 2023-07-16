import './App.css';
import React, {useState} from 'react';
function App() {
  const [clickedSquares, setClickedSquare] = useState([]);
  let a = Math.floor(window.innerWidth / 36);
  let b = Math.floor(window.innerHeight / 36);

  let numberOfSqaure = a * b;
  let squares = [];
  for(let i = 0; i < numberOfSqaure; i++){
    squares = [...squares, i];
  }

  const checkSurroundings = (firstSquareClicked) =>{
    let surroundingSquare = [firstSquareClicked-1, firstSquareClicked+1, firstSquareClicked-a, firstSquareClicked+a, firstSquareClicked+a-1, firstSquareClicked+a+1, firstSquareClicked-a+1, firstSquareClicked-a-1];
    return surroundingSquare;
  }

  const checkIfPresent = (eachSqaure) => {
    return (
      clickedSquares.filter((square) => {
        return square.number === eachSqaure;
      }).length > 0
    )
  }

  const checkIfCorner = (square) => {
    return square % a === 0 || square + 1 % a === 0;
  }

  const handleSquareClick = (eachSquare) => {
    if(checkIfPresent(eachSquare)) return;
    const surroundingSquares = checkSurroundings(eachSquare);

    if(checkSurroundings(eachSquare)) {
      setClickedSquare([...clickedSquares, {
        number: eachSquare,
        color: Math.random() < 0.5 ? 'red' : 'green'
      }])
      return;
    }

    let i = 0;
    surroundingSquares.map((eachSurroundingSquare)=>{
      if(checkIfPresent(eachSurroundingSquare)){
        i++;
      }
    })
    if(i < 5){
      setClickedSquare([...clickedSquares, {
        number: eachSquare,
        color: Math.random() < 0.5 ? 'red' : 'green'
      }])
    }

    else{
      let greenCount = 0;
      let redCount = 0;
      surroundingSquares.map((eachSurroundingSquare) => {
        if(checkIfPresent(eachSurroundingSquare)){
          if(clickedSquares.find((square) => square.number === eachSurroundingSquare).color === 'red'){
            redCount++;
          }
          else{
            greenCount++;
          }
        }
      })

      if(greenCount < 5 && redCount < 5){
        setClickedSquare([...clickedSquares, {
          number: eachSquare,
          color: Math.random() < 0.5 ? 'red' : 'green'
        }])
      }

      else{
        if(greenCount < redCount){
          setClickedSquare([...clickedSquares, {
            number: eachSquare,
            color: 'green'
          }])
        }

        else{
          setClickedSquare([...clickedSquares, {
            number: eachSquare,
            color: 'red'
          }])
        }
      }
    }
  }

  const getClickedSquareColor = (eachSqaure) => {
    const element = clickedSquares.filter((square) => square.number === eachSqaure);
    if(element.length === 0) return 'white';
    return element[0].color;
  }

  return (
    <div className="App">
      {
        squares.map((eachSqaure) => {
          return (
            <div className='eachSquare' 
            onClick={() => {
              handleSquareClick(eachSqaure);
            }}
            style = {{backgroundColor: getClickedSquareColor(eachSqaure)}}
            >
              {eachSqaure}
            </div>
          )
        }) 
      }
    </div>
  );
}

export default App;
