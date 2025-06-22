import React, { useState } from 'react';
import BaseNode from '../components/BaseNode';

const InputNode = ({ id, data, onDataChange }) => {
  const [inputName, setInputName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setInputName(newName);
    if (onDataChange) {
      onDataChange({ ...data, inputName: newName });
    }
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setInputType(newType);
    if (onDataChange) {
      onDataChange({ ...data, inputType: newType });
    }
  };

  const outputs = [{
    id: 'value',
    label: 'Output',
    color: '#10b981'
  }];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      outputs={outputs}
      backgroundColor="#dbeafe"
      borderColor="#3b82f6"
      titleColor="#1e40af"
      onDataChange={onDataChange}
    >
      <div className="input-node-content">
        <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '500' }}>
          Name:
        </label>
        <input
          type="text"
          value={inputName}
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
          value={inputType}
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
          <option value="Boolean">Boolean</option>
        </select>
      </div>
    </BaseNode>
  );
};
export default InputNode;