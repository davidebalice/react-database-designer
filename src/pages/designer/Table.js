import React, { useState } from "react";
import { useDrag } from "react-dnd";

const Table = ({
  id,
  name,
  fields,
  position,
  moveTable,
  onAddLink,
  tables,
}) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "TABLE",
      item: { id, position },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [id, position]
  );

  console.log("Tables aa:", tables);

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

  const handleAddLink = () => {
    if (selectedField && targetTable && targetField) {
      onAddLink(name, selectedField, targetTable, targetField);
    }
  };

  return (
    <div ref={drag} style={style} className="table">
      <h3>{name}</h3>
      <ul>
        {fields && fields.length > 0 ? (
          fields.map((field) => (
            <li key={field}>
              {field}
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
              <button onClick={handleAddLink}>Add Link</button>
            </li>
          ))
        ) : (
          <li>No fields available</li>
        )}
      </ul>
    </div>
  );
};

export default Table;
