import { createStore } from "redux";

/////////type definition////////////
export interface InitialState {
  inputText: string;
  todos: {
    [id: number]: {
      key: number;
      id: number;
      text: string;
      boolAlternate: boolean;
    };
  };
}

export interface TodosStructure {
  key: number;
  id: number;
  text: string;
  boolAlternate: boolean;
}

interface ActionDefinition {
  type:
    | typeof booleanChecker
    | typeof changeText
    | typeof todoUpdate
    | typeof deleteTodo;
  content: string;
  value: string;
  id: any;
  admitEditNumber: any;
}

const booleanChecker = "bool";
const changeText = "text";
const todoUpdate = "todos";
const deleteTodo = "delete";
///////////////////////////////////

function todoReducer(
  state: InitialState = { inputText: "", todos: {} },
  action: ActionDefinition
) {
  switch (action.type) {
    case booleanChecker:
      const targetTodo = state.todos[action.admitEditNumber];
      const changeBool = {
        [action.admitEditNumber]: {
          ...targetTodo,
          boolAlternate: !targetTodo.boolAlternate,
        },
      };
      return { ...state, todos: { ...state.todos, ...changeBool } };
    case changeText:
      return { ...state, inputText: action.content };
    case todoUpdate:
      const ID = Math.random();
      const newTodos = {
        [ID]: {
          key: Math.random(),
          id: ID,
          text: action.value,
          boolAlternate: false,
        },
      };
      return { ...state, todos: { ...state.todos, ...newTodos } };
    case deleteTodo:
      delete state.todos[action.id];
      return { ...state };
    default:
      return state;
  }
}

const todoProps = createStore(todoReducer);

/////dispatchFunction////////////
export const booleanDispatch = (id: any) => {
  return { type: booleanChecker, admitEditNumber: id };
};

export const typingEvent = (typing: string) => {
  return { type: changeText, content: typing };
};

export const addTodoAction = (value: string) => {
  return { type: todoUpdate, value: value };
};

export const deleteTodoAction = (id: any) => {
  return { type: deleteTodo, id: id };
};

export default todoProps;
