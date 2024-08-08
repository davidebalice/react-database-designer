import React from 'react';
import { useDrop } from 'react-dnd';
import Table from './Table';

const Canvas = ({ tables, moveTable, addLink }) => {
  const [, drop] = useDrop(() => ({
    accept: 'TABLE',
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const newPos = {
        x: item.position.x + delta.x,
        y: item.position.y + delta.y,
      };
      moveTable(item.id, newPos);
    },
  }));

  const handleAddLink = (sourceTable, sourceField, targetTable, targetField) => {
    addLink(sourceTable, sourceField, targetTable, targetField);
  };

  return (
    <div ref={drop} className="canvas">
      {tables.map((table) => (
        <Table
          key={table.id}
          {...table}
          tables={tables}
          moveTable={moveTable}
          onAddLink={handleAddLink}
        />
      ))}
    </div>
  );
};

export default Canvas;
