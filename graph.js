function Graph() {
  this.graph = {};
}

Graph.prototype.addEdge = function(vertex, neighbour, weight = 0) {
  if(!(vertex in this.graph)) {
    this.graph[vertex] = {};
  }

  this.graph[vertex][neighbour] = weight;
}

Graph.prototype.getEdge = function(vertex, neighbour) {
  if(!(vertex in this.graph)) {
    return -1;
  }
  return this.graph[vertex][neighbour] || -1;
}

Graph.prototype.getPath = function(path) {
  const pathVertexes = [{vertex: path[0], weight: 0}];
  
  for(let i = 1; i < path.length; i++) {
    const edgeWeight = this.getEdge(path[i - 1], path[i]);
    if(edgeWeight === -1) {
      return [];
    }

    pathVertexes.push({vertex: path[i], weight: edgeWeight});
  }

  return pathVertexes;
}

Graph.prototype.findAllPaths = function(start, finish, limitFn) {
  const paths = [];
  const currentPath = [{vertex: start, weight: 0}];
  
  if(limitFn) {
    for(let adjacent in this.graph[start]) {
      findPathsWithLimit(this.graph, adjacent, finish, paths, currentPath, limitFn);
    }
  } else {
    const visited = {};
    for(let adjacent in this.graph[start]) {
      findPathsWithoutCycle(this.graph, adjacent, finish, paths, currentPath, visited);
    }
  }
  return paths;
}

function findPathsWithLimit(graph, start, finish, paths, currentPath, limitFn) {
  const weight = graph[currentPath[currentPath.length - 1].vertex][start];
  currentPath.push({vertex: start, weight});
  
  if(limitFn(currentPath)) {
    currentPath.pop();
    return;
  }

  if(start === finish) {
    paths.push(currentPath.slice());
  }

  for(let adjacent in graph[start]) {
    findPathsWithLimit(graph, adjacent, finish, paths, currentPath, limitFn);
  }

  currentPath.pop();
}

function findPathsWithoutCycle(graph, start, finish, paths, currentPath, visited) {
  const weight = graph[currentPath[currentPath.length - 1].vertex][start];
  currentPath.push({vertex: start, weight});
  
  visited[start] = true;
  
  if(start === finish) {
    paths.push(currentPath.slice());
  } else {
    for(let adjacent in graph[start]) {
      if(!(adjacent in visited)) {
        findPathsWithoutCycle(graph, adjacent, finish, paths, currentPath, visited);
      }
    }
  }

  currentPath.pop();
  delete visited[start];
}

Graph.prototype.toJSON = function() {
  return JSON.stringify(this.graph);
}

// Util functions
function sumPathWeights(path) {
  return path.reduce((acc, cur) => acc + cur.weight, 0);
}

module.exports = {
  Graph,
  sumPathWeights
}