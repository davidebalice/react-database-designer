import { DefaultNodeModel, DefaultPortModel } from '@projectstorm/react-diagrams';
import { PortModelAlignment } from '@projectstorm/react-diagrams-core';

const createTableNode = (tableName, fields, x, y) => {
  const node = new DefaultNodeModel({
    name: tableName,
    color: 'rgb(0,192,255)',
  });
  node.setPosition(x, y);

  fields.forEach((field) => {
    // Crea una porta di output per ogni campo
    node.addPort(new DefaultPortModel({
      in: false,
      name: field,
      alignment: PortModelAlignment.RIGHT,
    }));

    // Se necessario, puoi aggiungere porte di input
    node.addPort(new DefaultPortModel({
      in: true,
      name: field + '-in',
      alignment: PortModelAlignment.LEFT,
    }));
  });

  return node;
};

export default createTableNode;