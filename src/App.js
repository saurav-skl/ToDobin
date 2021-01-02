import React, { Fragment, useState, useEffect } from "react";
import "./App.css";
import EditTodo from "./Components/EditTodo/EditTodo.jsx"

import { Button, Box, Flex, Spacer } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import InputList from "./Components/InputList/InputList";
import {
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";

import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
// import Home from "./Components/Home/Home";
// import Editlist from "./Components/EditList/Editlist";

// let arr = [];
const App = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();

      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });

      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onButtonSubmit = async () => {
    setInput("");
    // const body = input;
    if (input === "") return;
    fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description: input,
      }),
    })
      .then((response) => {
        getTodos();
        console.log(todos);
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
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
        <Box p="4" onClick={toggleColorMode}>
          <Button>{colorMode === "light" ? <MoonIcon /> : <SunIcon />}</Button>
        </Box>
      </Flex>
      <InputList
        onInputChange={onInputChange}
        onButtonSubmit={onButtonSubmit}
      />
      {/* <Home todos={todos} /> */}
      <Fragment>
        <Container maxW="3xl" mt={3} mb={3} centerContent>
          <Table variant="simple">
            <TableCaption>ToDo Applications</TableCaption>
            <Thead>
              <Tr>
                <Th>Work Details</Th>
                <Th>Edit</Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* {console.log(newTodo)} */}
              {todos.map((todo, i) => {
                return (
                  <Tr key={i}>
                    <Td>{todo["description"]}</Td>
                    <Td>
                      <EditTodo todo={todo} onClick={() => {console.log("1")}}/>
                    </Td>
                    <Td>
                      <DeleteIcon
                        onClick={() => deleteTodo(todo["todo_id"])}
                      />
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Container>
      </Fragment>
    </Fragment>
  );
};

export default App;
