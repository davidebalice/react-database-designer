import { DefaultNodeModel } from '@projectstorm/react-diagrams';
import CustomNodeWidget from './CustomNodeWidget';

class CustomNodeFactory extends DefaultNodeModel {
  generateReactWidget(diagramEngine, node) {
    return <CustomNodeWidget node={node} />;
  }
}

export default CustomNodeFactory;
