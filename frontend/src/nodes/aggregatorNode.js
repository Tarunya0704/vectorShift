import React, { useState } from 'react';
import BaseNode from '../components/BaseNode';

const AggregatorNode = ({ id, data, onDataChange }) => {
  const [aggregationType, setAggregationType] = useState(data?.aggregationType || 'sum');
  const [groupByField, setGroupByField] = useState(data?.groupByField || '');

  const handleAggregationTypeChange = (e) => {
    const newType = e.target.value;
    setAggregationType(newType);
    if (onDataChange) {
      onDataChange({ ...data, aggregationType: newType });
    }
  };

  const handleGroupByFieldChange = (e) => {
    const newField = e.target.value;
    setGroupByField(newField);
    if (onDataChange) {
      onDataChange({ ...data, groupByField: newField });
    }
  };

  const inputs = [
    { id: 'data', label: 'Data', color: '#6366f1' }
  ];

  const outputs = [
    { id: 'aggregated', label: 'Aggregated', color: '#6366f1' },
    { id: 'summary', label: 'Summary', color: '#8b5cf6' }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Aggregator"
      inputs={inputs}
      outputs={outputs}
      backgroundColor="#eef2ff"
      borderColor="#6366f1"
      titleColor="#4f46e5"
      onDataChange={onDataChange}
    >
      <div className="aggregator-node-content">
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '500' }}>
          Aggregation Type:
        </label>
        <select
          value={aggregationType}
          onChange={handleAggregationTypeChange}
          style={{
            width: '100%',
            padding: '4px 6px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            fontSize: '12px',
            marginBottom: '8px'
          }}
        >
          <option value="sum">Sum</option>
          <option value="average">Average</option>
          <option value="count">Count</option>
          <option value="min">Minimum</option>
          <option value="max">Maximum</option>
          <option value="median">Median</option>
        </select>
        
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '500' }}>
          Group By Field (optional):
        </label>
        <input
          type="text"
          value={groupByField}
          onChange={handleGroupByFieldChange}
          placeholder="Field name for grouping"
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
export default AggregatorNode;