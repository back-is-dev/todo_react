import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import React, { useEffect, useState } from "react";
// import Button from '@material-ui/core/Button';
import "./App.css";
import db from './firebase';
import Todo from "./Todo";
import firebase from "firebase";
//import todo_component from "./components/todo._component";

function App() {
  //todo variable is an arrey
  // react-hooks are smooth snipets e.g useState

  const [todos, setTodos] = useState([]);
  // setting an input
  const [input, setInput] = useState("");
  //when the app load we need to listen to the database and featch new todos as they get added/removed
  useEffect(()=>{
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot =>{
      setTodos(snapshot.docs.map(doc=> doc.data().todo))
    })
    //this code here fire when app loads
  },[ //when loads the useffeet loads
  
  ]);

  const addTodo = (event) => {
    event.preventDefault(); //when added or button clicked it wont refresh
    //this will fire up when we click the button
    // ... the dots are spread where it is appending to the current list
    console.log("Add-todo button Clicked");
    db.collection('todos').add({
      todo:input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setTodos([ input]);
    setInput("");
  };

  return (
    <div className="App">
      <h1>Hello Abu!</h1>
      {/* having input to have the initial value from useState input
     onchange on event , it'll set the target value inside event */}
      <form>
        {/* Form controll is a material ui */}

        <FormControl>
          <InputLabel>Write a Todo</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </FormControl>

        {/* import material ui and use itd button  */}
        <Button
          disabled={!input}
          type="submit"
          variant="contained"
          color="primary"
          onClick={addTodo}
        >
          Add todo
        </Button>

        <ul>
          {/* having todos to loop over each todo done by js */}
          {todos.map((todo) => (
            //Todo is a component
            <Todo text={todo} />
            //<li>{todo}</li>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;
