import { Button, FormControl, ListGroupItem } from "react-bootstrap";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { useDispatch, useSelector } from "react-redux";

export default function TodoForm() {
  const { todo } = useSelector((state: any) => state.todosReducer);
  const dispatch = useDispatch();
  return (
    <ListGroupItem>
      <Button onClick={() => dispatch(addTodo(todo))} id="wd-add-todo-click" className="btn-success float-end me-2"> Add </Button>
      <Button onClick={() => dispatch(updateTodo(todo))} id="wd-update-todo-click" className="btn-warning float-end me-2"> Update </Button>
      <FormControl value={todo.title} onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))} className="float-start" />
    </ListGroupItem>
  )
}