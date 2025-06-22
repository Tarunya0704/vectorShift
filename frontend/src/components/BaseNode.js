import React from 'react';
import { Handle, Position } from 'reactflow';

const BaseNode = ({ 
  id, 
  data, 
  nodeType = 'default',
  title = 'Node',
  inputs = [],
  outputs = [],
  children,
  className = '',
  style = {},
  width = 'auto',
  height = 'auto',
  backgroundColor = '#ffffff',
  borderColor = '#d1d5db',
  titleColor = '#374151',
  onDataChange
}) => {
  const baseStyle = {
    background: backgroundColor,
    border: `2px solid ${borderColor}`,
    borderRadius: '12px',
    padding: '16px',
    minWidth: '200px',
    width: width,
    height: height,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    transition: 'all 0.2s ease-in-out',
    ...style
  };

  const titleStyle = {
    color: titleColor,
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '12px',
    textAlign: 'center',
    borderBottom: `1px solid ${borderColor}`,
    paddingBottom: '8px'
  };

  const handleInputChange = (field, value) => {
    if (onDataChange) {
      onDataChange({ ...data, [field]: value });
    }
  };

  return (
    <div className={`base-node ${className}`} style={baseStyle}>
      {/* Input Handles */}
      {inputs.map((input, index) => (
        <Handle
          key={`input-${index}`}
          type="target"
          position={Position.Left}
          id={input.id || `input-${index}`}
          style={{
            top: `${20 + (index * 25)}px`,
            background: input.color || '#6366f1',
            border: '2px solid #ffffff',
            width: '10px',
            height: '10px'
          }}
          title={input.label || `Input ${index + 1}`}
        />
      ))}

      {/* Node Content */}
      <div className="node-header" style={titleStyle}>
        {title}
      </div>
      
      <div className="node-content">
        {children}
      </div>

      {/* Output Handles */}
      {outputs.map((output, index) => (
        <Handle
          key={`output-${index}`}
          type="source"
          position={Position.Right}
          id={output.id || `output-${index}`}
          style={{
            top: `${20 + (index * 25)}px`,
            background: output.color || '#10b981',
            border: '2px solid #ffffff',
            width: '10px',
            height: '10px'
          }}
          title={output.label || `Output ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default BaseNode;