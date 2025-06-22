import React, { useState } from 'react';
import BaseNode from '../components/BaseNode';

const ValidatorNode = ({ id, data, onDataChange }) => {
  const [validationType, setValidationType] = useState(data?.validationType || 'email');
  const [customPattern, setCustomPattern] = useState(data?.customPattern || '');

  const handleValidationTypeChange = (e) => {
    const newType = e.target.value;
    setValidationType(newType);
    if (onDataChange) {
      onDataChange({ ...data, validationType: newType });
    }
  };

  const handleCustomPatternChange = (e) => {
    const newPattern = e.target.value;
    setCustomPattern(newPattern);
    if (onDataChange) {
      onDataChange({ ...data, customPattern: newPattern });
    }
  };

  const inputs = [
    { id: 'input', label: 'Input', color: '#ec4899' }
  ];

  const outputs = [
    { id: 'valid', label: 'Valid', color: '#10b981' },
    { id: 'invalid', label: 'Invalid', color: '#ef4444' },
    { id: 'errors', label: 'Errors', color: '#f59e0b' }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Validator"
      inputs={inputs}
      outputs={outputs}
      backgroundColor="#fdf2f8"
      borderColor="#ec4899"
      titleColor="#db2777"
      onDataChange={onDataChange}
    >
      <div className="validator-node-content">
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '500' }}>
          Validation Type:
        </label>
        <select
          value={validationType}
          onChange={handleValidationTypeChange}
          style={{
            width: '100%',
            padding: '4px 6px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            fontSize: '12px',
            marginBottom: '8px'
          }}
        >
          <option value="email">Email</option>
          <option value="url">URL</option>
          <option value="phone">Phone Number</option>
          <option value="number">Number</option>
          <option value="date">Date</option>
          <option value="custom">Custom Regex</option>
        </select>
        
        {validationType === 'custom' && (
          <>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '500' }}>
              Custom Pattern:
            </label>
            <input
              type="text"
              value={customPattern}
              onChange={handleCustomPatternChange}
              placeholder="Enter regex pattern"
              style={{
                width: '100%',
                padding: '4px 6px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '12px'
              }}
            />
          </>
        )}
      </div>
    </BaseNode>
  );
};
export default ValidatorNode;