// textNode.js - Replace existing text node in /frontend/src/nodes/
import React, { useState, useEffect, useRef } from 'react';
import BaseNode from '../components/BaseNode';

const TextNode = ({ id, data, onDataChange }) => {
  const [text, setText] = useState(data?.text || '');
  const [variables, setVariables] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 200, height: 100 });
  const textareaRef = useRef(null);

  // Extract variables from text using regex
  const extractVariables = (inputText) => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = [];
    let match;
    
    while ((match = regex.exec(inputText)) !== null) {
      const variableName = match[1].trim();
      if (!matches.some(v => v.name === variableName)) {
        matches.push({
          name: variableName,
          id: `${id}-${variableName}`,
          label: variableName
        });
      }
    }
    
    return matches;
  };

  // Auto-resize textarea
  const autoResize = () => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      
      // Reset height to recalculate
      textarea.style.height = 'auto';
      
      // Calculate new dimensions
      const newHeight = Math.max(100, textarea.scrollHeight + 20);
      const newWidth = Math.max(200, Math.min(400, textarea.value.length * 8 + 40));
      
      setDimensions({
        width: newWidth,
        height: newHeight
      });
    }
  };

  // Handle text change
  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    
    // Extract variables
    const newVariables = extractVariables(newText);
    setVariables(newVariables);
    
    // Auto-resize
    autoResize();
    
    // Update data
    if (onDataChange) {
      onDataChange({
        ...data,
        text: newText,
        variables: newVariables
      });
    }
  };

  // Initialize on mount
  useEffect(() => {
    const initialVariables = extractVariables(text);
    setVariables(initialVariables);
    autoResize();
  }, []);

  // Create input handles for variables
  const inputHandles = variables.map(variable => ({
    id: variable.id,
    label: variable.label,
    color: '#f59e0b'
  }));

  const outputHandles = [{
    id: 'text-output',
    label: 'Text Output',
    color: '#10b981'
  }];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      inputs={inputHandles}
      outputs={outputHandles}
      width={dimensions.width}
      height={dimensions.height}
      backgroundColor="#fef3c7"
      borderColor="#f59e0b"
      titleColor="#92400e"
      onDataChange={onDataChange}
    >
      <div className="text-node-content">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleTextChange}
          placeholder="Enter text here... Use {{variableName}} for variables"
          style={{
            width: '100%',
            minHeight: '60px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            padding: '8px',
            fontSize: '14px',
            fontFamily: 'inherit',
            resize: 'none',
            outline: 'none',
            backgroundColor: '#ffffff',
            lineHeight: '1.4'
          }}
          onInput={autoResize}
        />
        
        {variables.length > 0 && (
          <div style={{ 
            marginTop: '8px', 
            fontSize: '12px', 
            color: '#6b7280',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4px'
          }}>
            <span>Variables:</span>
            {variables.map(variable => (
              <span 
                key={variable.name}
                style={{
                  backgroundColor: '#fbbf24',
                  color: '#92400e',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '11px'
                }}
              >
                {variable.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </BaseNode>
  );
};

export default TextNode;