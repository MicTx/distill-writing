# 07 · 读者建模与认知负荷管理

《A Gentle Introduction to Graph Neural Networks》(Distill, 2021) 写作方法论逆向工程 · 维度之七

> 核验说明:本文档所有英文引文均以脚本(node `distill-analysis/_verify_doc.js`)从成稿抽取「」内英文、逐条对 `distill-analysis/article.md` 做连续子串核验,44 条英文引文(逐字证据区 43 条编号 + 结语 1 条)全部 PASS,无一条超过 40 词。词频为同一脚本在正文区(`## 引用列表` 之前,含图注、不含参考文献)统计:embedding 词族 25 次、message passing 21 次、aggregat* 词族 35 次、pool* 词族 24 次、gather 9 次、updat* 26 次。

---

## 哲学层

**P1 读者被建模为『会训练模型的工程师』,而不是『懂图论的研究者』:前置的机器学习词汇只使用不定义,域外知识(化学、图论、数据集)则从零科普。**
推断依据:MLP、CNN、MNIST/CIFAR、RNN、Transformer/BERT/GPT-3、Big-O、ResNet block、sigmoid、PCA 在全文从不定义,直接作为类比锚;而 graph 本身被压缩成一句话(`A graph represents the relations (*edges*) between a collection of entities (*nodes*)`),分子从"原子与共价键"讲起,karate club 数据集被讲成一段恩怨故事。作者还用 `You’re probably already familiar with...` 把读者画像**概率化地说出口**——这是一个显式的读者假设声明,而非隐含。

**P2 复杂度是有预算的:主干上每一步只允许出现一个新概念,且这个『唯一增量』会被点名三遍——引入时声明"还不用什么"、节末回顾"还没用什么"、下节开头用 delta 句接上。**
推断依据:路线图明说 `We move gradually from a bare-bones implementation to a state-of-the-art GNN model`;最简 GNN 一节的开头、上一节的结尾、下一节的开头三处都在强调"connectivity 尚未使用"这一被刻意延迟的增量。全篇构造链(表示→最简模型→pooling→message passing→边表示→全局表示→playground)每环恰好新增一个概念或一个属性,从不一次加两个。

**P3 动态复杂度与研究前沿是两种不同的逃逸舱:前者交给交互图表(图注写成操作契约),后者交给 Into the Weeds 和一句话旁注;正文只保留构造链本身。**
推断依据:置换矩阵的多重性正文只用一句 `the number is untenable`,完整展开交给可点击的交互图;聚合操作的深入对比、生成模型、注意力、采样等全部推入 Weeds;别名与替代顺序压缩成 `You could also...` 一句话旁注。判断标准可在文本中读出:凡"不在主干构造链上 / 是开放研究问题 / 只是等价路径"的内容一律出正文。

**P4 概念不是被定义一次学会的,而是被一条重述链深化:每个核心概念在全文重述约十次,每次只增加一个新侧面,且新侧面来自读者此刻刚获得的能力。**
推断依据:embedding 从图注里的并列词(未定义)→ 同位语定义 → "learned/updated"(可学习)→ "graph embeddings... right before prediction"(可观测)→ PCA 可视化 → playground 里可调的维度(可操纵),六个侧面分摊在六章里;message passing 从命名 → 操作定义 → 三步分解 → 扩展到边 → 开关变量 → 矩阵乘法形式化,同样逐级加深。正式的加粗一句话定义出现在第五章,而非第一章。

**P5 理解必须被外部化验证:playground 的操纵杠杆与正文讲授的概念一一对应,邀请句给出可证伪的挑战和对照实验问题,后续正文默认读者已经做过实验。**
推断依据:playground 的四个杠杆(层数、维度、聚合函数、message passing 开关)正是前四章讲授的四个概念;`see if you can edit the molecule... to make the model prediction increase` 是有成败判据的任务,`Do the same edits have the same effects for different model architectures?` 是迁移性问题;下一小节以 `When exploring the architecture choices above, you might have found...` 起笔,把交互经验当作讲授新知识的前置先验。

**P6 对简化保持诚实:图表被允许比现实简单,但正文必须披露简化发生在哪里——用一句元说明换取图表的低负荷。**
推断依据:作者两次停下来声明图表用了标量而实践是向量(`It should be noted that the figure uses scalar values...` 与 `For simplicity, the previous diagrams used scalars...`),宁可增加一句自我修正,也不把图画复杂;playground 结论处又主动声明证据是 `mixed messages`,防止读者从交互图中过度泛化。

---

## 操作层

**T1 开篇路标句声明『起点—终点—斜率—验证场』。**
做法:引言第二段给出四部结构,并用一句话写明渐进曲线(`We move gradually from a bare-bones implementation to a state-of-the-art GNN model`)和第四部分的 playground 用途。
迁移规则:任何长教程的第 2 段必须回答:起点是读者已会的什么最简版本、终点是什么当前最佳实践、中间分几级台阶、在哪里验证——四件事各一个从句,不超过三句。

**T2 概率化读者画像句,并对反直觉动作先贴标签。**
做法:第一节用 `You’re probably already familiar with some types of graph data, such as social networks` 猜定已知,再抛出 `you might not think could be modeled as graphs`;对"图像/文本也是图"这一反直觉主张,先写 `Although counterintuitive,` 再展开。
迁移规则:开讲前写一句"你大概已经知道 X";每次要违背读者直觉时,先承认"这看起来违反直觉",再执行,绝不默默做出反直觉的动作。

**T3 双模态类比矩阵:每个新分类维度配两个来自读者不同旧领域的锚,且锚不重复。**
做法:graph-level/node-level/edge-level 三类任务各自配一个图像类比(MNIST/CIFAR 分类、image segmentation、场景图)和一个文本类比(sentiment analysis、词性标注),全文类比对象零重复。
迁移规则:把新概念的每个分支映射到读者旧知识里两个不同学科的对应物;同一锚点只用一次,防止读者把类比当成同构。

**T4 教学性表示引入后立即『自我拆台』,预防可预见的误解。**
做法:教完"图像和文本都可以表示为图"后,紧接 `Of course, in practice, this is not usually how text and images are encoded: these graph representations are redundant...`。
迁移规则:每引入一个为教学目的而设的表示/记法,紧跟一句"实践中其实不这么做,因为……",把教学表示与现实用法在文本上隔离。

**T5 难度分诊:一章有多个对象时,先宣布几个容易、哪个难,把火力集中给唯一难的。**
做法:表示一章开头即 `The first three are relatively straightforward`,随后单独一句 `However, representing a graph’s connectivity is more complicated.` 引出全章真正的内容。
迁移规则:列举 N 个对象时显式分级("前三个直白,第四个麻烦"),读者的注意力预算因此只花在一处;不要让四个对象平均消耗笔墨。

**T6 双重编码:同一事实用散文一遍、形式符号一遍。**
做法:讲完邻接表省存储后补 `Another way of stating this is with Big-O notation, it is preferable to have O(n_edges), rather than O(n_nodes^2)`。
迁移规则:每个定量主张给两种表征(自然语言 + 符号/数字/公式),并明说"另一种说法是";直觉型与形式型读者各取一条通道,且互相校验。

**T7 抽象焦虑的就地安抚 + 具体化承诺。**
做法:`if this seems abstract now, we will make it concrete with examples in the next section`。
迁移规则:预判读者在哪几句会感到"飘",就地承认抽象并给出兑现时间(下一节/下一图);承诺必须在前方被兑现,形成信任循环。

**T8 增量点名句:每节开头说清『本节只加什么、故意不用什么』。**
做法:`We will start with the simplest GNN architecture, one where we learn new embeddings for all graph attributes (nodes, edges, global), but where we do not yet use the connectivity of the graph.`
迁移规则:每节第一句 = 旧能力 + 唯一新增 + 显式延迟项("暂时不用 X");延迟项必须写出来,让读者知道缺的不是自己没读懂。

**T9 节末清点『还没用什么』,为下一增量留钩子。**
做法:pooling 一节结尾:`Note that in this simplest GNN formulation, we’re not using the connectivity of the graph at all inside the GNN layer. Each node is processed independently...`
迁移规则:每节收尾时清点当前版本的边界(它做不到什么),把"未使用的能力"变成下一节的标题级悬念。

**T10 缺陷驱动的节间过渡:下一节的增量由当前版本的一个可命名缺陷引出。**
做法:`There is one flaw with the networks we have described so far: nodes that are far away...` 引出 master node;`We could make more sophisticated predictions by using pooling within the GNN layer` 引出 message passing。
迁移规则:不靠章节编号推进,靠"当前版本的一个具体缺陷/局限"推进;每个新机制出现前,先让读者亲口需要它。

**T11 术语在它解决痛点的那一刻才被命名。**
做法:先铺陈"边有信息、节点要预测、信息需要被搬运"的矛盾,然后 `We can do this by *pooling*.`——名词出现在其消除的矛盾之后。
迁移规则:先写两三句让读者感到缺口存在的句子,再给名字;绝不先给术语再造场景。

**T12 新机制复用旧机制的动词,新动词不超过一个。**
做法:message passing 的三步里有 gather、aggregate(与 pooling 两步完全同词),只新增 update;全文 gather 出现 9 次、updat* 26 次,构成贯穿的动词脚手架。
迁移规则:教新流程时,尽量用读者已在前一机制里学会的动词描述,每 个新机制至多引入一个新动词。

**T13 机制先压缩为 2-3 步祈使句 bullet,再谈性质;随后配一个可手算的最小数字实例。**
做法:`Message passing works in three steps:` + gather/aggregate/update 三条;抽象的"信息跨层传播"立刻落地为 `after three layers, a node has information about the nodes three steps away from it`。
迁移规则:任何机制先给可执行的小步骤清单(动词开头),再给性质,最后用最小实例(小到三层、四节点)让读者能心算验证。

**T14 「You could also」一句话旁注:别名、等价路径、开放问题一律压成一句,绝不展开。**
做法:`You could also call it a GNN block.`;`You could also 1) gather messages, 3) update them and 2) aggregate them and still have a permutation invariant operation.`;`Learning permutation invariant operations is an area of recent research.`
迁移规则:凡内容属于"另一种叫法/另一种顺序也成立/这是开放问题",压成不超过一句的旁注(脚注位),可带引用但不给论证;展开欲超过一句就是推送信号。

**T15 前向引用代替离题:岔路改写成一句路标。**
做法:`For a more in-depth discussion on aggregation operations go to the Comparing aggregation operations section.`;图注也承担路由(`Other types of graphs and attributes are explored in the Other types of graphs section`)。
迁移规则:正文中每条想展开的支线,改写成"深入见第 X 节"的单句指针;主线的每个概念最多占一个从句的注意力。

**T16 理解检查点 = 可证伪挑战 + 对照实验问题,且后续正文假定实验已做。**
做法:`Play around with different model architectures to build your intuition. For example, see if you can edit the molecule on the left to make the model prediction increase.` 紧接 `Do the same edits have the same effects for different model architectures?`;下一小节起笔 `When exploring the architecture choices above, you might have found some models have better performance than others.`
迁移规则:每个交互组件后必须跟(1)一个有成败判据的动手任务,(2)一个跨条件的对照问题;随后的讲授以"你大概已经观察到"开头,把交互变成读者的先验经验而非可选装饰。

**T17 经验结论先划外部效度边界,再给趋势。**
做法:`The previous explorations have given mixed messages.` 先总结证据的分裂,再给唯一清晰的趋势(message passing 越多越好);更早处明说 `The answers are going to depend on the data`。
迁移规则:呈现实验/经验规律前,先声明它在什么条件下不成立;宁可弱化自己刚给出的图,也不让读者带走过度泛化的规则。

**T18 图注写成交互契约:祈使句操作 + 预期可视反馈,并让图表承载正文写不动的动态。**
做法:首页 hero 图注 `Hover over a node in the diagram below to see how it accumulates information from nodes around it through the layers of the network.`——全文最核心的动态(信息跨层累积)在一切形式化之前先交给这张图;矩阵多重性、gather 的动态、编辑分子看预测,全部由 hover/click/edit 承载,正文只留一句结论。
迁移规则:凡是"过程性/分支性/组合爆炸"的内容,不写长句描述,改成交互图;图注必须回答"我该做什么操作、将看到什么变化"两个问题;正文只保留一句话级别的结论。

**T19 披露图表的教学性简化,用一句元说明换取图面的低负荷。**
做法:`It should be noted that the figure uses scalar values per node/edge/global, but most practical tensor representations have vectors per graph attribute.`;`For simplicity, the previous diagrams used scalars to represent graph attributes; in practice feature vectors, or embeddings, are much more useful.`
迁移规则:图表每做一次简化(标量代向量、小图代大图、二分类代多分类),正文加一句"图里用的是 A,实践是 B";简化可以,沉默不可以。

**T20 高级区自我声明『非主干』并继续复用主干词汇系统,降低进阶区的边际负荷。**
做法:Into the Weeds 开头即 `Next, we have a few sections on a myriad of graph-related topics that are relevant for GNNs.`;Weeds 内部讲 multigraph/hypergraph 时继续以 message passing 为统一透镜(`the message passing framework is flexible enough that...`)。
迁移规则:附录/进阶区开头明示"以下是散点话题,不依赖主干顺序";进阶内容尽量用正文已建立的同一套词汇解释,不开第二套术语系统。

### 附:三个核心概念的重述链(脚本统计 + 人工定位)

| 概念 | 正文词频 | 重述链(每次只加一个侧面) |
|---|---|---|
| embedding | 词族 25 次 | ① 图注并列出场、不定义(L62)→ ② 引用语境 word embedding(L138)→ ③ 架构总述 progressively transform these embeddings(L241)→ ④ 可学习性 learn new embeddings(L245)→ ⑤ 同位语定义 feature vectors, or embeddings(L247)→ ⑥ 层间更新 updated embeddings(L260)→ ⑦ 邻居影响(L329)→ ⑧ 可观测化:penultimate 层输出即 graph embeddings(L438)→ ⑨ PCA 可视化(L440)→ ⑩ playground 可调维度(L455) |
| message passing | 21 次 | ① 命名+文献归属(L241)→ ② 操作性定义(L329)→ ③ 三步分解(L331-343)→ ④ 变体预告(L349)→ ⑤ 扩展到边(L373)→ ⑥ playground 开关(L436)→ ⑦ 经验变量(L499)→ ⑧ Weeds 统一透镜(L522)→ ⑨ 矩阵乘法形式化(L597-598) |
| aggregation / pooling | pool* 24 次、aggregat* 35 次 | ① 痛点引入(L273)→ ② 两步分解 gather/aggregate(L277-281)→ ③ 符号 ρ(L285)→ ④ 前向引用(L283)→ ⑤ CNN 类比 Global Average Pooling(L308)→ ⑥ 积木宣言(L323)→ ⑦ 步骤被 message passing 复用(L335-343)→ ⑧ 杠杆 max/mean/sum(L432)→ ⑨ 经验问题与答案(L487-495)→ ⑩ Weeds 判别力专章(L559-572) |

共同模式:重述的载体沿『图注 → 正文 → bullet → 符号 → 交互控件 → 经验图表 → 形式化』升级;每次深化依赖读者刚获得的新能力(会更新→能看见→能调节),因此旧词永远带着新义出现而无需重新定义。

### 附:复杂度递增曲线与『每步一个增量』的显式证据

主干复杂度台阶:识别数据(第 1-2 章,零模型)→ 表示(邻接表)→ 最简模型(逐属性 MLP)→ 预测期路由(pooling)→ 层内路由(message passing)→ 属性对扩展(edge representations)→ 新增全局属性(master node)→ 全变量可操纵(playground)→ 形式化与开放问题(Weeds)。

『每步只增加一个新概念』的三处显式证据:
1. **最简 GNN 对 connectivity 的三重延迟**:节首声明不用(Q16)、节末回顾没用(Q22)、下节 delta 句启用(Q23)——读者在该台阶上只装一个新概念(逐属性独立 MLP)。
2. **edge representations 一节零新机制**:开头先复述"我们上面已经用 pooling 把边信息路由给节点,但只在预测步",新内容只是"把同一机制放进层内、作用于边"(L373)。
3. **global representations 由一个缺陷引入恰好一个新属性**:远距节点传不了信息(Q29)→ 解法是加一个 master node/context vector,机制(gather/aggregate/update)原封不动。
另有第四处:标量→向量的升级被拆成两次独立披露(Q14、Q17),不与任何机制增量同时发生。

### 附:逃逸舱的推送判断标准(从文本反推)

1. **不在主干构造链上**(生成模型、解释归因、采样与批处理、注意力、图对偶、矩阵视角)→ 整节推入 Into the Weeds;
2. **是开放研究问题**(采样策略、聚合算子设计、层级 GNN 训练)→ 正文只留一句状态声明 + 引用(Q12),细节进 Weeds;
3. **只是别名或等价路径**(GNN block、步骤顺序可交换)→ 一句话 You-could-also 旁注(Q18、Q25);
4. **需要深入对比才能下结论**(聚合算子比较)→ 前向引用到 Weeds 专章(Q21);
5. **内容是过程性/可动手验证的**(置换矩阵的多重性、gather 动态、编辑分子)→ 不用文字承载,做成交互图,图注写操作契约。
总原则:正文一个句子只允许服务于构造链上的当前增量;任何服务其他目的的句子都必须找到上述五个舱位之一。

---

## 逐字证据

以下引文全部经脚本核验为 `article.md` 原文连续子串(42/42 PASS);图注引用已按约定去掉 `> 图注:` 前缀,余文字逐字保留(含原文的拼写与标点习惯)。

### 一、目标读者画像:前置知识假设的文本信号

1. 「We explore the components needed for building a graph neural network - and motivate the design choices behind them.」——**摘要**。示范 T1/P1:摘要把文章定位为"组件 + 设计动机",读者被承诺当成设计者而非旁观者;全文因此可以假定读者关心 trade-off。
2. 「You’re probably already familiar with some types of graph data, such as social networks.」——**§Graphs and where to find them**。示范 T2:读者画像被概率化地说出口,"probably" 是显式的假设声明而非隐含背景。
3. 「we will show two types of data that you might not think could be modeled as graphs: images and text.」——**§Graphs and where to find them**。示范 T2:同一句话里完成"已知锚(社交网络)→ 认知冲突(图像文本也是图)"的桥接,直接以读者的旧知识为跳板。
4. 「As the story goes, a feud between Mr. Hi (Instructor) and John H (Administrator) creates a schism in the karate club.」——**§Node-level task**。示范 P1:域外数据集被讲成故事而非引用;假设读者不懂该数据集,但不回避用叙事补齐。

### 二、渐进披露:复杂度台阶与增量点名

5. 「We move gradually from a bare-bones implementation to a state-of-the-art GNN model.」——**引言·路线图**。示范 T1:渐进曲线在读者读到任何技术内容之前就被告知,斜率成为契约。
6. 「Fourth and finally, we provide a GNN playground where you can play around with a real-word task and dataset to build a stronger intuition of how each component of a GNN model contributes to the predictions it makes.」——**引言·路线图**(real-word 为原文拼写)。示范 T1/T16:验证场在路线图里与三个讲授部并列,理解检查被规划为结构的一部分而非附录。
7. 「Graphs are very flexible data structures, and if this seems abstract now, we will make it concrete with examples in the next section.」——**引言**。示范 T7:就地承认抽象并承诺兑现时间,焦虑管理进入第二段。
8. 「We will start with the simplest GNN architecture, one where we learn new embeddings for all graph attributes (nodes, edges, global), but where we do not yet use the connectivity of the graph.」——**§The simplest GNN**。示范 T8:增量点名句——新内容(逐属性学习)与被显式延迟的内容(connectivity)在同一句中分拣。
9. 「Note that in this simplest GNN formulation, we’re not using the connectivity of the graph at all inside the GNN layer. Each node is processed independently, as is each edge, as well as the global context.」——**§GNN Predictions by Pooling Information(节末)**。示范 T9:节末清点当前版本做不到什么,把"未使用的能力"留给下一节。
10. 「We could make more sophisticated predictions by using pooling within the GNN layer, in order to make our learned embeddings aware of graph connectivity.」——**§Passing messages between parts of the graph**。示范 T10:delta 句 = 旧能力(pooling)+ 唯一增量(移入层内),读者无需为 message passing 重建心智模型。
11. 「There is one flaw with the networks we have described so far」——**§Adding global representations**。示范 T10:"one flaw" 的单数性是复杂度预算的直接证据:每个过渡只允许存在一个待解决缺陷。
12. 「nodes that are far away from each other in the graph may never be able to efficiently transfer information to one another, even if we apply message passing several times.」——**§Adding global representations**。示范 T10:缺陷被描述到读者能自己预感到需要"某个桥梁"的程度,master node 的引入于是成为读者自己的答案。

### 三、章节内的负荷分配:分诊、双重编码、误解预防

13. 「The first three are relatively straightforward: for example, with nodes we can form a node feature matrix $N$ by assigning each node an index $i$ and storing the feature for $node_i$ in $N$.」——**§The challenges of using graphs in machine learning**。示范 T5:四个对象先分诊(三个直白、一个难),容易的合并处理、只给一个例子。
14. 「However, representing a graph’s connectivity is more complicated.」——**§The challenges of using graphs in machine learning**。示范 T5:难点的单独亮牌句,此后全章篇幅明确只属于它。
15. 「Another way of stating this is with Big-O notation, it is preferable to have $O(n_{edges})$, rather than $O(n_{nodes}^2)$.」——**§The challenges of using graphs in machine learning**。示范 T6:同一主张的第二种编码,"Another way of stating this" 是双重编码的显式信号词。
16. 「Of course, in practice, this is not usually how text and images are encoded: these graph representations are redundant since all images and all text will have very regular structures.」——**§Text as graphs(节末)**。示范 T4:教学表示刚建立就被自我拆台,预防"为什么不直接这么用"的误解在读者心中生根。
17. 「This is analogous to image classification problems with MNIST and CIFAR, where we want to associate a label to an entire image.」——**§Graph-level task**。示范 T3:新任务类型立即落到读者已会的具体数据集上,类比对象具体到名字。
18. 「Following the image analogy, node-level prediction problems are analogous to *image segmentation*, where we are trying to label the role of each pixel in an image.」——**§Node-level task**。示范 T3:"Following the image analogy" 表明类比是持续调用的框架而非一次性修辞;同一小节还配了文本侧的词性标注类比。
19. 「Which graph attributes we update and in which order we update them is one design decision when constructing GNNs.」——**§Learning edge representations**。示范 P1/T1:分歧点被表述为"设计决策"而非"正确答案",持续兑现"读者是设计者"的画像。

### 四、核心概念的重述链:命名时机与动词复用

20. 「We can do this by *pooling*.」——**§GNN Predictions by Pooling Information**。示范 T11:术语出现在它解决的矛盾(边有信息、节点要预测)被铺陈完之后;四个词完成命名。
21. 「For each item to be pooled, *gather* each of their embeddings and concatenate them into a matrix.」——**§GNN Predictions by Pooling Information(步骤 bullet)**。示范 T13:机制压缩为祈使句步骤,动词 gather 在此首次进入读者的主动词汇。
22. 「We represent the *pooling* operation by the letter $\rho$」——**§GNN Predictions by Pooling Information**。示范 T13:符号在机制被两步分解之后才赋值,记号永远晚于直觉。
23. 「Message passing works in three steps:」——**§Passing messages between parts of the graph**。示范 T12/T13:与 pooling 的"两步"平行成"三步",结构复刻让读者预期"又是一个短清单"。
24. 「You could also 1) gather messages, 3) update them and 2) aggregate them and still have a permutation invariant operation.」——**§Passing messages between parts of the graph(旁注)**。示范 T14:等价路径压成一句 You-could-also,保住"三步"这个记忆结构不被例外情况腐蚀。
25. 「This is reminiscent of standard convolution: in essence, message passing and convolution are operations to aggregate and process the information of an element’s neighbors in order to update the element’s value.」——**§Passing messages between parts of the graph**。示范 T3/T12:重述链中的类比深化站——同一概念用读者旧领域(卷积)再讲一遍,且明说差异点(邻居数可变)。
26. 「By stacking message passing GNN layers together, a node can eventually incorporate information from across the entire graph: after three layers, a node has information about the nodes three steps away from it.」——**§Passing messages between parts of the graph**。示范 T13:抽象性质(堆叠扩展感受野)落到可心算的最小实例(三层/三步)。
27. 「This pooling technique will serve as a building block for constructing more sophisticated GNN models.」——**§GNN Predictions by Pooling Information(节末)**。示范 T12/T9:重述以"积木宣言"收束——旧概念被显式标记为后续一切的构件,读者获得累积感而非遗忘压力。

### 五、playground 作为理解检查点

28. 「We’ve described a wide range of GNN components here, but how do they actually differ in practice?」——**§GNN playground(节首)**。示范 T16:先承认负荷已累积("a wide range"),再用一个问题把验证需求合法化。
29. 「The design space for our GNN has many levers that can customize the model:」——**§GNN playground**。示范 T16:讲授概念被显式转写为"杠杆",四个杠杆与前四章概念一一对应,操纵即复习。
30. 「Play around with different model architectures to build your intuition. For example, see if you can edit the molecule on the left to make the model prediction increase.」——**§GNN playground**。示范 T16:可证伪的挑战——"让预测升高"有成败判据,理解失败会直接可见。
31. 「Do the same edits have the same effects for different model architectures?」——**§GNN playground**。示范 T16:挑战之后的对照实验问题,把单点操作升级为跨条件归纳。
32. 「Edit the molecule to see how the prediction changes, or change the model params to load a different model. Select a different molecule in the scatter plot.」——**§GNN playground(图注)**。示范 T18:图注即交互契约——三个祈使句各自绑定一个预期反馈。
33. 「When exploring the architecture choices above, you might have found some models have better performance than others.」——**§Some empirical GNN design lessons(节首)**。示范 T16:正文假定实验已做,读者的交互经验被当作后续讲授的先验证据引用。
34. 「The previous explorations have given mixed messages.」——**§Some empirical GNN design lessons**。示范 T17:经验小节先声明证据分裂,防止读者把 playground 的图当成干净规律。

### 六、复杂度的逃逸舱:脚注、前向引用、Into the Weeds

35. 「Learning permutation invariant operations is an area of recent research.」——**§The challenges of using graphs in machine learning(旁注)**。示范 T14:开放研究问题降级为一句状态声明加引用,主线不为它停留。
36. 「You could also call it a GNN block. Because it contains multiple operations/layers (like a ResNet block).」——**§The simplest GNN(旁注)**。示范 T14:别名 + 旧知识锚(ResNet block)一起压进两句脚注式旁注,正文术语保持唯一。
37. 「For a more in-depth discussion on aggregation operations go to the Comparing aggregation operations section.」——**§GNN Predictions by Pooling Information**。示范 T15:深入对比被前向引用到 Weeds 专章,当前章节的"sum"默认值不被打扰。
38. 「Next, we have a few sections on a myriad of graph-related topics that are relevant for GNNs.」——**§Into the Weeds(节首)**。示范 T20:高级区开头自我声明为散点话题集合,读者被明确告知可以在此止步而不损失主干。
39. 「Fortunately, the message passing framework is flexible enough that often adapting GNNs to more complex graph structures is about defining how information is passed and updated by new graph attributes.」——**§Into the Weeds / Other types of graphs**。示范 T20:进阶区(multigraph、hypergraph)继续用主干的 message passing 词汇作统一透镜,边际负荷被压到"只需定义新属性的信息传递"。

### 七、图表如何分担正文无法承载的复杂度

40. 「Hover over a node in the diagram below to see how it accumulates information from nodes around it through the layers of the network.」——**首页 hero 图注**。示范 T18:全文最核心的动态(信息跨层累积)在任何形式化之前先交给交互图;图注以"操作 + 预期反馈"的契约形式写成。
41. 「Note that each of these three representations below are different views of the same piece of data.」——**§Images as graphs**。示范 T18/T6:三表示等价这一组合性事实由并列图组承载,正文只负责说出"它们是同一数据"这一句结论。
42. 「It should be noted that the figure uses scalar values per node/edge/global, but most practical tensor representations have vectors per graph attribute.」——**§The challenges of using graphs in machine learning**。示范 T19:图表被允许简化,但简化点必须在正文披露——一句元说明换取图面的低负荷。
43. 「For simplicity, the previous diagrams used scalars to represent graph attributes; in practice feature vectors, or embeddings, are much more useful.」——**§The simplest GNN**。示范 T19 + 重述链第⑤站:披露句同时完成 embedding 的同位语定义,一句话服务两个认知目标。

---

## 结语:本维度的方法论一句话

把读者假设写在明处(probably already familiar),把复杂度花在刀口上(每步一个增量、点名三遍),把动态交给图、把前沿交给 Weeds、把别名交给脚注,让每个概念沿着"图注→正文→符号→控件→形式化"的重述链缓慢增重,最后用一个杠杆与概念一一对应的 playground 让读者亲手证伪自己的理解。
