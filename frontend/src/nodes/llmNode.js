import React, { useState } from 'react';
import BaseNode from '../components/BaseNode';

const LLMNode = ({ id, data, onDataChange }) => {
  const [model, setModel] = useState(data?.model || 'GPT-4');
  const [temperature, setTemperature] = useState(data?.temperature || 0.7);
  const [maxTokens, setMaxTokens] = useState(data?.maxTokens || 1000);

  const handleModelChange = (e) => {
    const newModel = e.target.value;
    setModel(newModel);
    if (onDataChange) {
      onDataChange({ ...data, model: newModel });
    }
  };

  const handleTemperatureChange = (e) => {
    const newTemp = parseFloat(e.target.value);
    setTemperature(newTemp);
    if (onDataChange) {
      onDataChange({ ...data, temperature: newTemp });
    }
  };

  const handleMaxTokensChange = (e) => {
    const newTokens = parseInt(e.target.value);
    setMaxTokens(newTokens);
    if (onDataChange) {
      onDataChange({ ...data, maxTokens: newTokens });
    }
  };

  const inputs = [
    { id: 'system', label: 'System', color: '#8b5cf6' },
    { id: 'prompt', label: 'Prompt', color: '#8b5cf6' }
  ];

  const outputs = [{
    id: 'response',
    label: 'Response',
    color: '#8b5cf6'
  }];

  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      inputs={inputs}
      outputs={outputs}
      backgroundColor="#f3e8ff"
      borderColor="#8b5cf6"
      titleColor="#7c3aed"
      onDataChange={onDataChange}
    >
      <div className="llm-node-content">
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '500' }}>
          Model:
        </label>
        <select
          value={model}
          onChange={handleModelChange}
          style={{
            width: '100%',
            padding: '4px 6px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            fontSize: '12px',
            marginBottom: '8px'
          }}
        >
          <option value="GPT-4">GPT-4</option>
          <option value="GPT-3.5">GPT-3.5</option>
          <option value="Claude">Claude</option>
          <option value="PaLM">PaLM</option>
        </select>
        
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '500' }}>
          Temperature: {temperature}
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={temperature}
          onChange={handleTemperatureChange}
          style={{ width: '100%', marginBottom: '8px' }}
        />
        
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '500' }}>
          Max Tokens:
        </label>
        <input
          type="number"
          value={maxTokens}
          onChange={handleMaxTokensChange}
          min="1"
          max="4000"
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
export default LLMNode;