import React, {useState} from "react";

function App() {
  const [newInput, setnewInput] = useState("");
  const [newItem, setnewItem] = useState([]);

  function handleChange(event) {
    setnewInput(event.target.value);
  }

  function handleSubmit(){
    setnewItem((prevItem) => {
      return [...prevItem, newInput];
    })
    setnewInput("");
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input onChange={handleChange} type="text" value={newInput}/>
        <button onClick={handleSubmit}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {newItem.map((item) => {
            return <li> {item} </li>
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;

// component tree code 

// import React, { useState } from "react";

// function ToDoItem(props) {
//   const [clicked, setclicked] = useState(false);

//   function handleClick() {
//     setclicked((prevValue) => {
//       return !prevValue;
//     });
//   }

//   return (
//     <div onClick={handleClick}>
//       <li style={{ textDecoration: clicked ? "line-through" : "none" }}>
//         {props.text}
//       </li>
//     </div>
//   );
// }

// // props are readonly

// export default ToDoItem;
