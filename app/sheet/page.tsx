"use client";
import React, {
  Fragment,
  useState,
  useReducer,
  useEffect,
  useRef,
} from "react";

type dispatchArguments = {
  type: string;
  line: number;
  property: string;
  value: any;
};
type dispatchType = (action: dispatchArguments) => void;

type columnDefinitionType = {
  key: string;
  label: string;
  type: string;
  className?: string;
  format?: (value: any) => string;
};

const cellPadding = "py-1 px-2";

function reducer(state: any[], action: dispatchArguments) {
  console.log("Reducer", action);
  switch (action.type) {
    case "updateText": {
      const newState = [...state];
      newState[action.line][action.property] = action.value;
      return newState;
    }
    case "updateNumber": {
      const newState = [...state];
      let num = 0;
      try {
        const parsed = parseFloat(action.value);
        if (!isNaN(parsed)) {
          num = parsed;
        }
      } catch (error) {
      } finally {
        newState[action.line][action.property] = num;
        switch (action.property) {
          case "price":
          case "quantity":
            newState[action.line].total =
              newState[action.line].price * newState[action.line].quantity;
            break;
        }
        return newState;
      }
    }
    default:
      return state;
  }
}

export default function Page() {
  const columnDefinition: columnDefinitionType[] = [
    {
      key: "item",
      label: "Item",
      type: "text",
    },
    {
      key: "price",
      label: "Price",
      type: "number",
      className: "text-right",
      format: (value: number) => `$ ${value.toFixed(2)}`,
    },

    {
      key: "quantity",
      label: "Quantity",
      type: "number",
      className: "text-right",
      format: (value: number) => `${value.toFixed(1)}`,
    },
    {
      key: "total",
      label: "Total",
      type: "number",
      className: "text-right",
      format: (value: number) => `$ ${value.toFixed(2)}`,
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
    if (editCell !== null) {
      // Exit edit mode if clicking on another cell
      setEditCell(null);
      return;
    }
    if (e.detail === 1) {
      // Single Click
      setSelectedCell(Number(e.currentTarget.id));
    } else {
      // Multiple Click
      setEditCell(Number(e.currentTarget.id));
    }
  }

  function keyDownHandler(e: React.KeyboardEvent<HTMLDivElement>) {
    if (editCell !== null) {
      // Do not move selected cell when editing
      return;
    }
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
      className="grid gap-px focus:outline-none off"
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
                  className={`outline outline-1 outline-blue-900/30 ${
                    editCell !== index ? cellPadding : ""
                  }  ${selectedCell === index ? "bg-blue-100 outline-2" : ""}`}
                >
                  <Cell
                    line={i}
                    column={column}
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
  column,
  value,
  editing,
  dispatch,
  setEditCell,
}: {
  line: number;
  column: columnDefinitionType;
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
  column.format = column.format || ((value) => value);

  function checkEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      // Avoids the keydown event to be triggered in the parent div
      e.stopPropagation();
      dispatch({
        type: column.type === "number" ? "updateNumber" : "updateText",
        line,
        property: column.key,
        value: valueEdit,
      });
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
      <input
        ref={ref}
        className={`w-full ${cellPadding} rounded-sm outline outline-2 outline-blue-700 ${column.className}`}
        value={valueEdit}
        onChange={setInputValue}
        onKeyDown={checkEnter}
        onClick={(e) => e.stopPropagation()}
      />
    );
  } else {
    return (
      <span className={`block w-full ${column.className}`}>
        {column.format(value)}
      </span>
    );
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
