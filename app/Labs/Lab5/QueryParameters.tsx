"use client";
import { useState } from "react";
import { FormControl } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export default function QueryParameters() {
  const [a, setA] = useState("34");
  const [b, setB] = useState("23");
  return (
    <div>
      <h3>Query Parameters</h3>
      <FormControl className="mb-2" id="wd-query-parameters-a" defaultValue={a}
        onChange={(e) => setA(e.target.value)} />
      <FormControl className="mb-2" id="wd-query-parameters-b" defaultValue={b}
        onChange={(e) => setB(e.target.value)} />
      <a id="wd-query-parameter-add" className="btn btn-primary me-2"
        href={`${HTTP_SERVER}/lab5/calculator?operation=add&a=${a}&b=${b}`}>
        Add {a} + {b}
      </a>
      <a id="wd-query-parameter-subtract" className="btn btn-danger me-2"
        href={`${HTTP_SERVER}/lab5/calculator?operation=subtract&a=${a}&b=${b}`}>
        Subtract {a} - {b}
      </a>
      <a id="wd-query-parameter-multiply" className="btn btn-warning me-2"
        href={`${HTTP_SERVER}/lab5/calculator?operation=multiply&a=${a}&b=${b}`}>
        Multiply {a} * {b}
      </a>
      <a id="wd-query-parameter-subtract" className="btn btn-secondary me-2"
        href={`${HTTP_SERVER}/lab5/calculator?operation=divide&a=${a}&b=${b}`}>
        Divide {a} / {b}
      </a>
      <hr />
    </div>
  );
}