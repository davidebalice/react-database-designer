import React, { useCallback, useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import Field from "./Field";
import Line from "./Line";

const Table = ({
  id,
  name,
  fields,
  position,
  moveTable,
  links,
  onAddLink,
  tables,
  fieldDrop,
  setFieldDrop,
  tableDrop,
  setTableDrop,
  targetTableDrop,
  setTargetTableDrop,
  targetFieldDrop,
  setTargetFieldDrop,
}) => {


  
  const [{ isDragging }, drag] = useDrag({
    type: "TABLE",
    item: { id, position },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item, monitor) => {
      if (!monitor.didDrop()) {
        return;
      }
    }
  });

  console.log(links);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "FIELD",
      drop: (item, monitor) => handleFieldDrop(item.field, "drop", monitor),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        item: monitor.getItem(),
        dropResult: monitor.getDropResult(),
      }),
    }),
    [name]
  );

  const [selectedField, setSelectedField] = useState("");
  const [targetTable, setTargetTable] = useState("");
  const [targetField, setTargetField] = useState("");

  const style = {
    left: position.x,
    top: position.y,
    position: "absolute",
    cursor: "move",
    opacity: isDragging ? 0.5 : 1,
  };

  const handleFieldDrop = useCallback(
    (field, type, monitor) => {
      if (type === "drop") {
        const targetTableObj = tables.find((t) => t.fields.includes(field));
        if (targetTableObj) {
          setFieldDrop(field);
        }
      } else {
        if (
          selectedField &&
          targetTable &&
          targetField &&
          name &&
          name !== targetTable
        ) {
          onAddLink(name, selectedField, targetTable, targetField);
          setSelectedField("");
          setTargetTable("");
          setTargetField("");
        }
      }
    },
    [
      tables,
      setFieldDrop,
      name,
      targetFieldDrop,
      onAddLink,
      fieldDrop,
      targetTableDrop,
      selectedField,
      targetTable,
      targetField,
    ]
  );

  useEffect(() => {
    if (
      targetFieldDrop &&
      tableDrop &&
      fieldDrop &&
      targetTableDrop &&
      tableDrop !== targetTableDrop
    ) {
      onAddLink(tableDrop, fieldDrop, targetTableDrop, targetFieldDrop);
      setTargetFieldDrop("");
      setTargetTableDrop("");
      setFieldDrop("");
    }
  }, [fieldDrop, targetTableDrop, targetFieldDrop, tableDrop, onAddLink]);

  const handleMouseEnterField = (field) => {
    if (field) {
      setTargetFieldDrop(field);
    }
  };

  const handleMouseEnterTable = (table, type) => {
    if (type === "target") {
      setTargetTableDrop(table);
    } else {
      setTableDrop(table);
    }
  };

  


 












  return (
    <>
    
      <div
        id={`table-${name}`}
        ref={(node) => drag(drop(node))}
        style={style}
        className="table"
        onDragEnter={() => handleMouseEnterTable(name, "target")}
        onDragStart={() => handleMouseEnterTable(name, "start")}
      >
        <div>
          <h3>{name}</h3>
          <ul>
            <select
              onChange={(e) => setSelectedField(e.target.value)}
              value={selectedField}
            >
              <option value="">Select Field to Link</option>
              {fields.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
            <select
              onChange={(e) => setTargetTable(e.target.value)}
              value={targetTable}
            >
              <option value="">Select Target Table</option>
              {tables
                .filter((t) => t.name !== name)
                .map((t) => (
                  <option key={t.id} value={t.name}>
                    {t.name}
                  </option>
                ))}
            </select>
            {targetTable && (
              <select
                onChange={(e) => setTargetField(e.target.value)}
                value={targetField}
              >
                <option value="">Select Target Field</option>
                {tables
                  .find((t) => t.name === targetTable)
                  ?.fields.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  )) || <option value="">No Fields Available</option>}
              </select>
            )}
            <button onClick={() => handleFieldDrop(selectedField, "manual")}>
              Add Link
            </button>

            {fields && fields.length > 0 ? (
              fields.map((field) => (
                <li
                  key={field}
                  onDragEnter={() => handleMouseEnterField(field)}
                >
                  <Field field={field} table={name} />
                </li>
              ))
            ) : (
              <li>No fields available</li>
            )}
          </ul>
        </div>
      </div>{" "}
    </>
  );
};

export default Table;
