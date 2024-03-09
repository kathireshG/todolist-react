// import TodoListContract from "../build/contracts/TodoList.json"; // Replace with your contract JSON file
// import TodoListContract from `${process.env.PUBLIC_URL}/build/contracts/TodoList.json`;
// import TodoListContract from process.env.PUBLIC_URL + '/build/contracts/TodoList.json';
import TodoListContract from "contracts/TodoList.json";

export const contractAddress = "0x9ed7779C7d4e26B169E12bF7043f59d6321cFD0c";
export const contractABI = TodoListContract.abi;
