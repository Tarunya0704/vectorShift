from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
from collections import defaultdict, deque

app = FastAPI()

# Add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for request data
class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: Dict[str, Any]

class Edge(BaseModel):
    id: str
    source: str
    target: str
    type: str = None
    animated: bool = None
    markerEnd: Dict[str, Any] = None

class PipelineData(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    """
    Check if the graph formed by nodes and edges is a Directed Acyclic Graph (DAG)
    Uses Kahn's algorithm for topological sorting
    """
    # Create adjacency list and in-degree count
    graph = defaultdict(list)
    in_degree = defaultdict(int)
    
    # Initialize all nodes with in-degree 0
    for node in nodes:
        in_degree[node.id] = 0
    
    # Build graph and calculate in-degrees
    for edge in edges:
        graph[edge.source].append(edge.target)
        in_degree[edge.target] += 1
    
    # Find all nodes with in-degree 0
    queue = deque([node_id for node_id in in_degree if in_degree[node_id] == 0])
    processed_count = 0
    
    # Process nodes with in-degree 0
    while queue:
        current = queue.popleft()
        processed_count += 1
        
        # Reduce in-degree of adjacent nodes
        for neighbor in graph[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # If we processed all nodes, it's a DAG
    return processed_count == len(nodes)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline_data: PipelineData):
    """
    Parse the pipeline data and return analysis results
    """
    nodes = pipeline_data.nodes
    edges = pipeline_data.edges
    
    # Calculate number of nodes and edges
    num_nodes = len(nodes)
    num_edges = len(edges)
    
    # Check if the graph is a DAG
    is_dag_result = is_dag(nodes, edges)
    
    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag_result
    }