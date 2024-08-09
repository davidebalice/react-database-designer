// CustomNodeWidget.js
import React from 'react';
import { DefaultNodeModel } from '@projectstorm/react-diagrams';

const CustomNodeWidget = ({ node }) => {
  const handleClick = () => {
    // Logica per aprire la modale
    alert('Button clicked!');
  };

  return (
    <div
      style={{
        backgroundColor: node.options.color,
        padding: '10px',
        borderRadius: '5px',
        position: 'relative',
      }}
    >
      <div>{node.options.name}</div>
      <button
        onClick={handleClick}
        style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
        }}
      >
        Open Modal
      </button>
    </div>
  );
};

export default CustomNodeWidget;
