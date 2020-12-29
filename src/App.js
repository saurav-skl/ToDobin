import React, { Fragment, Component, useState, useEffect } from "react";
import "./App.css";

import { Button, Box, Flex, Spacer } from "@chakra-ui/react";
// import { useColorMode } from "@chakra-ui/react";
// import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import InputList from "./Components/InputList/InputList";
import Home from "./Components/Home/Home";

// const { colorMode, toggleColorMode } = useColorMode();

// let arr = [];
const App = () => {
  // constructor() {
  //   super();
  //   this.state = {
  //     input: "",
  //
  //   };
  // }

  const [todos, setTodos] = useState([]);
  const [input,setInput] = useState('');

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();

      // Object.assign(this.state.todos, jsonData);
      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onButtonSubmit = async () => {
    // console.log(this.state.input);
    // this.setState({
    //   input: "",
    // });
    setInput('');
    const body = input;
    // console.log(body);
    fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description: input,
      }),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error:", error);
      })
      .then((response) => {
        if (response) {
          fetch("http://localhost:5000/todos")
            .then((response) => response.json())
            .then((data) => {
              // console.log(data);
              setTodos(data);

              // arr.push(data);
              // console.log(this.state.todos);
            })
            .catch((err) => console.log(err));
          // console.log(this.state.todos);
        }
      });

    document.getElementById("input").value = "";
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Fragment>
      <Flex width="full">
        <Spacer />
        <Box p="4">
          {/* onClick={toggleColorMode} */}
          <Button>
            {/* {colorMode === "light" ? <MoonIcon /> : <SunIcon />} */}
          </Button>
        </Box>
      </Flex>
      <InputList
        onInputChange={onInputChange}
        onButtonSubmit={onButtonSubmit}
      />
      {console.log("1 : "+ todos)}
      <Home todos={todos} />
    </Fragment>
  );
};

export default App;
