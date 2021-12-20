import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  NumberInput,
  NumberInputField,
  Input,
} from "@chakra-ui/react";
import { useCount, useContractMethod } from "../hooks";
import { utils } from "ethers";

export default function Count() {
  const count = useCount();
  const { state, send: incrementCount } = useContractMethod("incrementCount");
  const { state: setCountState, send: setCount } =
    useContractMethod("setCount");
  const { state: twoVariablesState, send: setTwoVariables } =
    useContractMethod("takeTwoVariables");
  const [input, setInput] = useState("");

  function handleIncrement() {
    incrementCount();
  }

  function handleSetCount() {
    const _count = parseInt(input);
    if (_count) {
      setCount(_count);
    }
  }

  function handleTwoVariables() {
    const _count = parseInt(input);
    if (_count) {
      setTwoVariables(_count, 2, {
        value: utils.parseEther("0.05"),
      });
    }
  }

  function handleInput(valueAsString: string, valueAsNumber: number) {
    setInput(valueAsString);
  }


  return (
    <Flex direction="column" align="center" mt="4">
      <Text color="white" fontSize="8xl">
        {count ? count.toNumber() : 'No data from Blockchain'}
      </Text>
      <Text color="white" fontSize="3xl">
        {'Titles registered so far'}
      </Text>

      <Box mt={4}>
        <Input
          color="white"
          placeholder='Must be unique number' >

        </Input>
        <Input focusBorderColor='lime' placeholder='Title in Kannada' />
        <Input focusBorderColor='lime' placeholder='Title in English' />
        <Button isFullWidth colorScheme="purple" onClick={handleTwoVariables}>
          Register
        </Button>
      </Box>
    </Flex>
  );
}
