import React, { useState } from 'react';
import BaseNode from '../components/BaseNode';

const OutputNode = ({ id, data, onDataChange }) => {
  const [outputName, setOutputName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setOutputName(newName);
    if (onDataChange) {
      onDataChange({ ...data, outputName: newName });
    }
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setOutputType(newType);
    if (onDataChange) {
      onDataChange({ ...data, outputType: newType });
    }
  };

  const inputs = [{
    id: 'value',
    label: 'Input',
    color: '#ef4444'
  }];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Output"
      inputs={inputs}
      backgroundColor="#fef2f2"
      borderColor="#ef4444"
      titleColor="#dc2626"
      onDataChange={onDataChange}
    >
      <div className="output-node-content">
        <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '500' }}>
          Name:
        </label>
        <input
          type="text"
          value={outputName}
          onChange={handleNameChange}
          style={{
            width: '100%',
            padding: '6px 8px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            fontSize: '13px',
            marginBottom: '12px'
          }}
        />
        
        <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '500' }}>
          Type:
        </label>
        <select
          value={outputType}
          onChange={handleTypeChange}
          style={{
            width: '100%',
            padding: '6px 8px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            fontSize: '13px'
          }}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
          <option value="Number">Number</option>
          <option value="Image">Image</option>
        </select>
      </div>
    </BaseNode>
  );
};
export default OutputNode;
