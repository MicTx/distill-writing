# 03 · 概念引入与术语管理

> 分析对象:`distill-analysis/article.md`《A Gentle Introduction to Graph Neural Networks》(Distill, 2021)。
> 本文档只做写作方法论分析,不总结文章内容。引文均为逐字复制(已用 `grep -F` 抽样核验),行号指向 article.md。
> 硬性口径:引文中的 `*斜体*` / `**粗体**` / `$数学$` / `[@引用]` 均为原文自带标记,原样保留。

---

## 哲学层

**1. 先制造对术语的需要,再给出术语 —— 每个新名词都是刚被提出的那个问题的答案。**
为什么:pooling、message passing、adjacency list、master node 的首现句无一例外出现在"我们缺一种方式来做 X"之后一句之内(:226、:273、:329、:396)。读者拿到名词的瞬间,手里已经握着等待这个名词的语境,术语因此不需要额外记忆成本。反向证据:文中找不到任何一个"先列术语表、后讲内容"的段落。

**2. 一支术语表,全文不换口径:首次出现时一次性收编全部别名并选定主用词,此后严格复用。**
为什么:别名只在首现句并列一次 —— "feature vectors, or embeddings"(:247)、"**master node** … or context vector"(:396)、"also called the *depth*"(:424),正文此后只用主词;全文以 (nodes, edges, global-context) 三元组当坐标系,GNN 的每一步创新都被表述为"在这三者之间新增一条信息通路"(:202、:241、:260、:396、:436)。概念加深靠语境换新,不靠换词。

**3. 抽象定义必须立刻兑换成双重锚点:一个本领域实例 + 一个读者已知领域的类比。**
为什么:三类任务(graph/node/edge-level)每个都走完"平行定义 → For example 分子或空手道俱乐部 → This is analogous to MNIST/图像分割/情感分析"的三段式(:153→:161→:167、:171→:173→:180);连 Global Average Pooling、Fourier space 这类类比端也被用来给新术语落点(:308、:591)。

**4. 数学符号是自然语言句子的重述,不是新知识:符号永远在完整口头程序之后到场,公式之后必接回译。**
为什么:邻接矩阵尺寸 $n_{nodes} \times n_{nodes}$ 出现在"We order the nodes… and fill a matrix"整句口头程序之后(:82);Big-O 被明说成"Another way of stating this"(:228);ρ 符号在 pooling 两步口头定义与交互图之后才绑定(:285);$AX$ 展开式后立刻回译成"essentially 'gathering' all node features"——用前文已建立的动词给公式贴标签(:598)。

**5. 主线只承载一条概念链,其余一切外置:命名争议、研究前沿、延伸话题全部交给引用附着、旁注段、章内指路句和支线章节。**
为什么:正文里没有超过一句话的文献讨论,每个"open research question"都是一句话+引用(:208、:535、:539);命名变体被隔离成独立旁注段(:251);"See more in …" 式指路句在 :102、:157、:283、:514 反复出现,最终由 "Into the Weeds" 整章收纳支线(:516-518)。

**6. 显式管理读者的认知预期:承认当下的抽象,并承诺何时何地具体化。**
为什么:作者直接写出读者的心理状态并给出兑现位置 —— "if this seems abstract now, we will make it concrete with examples in the next section"(:72);开篇四段路线图(First/Second/Third/Fourth,:49)预告了读者将依次获得哪些词汇能力。术语管理被当成预期管理来做,而非词汇表维护。

---

## 操作层

**技法 1|同位语定义法:术语永远挂在熟词后面。**
做法:三种同位载体 —— ① 括号命名:"neural networks that operate on graph data (called graph neural networks, or GNNs)"(:47);② 熟词+括注术语:"the relations (*edges*) between a collection of entities (*nodes*)"(:51);③ where 从句:"as a graph, where nodes are atoms and edges are covalent bonds"(:108)。主句永远是读者已懂的普通语汇,新术语在同位槽里零成本着陆。
迁移规则:任意主题写作中,每个新术语的首次出现必须嵌在一个全部由旧词构成的主句里;禁止用"X: 定义。"式词条句开局。

**技法 2|功能先行句式:"A way of [做 X] is through [术语]"。**
做法:术语以工具身份出场,句子的主语是读者想完成的动作:"A way of visualizing the connectivity of a graph is through its *adjacency matrix*"(:82);"One elegant and memory-efficient way of representing sparse matrices is as adjacency lists"(:226)—— 后者还顺带在句中给了评价形容词,完成"为什么选它"的说服。
迁移规则:引入任何方法/表示/机制时,先写一句"做 X 的一种方式是 Y",把工具名压到句尾;可加一个形容词位表达取舍理由。

**技法 3|问题→命名两连句:先造一个只有新概念能填的缺口。**
做法:"We need a way to collect information from edges and give them to nodes for prediction. We can do this by *pooling*"(:273);"We could make more sophisticated predictions by using pooling within the GNN layer… We can do this using *message passing*"(:329)。两句话,第一句制造需要,第二句交付名词。
迁移规则:每个新机制出现前,先写一句"We need a way to …"或一个设问(:595),下一句以"We can do this by X"收口;没有缺口就不引入名词。

**技法 4|命名即拆解:术语引入后立即给编号步骤。**
做法:"Pooling proceeds in two steps:"(:273)接两条列表;"Message passing works in three steps:"(:331)接三条列表;步骤内的关键动词各自斜体首现 —— *gather*(:277)、*aggregated*(:281)、*update function*(:343)。术语的定义被直接写成分解动作。
迁移规则:任何可分解的概念,首段后紧跟"X proceeds/works in N steps:"+编号列表,并把每个步骤的新动词斜体;不可分解的概念才允许停留在一句话定义。

**技法 5|三级标记纪律:斜体=首次定义性出现,粗体=全文唯一总定义,复现=无标记。**
做法:*graph*、*edges*、*nodes*、*adjacency matrix*、*pooling*、*message passing* 等只在首现句斜体,复现处全部裸用;全文唯一一处粗体定义给了 GNN 本身(:241),另一处粗体 **master node**(:396)标记的是带引用归属的命名变体。标记系统本身在教读者"这是不是新词"。
迁移规则:为全文设定三级术语标记(首现斜体/总定义粗体/复现裸用)并全程执行;粗体定义句每篇至多一两个,留给最核心的锚概念。

**技法 6|括号回译消歧:"(that is to say, …)"。**
做法:最抽象的词 permutation invariant 首现时被裹在括号里,作为前一句自然语言的改写:"there is no guarantee that these different matrices would produce the same result in a deep neural network (that is to say, they are not permutation invariant)"(:206)。同理 "(called …)"、"(or your favorite differentiable model)"、"(as opposed to the fixed neighborhood size of images and text)"(:106)。
迁移规则:每个可能被误读的抽象词,首现时配一个括号改写或对比;括号内容删掉后句子必须仍然完整。

**技法 7|别名一次性收编:首现句列全所有叫法,之后锁死主词。**
做法:"feature vectors, or embeddings"(:247)、"a **master node** … or context vector"(:396)、"The number of GNN layers, also called the *depth*"(:424)。此后全文只用 embedding、global/master node 语族、depth,不再翻案。
迁移规则:动笔前建同义词表;每术语的首现句负责把全部别名并列展示,并让句法结构(逗号+or / also called)暗示哪个是主词。

**技法 8|引用即命名出处:文献标记附着在术语上,不写归属从句。**
做法:"*message passing*[@Gilmer2017-no]"(:329)、"**master node** [@Battaglia2018-pi][@Gilmer2017-no]"(:396)、"*multigraphs*[@Harary1969-qo]"(:524)。命名权直接用方括号还给原作者,主线零打断。
迁移规则:术语首创者用 [@cite] 贴在词后,不用"某某等人提出了 X"的从句;一条研究现状最多一句+:208 式的引用堆。

**技法 9|三重锚点:定义 → "For example" → "This is analogous to"。**
做法:graph-level task 先抽象定义(:161 首句),再"For example, for a molecule…"(:161),再"This is analogous to image classification problems with MNIST and CIFAR"(:167);node-level 依同构走完 :171→:173→:180。
迁移规则:每个抽象分类项都按"定义句 / 本领域一例 / 读者旧世界一例"三拍展开;类比端选读者必然熟悉的对象(MNIST、CNN、词性标注)。

**技法 10|用类比端引入"读者其实已识"的术语并顺势斜体。**
做法:"node-level prediction problems are analogous to *image segmentation*"(:180)—— image segmentation 对目标读者不是新知识,但斜体提示"它在本文术语体系里被征用";"This is similar to *Global Average Pooling* layers in CNNs"(:308)同理。
迁移规则:当新概念在读者旧领域有现成对应物,直接用类比句引入该对应物并斜体,省掉一次从零定义。

**技法 11|抽象→具体的显式契约。**
做法:"Graphs are very flexible data structures, and if this seems abstract now, we will make it concrete with examples in the next section"(:72)。承认抽象、给出兑现位置,把读者的不适转为预期。
迁移规则:每段高密度抽象叙述的末尾,放一句"若此刻觉得抽象,第 X 节将以实例落实";只承诺立刻兑现的内容。

**技法 12|数学符号延迟绑定:先完整口头程序,再"We represent … by the letter"。**
做法:邻接矩阵先有"We order the nodes… and fill a matrix"的完整叙事,符号 $n_{nodes} \times n_{nodes}$ 才出现在句中(:82);ρ 的引入句本身同时重述含义:"We represent the *pooling* operation by the letter $\rho$, and denote that we are gathering information from edges to nodes as $p_{E_n \to V_{n}}$"(:285);Big-O 干脆被定义为复述:"Another way of stating this is with Big-O notation"(:228)。
迁移规则:每个符号入场前,必须已存在一个不含该符号的完整句子表述同一件事;符号引入句采用"我们把 X 记作符号 Y,它表示 [重述]"双段结构。

**技法 13|公式后强制回译:用已建立的动词加引号重述公式含义。**
做法:矩阵乘法一节是全文公式最密处,但每段公式后必接英语:$AX$ 展开后接"the inner product is essentially 'gathering' all node features values"(:598,"gathering"加引号回指技法 4 建立的动词);随后一句边界声明"It should be noted that this message passing is not updating the representation of the node features, just pooling neighboring node features"(:598);$A^2$ 之后接"The intuition is that the first term … is only positive under two conditions"(:602)。符号升级也用口语包裹:"Instead of a node tensor of size $[n_{nodes}]$ we will be dealing with node tensors of size $[n_{nodes}, node_{dim}]$"(:237)。
迁移规则:任何公式段落的收尾句必须是自然语言,且动词从本文已定义的词汇表中取;公式讲完"是什么"之后,再补一句"它不是什么"。

**技法 14|平行排比定义族:同族概念用同构句式逐个定义。**
做法:"In a graph-level task, we predict a single property for a whole graph. For a node-level task, we predict some property for each node in a graph. For an edge-level task, we want to predict the property or presence of edges in a graph."(:153,三句完全同构)。收尾用极简主语句:"The remaining prediction problem in graphs is *edge prediction*"(:184)。
迁移规则:凡引入 N 元分类,用同一句型写 N 个定义,只换槽位词;最后一个成员可用"剩下的那类是 X"一句带过,结构本身教结构。

**技法 15|新旧焊接句:每个新概念至少一次被叙述为旧概念的变体。**
做法:"in essence, message passing and convolution are operations to aggregate and process the information of an element's neighbors"(:359);"Another way to see GCN … is as a neural network that operates on learned embeddings of subgraphs of size k"(:576);"edge predictions and node predictions … often reduce to the same problem"(:589);"transformers can be viewed as GNNs with an attention mechanism"(:615)。
迁移规则:给每个新概念安排至少一个"X 就是 Y 的另一种说法/另一种看法"句式("Another way to see X is as Y"、"X and Y are operations to …"),把它焊进读者已有概念网。

**技法 16|例后命名:概括性范畴先给足例子再命名。**
做法:inductive biases 不先定义,而是先讲图像平移不变、文本顺序、'not' 与注意力三个领域的故事,然后才收拢:"These are some examples of inductive biases, where we are identifying symmetries or regularities in the data and adding modelling components that take advantage of these properties"(:555)。
迁移规则:当术语是"从多个实例中归纳出的范畴词"时,倒置定义顺序 —— 至少三个跨领域例子之后,用"These are some examples of X, where …"命名并顺势给出定义。

**技法 17|命名变体降级为独立旁注段。**
做法:"You could also call it a GNN block. Because it contains multiple operations/layers (like a ResNet block)."(:251)单独成段,不进正文论证链;正文主词"GNN layer"在上一段已经交付。
迁移规则:关于"这东西还能叫什么"的讨论一律不进主句;写成一到两句的旁注段(或脚注),并顺手给出叫法背后的理由。

**技法 18|支线外链句式:"For a more in-depth discussion … go to the X section"。**
做法::283"For a more in-depth discussion on aggregation operations go to the Comparing aggregation operations section.";同型还有 :102"See more in Graph Attention Networks."、:157"More topics can be found in the Into the weeds section."、:514" See more in Other types of graphs.";multigraph/hypergraph/hypergraph 等术语干脆整体住进支线章(:524-528)。
迁移规则:主线每碰到一个"值得讲但此刻不能讲"的分支,写一句指路(章节名精确可点),内容移入文末支线章或脚注;主线段落因此永不超载。

**技法 19|术语复现的角色递进:规划每个核心词多次出场,每次加一层。**
做法:permutation invariant 的出场序列 —— 问题(:206"they are not permutation invariant")→ 研究指针(:208)→ 定义中的设计目标(:241"preserves graph symmetries (permutation invariances)")→ 操作性质(:345)→ 定义句回声(:557)→ 聚合函数约束(:561、:563)→ 注意力场景的保持性论证(:608)。pooling 依序是:解法(:273)→ 外链(:283)→ CNN 类比(:308)→ building block 地位升级(:323)→ 移入层内(:329)→ 整节深化聚合算子(:559-572)。词形几乎不变,承担的角色逐次加深。
迁移规则:为每个核心术语列出 3-7 次出场计划,每次绑定一个新语境(问题→定义→约束→性质→极限);除词性变化外禁止换同义词。

**技法 20|操作性定义日常词:连非技术标签也给可检验定义。**
做法:"We say a molecule has a 'pungent' scent if it has a strong, striking smell"(:416);"These 'graph embeddings' are the outputs of the GNN model right before prediction"(:438)。连"气味标签"和日常化的引号词都被定义成可操作判据。
迁移规则:任何将影响读者理解的标签词(哪怕来自日常生活),首现后给"We say X if …"式判据或"X 就是 Y 的输出/结果"式定位。

---

## 逐字证据

### A. 术语首现登记表(按文中顺序)

| # | 术语 | 首现位置 | 首现句式模式 | 对应技法 |
|---|------|----------|--------------|----------|
| 1 | *graph* | 引言 :47 | 描述句在前,术语斜体殿后 | 技法 1 |
| 2 | graph neural networks, or GNNs | 引言 :47 | 括号命名+缩写一次建立 | 技法 1 |
| 3 | *edges* / *nodes* | 引言 :51 | 熟词(relations/entities)+括注斜体术语 | 技法 1 |
| 4 | (图上存信息→attributes) | :58→:202/:237 | 概念先以功能句存在,标签滞后百行 | 技法 3 |
| 5 | *directed, undirected* | :65 | 动作句+斜体形容词对 | 技法 5 |
| 6 | *adjacency matrix* | :82 | "A way of visualizing X is through Y" | 技法 2 |
| 7 | graph-/node-/edge-level | :151-153 | 三句同构排比定义 | 技法 14 |
| 8 | *image segmentation*(类比征用) | :180 | "analogous to *X*, where …" | 技法 10 |
| 9 | *edge prediction* | :184 | 极简主语句收尾分类族 | 技法 14 |
| 10 | permutation invariant | :206 | 括号回译"(that is to say, …)" | 技法 6 |
| 11 | adjacency lists | :226 | "One [评价] way of … is as X" | 技法 2 |
| 12 | Big-O / $O(\cdot)$ | :228 | "Another way of stating this" | 技法 12 |
| 13 | GNN 正式定义 | :241 | 全文唯一粗体定义句 | 技法 5 |
| 14 | "graph-in, graph-out" | :241 | 引号造词+"meaning that"展开 | 技法 1 |
| 15 | embeddings | :138 裸用→:247 收编 | 同位语"feature vectors, or embeddings" | 技法 7 |
| 16 | MLP | :249 | 括号缩写+(or your favorite …)随口别名 | 技法 6 |
| 17 | GNN layer / GNN block | :249/:251 | 命名句"we call this"+旁注段别名 | 技法 17 |
| 18 | *pooling* | :273 | 问题先行"We can do this by *pooling*" | 技法 3 |
| 19 | *gather* / *aggregated* | :277/:281 | 编号步骤内斜体动词 | 技法 4 |
| 20 | 符号 $\rho$、$p_{E_n \to V_{n}}$ | :285 | "We represent … by the letter"+重述 | 技法 12 |
| 21 | *message passing* | :329 | 缺口句+引用附着+where 从句 | 技法 3/8 |
| 22 | *update function* | :343 | 步骤列表内斜体+通称补语 | 技法 4 |
| 23 | **master node**/context vector | :396 | "sometimes called **X** or Y"+引用 | 技法 7/8 |
| 24 | *depth* | :424 | "also called the *depth*" | 技法 7 |
| 25 | 'graph embeddings' | :438 | 引号词+操作性定位句 | 技法 20 |
| 26 | inductive biases | :555 | 三例之后"These are some examples of X" | 技法 16 |
| 27 | multigraphs/hypernode/hypergraph | :524-528 | 整体住进支线章 Into the Weeds | 技法 18 |
| 28 | $G$'s dual | :589→:591 | 概念对偶句先行,构造句随后 | 技法 15 |
| 29 | Graph Attention Networks (GAT) | :608 | "This concept is the basis of X (ABBR)" | 技法 1 |

登记表可见首现句式的分布:同位语类(技法 1)承担了绝大多数命名,功能句式(技法 2/3)承担全部机制类术语,形式定义(粗体)全文仅一次。术语与铺垫的比例:除 GNN 定义句外,没有任何术语的首现段落超过三句铺垫;铺垫通常恰好一句(缺口句或功能句)。

### B. 句式类引文(每条 ≤40 词,均已逐字核验)

1. > "A set of objects, and the connections between them, are naturally expressed as a *graph*." —— 引言(:47)—— 示范技法 1/5:主句全是普通语汇,术语斜体殿后。
2. > "Researchers have developed neural networks that operate on graph data (called graph neural networks, or GNNs) for over a decade[@Scarselli2009-ku]." —— 引言(:47)—— 示范技法 1:括号命名+缩写,删去括号句子仍完整。
3. > "A graph represents the relations (*edges*) between a collection of entities (*nodes*)." —— 引言·什么是图(:51)—— 示范技法 1:全文核心定义用"熟词+括注术语"完成,而非"X is defined as"。
4. > "We can additionally specialize graphs by associating directionality to edges (*directed, undirected*)." —— 引言(:65)—— 示范技法 5:一对形容词作为术语斜体首现。
5. > "A way of visualizing the connectivity of a graph is through its *adjacency matrix*." —— Images as graphs(:82)—— 示范技法 2:功能先行,工具名压在句尾。
6. > "We order the nodes, in this case each of 25 pixels in a simple 5x5 image of a smiley face, and fill a matrix of $n_{nodes} \times n_{nodes}$ with an entry if two nodes share an edge." —— Images as graphs(:82)—— 示范技法 12:符号之前已有完整口头程序,且实例(5x5 笑脸)嵌在符号句里。
7. > "This creates a simple directed graph, where each character or index is a node and is connected via an edge to the node that follows it." —— Text as graphs(:92)—— 示范技法 1:where 从句即定义。
8. > "It’s a very convenient and common abstraction to describe this 3D object as a graph, where nodes are atoms and edges are covalent bonds." —— Molecules as graphs(:108)—— 示范技法 1/9:where 从句完成旧域到图词汇的整句映射。
9. > "We can build a graph representing groups of people by modelling individuals as nodes, and their relationships as edges." —— Social networks as graphs(:122)—— 示范技法 1:无 where 的平行映射句式,保持"建模动作+节点/边落位"结构。
10. > "In a graph-level task, we predict a single property for a whole graph. For a node-level task, we predict some property for each node in a graph." —— 三类任务(:153,第三句同构)—— 示范技法 14:三连排比,槽位词以外零变化。
11. > "This is analogous to image classification problems with MNIST and CIFAR, where we want to associate a label to an entire image." —— Graph-level task(:167)—— 示范技法 9:跨域类比锚点,where 从句再解一次类比端。
12. > "Following the image analogy, node-level prediction problems are analogous to *image segmentation*, where we are trying to label the role of each pixel in an image." —— Node-level task(:180)—— 示范技法 10:用类比引入读者已识术语并斜体征用。
13. > "The remaining prediction problem in graphs is *edge prediction*." —— Edge-level task(:184)—— 示范技法 14:分类族收尾的极简主语句。
14. > "there is no guarantee that these different matrices would produce the same result in a deep neural network (that is to say, they are not permutation invariant)." —— Challenges(:206)—— 示范技法 6:最抽象的词被放进括号,作为前句的自然语言改写。
15. > "One elegant and memory-efficient way of representing sparse matrices is as adjacency lists." —— Challenges(:226)—— 示范技法 2:评价形容词内嵌,功能句式完成选型说服。
16. > "Another way of stating this is with Big-O notation, it is preferable to have $O(n_{edges})$, rather than $O(n_{nodes}^2)$." —— Challenges(:228)—— 示范技法 12:符号被明说成"同一句话的另一种说法"。
17. > "Instead of a node tensor of size $[n_{nodes}]$ we will be dealing with node tensors of size $[n_{nodes}, node_{dim}]$." —— Challenges(:237)—— 示范技法 13:符号升级包在"Instead of … we will be dealing with …"口语框架里。
18. > "**A GNN is an optimizable transformation on all attributes of the graph (nodes, edges, global-context) that preserves graph symmetries (permutation invariances).**" —— Graph Neural Networks(:241)—— 示范技法 5:全文唯一粗体总定义,一句收拢前文全部术语。
19. > "GNNs adopt a “graph-in, graph-out” architecture meaning that these model types accept a graph as input, with information loaded into its nodes, edges and global-context, and progressively transform these embeddings, without changing the connectivity of the input graph." —— Graph Neural Networks(:241)—— 示范技法 1:引号造词+"meaning that"长句展开。
20. > "For simplicity, the previous diagrams used scalars to represent graph attributes; in practice feature vectors, or embeddings, are much more useful." —— The simplest GNN(:247)—— 示范技法 7:同位语一次性收编别名。
21. > "This GNN uses a separate multilayer perceptron (MLP) (or your favorite differentiable model) on each component of a graph; we call this a GNN layer." —— The simplest GNN(:249)—— 示范技法 1/6:双层括号(缩写+随口别名)+命名句"we call this"。
22. > "We need a way to collect information from edges and give them to nodes for prediction. We can do this by *pooling*." —— GNN Predictions by Pooling Information(:273)—— 示范技法 3:问题→命名两连句的标准形。
23. > "Pooling proceeds in two steps:" —— 同上(:273)—— 示范技法 4:命名后立即结构化拆解。
24. > "For each item to be pooled, *gather* each of their embeddings and concatenate them into a matrix." —— 同上(:277)—— 示范技法 4:步骤动词斜体首现。
25. > "The gathered embeddings are then *aggregated*, usually via a sum operation." —— 同上(:281)—— 示范技法 4:被动式步骤+通称补语("usually via a sum")。
26. > "We represent the *pooling* operation by the letter $\rho$, and denote that we are gathering information from edges to nodes as $p_{E_n \to V_{n}}$." —— 同上(:285)—— 示范技法 12:符号在口头定义与交互图之后才绑定,绑定句内重述语义。
27. > "We can do this using *message passing*[@Gilmer2017-no], where neighboring nodes or edges exchange information and influence each other’s updated embeddings." —— Passing messages(:329)—— 示范技法 3/8/1:缺口句+引用附着+where 定义,三合一。
28. > "Message passing works in three steps:" —— 同上(:331)—— 示范技法 4:与 pooling 完全同构的拆解句式,建立术语家族的家族相貌。
29. > "in essence, message passing and convolution are operations to aggregate and process the information of an element's neighbors in order to update the element's value." —— 同上(:359)—— 示范技法 15:新概念被叙述为读者旧概念(卷积)的同族操作。
30. > "One solution to this problem is by using the global representation of a graph (U) which is sometimes called a **master node** [@Battaglia2018-pi][@Gilmer2017-no] or context vector." —— Adding global representations(:396)—— 示范技法 7/8:别名并列+命名出处引用附着。
31. > "We say a molecule has a “pungent” scent if it has a strong, striking smell." —— GNN playground(:416)—— 示范技法 20:日常标签的操作性定义。
32. > "The number of GNN layers, also called the *depth*." —— GNN playground(:424)—— 示范技法 7:"also called"式别名收编,列表项内完成。
33. > "These are some examples of inductive biases, where we are identifying symmetries or regularities in the data and adding modelling components that take advantage of these properties." —— Inductive biases(:555)—— 示范技法 16:三例之后的例后命名,where 从句顺势给出定义。
34. > "Another way to see GCN (and MPNN) of k-layers with a 1-degree neighbor lookup is as a neural network that operates on learned embeddings of subgraphs of size k." —— GCN as subgraph function approximators(:576)—— 示范技法 15:"Another way to see X is as Y"重概念化。
35. > "One thing to note is that edge predictions and node predictions, while seemingly different, often reduce to the same problem: an edge prediction task on a graph $G$ can be phrased as a node-level prediction on $G$’s dual." —— Edges and the Graph Dual(:589)—— 示范技法 15:新概念(dual)以"两问题同构"的统一句引入。

### C. 结构与策略类引文(补充)

36. > "To further describe each node, edge or the entire graph, we can store information in each of these pieces of the graph." —— 引言(:58)—— 示范技法 3 的前置形态:attribute 概念先以功能存在,术语标签滞后到 :202/:237 才出现。
37. > "Graphs are very flexible data structures, and if this seems abstract now, we will make it concrete with examples in the next section." —— 引言末(:72)—— 示范技法 11:抽象→具体的显式契约,兼作章节过渡。
38. > "Additionally, we can add information about each paper into each node, such as a word embedding of the abstract." —— Citation networks(:138)—— 示范技法 7 的例外管理:embedding 在正式定义(:247)前约 110 行先"裸用"一次,埋下词汇伏笔而不解释。
39. > "For example, for a molecule represented as a graph, we might want to predict what the molecule smells like, or whether it will bind to a receptor implicated in a disease." —— Graph-level task(:161)—— 示范技法 9:三重锚点的第二拍(本领域实例),感官细节(smell)降低理解门槛。
40. > "You could also call it a GNN block. Because it contains multiple operations/layers (like a ResNet block)." —— The simplest GNN(:251)—— 示范技法 17:命名变体被隔离成独立旁注段。
41. > "For a more in-depth discussion on aggregation operations go to the Comparing aggregation operations section." —— Pooling(:283)—— 示范技法 18:支线指路句,主线即刻回到概念链。
42. > "We’ve talked a lot about graph convolutions and message passing, and of course, this raises the question of how do we implement these operations in practice?" —— Matrix multiplications(:595)—— 示范技法 3 变体:全文最数学的一节以设问开场,先造需要再上公式。
43. > "It should be noted that this message passing is not updating the representation of the node features, just pooling neighboring node features." —— 同上(:598)—— 示范技法 13:公式之后不仅说"是什么",还补"不是什么"的边界声明。
44. > "The intuition is that the first term $a_{i,1}a_{1, j}$ is only positive under two conditions, there is edge that connects $node_i$ to $node_1$ and another edge that connects $node_{1}$ to $node_{j}$." —— 同上(:602)—— 示范技法 13:"The intuition is that"把公式重新讲成故事。

### D. 复现策略追踪:严格一致 + 角色递进

**判定:同一术语的词形近乎严格一致(同义词在首现句收编后即冻结),加深靠"每次出场换一个语境角色"。**

- **permutation invariant 家族**(8 次出场)::206 问题陈述 → :208 一句研究指针+引用 → :241 定义中的设计目标("preserves graph symmetries (permutation invariances)",定义句原文回声)→ :345 操作性质 → :557 定义句再次回声("preserve graph symmetries (permutation invariance)")→ :561 约束改写为"invariant to node ordering and the number of nodes"→ :563 连字符形态"permutation-invariant operations"→ :608 注意力场景的保持性论证("Permutation invariance is preserved, because scoring works on pairs of nodes")。词根永不变,句法位置逐次迁移。
- **(nodes, edges, global-context) 三元坐标系**:"four types of information … : nodes, edges, global-context and connectivity"(:202)→ "all attributes of the graph (nodes, edges, global-context)"(:241)→ "(nodes, edges, global)"(:245)→ 图注"(V,E,U)"(:255)→ "(U)"(:396)→ playground 里成为三个可开关项(:436)。全套 GNN 创新都被表述为三元组之间新增的信息通路。
- **pooling**(7 次):解法(:273)→ 外链(:283)→ CNN 类比(:308)→ "This pooling technique will serve as a building block"(:323)→ 移入 GNN 层内(:329)→ 命名既有方案"neighborhood-based pooling operation"(:511)→ 整节深化聚合算子(:559-572)。
- **message passing**(9 次):框架名预告(:241)→ 正式引入(:329)→ 与卷积焊接(:359)→ node↔edge 变体(:373)→ 设计维度"styles of message passing"(:436)→ 框架普适性(:522)→ 实现为矩阵乘法(:597-598)→ attention 作为"Another way of communicating information"( :608)。一个术语串起全文骨架。
- **embedding**:裸用伏笔(:138)→ 同位语正式收编(:247)→ 派生词族"per-edge embedding"/"learned node-vector"(:249)→ 'graph embeddings' 操作性再定义(:438)→ 复用于子图视角(:576)。

### E. 脚注/引用对主线的清洁作用

- 术语出处用 [@cite] 附着在词上,零从句成本(技法 8,见引文 27/30)。
- 研究现状一律压成"一句话+引用"的独立小段::208、:535、:539、:563、:572。
- 命名讨论降级为旁注段(:251,引文 40)。
- 延伸话题用指路句外移(:102、:157、:283、:514),并由 "Into the Weeds" 整章收纳(multigraphs、hypergraphs、sampling、GAT、可解释性、生成模型全部住在支线章 :516-632)。
- 效果:主线(graph 是什么→三类任务→表示难题→GNN 三步进化→playground)自始至终只有一条概念链,任何一次离题都不超过一句话。
