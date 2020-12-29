import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import {
  Box,
  Center,
  Container,
  Flex,
  Spacer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Text,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

const Home = (todos) => {
  const [newtodos, setTodos] = useState([todos]);
  
  console.log(typeof([newtodos]));

  const deleteTodo = async (id) => {
    // console.log(id);
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
      setTodos(newtodos.filter((todo) => newtodos.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  // const getTodos = async () => {
  //   try {
  //     const response = await fetch("http://localhost:5000/todos");
  //     const jsonData = await response.json();

  //     setTodos(jsonData);
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };

  // useEffect(() => {
  //   getTodos();
  // }, []);

  // {/* <DeleteIcon onClick={() => deleteTodo(todo.todo_id)} /> */}

  return (
    <Fragment>
      <Container maxW="3xl" centerContent>
        <Center h="50px" color="black" mt={3} mb={3}>
          <Text fontSize="3xl">To-do Applications</Text>
        </Center>
        <Center w="100%">
          <Table variant="striped" colorScheme="teal" boxShadow="dark-lg">
            <Thead>
              <Tr>
                <Th>Work details</Th>
                <Th>Edit</Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Clean my room</Td>
                <Td>Edit</Td>
                <Td>Delete</Td>
                {/* {console.log(todos)} */}
              </Tr>
              {console.log(newtodos)}
              {newtodos.map((todo) => {
                <Tr >
                  <Td>{todo.description}</Td>
                  <Td>Edit</Td>
                  <Td>Delete</Td>
                  {console.log("2 : "+todo)}
                </Tr>;
              })}
            </Tbody>
          </Table>
        </Center>
      </Container>
    </Fragment>
  );
};

export default Home;
