// 核验脚本:1) 概念词频统计 2) 拟引用文逐字核验(正文区 = '## 引用列表' 之前)
const fs = require('fs');
const text = fs.readFileSync('distill-analysis/article.md', 'utf8');
const body = text.slice(0, text.indexOf('## 引用列表'));

const count = (re) => (body.match(re) || []).length;
console.log('== 概念重述次数(正文区,含图注,不含参考文献) ==');
console.log('embeddin(g/s):', count(/embeddin/gi));
console.log('message pass(ing):', count(/message pass/gi));
console.log('aggregat(e/ion/ed/ing):', count(/aggregat/gi));
console.log('pool(/ing/ed, 含 pooling):', count(/pool/gi));
console.log('gather:', count(/gather/gi));
console.log('update:', count(/updat/gi));

const quotes = [
  ['Q01', "We explore the components needed for building a graph neural network - and motivate the design choices behind them."],
  ['Q02', "We move gradually from a bare-bones implementation to a state-of-the-art GNN model."],
  ['Q03', "Fourth and finally, we provide a GNN playground where you can play around with a real-word task and dataset to build a stronger intuition of how each component of a GNN model contributes to the predictions it makes."],
  ['Q04', "Graphs are very flexible data structures, and if this seems abstract now, we will make it concrete with examples in the next section."],
  ['Q05', "You\u2019re probably already familiar with some types of graph data, such as social networks."],
  ['Q06', "we will show two types of data that you might not think could be modeled as graphs: images and text."],
  ['Q07', "Of course, in practice, this is not usually how text and images are encoded: these graph representations are redundant since all images and all text will have very regular structures."],
  ['Q08', "This is analogous to image classification problems with MNIST and CIFAR, where we want to associate a label to an entire image."],
  ['Q09', "Following the image analogy, node-level prediction problems are analogous to *image segmentation*, where we are trying to label the role of each pixel in an image."],
  ['Q10', "The first three are relatively straightforward: for example, with nodes we can form a node feature matrix $N$ by assigning each node an index $i$ and storing the feature for $node_i$ in $N$."],
  ['Q11', "However, representing a graph\u2019s connectivity is more complicated."],
  ['Q12', "Learning permutation invariant operations is an area of recent research."],
  ['Q13', "Another way of stating this is with Big-O notation, it is preferable to have $O(n_{edges})$, rather than $O(n_{nodes}^2)$."],
  ['Q14', "It should be noted that the figure uses scalar values per node/edge/global, but most practical tensor representations have vectors per graph attribute."],
  ['Q15', "A GNN is an optimizable transformation on all attributes of the graph (nodes, edges, global-context) that preserves graph symmetries (permutation invariances)."],
  ['Q16', "We will start with the simplest GNN architecture, one where we learn new embeddings for all graph attributes (nodes, edges, global), but where we do not yet use the connectivity of the graph."],
  ['Q17', "For simplicity, the previous diagrams used scalars to represent graph attributes; in practice feature vectors, or embeddings, are much more useful."],
  ['Q18', "You could also call it a GNN block. Because it contains multiple operations/layers (like a ResNet block)."],
  ['Q19', "However, it is not always so simple. For instance, you might have information in the graph stored in edges, but no information in nodes, but still need to make predictions on nodes."],
  ['Q20', "For each item to be pooled, *gather* each of their embeddings and concatenate them into a matrix."],
  ['Q21', "For a more in-depth discussion on aggregation operations go to the Comparing aggregation operations section."],
  ['Q22', "Note that in this simplest GNN formulation, we\u2019re not using the connectivity of the graph at all inside the GNN layer. Each node is processed independently, as is each edge, as well as the global context."],
  ['Q23', "We could make more sophisticated predictions by using pooling within the GNN layer, in order to make our learned embeddings aware of graph connectivity."],
  ['Q24', "Message passing works in three steps:"],
  ['Q25', "You could also 1) gather messages, 3) update them and 2) aggregate them and still have a permutation invariant operation."],
  ['Q26', "This is reminiscent of standard convolution: in essence, message passing and convolution are operations to aggregate and process the information of an element\u2019s neighbors in order to update the element\u2019s value."],
  ['Q27', "By stacking message passing GNN layers together, a node can eventually incorporate information from across the entire graph: after three layers, a node has information about the nodes three steps away from it."],
  ['Q28', "Which graph attributes we update and in which order we update them is one design decision when constructing GNNs."],
  ['Q29', "nodes that are far away from each other in the graph may never be able to efficiently transfer information to one another, even if we apply message passing several times."],
  ['Q30', "Play around with different model architectures to build your intuition. For example, see if you can edit the molecule on the left to make the model prediction increase."],
  ['Q31', "Edit the molecule to see how the prediction changes, or change the model params to load a different model. Select a different molecule in the scatter plot."],
  ['Q32', "When exploring the architecture choices above, you might have found some models have better performance than others."],
  ['Q33', "The previous explorations have given mixed messages."],
  ['Q34', "Fortunately, the message passing framework is flexible enough that often adapting GNNs to more complex graph structures is about defining how information is passed and updated by new graph attributes."],
  ['Q35', "Hover over a node in the diagram below to see how it accumulates information from nodes around it through the layers of the network."],
  ['Q36', "We\u2019ve described a wide range of GNN components here, but how do they actually differ in practice?"],
  ['Q37', "Do the same edits have the same effects for different model architectures?"],
  ['Q38', "Next, we have a few sections on a myriad of graph-related topics that are relevant for GNNs."],
  ['Q39', "We can do this by *pooling*."],
  ['Q40', "We represent the *pooling* operation by the letter $\\rho$"],
  ['Q41', "There is one flaw with the networks we have described so far"],
  ['Q42', "As the story goes, a feud between Mr. Hi (Instructor) and John H (Administrator) creates a schism in the karate club."],
  ['Q43', "Note that each of these three representations below are different views of the same piece of data."],
  ['Q44', "The design space for our GNN has many levers that can customize the model:"],
  ['Q45', "This pooling technique will serve as a building block for constructing more sophisticated GNN models."],
  ['Q46', "You could also call it a GNN block."],
];

console.log('\n== 逐字核验(是否为 article.md 正文的连续子串) ==');
let fail = 0;
for (const [id, q] of quotes) {
  const ok = body.includes(q);
  if (!ok) fail++;
  console.log(id, ok ? 'PASS' : 'FAIL', '|', q.slice(0, 70));
}
console.log('\nFAILED:', fail);
if (fail) process.exitCode = 1;
