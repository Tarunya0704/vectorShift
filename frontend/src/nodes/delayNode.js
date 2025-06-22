import React, { useState } from 'react';
import BaseNode from '../components/BaseNode';

const DelayNode = ({ id, data, onDataChange }) => {
  const [delay, setDelay] = useState(data?.delay || 1000);
  const [unit, setUnit] = useState(data?.unit || 'ms');

  const handleDelayChange = (e) => {
    const newDelay = parseInt(e.target.value) || 0;
    setDelay(newDelay);
    if (onDataChange) {
      onDataChange({ ...data, delay: newDelay });
    }
  };

  const handleUnitChange = (e) => {
    const newUnit = e.target.value;
    setUnit(newUnit);
    if (onDataChange) {
      onDataChange({ ...data, unit: newUnit });
    }
  };

  const inputs = [
    { id: 'trigger', label: 'Trigger', color: '#10b981' }
  ];

  const outputs = [
    { id: 'delayed', label: 'Delayed', color: '#10b981' }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Delay"
      inputs={inputs}
      outputs={outputs}
      backgroundColor="#d1fae5"
      borderColor="#10b981"
      titleColor="#059669"
      onDataChange={onDataChange}
    >
      <div className="delay-node-content">
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '500' }}>
          Delay Amount:
        </label>
        <input
          type="number"
          value={delay}
          onChange={handleDelayChange}
          min="0"
          style={{
            width: '100%',
            padding: '4px 6px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            fontSize: '12px',
            marginBottom: '8px'
          }}
        />
        
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '500' }}>
          Unit:
        </label>
        <select
          value={unit}
          onChange={handleUnitChange}
          style={{
            width: '100%',
            padding: '4px 6px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            fontSize: '12px'
          }}
        >
          <option value="ms">Milliseconds</option>
          <option value="s">Seconds</option>
          <option value="min">Minutes</option>
          <option value="h">Hours</option>
        </select>
        
        <div style={{ 
          marginTop: '8px', 
          fontSize: '11px', 
          color: '#6b7280', 
          textAlign: 'center' 
        }}>
          {delay} {unit}
        </div>
      </div>
    </BaseNode>
  );
};

export default DelayNode;