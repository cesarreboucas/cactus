"use client";
import React, {
  Fragment,
  useState,
  useReducer,
  useEffect,
  useRef,
} from "react";
import { Input } from "@/components/ui/input";

type dispatchArguments = {
  type: string;
  line: number;
  property: string;
  value: any;
};
type dispatchType = (action: dispatchArguments) => void;

function reducer(state: any[], action: dispatchArguments) {
  console.log("Reducer", action);
  switch (action.type) {
    case "updateText":
      const newState = [...state];
      newState[action.line][action.property] = action.value;
      return newState;
    default:
      return state;
  }
}

export default function Page() {
  const columnDefinition = [
    {
      key: "item",
      label: "Item",
    },
    {
      key: "price",
      label: "Price",
    },

    {
      key: "quantity",
      label: "Phone",
    },
    {
      key: "total",
      label: "Total",
    },
  ];
  return (
    <div>
      <h1>Sheet</h1>
      <Sheet initialData={sampleData} columnDefinition={columnDefinition} />
    </div>
  );
}
function Sheet({
  initialData,
  columnDefinition,
}: {
  initialData: any[];
  columnDefinition: any[];
}) {
  const columnsLength = columnDefinition.length;
  const templateColumns = columnDefinition.map((column) => "1fr").join(" ");
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const [data, dispatch] = useReducer(reducer, initialData);
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [editCell, setEditCell] = useState<number | null>(null);

  function cellClickHandler(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    if (e.detail === 1) {
      // Single Click
      setSelectedCell(Number(e.currentTarget.id));
    } else {
      // Multiple Click
      setEditCell(Number(e.currentTarget.id));
    }
  }

  function keyDownHandler(e: React.KeyboardEvent<HTMLDivElement>) {
    console.log("Key Down", e.key);
    switch (e.key) {
      case "ArrowUp": {
        if (selectedCell !== null && selectedCell >= columnsLength) {
          setSelectedCell(selectedCell - columnsLength);
        }
        break;
      }
      case "ArrowDown": {
        if (
          selectedCell !== null &&
          selectedCell < columnsLength * data.length - columnsLength
        ) {
          setSelectedCell(selectedCell + columnsLength);
        }
        break;
      }
      case "ArrowLeft": {
        if (selectedCell !== null && selectedCell > 0) {
          setSelectedCell(selectedCell - 1);
        }
        break;
      }
      case "ArrowRight": {
        if (
          selectedCell !== null &&
          selectedCell < columnsLength * data.length - 1
        ) {
          setSelectedCell(selectedCell + 1);
        }
        break;
      }
      case "Enter": {
        if (
          selectedCell !== null &&
          selectedCell < columnsLength * data.length - 1
        ) {
          setSelectedCell(selectedCell + 1);
        }
        break;
      }
      case "F2": {
        if (selectedCell !== null) {
          setEditCell(selectedCell);
        }
        break;
      }
    }
  }

  useEffect(() => {
    if (editCell === null) {
      // Keeps the focus on the main container when input is closed
      mainContainerRef.current?.focus();
    }
  }, [editCell]);

  return (
    <div
      className="grid focus:outline-none"
      tabIndex={-1} // To make the div focusable and trigger the keydown event
      style={{ gridTemplateColumns: templateColumns }}
      onKeyDown={keyDownHandler}
      ref={mainContainerRef}
    >
      {columnDefinition.map((column) => (
        <div key={column.key}>{column.label}</div>
      ))}

      {data.map((record, i) => {
        return (
          <Fragment key={i}>
            {columnDefinition.map((column, j) => {
              const index = i * columnsLength + j;
              return (
                <div
                  id={index.toString()}
                  key={index}
                  onClick={cellClickHandler}
                  className={`${selectedCell === index ? "bg-blue-200" : ""}`}
                >
                  <Cell
                    line={i}
                    property={column.key}
                    value={record[column.key]}
                    editing={editCell === index}
                    dispatch={dispatch}
                    setEditCell={setEditCell}
                  />
                </div>
              );
            })}
          </Fragment>
        );
      })}
    </div>
  );
}

function Cell({
  line,
  property,
  value,
  editing,
  dispatch,
  setEditCell,
}: {
  line: number;
  property: string;
  value: string;
  editing: boolean;
  dispatch: dispatchType;
  setEditCell: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  // console.log("property", property);
  const [valueEdit, setValueEdit] = useState(value);
  const ref = useRef<HTMLInputElement>(null);
  function setInputValue(e: React.ChangeEvent<HTMLInputElement>) {
    setValueEdit(e.target.value);
    // console.log("Key inn", e.key);
  }

  function checkEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      // Avoids the keydown event to be triggered in the parent div
      e.stopPropagation();
      dispatch({ type: "updateText", line, property, value: valueEdit });
      setEditCell(null);
    } else if (e.key === "Escape") {
      setValueEdit(value);
      setEditCell(null);
    }
  }

  useEffect(() => {
    if (editing) {
      ref.current?.focus();
    }
  }, [editing]);

  if (editing) {
    return (
      <Input
        ref={ref}
        value={valueEdit}
        onChange={setInputValue}
        onKeyDown={checkEnter}
      />
    );
  } else {
    return <>{value}</>;
  }
}

const sampleData = [
  { item: "Apple", price: 1, quantity: 5, total: 5 },
  { item: "Banana", price: 2, quantity: 5, total: 10 },
  { item: "Orange", price: 3, quantity: 5, total: 15 },
  { item: "Grapes", price: 4, quantity: 5, total: 20 },
  { item: "Pineapple", price: 5, quantity: 5, total: 25 },
  { item: "Mango", price: 6, quantity: 5, total: 30 },
  { item: "Strawberry", price: 7, quantity: 5, total: 35 },
  { item: "Cherry", price: 8, quantity: 5, total: 40 },
  { item: "Kiwi", price: 9, quantity: 5, total: 45 },
  { item: "Peach", price: 10, quantity: 5, total: 50 },
];
