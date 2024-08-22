import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import Field from "./Field";

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
  setShowModal,
  setSelectedTable,
}) => {
  const [selectedField, setSelectedField] = useState("");
  const [targetTable, setTargetTable] = useState("");
  const [targetField, setTargetField] = useState("");
  const [showLink, setShowLink] = useState(false);

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
    },
  });

  console.log("links");
  console.log(links);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "FIELD",
      drop: (item, monitor) =>
        handleFieldDrop(item.field.name, "drop", monitor),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        item: monitor.getItem(),
        dropResult: monitor.getDropResult(),
      }),
    }),
    [name]
  );

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
        // Usa field.name invece di field direttamente
        console.log(field);
        const targetTableObj = tables.find((t) =>
          t.fields.some((f) => f.name === field)
        );
        if (targetTableObj) {
          console.log(field.name);
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
      onAddLink,
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

  const onOpenModal = (id) => {
    setSelectedTable(id);
    setShowModal(true);
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
          <div className="tableHeader">
            <span>{name}</span>
            <div>
              {id > 0 && (
                <FontAwesomeIcon
                  icon={faGear}
                  className="gear"
                  onClick={() => {
                    onOpenModal(id);
                  }}
                />
              )}
            </div>
          </div>
          <ul>
            {showLink && (
              <div>
                <select
                  onChange={(e) => setSelectedField(e.target.value)}
                  value={selectedField}
                >
                  <option value="">Select Field to Link</option>
                  {fields.map((f) => (
                    <option key={f.name} value={f.name}>
                      {f.name}
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
                        <option key={f.name} value={f.name}>
                          {f.name}
                        </option>
                      )) || <option value="">No Fields Available</option>}
                  </select>
                )}
                <button
                  onClick={() => handleFieldDrop(selectedField, "manual")}
                >
                  Add Link
                </button>
              </div>
            )}

            {fields && fields.length > 0 ? (
              fields.map((field) => (
                <li
                  key={field.name}
                  onDragEnter={() => handleMouseEnterField(field.name)}
                >
                  <Field field={field} table={name} />
                </li>
              ))
            ) : (
              <li>No fields available</li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Table;
