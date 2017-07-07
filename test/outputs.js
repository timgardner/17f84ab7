const assert = require('assert');

const Graph = require('../graph').Graph;
const sumPathWeights = require('../graph').sumPathWeights;

const graph = new Graph();
graph.addEdge('A', 'B', 5);
graph.addEdge('B', 'C', 4);
graph.addEdge('C', 'D', 8);
graph.addEdge('D', 'C', 8);
graph.addEdge('D', 'E', 6);
graph.addEdge('A', 'D', 5);
graph.addEdge('C', 'E', 2);
graph.addEdge('E', 'B', 3);
graph.addEdge('A', 'E', 7);


describe('Expected outputs', () => {
  it('output 1', () => {
    const path = graph.getPath(['A', 'B', 'C']);
    assert.equal(path.length, 3);
    assert.equal(sumPathWeights(path), 9);
  });
  it('output 2', () => {
    const path = graph.getPath(['A', 'D']);
    assert.equal(path.length, 2);
    assert.equal(sumPathWeights(path), 5);
  });
  it('output 3', () => {
    const path = graph.getPath(['A', 'D', 'C']);
    assert.equal(path.length, 3);
    assert.equal(sumPathWeights(path), 13);
  });
  it('output 4', () => {
    const path = graph.getPath(['A', 'E', 'B', 'C', 'D']);
    assert.equal(path.length, 5);
    assert.equal(sumPathWeights(path), 22);
  });
  it('output 5', () => {
    const path = graph.getPath(['A', 'E', 'D']);
    assert.equal(path.length, 0);
  });
  it('output 6', () => {
    const paths = graph.findAllPaths('C', 'C', (path) => path.length > 4);
    assert.equal(paths.length, 2);
  });
  it('output 7', () => {
    const paths = graph.findAllPaths('A', 'C', (path) => path.length > 5);
    assert.equal(paths.filter(path => path.length === 5).length, 3);
  });
  it('output 8', () => {
    const paths = graph.findAllPaths('A', 'C');
    const pathWeights = paths.map(sumPathWeights);
    const shortest = pathWeights.reduce((prev, cur) => cur < prev ? cur : prev , Number.MAX_SAFE_INTEGER);
    assert.equal(shortest, 9);
  });
  it('output 9', () => {
    const paths = graph.findAllPaths('B', 'B');
    const pathWeights = paths.map(sumPathWeights);
    const shortest = pathWeights.reduce((prev, cur) => cur < prev ? cur : prev , Number.MAX_SAFE_INTEGER);
    assert.equal(shortest, 9);
  });
  it('output 10', () => {
    const paths = graph.findAllPaths('C', 'C', (path) => sumPathWeights(path) > 29);
    assert.equal(paths.length, 7);
  });
});