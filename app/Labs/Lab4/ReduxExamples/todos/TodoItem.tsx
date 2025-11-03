import { Button, ListGroupItem } from "react-bootstrap";
import { deleteTodo, setTodo } from "./todosReducer";
import { useDispatch } from "react-redux";
export default function TodoItem({ todo } : { todo: { id: string, title: string } }) {
  const dispatch = useDispatch();
  return (
    <ListGroupItem key={todo.id}>
      <Button onClick={() => dispatch(deleteTodo(todo.id))} id="wd-delete-todo-click" className="btn-danger float-end me-2"> Delete </Button>
      <Button onClick={() => dispatch(setTodo(todo))} id="wd-settodo-click" className="btn-primary float-end me-2"> Edit </Button>
      {todo.title}
    </ListGroupItem>
  );
}