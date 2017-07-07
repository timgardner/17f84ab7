const readTextFile = require('./fileUtils');
const Graph = require('./graph').Graph;

function GraphParser(graphFile) {
  this.graphFile = graphFile;
}

function parseEdge(line, graph) {
  const parts = line.trim().split(' ');

  if(parts.length !== 3) {
    throw new Error('Graph file line expected to be 3 values space separated. [vertex1 vertex2 weight]');
  }

  if(isNaN(parts[2])) {
    throw new Error('Weight expected to be a number: ' + line);
  }

  graph.addEdge(parts[0], parts[1], parseInt(parts[2]));
}


GraphParser.prototype.parse =  function() {
  return readTextFile(this.graphFile)
    .then(graphData => {
      const graph = new Graph();

      for(let line of graphData.split(/\r?\n/)) {
        parseEdge(line, graph);
      }

      return graph;
    });
}


module.exports = GraphParser;