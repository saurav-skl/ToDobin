import React, { Fragment } from "react";
import { Button, Container, Flex, Input } from "@chakra-ui/react";

const InputList = ({ onInputChange, onButtonSubmit }) => {
  return (
    <Fragment>
      <Container>
        <Flex>
          <Input
            isRequired
            focusBorderColor="lime"
            placeholder="Write in todo"
            onChange = {onInputChange}
            id = "input"
          />
          <Button 
          ml="2" 
          type="submit"
          onClick = {onButtonSubmit}
          >
            Add
          </Button>
        </Flex>
      </Container>
    </Fragment>
  );
};

export default InputList;
