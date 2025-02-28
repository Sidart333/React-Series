import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, updateTodo } from "../features/todo/todoSlice";

function Todo() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  return (
    <>
      <div>
        Todos
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.textValue}
            <button onClick={() => dispatch(updateTodo(todo.id))}>Update</button>
            <button onClick={() => dispatch(removeTodo(todo.id))}>Delete</button>
          </li>
        ))}
      </div>
    </>
  );
}

export default Todo;
