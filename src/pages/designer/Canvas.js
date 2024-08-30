import React, { useEffect, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import Line from "./Line";
import Table from "./Table";

const Canvas = ({
  tables,
  moveTable,
  addLink,
  links,
  setLinks,
  containerRef,
  setShowModal,
  setShowDeleteModal,
  setShowLinksModal,
  setSelectedTable,
}) => {
  const tableRefs = useRef({});
  const [lineData, setLineData] = useState(links);
  const [fieldDrop, setFieldDrop] = useState("");
  const [tableDrop, setTableDrop] = useState("");
  const [targetTableDrop, setTargetTableDrop] = useState("");
  const [targetFieldDrop, setTargetFieldDrop] = useState("");
  const [incrementPixel, setIncrementPixel] = useState(-10);

  const [, drop] = useDrop(() => ({
    accept: "TABLE",
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const newPos = {
        x: item.position.x + delta.x,
        y: item.position.y + delta.y,
      };
      moveTable(item.id, newPos);
      updateLineData();
    },
  }));

  const updateLineData = () => {
    const updatedLines = links.map((link) => {
      const sourceFieldPos = getFieldPosition(
        `${link.sourceTable}-${link.sourceField}`
      );
      const targetFieldPos = getFieldPosition(
        `${link.targetTable}-${link.targetField}`
      );
      return {
        ...link,
        sourcePosition: sourceFieldPos,
        targetPosition: targetFieldPos,
      };
    });
    setLineData(updatedLines);
  };

  const getFieldPosition = (fieldId) => {
    const element = document.getElementById(fieldId);
    if (element) {
      const rect = element.getBoundingClientRect();
      const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      return {
        x: rect.left + scrollX,
        y: rect.top + scrollY,
      };
    }
    return null;
  };

  useEffect(() => {
    updateLineData();
  }, [tables, links]);

  const renderLines = () => {
    return lineData.map((link, index) => {
      const { sourcePosition, targetPosition } = link;
      if (!sourcePosition || !targetPosition) return null;
      return (
        <Line
          key={index}
          index={index}
          start={sourcePosition}
          end={targetPosition}
          color="black"
          strokeWidth={2}
          containerRef={containerRef}
          incrementPixel={incrementPixel}
          setIncrementPixel={setIncrementPixel}
        />
      );
    });
  };

  const handleAddLink = (
    sourceTable,
    sourceField,
    targetTable,
    targetField
  ) => {
    addLink(sourceTable, sourceField, targetTable, targetField);
    updateLineData();
  };

  return (
    <div ref={drop} className="canvas">
      {renderLines()}
      <p className="infoDrag">
        Move tables around canvas with drag and drop.
        <br />
        Drag fields from one table to another to create link between fields.
      </p>
      {tables.map((table) => (
        <Table
          ref={(el) => (tableRefs.current[table.name] = el)}
          key={table.id}
          {...table}
          tables={tables}
          links={lineData}
          moveTable={moveTable}
          onAddLink={handleAddLink}
          fieldDrop={fieldDrop}
          setFieldDrop={setFieldDrop}
          tableDrop={tableDrop}
          setTableDrop={setTableDrop}
          targetTableDrop={targetTableDrop}
          setTargetTableDrop={setTargetTableDrop}
          targetFieldDrop={targetFieldDrop}
          setTargetFieldDrop={setTargetFieldDrop}
          setShowModal={setShowModal}
          setShowDeleteModal={setShowDeleteModal}
          setShowLinksModal={setShowLinksModal}
          setSelectedTable={setSelectedTable}
        />
      ))}
    </div>
  );
};

export default Canvas;
