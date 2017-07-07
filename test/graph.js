const assert = require('assert');

const Graph = require('../graph').Graph;

describe('Graph tests', () => {
  it('add edge', () => {
    const graph = new Graph();
    graph.addEdge('A', 'B', 1);
    
    assert.equal(graph.getEdge('A', 'B'), 1);
  });
  describe('getPath', () => {
    const graph = new Graph();
    graph.addEdge('A', 'B', 1);
    graph.addEdge('B', 'C', 2);

    it('path exists', () => {
      assert.equal(graph.getPath(['A', 'B', 'C']).length, 3);
    });
    
    it('path doesnt exist', () => {
      assert.equal(graph.getPath(['A', 'C']).length, 0);
    });
    
  });
  describe('findAllPaths', () => {
    const graph = new Graph();
    graph.addEdge('A', 'B', 1);
    graph.addEdge('B', 'C', 1);
    graph.addEdge('C', 'A', 1);

    it('finds paths without cycles', () => {
      const paths = graph.findAllPaths('A', 'A');
      assert.equal(paths.length, 1);
    });

    it('finds paths with limit', () => {
      const paths = graph.findAllPaths('A', 'A', (path) => path.length > 7);
      assert.equal(paths.length, 2);
    });
  });
})