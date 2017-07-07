const GraphParser = require('./parser');
const sumPathWeights = require('./graph').sumPathWeights;

const NO_ROUTE_MESSAGE = 'NO SUCH ROUTE';

function lowestWeightPathMessage(start, finish, graph) {
  const paths = graph.findAllPaths(start, finish);
  if(paths.length === 0) {
    return NO_ROUTE_MESSAGE;
  }

  const pathWeights = paths.map(sumPathWeights);
  return pathWeights.reduce((prev, cur) => cur < prev ? cur : prev , Number.MAX_SAFE_INTEGER);
}

function pathDistanceResult(path, graph) {
  const pathVertexes = graph.getPath(path);
  if(pathVertexes.length === 0) {
    return NO_ROUTE_MESSAGE;
  }

  return sumPathWeights(pathVertexes);
}

function output6Result(graph) {
  const paths = graph.findAllPaths('C', 'C', (path) => path.length > 4);
  return paths.length;
}

function output7Result(graph) {
  const paths = graph.findAllPaths('A', 'C', (path) => path.length > 5);
  return paths.filter(path => path.length === 5).length;
}

function output10Result(graph) {
  const paths = graph.findAllPaths('C', 'C', (path) => sumPathWeights(path) > 29);
  return paths.length;
}

if(process.argv.length < 3) {
  console.log("Usage: node " + __filename + " graph_file_path");
  return;
}

const graphParser = new GraphParser(process.argv[2]);

// const graphParser = new GraphParser('./input.txt'); // for debugging

graphParser.parse()
  .then((graph) => {
    console.log('Output #1: ' + pathDistanceResult(['A', 'B', 'C'], graph));
    console.log('Output #2: ' + pathDistanceResult(['A', 'D'], graph));
    console.log('Output #3: ' + pathDistanceResult(['A', 'D', 'C'], graph));
    console.log('Output #4: ' + pathDistanceResult(['A', 'E', 'B', 'C', 'D'], graph));
    console.log('Output #5: ' + pathDistanceResult(['A', 'E', 'D'], graph));
    console.log('Output #6: ' + output6Result(graph));
    console.log('Output #7: ' + output7Result(graph));
    console.log('Output #8: ' + lowestWeightPathMessage('A', 'C', graph));
    console.log('Output #9: ' + lowestWeightPathMessage('B', 'B', graph));
    console.log('Output #10: ' + output10Result(graph));
  })
  .catch((error) => console.error(error.message));






