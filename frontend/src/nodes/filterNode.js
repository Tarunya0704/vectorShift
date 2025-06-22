import React, { useState } from 'react';
import BaseNode from '../components/BaseNode';

const FilterNode = ({ id, data, onDataChange }) => {
  const [filterType, setFilterType] = useState(data?.filterType || 'contains');
  const [filterValue, setFilterValue] = useState(data?.filterValue || '');
  const [caseSensitive, setCaseSensitive] = useState(data?.caseSensitive || false);

  const handleFilterTypeChange = (e) => {
    const newType = e.target.value;
    setFilterType(newType);
    if (onDataChange) {
      onDataChange({ ...data, filterType: newType });
    }
  };

  const handleFilterValueChange = (e) => {
    const newValue = e.target.value;
    setFilterValue(newValue);
    if (onDataChange) {
      onDataChange({ ...data, filterValue: newValue });
    }
  };

  const handleCaseSensitiveChange = (e) => {
    const newValue = e.target.checked;
    setCaseSensitive(newValue);
    if (onDataChange) {
      onDataChange({ ...data, caseSensitive: newValue });
    }
  };

  const inputs = [
    { id: 'data', label: 'Data', color: '#f59e0b' }
  ];

  const outputs = [
    { id: 'filtered', label: 'Filtered', color: '#f59e0b' },
    { id: 'excluded', label: 'Excluded', color: '#ef4444' }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Filter"
      inputs={inputs}
      outputs={outputs}
      backgroundColor="#fef3c7"
      borderColor="#f59e0b"
      titleColor="#d97706"
      onDataChange={onDataChange}
    >
      <div className="filter-node-content">
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '500' }}>
          Filter Type:
        </label>
        <select
          value={filterType}
          onChange={handleFilterTypeChange}
          style={{
            width: '100%',
            padding: '4px 6px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            fontSize: '12px',
            marginBottom: '8px'
          }}
        >
          <option value="contains">Contains</option>
          <option value="equals">Equals</option>
          <option value="startsWith">Starts With</option>
          <option value="endsWith">Ends With</option>
          <option value="regex">Regex</option>
        </select>
        
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '500' }}>
          Filter Value:
        </label>
        <input
          type="text"
          value={filterValue}
          onChange={handleFilterValueChange}
          placeholder="Enter filter criteria"
          style={{
            width: '100%',
            padding: '4px 6px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            fontSize: '12px',
            marginBottom: '8px'
          }}
        />
        
        <label style={{ display: 'flex', alignItems: 'center', fontSize: '12px', fontWeight: '500' }}>
          <input
            type="checkbox"
            checked={caseSensitive}
            onChange={handleCaseSensitiveChange}
            style={{ marginRight: '6px' }}
          />
          Case Sensitive
        </label>
      </div>
    </BaseNode>
  );
};

export default FilterNode;