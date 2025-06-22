import React, { useState } from 'react';
import BaseNode from '../components/BaseNode';

const MathNode = ({ id, data, onDataChange }) => {
  const [operation, setOperation] = useState(data?.operation || 'add');
  const [constant, setConstant] = useState(data?.constant || 0);

  const handleOperationChange = (e) => {
    const newOperation = e.target.value;
    setOperation(newOperation);
    if (onDataChange) {
      onDataChange({ ...data, operation: newOperation });
    }
  };

  const handleConstantChange = (e) => {
    const newConstant = parseFloat(e.target.value) || 0;
    setConstant(newConstant);
    if (onDataChange) {
      onDataChange({ ...data, constant: newConstant });
    }
  };

  const inputs = [
    { id: 'a', label: 'A', color: '#06b6d4' },
    { id: 'b', label: 'B', color: '#06b6d4' }
  ];

  const outputs = [
    { id: 'result', label: 'Result', color: '#06b6d4' }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Math"
      inputs={inputs}
      outputs={outputs}
      backgroundColor="#cffafe"
      borderColor="#06b6d4"
      titleColor="#0891b2"
      onDataChange={onDataChange}
    >
      <div className="math-node-content">
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '500' }}>
          Operation:
        </label>
        <select
          value={operation}
          onChange={handleOperationChange}
          style={{
            width: '100%',
            padding: '4px 6px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            fontSize: '12px',
            marginBottom: '8px'
          }}
        >
          <option value="add">Add (A + B)</option>
          <option value="subtract">Subtract (A - B)</option>
          <option value="multiply">Multiply (A × B)</option>
          <option value="divide">Divide (A ÷ B)</option>
          <option value="power">Power (A ^ B)</option>
          <option value="modulo">Modulo (A % B)</option>
        </select>
        
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '500' }}>
          Constant (if B not connected):
        </label>
        <input
          type="number"
          value={constant}
          onChange={handleConstantChange}
          step="0.1"
          style={{
            width: '100%',
            padding: '4px 6px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            fontSize: '12px'
          }}
        />
      </div>
    </BaseNode>
  );
};
export default MathNode;