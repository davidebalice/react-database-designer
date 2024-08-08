import { CanvasWidget } from "@projectstorm/react-canvas-core";
import createEngine, { DiagramModel } from "@projectstorm/react-diagrams";
import {
  DefaultLinkModel,
  DefaultNodeModel,
  DefaultPortModel,
} from "@projectstorm/react-diagrams-defaults";
import React, { useEffect, useState } from "react";

const Diagram = ({ tables = [], links = [] }) => {
  const [engine, setEngine] = useState(null);

  useEffect(() => {
    const engine = createEngine();
    const model = new DiagramModel();

    const nodeMap = {};

    tables.forEach((table) => {
      const node = new DefaultNodeModel({
        name: table.name,
        color: "rgb(0,192,255)",
      });
      node.setPosition(table.position.x, table.position.y);

      table.fields.forEach((field) => {
        node.addPort(
          new DefaultPortModel({
            in: true,
            name: field,
            label: field,
          })
        );
      });

      nodeMap[table.name] = node;
      model.addNode(node);
    });

    // Collegamenti tra le porte
    links.forEach((link) => {
      const sourceNode = nodeMap[link.sourceTable];
      const targetNode = nodeMap[link.targetTable];
      const sourcePort = sourceNode?.getPort(link.sourceField);
      const targetPort = targetNode?.getPort(link.targetField);

      if (sourcePort && targetPort) {
        const linkModel = new DefaultLinkModel();
        linkModel.setSourcePort(sourcePort);
        linkModel.setTargetPort(targetPort);
        model.addLink(linkModel);
      }
    });

    engine.setModel(model);
    setEngine(engine);
  }, [tables, links]);

  if (!engine) return null;

  return <CanvasWidget engine={engine} className="diagram-container" />;
};

export default Diagram;