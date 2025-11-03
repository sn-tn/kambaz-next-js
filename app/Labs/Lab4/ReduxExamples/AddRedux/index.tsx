/* eslint-disable @typescript-eslint/no-explicit-any */
import { add } from "./addReducer";
import { useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

export default function AddRedux() {
  const [a, setA] = useState(12);
  const [b, setB] = useState(23);
  const { sum } = useSelector((state: RootState) => state.addReducer);
  const dispatch = useDispatch();
  return (
    <div id="wd-add-redux">
      <h1>Add Redux</h1>
      <h2>{a} + {b} = {sum}</h2>
      <FormControl type="number" defaultValue={a} onChange={(e: any) => setA(parseInt(e.target.value))} />
      <FormControl type="number" defaultValue={b} onChange={(e: any) => setB(parseInt(e.target.value))} />
      <Button id="wd-add-redux-click" onClick={() => dispatch(add({a, b}))}> Add Redux </Button>
      <hr />
    </div>
  )
}