import { useStore } from './store';

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nodes: nodes,
                    edges: edges
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            // Create user-friendly alert message
            const message = `Pipeline Analysis Results:
            
📊 Number of Nodes: ${data.num_nodes}
🔗 Number of Edges: ${data.num_edges}
${data.is_dag ? '✅' : '❌'} Is Valid DAG: ${data.is_dag ? 'Yes' : 'No'}

${data.is_dag ? 
    'Great! Your pipeline forms a valid Directed Acyclic Graph.' : 
    'Warning: Your pipeline contains cycles and is not a valid DAG.'}`;

            alert(message);
            
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert(`Error submitting pipeline: ${error.message}`);
        }
    };

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <button 
                type="submit" 
                onClick={handleSubmit}
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
            >
                Submit Pipeline
            </button>
        </div>
    );
}