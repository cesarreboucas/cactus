"use client";
import React, { Fragment, useRef, useState } from "react";
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
  //   const references: React.MutableRefObject<HTMLDivElement | null>[] =
  //     Array.from({ length: columnsLength * data.length }, function () {
  //       return null;
  //     }).map(() => useRef(null));
  const [data, setData] = useState(initialData);
  const [selectedCell, setSelectedCell] = useState<number | null>(null);

  function cellClickHandler(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    if (e.detail === 1) {
      // Single Click
      console.log("Single Click");
      setSelectedCell(Number(e.currentTarget.id));
      //   console.log("X", references[Number(e.currentTarget.id)].current);
      //   references[Number(e.currentTarget.id)].current?.focus();
    } else {
      // Multiple Click
      console.log("Double Click");
    }
    console.log(e);
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
    }
  }

  return (
    <div
      className="grid focus:outline-none"
      tabIndex={-1} // To make the div focusable and trigger the keydown event
      style={{ gridTemplateColumns: templateColumns }}
      onKeyDown={keyDownHandler}
    >
      {columnDefinition.map((column) => (
        <div key={column.key}>{column.label}</div>
      ))}

      {data.map((line, i) => {
        return (
          <Fragment key={i}>
            {columnDefinition.map((column, j) => {
              const index = i * columnsLength + j;
              return (
                <div
                  id={index.toString()}
                  //   tabIndex={index + 500}
                  key={index}
                  //   ref={references[i * columnsLength + j]}
                  onClick={cellClickHandler}
                  className={`${selectedCell === index ? "bg-blue-200" : ""}`}
                >
                  {line[column.key]}
                </div>
              );
            })}
          </Fragment>
        );
      })}
    </div>
  );
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
