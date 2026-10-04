# 00 · 综合方法论 —— 《A Gentle Introduction to Graph Neural Networks》写作方法论总纲

> 本文综合八份维度分析(`distill-analysis/01-structure.md` ~ `08-credibility.md`)并对照原文 `distill-analysis/article.md`(全文通读校准)写成。所有英文引文用 «» 包裹、为 article.md 逐字子串;行号一律指 article.md;原文笔误照录并标 [原文如此](如 `real-word`、`We wish two highlight`、`visibility separate`)。引文可信度:八份维度分析各自跑过逐字校验脚本(见其文末「核对记录」),本次综合时又逐条人工对照原文通读复核;本次未另跑自动校验脚本以外的核对(文末「核对记录」注明实际执行的命令)。
>
> **计数口径**:哲学原则 14 条(P1–P14);方法条目 = 句式库 49 条(S1–S49)+ 概念引入流程 8 步(C1–C8)+ 图示与交互策略 10 条(G1–G10)+ 认知负荷规则 8 条(L1–L8),共 75 条。「写作流程」6 个阶段是流程组织,其自查清单引用上述条目,不重复计数。

## 0. 口径统一(八份文档的冲突裁决与勘误)

1. **例谱系勘误(采 05 的勘误)**:上游任务描述中的「国际象棋」例子在原文不存在(`grep -i chess` 零命中);实为莎士比亚戏剧《奥赛罗》人物互动图(«Image of a scene from the play “Othello”.»,L126 图注)。「人类学多样性」字面成立:空手道俱乐部数据集出自 *J. Anthropol. Res.*(L693)。
2. **图块与图注计数(采 06 的脚本实测)**:全文 **43 个图块** = 37 条实质图注 + 2 条空图注(L297、L584)+ 4 个无图注(L163、L268、L303、L310);其中 13 条含交互指令(7 条祈使句开头 + 6 条内嵌)。01 的「39 条图注」= 37 条实质 + 2 条空标记,口径兼容;上游任务的「80 条图注」与实测不符,弃用。
3. **两个"37"不可混淆**:01 的「主线 37 处交互图」指行 1–515 的图块数;06 的「37 条实质图注」指全 43 块中有文字图注的数量。二者是巧合的同数异义。
4. **路线图映射是推断**:引言承诺的「four parts」(L49)≈ 前五个 h2(§2、§3 合为「图有何特殊之处」),此映射为 01 基于措辞的推断,非原文显式声明,保留标注。
5. **视觉记号一致性的证据边界(采 06 的限定)**:HTML→markdown 清洗丢失了节点/边色值,「视觉记号冻结」的断言只以文字证据支撑(如 «Hover over a node (black node) to visualize which edges are gathered and aggregated to produce an embedding for that target node.» L289、«Each point is colored by the number of layers.» L481);原图色值是否全文严格一致无法从本文件核实。
6. **长度占比的度量基础**:正文词数 9040 / 464 句 / 170 段为 04 的脚本实测;分节占比按清洗版 markdown 行数(含图块标记与图注)粗估,仅供比重感,非词数统计。(2026-09 更新:skill 已改用词数占比,见 #8。)
7. **统计复核与两条节奏规则勘误(2026-09,`node tools/check-stats.mjs` 可复现)**:04 与本文 #6 的计数依赖未入库的会话临时脚本(`_tmp_analyze.mjs` 等),无法复现。现按统一口径重算——摘要起、Final thoughts 止,正文 385 句 / 7759 词,词频含图注——skill 中引用的数字一律以该脚本输出为准(如 where×33、which×21、>25 词长句 94、平均 2.5 句/段、单句段 32%)。两条规则与实测不符,skill 已改写:① **04 T1「长句后紧跟 5–12 词落锤短句」**:长句之后紧跟 5–12 词句的比例为 20%,与全文 5–12 词句的基线 20% 相同,说明这一搭配并不存在;原文短句按岗位出现(引图、转折、命名、判决、推广、路标),长句极少连排(同段连续三个 >25 词长句全文仅 1 处)。«The model looks like this.»(L293)是引图句,不是给前一句长句落锤。② **04 T20「每 2–3 句一个观察指令」**:正文实测 11 句,约每 700 词一处,集中在第一次读图读数据、坦白简化、节尾自曝与换挡处。本文第七节阶段四清单已按此更正;04 正文保留原样,阅读时以本条为准。
8. **九段骨架的段 5/6 切分(2026-09)**:第二节把实证 lessons(L451–513)归入段 5、playground(L410–449)归入段 6,编号顺序与原文顺序(机制 → 设计维度 → 实验场 → 实证)相反,也和段 6「放在实证总结之前」的定位自相矛盾。skill 已改为:段 5 = 机制章末两节设计维度(L370–408),段 6 = 实验场 + 实证(L410–514),方向段(L509)与前向指针(L514)随实证归入段 6;各段占比改为词数实测(正文 + 图注,`tools/check-stats.mjs`),段 0–8 依次为 6/11/7/6/15/7/16/30/1(%)。第二节的表格与逐段拆解保留原样,阅读时以本条为准。

---

## 一、写作哲学(14 条)

**P1|章节顺序服从「读者下一秒会问什么」,不服从学科知识的逻辑。**
理由:全文排成一条问题链(数据→任务→障碍→模型→实验),每章的消费对象都是上一章生产的疑问;任务先于模型(否则读者不知模型为何物)、障碍先于模型(否则不知为何要这些设计)。
锚例:«We have described some examples of graphs in the wild, but what tasks do we want to perform on this data?»(L151)

**P2|主线是一台复杂度棘轮:每前进一步只增加一个机制,且最简版显式声明自己「还不用什么」。**
理由:读者工作记忆有限,增量被点名三遍(节首声明、节末清点、下节 delta 句),教学性简化从不假装完整。
锚例:«We will start with the simplest GNN architecture, one where we learn new embeddings for all graph attributes (nodes, edges, global), but where we do not yet use the connectivity of the graph.»(L245)

**P3|每级棘轮以自曝缺陷收尾,下一级以缺陷陈述开场——缺陷链替代章节号成为推进引擎。**
理由:新机制以「修复者」身份登场,读者在被满足之前先亲口需要它;「one flaw」的单数性就是复杂度预算。
锚例:«Note that in this simplest GNN formulation, we’re not using the connectivity of the graph at all inside the GNN layer.»(L325)→ «There is one flaw with the networks we have described so far: nodes that are far away from each other in the graph may never be able to efficiently transfer information to one another»(L393)

**P4|术语是刚被提出的那个问题的答案;一支术语表全文不换口径,别名在首现句一次收编后锁死主词。**
理由:读者拿到名词的瞬间手里已握着等待这个名词的语境,术语因此零记忆成本;换词只会强迫读者重新建档。
锚例:«We need a way to collect information from edges and give them to nodes for prediction. We can do this by *pooling*.»(L273);别名收编:«in practice feature vectors, or embeddings, are much more useful.»(L247)

**P5|体验先于术语:正文说理之前先给可操作的现象,参与不能后置,理解可以后置。**
理由:由读者亲手触发的现象自带证据效力,「我看到了」优于「作者说」;全文最深机制可在读者不认识任何术语时先被看见。
锚例:首屏 hero 图注 «Hover over a node in the diagram below to see how it accumulates information from nodes around it through the layers of the network.»(L13)

**P6|双参照系锚定 + 坐标系先行:选定两门读者必然熟悉的旧学科贯穿全文,开篇立好 2–3 个正交轴,此后一切枚举沿这套坐标展开。**
理由:读者只需学一次坐标系,就能预判后续所有枚举的形状;类比端选最家喻户晓的(MNIST、图像分割、词性标注),不选最相近的。
锚例:«This is analogous to image classification problems with MNIST and CIFAR, where we want to associate a label to an entire image.»(L167);坐标系:«all attributes of the graph (nodes, edges, global-context)»(L241),此后任务三分(L151)、pooling 方向 parade(L293–308)、playground 开关(L436)全部沿 (nodes, edges, global) 三元组展开。

**P7|反常识必须显式命名并预付回报:先替读者说出「你想不到」,再承诺翻转视角能买到什么。**
理由:只有说出「你原本不会想到」,读者才知道自己刚才被颠覆了哪条预期;未命名的惊奇只是噪音。
锚例:«we will show two types of data that you might not think could be modeled as graphs: images and text»(L76)+ «Although counterintuitive, one can learn more about the symmetries and structure of images and text by viewing them as graphs»(L76)

**P8|拟人化只负责动机,数学负责定义:隐喻动词加引号、绰号与学名并列、数学实体在括号外隐喻在括号内,拟人段后必跟编号步骤。**
理由:隐喻负责「为什么」,清单负责「怎么做」;锚定方向不可逆,否则读者会以隐喻为锚去检索文献。
锚例:«We can do this using *message passing*[@Gilmer2017-no], where neighboring nodes or edges exchange information and influence each other’s updated embeddings.»(L329)→ 紧随 «Message passing works in three steps:»(L331);引号隐喻:«can risk having their node representations ‘diluted’ from many successive iterations»(L485)

**P9|类比自带断点:失效处抢在读者质疑之前供认,失效归因到可见结构,失效后回收残余价值。**
理由:失效不伤害类比反而生产新知识;失效声明必须与残余价值声明成对出现,否则读者会整体抛弃该类比。
锚例:断点 «However, the number of neighboring nodes in a graph can be variable, unlike in an image where each pixel has a set number of neighboring elements.»(L359);供认+结构性归因 «Of course, in practice, this is not usually how text and images are encoded: these graph representations are redundant»(L100)+ «The adjacency matrix for text is just a diagonal line, because each word only connects to the prior word, and to the next one.»(L100)

**P10|符号晚于口头程序:数学记号是自然语言句子的重述而非新知识,公式之后必接回译,再补一句「它不是什么」。**
理由:直觉型与形式型读者各取一条通道且互相校验;符号永远在完整口头程序与图之后到场。
锚例:«We represent the *pooling* operation by the letter $\rho$»(L285);«Another way of stating this is with Big-O notation, it is preferable to have $O(n_{edges})$, rather than $O(n_{nodes}^2)$.»(L228);回译+边界 «It should be noted that this message passing is not updating the representation of the node features, just pooling neighboring node features.»(L598)

**P11|深度是可展期的债务:主线在好奇心最强、但展开会打断叙事的精确位置开前向指针,一切延展收进一个被命名的容器,容器开场自贬。**
理由:主线因此能保持「每个机制 1–3 段 + 1 张图」的浅度;支线各节自包含、彼此无依赖,读者被明确告知可以止步而不损失主干。
锚例:欠条 «For a more in-depth discussion on aggregation operations go to the Comparing aggregation operations section.»(L283);容器自贬 «Next, we have a few sections on a myriad of graph-related topics that are relevant for GNNs.»(L518)

**P12|诚实优先于说服:情态词分级定岗,趋势与反例同句交付,无一致最优直说,「取决于数据」本身被当作发现报告,开放问题写进正文。**
理由:读者的信任是长期资产;hedging 嵌在语法里而非道德声明里,读者可以据此反推哪句是事实、哪句是猜想。
锚例:«We can notice that models with higher dimensionality tend to have better mean and lower bound performance but the same trend is not found for the maximum.»(L475);«There is no operation that is uniformly the best choice.»(L570);«The previous explorations have given mixed messages.»(L497);«How to sample a graph is an open research question.[@Rozemberczki2020-lq]»(L539)

**P13|归属是礼仪而非负担:引用与被归属的术语物理相邻,归属动词按贡献分级,连图示的视觉谱系也记账。**
理由:综述型文章的全部权威来自对前人工作的精确记账;归属越细,自身可信度越高。
锚例:«*message passing*[@Gilmer2017-no]»(L329,无空格黏贴);分级归属 «We’re going to build GNNs using the “message passing neural network” framework proposed by Gilmer et al.[@Gilmer2017-no] using the Graph Nets architecture schematics introduced by Battaglia et al.[@Battaglia2018-pi]»(L241);图示谱系 «Many of our GNN architecture diagrams are based on the Graph Nets diagram [@Battaglia2018-pi].»(L642)

**P14|信任读者是同行:读者画像被概率化说出口,困惑被预告、被接住而非被责备;收束是回环 + 开门,不是总结陈词。**
理由:预设困惑是材料的属性而不是读者的缺陷,语气因此永远不需要防守;结尾不忏悔——局限已散在各节就地付清,收尾只做有分寸的展望。
锚例:«You’re probably already familiar with some types of graph data, such as social networks.»(L76);«if this seems abstract now, we will make it concrete with examples in the next section»(L72);收束开门句 «The success of GNNs in recent years creates a great opportunity for a wide range of new problems, and we are excited to see what the field will bring.»(L636)

---

## 二、结构模板(九段可复用骨架)

**骨架总览**(占比按清洗版行数粗估,含图块;合计 ≈100%):

| # | 段 | 对应原文(行) | 功能 | 占比 |
|---|---|---|---|---|
| 0 | 开篇承诺 | 引言 47–72 | 签体裁合同、给钩子、卖 why、铺路线 | ≈4% |
| 1 | 以已知引入 | §1 74–148 | 例证三级阶梯,证明对象无处不在 | ≈13% |
| 2 | 任务图景 | §2 149–197 | 同构排比定义三类任务 | ≈8% |
| 3 | 核心挑战 | §3 198–238 | 朴素方案的精确死因→优雅替代 | ≈7% |
| 4 | 核心机制 | §4 前三级 239–369 | 最简版→pooling→message passing | ≈22% |
| 5 | 变体与设计选择 | §4 后两级 370–408 + §5 lessons 451–513 | 机制的设计维度与实证回答 | ≈17% |
| 6 | 动手实验 | §5 playground 410–449 | 把讲授构件变成可操纵杠杆 | ≈7% |
| 7 | 深水区 | §6 516–633 | 命名容器,自包含支线短文集 | ≈20% |
| 8 | 收束 | §7 634–636 | 回环 + 降格回顾 + 开门 | <1% |

说明:原文只有七个 h2;骨架第 4/5 段合起来对应 §4(五级棘轮的前三级是「机制本体」,后两级——edge 表示与 global 表示——被原文自己表述为设计维度:«Which graph attributes we update and in which order we update them is one design decision when constructing GNNs.» L384,并在 playground 里成为可开关项 L436),第 5/6 段合起来对应 §5。这个切分是本综合的抽象,写作时按此骨架排布即可。

**逐段拆解:**

**段 0|开篇承诺(≈4%)**
功能:在读者读到任何技术内容之前,完成「体裁合同 → 体验钩子 → 动机链 → 路线图 → 最小定义 → 安抚」六件事。
内部顺序:① 摘要恰好两句(领域事实句 + 本文动作句,«Neural networks have been adapted to leverage the structure and properties of graphs. We explore the components needed for building a graph neural network - and motivate the design choices behind them.» L9);② 零解释 hero 交互图(L13);③ 姊妹篇按语(L45);④ 动机五句链(普遍断言→自然定义→历史+命名→近期升级→跨域应用清单,L47);⑤ 序数词路线图 + 坡度承诺(L49);⑥ 最小定义(L51);⑦ 安抚句(L72)。
入口模板:无(首段)。
出口模板(章前桥,过渡在新章标题之前就开始):«Graphs are very flexible data structures, and if this seems abstract now, we will make it concrete with examples in the next section.»(L72)

**段 1|以已知引入(≈13%)**
功能:用例证三级阶梯(熟悉的 social networks → 反直觉的 images/text → 野外的 molecules/Othello/karate/citation)支撑「对象无处不在」的全称命题;例子按「与旧表征的距离」降序排列,换挡句显式点出排序维度。
内部拍节:承认已知→预告反直觉→双联句翻转(«We typically think of images as rectangular grids with image channels, representing them as arrays (e.g., 244x244x3 floats).» + «Another way to think of images is as graphs with regular structure, where each pixel represents a node and is connected via an edge to adjacent pixels.» L80)→最小可操作例(25 像素笑脸 L82)→句式克隆到第二对象(L92)→实践落差供认(L100)→野外数据 + 必要性收束(«This data is hard to phrase in any other way besides a graph.» L106)。
入口模板(读者熟悉度 + 反直觉预告):«You’re probably already familiar with some types of graph data, such as social networks. However, graphs are an extremely powerful and general representation of data, we will show two types of data that you might not think could be modeled as graphs: images and text.»(L76)
出口模板(recap + 问句,为任务图景开门):«We have described some examples of graphs in the wild, but what tasks do we want to perform on this data?»(L151)

**段 2|任务图景(≈8%)**
功能:把「能做什么」排成 N 元同构排比(定义句→带名字的例子/故事→交互图→类比双通道),先报数、承诺统一解法、再绕道细节。
内部拍节:报数总起(«There are three general types of prediction tasks on graphs: graph-level, node-level, and edge-level.» L151)→ 统一性先行 + 绕道宣言(L155)→ 三个严格同构的 h3 → «The remaining prediction problem in graphs is *edge prediction*.»(L184)显式封口。
入口模板:即段 1 出口的问句。
出口模板(问句 + 第一步降维):«So, how do we go about solving these different graph tasks with neural networks? The first step is to think about how we will represent graphs to be compatible with neural networks.»(L200)

**段 3|核心挑战(≈7%)**
功能:选型论证链——先立约束、替读者说出朴素方案并承认其优点、用 2–3 个精确死因(每因配图)打掉、给命名过的优雅替代、量化对比压成一句。
内部拍节:约束(«Machine learning models typically take rectangular or grid-like arrays as input.» L202)→ 难度分诊(«The first three are relatively straightforward: for example, with nodes we can form a node feature matrix $N$ by assigning each node an index $i$ and storing the feature for $node_i$ in $N$.» L202 + «However, representing a graph’s connectivity is more complicated.» L204)→ 立靶(«Perhaps the most obvious choice would be to use an adjacency matrix, since this is easily tensorisable. However, this representation has a few drawbacks.» L204)→ 正解(«One elegant and memory-efficient way of representing sparse matrices is as adjacency lists.» L226)→ Big-O 一句收尾(L228)。
入口模板:即段 2 出口。
出口模板(完成确认 + 新能力):«Now that the graph’s description is in a matrix format that is permutation invariant, we will describe using graph neural networks (GNNs) to solve graph prediction tasks.»(L241)

**段 4|核心机制(≈22%)**
功能:从最简版逐级搭建,每级 = 一个 h3,级间靠「节尾自曝钩子 → 下节缺陷回收」推进;每级内「recap+问句 → 最简情形 → 转折困境 → 命名解法+编号步骤 → 交互图/条件句 parade → 回收一句 + 暴露下一缺口」。
内部阶梯:最简 GNN(不用连通性,L245)→ pooling(预测期路由,L273)→ message passing(层内路由,L329);章首即给加粗总定义(L241)。
入口模板:即段 3 出口。
级间模板:«Note that in this simplest GNN formulation, we’re not using the connectivity of the graph at all inside the GNN layer.»(L325)→ «We could make more sophisticated predictions by using pooling within the GNN layer, in order to make our learned embeddings aware of graph connectivity.»(L329)

**段 5|变体与设计选择(≈17%)**
功能:把机制的「在哪路由、先更新谁」等设计维度显式化为 decision,并给出实证回答;被问「哪个最好」时答「无一致最优 + 各自适用场景」;结论含混就直说 mixed messages,并在混杂中拎出唯一站得住的趋势。
内部拍节:edge 表示(旧机制平移到新属性,L373)→ 设计决策句(L384)→ global 表示(缺陷引入新属性,L393–396)→ lessons:每个图表配「前置问句 + 后置观察句」(«Are there some clear GNN design choices that will give us better performance?» L453 → «The first thing to notice is that, surprisingly, a higher number of parameters does correlate with higher performance.» L465)→ 混合汇总(«The previous explorations have given mixed messages.» L497)→ 方向段(«There are many directions you could go from here to get better performance.» L509)。
入口模板:见段 4 出口钩子链。
出口模板(前向指针):«See more in Other types of graphs.»(L514)

**段 6|动手实验(≈7%)**
功能:枢纽点验证场——每个滑块/开关对应读者已读过的一节;任务选贯穿全文的旧例子(分子,首现 L108,此处毕业);给有成败判据的挑战 + 对照实验问题,下一节假定实验已做。
内部拍节:recap+问句(L412)→ 任务叙事权重 + 立刻降维(«Predicting the relation of a molecular structure (graph) to its smell is a 100 year-old problem straddling chemistry, physics, neuroscience, and machine learning.» L414 → «To simplify the problem, we consider only a single binary label per molecule» L416)→ 四个杠杆列表(L424–436)→ 预判误读(L441)→ 布置实验(L443)。
入口模板:«We’ve described a wide range of GNN components here, but how do they actually differ in practice?»(L412)
出口模板:进入深水区的容器自述(见段 7 入口)。

**段 7|深水区(≈20%)**
功能:命名容器(口语暗喻标题),收纳一切「值得讲但会打断主线」的支线;各节自包含、以开放研究问题+引用收尾;图密度显著低于主线(10 节中仅 6 节有图),视觉上也在告诉读者「这里是深水区」;继续复用主线词汇系统降低边际负荷。
入口模板(容器自述):«Next, we have a few sections on a myriad of graph-related topics that are relevant for GNNs.»(L518)
出口模板:无过渡,直接进入收束。

**段 8|收束(<1%,一段四句)**
功能:回环(复现开篇对比框架)+ 降格回顾(动词降半档、some of 收缩覆盖面)+ 交互资产复指为活的直觉工具 + 机会与情绪开门;不列要点、不复述路线图、不设 Limitations 节。
四件套逐句:① «Graphs are a powerful and rich structured data type that have strengths and challenges that are very different from those of images and text.»(L636)② «In this article, we have outlined some of the milestones that researchers have come up with in building neural network based models that process graphs.»(L636)③ «We have walked through some of the important design choices that must be made when using these architectures, and hopefully the GNN playground can give an intuition on what the empirical results of these design choices are.»(L636)④ «The success of GNNs in recent years creates a great opportunity for a wide range of new problems, and we are excited to see what the field will bring.»(L636)

---

## 三、逐字级句式库(49 条)

> 每条:句式骨架(占位符可替换任意主题)+ 原文逐字示例 + 适用场景。骨架中 [X]/[Y] 为槽位。

### A. 定义与命名(11)

**S1|关系式最小定义**
骨架:「A/An [X] represents the [关系] between [已知物甲] and [已知物乙]」,新术语放斜体括号。
例:«A graph represents the relations (*edges*) between a collection of entities (*nodes*).»(L51)
场景:全文锚概念的第一次定义;定义写成关系句而非「X is defined as」。

**S2|括号命名与别名一次建立**
骨架:「[普通语言描述] (called [全称], or [缩写])」/「[主词], or [别名]」/「[主词], also called *[别名]*」。
例:«neural networks that operate on graph data (called graph neural networks, or GNNs)»(L47);«in practice feature vectors, or embeddings, are much more useful.»(L247);«The number of GNN layers, also called the *depth*.»(L424)
场景:任何术语首现;删掉括号句子必须仍完整;别名只在首现句并列一次,此后锁死主词。

**S3|章首加粗总定义**
骨架:「**[X] is a/an [可优化类别] on [作用对象] that preserves [不变量].**」
例:«**A GNN is an optimizable transformation on all attributes of the graph (nodes, edges, global-context) that preserves graph symmetries (permutation invariances).**»(L241)
场景:每篇至多一两个,留给最核心对象;同时回答「它做什么」与「它不破坏什么」。

**S4|功能先行引入**
骨架:「A way of [做 X] is through *[工具 Y]*」
例:«A way of visualizing the connectivity of a graph is through its *adjacency matrix*.»(L82)
场景:工具/表示/机制以用途身份出场,工具名压句尾。

**S5|评价形容词正解**
骨架:「One [评价形容词] way of [做 X] is as [方案 Y]」
例:«One elegant and memory-efficient way of representing sparse matrices is as adjacency lists.»(L226)
场景:否决朴素方案之后交付真方案;形容词位内嵌取舍理由。

**S6|缺口→命名两连句**
骨架:「We need a way to [做 X]. We can do this by *[Y]*.»
例:«We need a way to collect information from edges and give them to nodes for prediction. We can do this by *pooling*.»(L273)
场景:任何新机制出场;没有缺口就不引入名词。

**S7|where 从句元素映射**
骨架:「…as a [新系统], where [旧对象甲] is/are [角色甲] and [旧对象乙] are [角色乙]」
例:«It’s a very convenient and common abstraction to describe this 3D object as a graph, where nodes are atoms and edges are covalent bonds.»(L108)
场景:视角翻转/跨域映射;类比不止说「X 像 Y」,当场列零件对应表。

**S8|命名即拆解**
骨架:「[Y] proceeds/works in N steps:」+ 冒号 + 编号列表,步骤动词斜体首现。
例:«Pooling proceeds in two steps:»(L273)/ «Message passing works in three steps:»(L331);步骤内 «For each item to be pooled, *gather* each of their embeddings and concatenate them into a matrix.»(L277)
场景:可分解机制的首段之后;同族概念用同构拆解句式建立「家族相貌」。

**S9|例后命名(归纳范畴词)**
骨架:「These are some examples of [范畴词 X], where [顺势定义]」
例:«These are some examples of inductive biases, where we are identifying symmetries or regularities in the data and adding modelling components that take advantage of these properties.»(L555)
场景:术语是从多例归纳出的范畴词时,倒置定义顺序——至少三个跨域例子之后再命名。

**S10|分类族收口**
骨架:「The remaining [类别成员] is *[X]*.»
例:«The remaining prediction problem in graphs is *edge prediction*.»(L184)
场景:N 元分类的最后一项;让读者知道序列到此为止。

**S11|操作性日常定义**
骨架:「We say [X] has “[标签]” if [可检验判据]」
例:«We say a molecule has a “pungent” scent if it has a strong, striking smell.»(L416)
场景:影响理解的日常/感知类标签,给可操作判据而非学科定义。

### B. 动机与开篇(8)

**S12|摘要两句式**
骨架:「[领域已发生的事,被动语态,旧词作主语]. We [动词1] [覆盖范围] - and [动词2] [立场/为什么].」
例:«Neural networks have been adapted to leverage the structure and properties of graphs. We explore the components needed for building a graph neural network - and motivate the design choices behind them.»(L9)
场景:任何解释文的摘要;两句为限,零数字零结论,第二动词承担立场。

**S13|普遍断言开场**
骨架:「[X] are all around us; [无法反驳的日常证据].」
例:«Graphs are all around us; real world objects are often defined in terms of their connections to other things.»(L47)
场景:动机段第一句,把主题写成世界的事实而非课程章节。

**S14|概率化读者画像**
骨架:「You’re probably already familiar with [X], such as [例子].」
例:«You’re probably already familiar with some types of graph data, such as social networks.»(L76)
场景:开讲前接管已知;probably 留有余地,画像是显式假设而非隐含背景。

**S15|反直觉预告**
骨架:「However, we will show [N] types of [对象] that you might not think could be [新表述]: [清单].」
例:«we will show two types of data that you might not think could be modeled as graphs: images and text»(L76)
场景:即将推翻读者预期时,精确点名将被颠覆的对象。

**S16|反直觉标签 + 预付回报**
骨架:「Although counterintuitive, one can [具体收益] by [新视角]」
例:«Although counterintuitive, one can learn more about the symmetries and structure of images and text by viewing them as graphs»(L76)
场景:翻转视角的价值论证;惊讶必须被显式命名并兑换成收益。

**S17|序数词路线图**
骨架:「We divide this work into N parts. First, we [读者动词]… Second, we… Third, we… Fourth and finally, we…」
例:«We divide this work into four parts. First, we look at what kind of data is most naturally phrased as a graph, and some common examples.»(L49)
场景:引言路线图;每步以读者届时在做的动作命名,不复述章节标题;支线与尾声不进入计数。

**S18|坡度承诺**
骨架:「We move gradually from a [最低起点] to a [最高终点].」
例:«We move gradually from a bare-bones implementation to a state-of-the-art GNN model.»(L49)
场景:长教程开局;明说起点多低、终点多高、移动是渐进的。

**S19|抽象安抚句**
骨架:「if this seems abstract now, we will make it concrete with examples in [何时/何地].」
例:«if this seems abstract now, we will make it concrete with examples in the next section»(L72)
场景:抽象度陡增处就地安抚;时间锚点让承诺可核对。

### C. 过渡与推进(8)

**S20|recap + 问句铰链**
骨架:「We have [已完成成果], but how [本节问题]?」
例:«We have built a simple GNN, but how do we make predictions in any of the tasks we described above?»(L264)
场景:任何节首;第一分句盘点已到手的东西,第二分句抛出本节要答的问题。

**S21|问句 + 第一步降维**
骨架:「So, how do we [大目标]? The first step is to [可立即执行的降维动作].」
例:«So, how do we go about solving these different graph tasks with neural networks? The first step is to think about how we will represent graphs to be compatible with neural networks.»(L200)
场景:从任务转向方法的交接处。

**S22|完成确认 + 新能力**
骨架:「Now that [前置条件已完成], we will [新动作].」
例:«Now that the graph’s description is in a matrix format that is permutation invariant, we will describe using graph neural networks (GNNs) to solve graph prediction tasks.»(L241)
场景:阶段交接;先确认读者已获得的能力,再宣布新阶段。

**S23|例证群换挡句**
骨架:「Let’s move on to [下一类对象].」+ 一句排序维度说明。
例:«Let’s move on to data which is more heterogeneously structured. In these examples, the number of neighbors to each node is variable (as opposed to the fixed neighborhood size of images and text).»(L106)
场景:例子群之间;过渡句就是排序键的显式化。

**S24|统一性先行 + 绕道宣言**
骨架:「we will show that all of the following [问题清单] can be solved with a single [统一物], the [X]. But first, let’s take a tour through [细节], and provide concrete examples of each.」
例:«we will show that all of the following problems can be solved with a single model class, the GNN. But first, let’s take a tour through the three classes of graph prediction problems in more detail, and provide concrete examples of each.»(L155)
场景:进入长篇细节漫游前,先亮出漫游终点的结论并预告绕道。

**S25|容器自述**
骨架:「Next, we have a few sections on [主题域] that are relevant for [主线].」
例:«Next, we have a few sections on a myriad of graph-related topics that are relevant for GNNs.»(L518)
场景:附录/深水区开场;一句自我降格,告诉读者可以止步。

**S26|节尾自曝钩子**
骨架:「Note that in this [当前最简版], we’re not using [被延迟的能力] at all…」
例:«Note that in this simplest GNN formulation, we’re not using the connectivity of the graph at all inside the GNN layer.»(L325)
场景:每节最后一句永远是为下一节挖的坑,而非总结。

**S27|缺陷回收开场**
骨架:「There is one flaw with [已建方案]: [具体缺陷,描述到读者能预感解法]」
例:«There is one flaw with the networks we have described so far: nodes that are far away from each other in the graph may never be able to efficiently transfer information to one another»(L393)
场景:下一级复杂度的登场;单数性 = 复杂度预算。

**S28|转折推进**
骨架:「However, it is not always so simple. For instance, you might have [困境场景].」
例:«However, it is not always so simple. For instance, you might have information in the graph stored in edges, but no information in nodes, but still need to make predictions on nodes.»(L273)
场景:最简情形讲完之后,用具体反例场景驱动新解法。

### D. 具体化与实例(5)

**S29|兑现句**
骨架:「To make this notion concrete, we can see [最小实例]:」(冒号引图)
例:«To make this notion concrete, we can see how information in different graphs might be represented under this specification:»(L230)
场景:抽象承诺的当场兑现;跨段兑现时先用 S19 承诺。

**S30|本域实例句**
骨架:「For example, for a [领域实例], we might want to [任务].」
例:«For example, for a molecule represented as a graph, we might want to predict what the molecule smells like, or whether it will bind to a receptor implicated in a disease.»(L161)
场景:抽象定义句后的第一例;感官细节降低理解门槛。

**S31|经典例命名句**
骨架:「A classic example of a [X] problem is [专名].」
例:«A classic example of a node-level prediction problem is Zach’s karate club.[@Zachary1977-jg]»(L173)
场景:抽象类与具体实例在同一句内完成交接;专名后可挂引用作保。

**S32|可数命题句**
骨架:「By [操作], a [对象] can [能力]: after [N], [可心算断言].」
例:«By stacking message passing GNN layers together, a node can eventually incorporate information from across the entire graph: after three layers, a node has information about the nodes three steps away from it.»(L361)
场景:把机制效果写成可数、可心算验证的命题。

**S33|假设情景句**
骨架:「We could imagine a [场景], where we wish to [目标] by [约束].」
例:«We could imagine a social network, where we wish to anonymize user data (nodes) by not using them, and only using relational data (edges).»(L271)
场景:抽象约束的场景化;把「仅边特征预测节点」这类抽象条件落成隐私保护等具体处境。

### E. 类比(4)

**S34|双通道类比句**
骨架:「This is analogous to [旧域任务], where [把类比端再解一次].」
例:«This is analogous to image classification problems with MNIST and CIFAR, where we want to associate a label to an entire image.»(L167)
场景:新任务/新机制映射到参照系学科;每个新分类维度配两个不同旧领域的锚。

**S35|类比沿用声明**
骨架:「Following the [旧域] analogy, [新任务] are analogous to *[旧域对应物]*, where …」
例:«Following the image analogy, node-level prediction problems are analogous to *image segmentation*, where we are trying to label the role of each pixel in an image.»(L180)
场景:第二类及以后;明示类比是持续调用的框架而非一次性修辞。

**S36|同族焊接句**
骨架:「This is reminiscent of [旧概念]: in essence, [X] and [Y] are operations to [共同本质].」
例:«This is reminiscent of standard convolution: in essence, message passing and convolution are operations to aggregate and process the information of an element’s neighbors in order to update the element’s value.»(L359)
场景:把新概念焊进读者已有概念网;每个新概念至少一次被叙述为旧概念的变体。

**S37|类比断点句**
骨架:「However, [新域维度] can be variable, unlike in [旧域] where [旧域性质].」
例:«However, the number of neighboring nodes in a graph can be variable, unlike in an image where each pixel has a set number of neighboring elements.»(L359)
场景:每个类比陈述之后;指出旧域成立而新域不成立的那个具体维度。

### F. hedging 与边界(8)

**S38|依赖性断言**
骨架:「The answers are going to depend on [对象]」
例:«The answers are going to depend on the data»(L453)
场景:无法判定时直说,不伪装成已有答案;可挂基准引用背书。

**S39|趋势 + 反例同句**
骨架:「[X] tend(s) to [趋势], but the same trend is not found for [最值/反例].」
例:«We can notice that models with higher dimensionality tend to have better mean and lower bound performance but the same trend is not found for the maximum.»(L475)
场景:报告经验规律;趋势与反例是同一论证单元,拆到两段读者就只记得趋势。

**S40|无一致最优**
骨架:「There is no [X] that is uniformly the best choice.」
例:«There is no operation that is uniformly the best choice.»(L570)
场景:被问「哪个最好」时的标准开局,随后逐项说明各自适用场景。

**S41|混合信号直认**
骨架:「The previous explorations have given mixed messages.»
例:同左(L497)。
场景:多组结果互相打架时直接承认,再挑出真正稳的那一条。

**S42|统计性主语防外推**
骨架:「Overall we see that the more [X], the better the [平均/中位对象].」
例:«Overall we see that the more graph attributes are communicating, the better the performance of the average model.»(L507)
场景:统计性结论必须携带统计性主语(平均、下界),把外推风险写进名词短语。

**S43|开放问题句式**
骨架:「[How to 做 X / 做 X] is an open research question/topic.[引用]」(引用置于句号后,像路标)
例:«How to sample a graph is an open research question.[@Rozemberczki2020-lq]»(L539);«Selecting and designing optimal aggregation operations is an open research topic.[@Xu2018-sf]»(L563)
场景:你答不了的问题,一句带过,后续交给文献;禁止含糊措辞伪装成答案。

**S44|实践落差声明**
骨架:「Of course, in practice, this is not usually how [对象] [被处理]: [结构性原因].」
例:«Of course, in practice, this is not usually how text and images are encoded: these graph representations are redundant»(L100)
场景:为教学而设的简化/表示引入后的短窗口内;失效归因到可见结构(对角线=链式结构)。

**S45|好坏消息对**
骨架:坏消息「Unfortunately for [场景], this quickly becomes [代价] (although [例外域]).」/ 好消息「Fortunately, [框架] is flexible enough that often [条件].」
例:«Unfortunately for large graphs, this quickly becomes computationally expensive (although this approach, called ‘virtual edges’, has been used for small graphs such as molecules).[@Gilmer2017-no]»(L394);«Fortunately, the message passing framework is flexible enough that often adapting GNNs to more complex graph structures is about defining how information is passed and updated by new graph attributes.»(L522)
场景:方案转折点;各用一次保持稀缺;坏消息必配括号让步,好消息必配条件从句。

### G. 归属(2)

**S46|引用贴术语**
骨架:「We can do this using *[术语]*[@引用], where [定义].」
例:«We can do this using *message passing*[@Gilmer2017-no], where neighboring nodes or edges exchange information and influence each other’s updated embeddings.»(L329)
场景:非你首创的名词首现;引用与术语物理相邻,不用「某某等人提出了」从句。

**S47|分级归属**
骨架:「the “[X]” framework proposed by [人名][@引用] using the [资产] introduced by [人名][@引用]」/「This concept is the basis of [X] [@引用]」
例:«We’re going to build GNNs using the “message passing neural network” framework proposed by Gilmer et al.[@Gilmer2017-no] using the Graph Nets architecture schematics introduced by Battaglia et al.[@Battaglia2018-pi]»(L241);«This concept is the basis of Graph Attention Networks (GAT) [@Velickovic2017-hf] and Set Transformers[@Lee2018-ti].»(L608)
场景:区分「提出框架/提供图示/发展想法/是某工作的基础」等不同程度的归属;并列举证时逐例挂引,不用一条引用兜底整串。

### H. 收束与开门(3)

**S48|回环句**
骨架:「[X] are a [定性] [类别] that have strengths and challenges that are very different from those of [开篇参照系].」
例:«Graphs are a powerful and rich structured data type that have strengths and challenges that are very different from those of images and text.»(L636)
场景:收束第一句;复现全篇对比框架,让文章显式闭合。

**S49|降格回顾 + 资产复指 + 开门句**
骨架:「In this article, we have outlined some of [确实做到的小事]…, and hopefully [交互资产] can give an intuition on …. The success of [领域] in recent years creates a great opportunity for [未来空间], and we are excited to see what the field will bring.»
例:«We have walked through some of the important design choices that must be made when using these architectures, and hopefully the GNN playground can give an intuition on what the empirical results of these design choices are.»+«The success of GNNs in recent years creates a great opportunity for a wide range of new problems, and we are excited to see what the field will bring.»(L636)
场景:收束中后段;回顾动词刻意降格(outlined / walked through + some of),交互资产被复指为读后仍可用的直觉工具,末句以机会从句+情绪从句开未来。

---

## 四、概念引入流程(C1–C8,文字版流程图)

```
[C1 造缺口] → [C2 命名] → [C3 拆解] → [C4 符号绑定] → [C5 双锚落地]
     → [C6 最小可操作例] → [C7 边界与断点] → [C8 复现计划(角色递进)]
        ↑______ C8 的每次复现可回到 C5/C6,换语境换锚,不换词 ______↑
```

**C1|造缺口:术语出现前 1–3 句,先让读者感到「缺一种方式做 X」。**
做法:痛点场景先行(«However, it is not always so simple. For instance, you might have information in the graph stored in edges, but no information in nodes, but still need to make predictions on nodes.» L273)或需求句直陈(«We need a way to collect information from edges and give them to nodes for prediction.» L273)。找不到任何一个「先列术语表、后讲内容」的段落。

**C2|命名:缺口句的下一句交付名词,首现斜体、别名一次收编、绰号带学名与引用。**
做法:«We can do this by *pooling*.»(L273);«One solution to this problem is by using the global representation of a graph (U) which is sometimes called a **master node** [@Battaglia2018-pi][@Gilmer2017-no] or context vector.»(L396)。命名时可用口语插入语降密度:«(or your favorite differentiable model)»(L249)。

**C3|拆解:命名后立即给「X proceeds/works in N steps:」+ 编号步骤,步骤动词斜体首现。**
做法:pooling 两步(*gather* L277 / *aggregated* L281)、message passing 三步(L331–343,复用 gather/aggregate,只新增 update)。

**C4|符号绑定:完整口头程序与图之后才引入符号,绑定句内重述语义;公式后必接自然语言回译 + 「它不是什么」。**
做法:«We represent the *pooling* operation by the letter $\rho$»(L285);回译 «the inner product is essentially “gathering” all node features values of dimension $j$” that share an edge with $node_i$»(L598);边界 «It should be noted that this message passing is not updating the representation of the node features, just pooling neighboring node features.»(L598)。

**C5|双锚落地:定义 → 本域一例 → 读者旧域类比(双通道:两个参照系各一次)。**
做法:graph-level 定义(L161)→ «For example, for a molecule represented as a graph, we might want to predict what the molecule smells like, or whether it will bind to a receptor implicated in a disease.»(L161)→ «This is analogous to image classification problems with MNIST and CIFAR, where we want to associate a label to an entire image.»(L167)+ «With text, a similar problem is sentiment analysis where we want to identify the mood or emotion of an entire sentence at once.»(L167)。

**C6|最小可操作例:小到全部情况可穷举、可交互的实例;真实数据集只用于下游验证。**
做法:25 像素笑脸(«We order the nodes, in this case each of 25 pixels in a simple 5x5 image of a smiley face» L82);4 节点图穷举全部邻接矩阵(L218);图注 «Click on an image pixel to toggle its value, and see how the graph representation changes.»(L86)。

**C7|边界与断点:教学简化自己拆穿,类比断点显式写出,命名变体降级为旁注。**
做法:实践落差(«Of course, in practice, this is not usually how text and images are encoded: these graph representations are redundant» L100);类比断点(«However, the number of neighboring nodes in a graph can be variable, unlike in an image where each pixel has a set number of neighboring elements.» L359);旁注段(«You could also call it a GNN block. Because it contains multiple operations/layers (like a ResNet block).» L251)。

**C8|复现计划:每个核心术语规划 3–8 次出场,词形冻结、语境角色逐次加深,载体沿「图注→正文→bullet→符号→交互控件→经验图表→形式化」升级。**
做法:permutation invariant 的出场序列——问题(«they are not permutation invariant» L206)→ 研究指针(L208)→ 定义中的设计目标(«preserves graph symmetries (permutation invariances)» L241)→ 约束改写与连字符形态(L561/L563)→ 场景保持性论证(L608);pooling 依次是解法(L273)→ 外链(L283)→ CNN 类比(«This is similar to *Global Average Pooling* layers in CNNs.» L308)→ 积木宣言(«This pooling technique will serve as a building block for constructing more sophisticated GNN models.» L323)→ 移入层内(L329)→ 整节深化(L559–572)。

---

## 五、图示与交互策略(G1–G10)

**G1|首屏 hero 交互图:祈使句图注 + 效果从句,零术语。**
位置在摘要之后、作者栏与正文之前;图注句式固定为「祈使动词 + 对象 + to see how + 机制描述」,只动用最低限度名词,不出现任何后文才定义的术语。锚例:«Hover over a node in the diagram below to see how it accumulates information from nodes around it through the layers of the network.»(L13)

**G2|按图型建立图注模板并冻结,系列图只换变量词。**
三联图一律「(Left) A (Center) B (Right) C」(«(Left) 3d representation of the Citronellal molecule (Center) Adjacency matrix of the bonds in the molecule (Right) Graph representation of the molecule.» L112);双面板一律「On the left we have …, on the right …」(L177);架构图一律「Schematic for/of X, which …」(«Schematic for a GCN architecture, which updates node representations of a graph by pooling neighboring nodes at a distance of one degree.» L367);性能图三段模板逐字复用仅换名词(«Chart of number of layers vs model performance, and scatterplot of model performance vs number of parameters. Each point is colored by the number of layers. Hover over a point to see the GNN architecture parameters.» L481,L491/L503 同型)。

**G3|图注自包含:定义可以写进图注,正文只留一句引导。**
有向边/无向边的完整定义(含等价性)只在图注:«Note that having a single undirected edge is equivalent to having one directed edge from $v_{src}$ to $v_{dst}$, and another directed edge from $v_{dst}$ to $v_{src}$.»(L69);(V,E,U) 记号由图注首次定义(L255)。自测:遮住正文能否读懂此图。

**G4|图注三分工:是什么(描述)/怎么玩(祈使)/注意什么(caveat);问题句 0 条。**
实测 37 条实质图注:祈使句开头 7 条、描述句+内嵌祈使 6 条、纯描述 24 条、问题句 0 条——设问全部在正文(«but how do we make predictions in any of the tasks we described above?» L264)。悬念留给正文,图注永远给答案或指令。

**G5|正文指示句(deixis)短语库 + 条件句代图注。**
指向图只用固定短语:the diagram below / the example below(«The example below shows every adjacency matrix that can describe this small graph of 4 nodes.» L218)/ 冒号收尾引图(«We can update our architecture diagram to include this new source of information for nodes:» L363)/ 超短句(«The model looks like this.» L293)。同一系统的多变体连排时,if-从句承担图注职能:«If we only have node-level features, and are trying to predict binary edge-level information, the model looks like this.»(L301)

**G6|视觉记号词汇化并冻结:颜色/形状一旦承载含义,图注即命名,后文当名词用。**
«Hover over a node (black node) to visualize which edges are gathered and aggregated to produce an embedding for that target node.»(L289);«Each point is colored by the number of layers.»(L481)。读者只为一套解码规则付一次学习成本(注:色值一致性无法从清洗版核实,见口径统一 #5)。

**G7|核心架构图是贯穿角色,逐节增量演化,每次只新增一种信息流。**
从最简 GNN 单层图(L255)→ GCN(L367)→ 消息传递层(L381)→ Graph Nets(L400)→ 三源条件化(L407),每次正文显式宣告增量(L363);唯一「一图多概念」的是变体总览图,图注明示(«Some of the different ways we might combine edge and node representation in a GNN layer.» L388)。

**G8|例子角色化:一小批例子贯穿全文,新概念优先用旧例子演示并显式回指。**
smiley(L82→L86)、Othello(L126→«For example, the Othello graph from before can be described equivalently with these two adjacency matrices.» L210→L218)、karate club(L134→L173→L177→L271)、分子(L108→L161→L313→L414,毕业为 playground 任务)。回指句式:「the X from before」「the task we specified in …」(L306)。

**G9|交互按论证功能分三类,指令动词与功能绑定;图注必须回答「做什么操作、将看到什么」。**
hover = 使不可见的依赖可见(«Hover over a node, to highlight adjacent nodes and visualize the adjacent embedding that would be pooled, updated and stored.» L353);click/edit = 读者构造与反事实(«Edit the text above to see how the graph representation changes.» L96);playground = 参数实验(«Edit the molecule to see how the prediction changes, or change the model params to load a different model. Select a different molecule in the scatter plot.» L448)。凡「过程性/分支性/组合爆炸」的内容不写长句,做成交互图,正文只留一句结论(«for larger examples like Othello, the number is untenable» L218)。

**G10|图文顺序随文体切换;图后第一段披露图的简化;数据图注自带局限与外链。**
教学节先文后图(步骤列表 L277–281 在前、hover 图 L287 在后);实证节先图后文,解读第一句固定为注意力指令(«The first thing to notice is that, surprisingly, a higher number of parameters does correlate with higher performance.» L465);图后披露:«It should be noted that the figure uses scalar values per node/edge/global, but most practical tensor representations have vectors per graph attribute.»(L237),下一节再复述一次(L247);数据图注:«Numbers are dependent on featurization decisions. More useful statistics and graphs can be found in KONECT[@Kunegis2013-er]»(L146)。图密度也标记档位:主线 37 块 vs 深水区 6 块,实证区图型整体切换为数据图。

---

## 六、认知负荷管理(L1–L8)

**L1|复杂度棘轮:每步恰好一个新概念,且增量点名三遍。**
节首声明(«We will start with the simplest GNN architecture, one where we learn new embeddings for all graph attributes (nodes, edges, global), but where we do not yet use the connectivity of the graph.» L245)→ 节末清点(«Note that in this simplest GNN formulation, we’re not using the connectivity of the graph at all inside the GNN layer. Each node is processed independently, as is each edge, as well as the global context.» L325)→ 下节 delta 句(«We could make more sophisticated predictions by using pooling within the GNN layer, in order to make our learned embeddings aware of graph connectivity.» L329)。标量→向量的升级被拆成两次独立披露(L237、L247),不与任何机制增量同时发生。

**L2|缺陷驱动过渡:不靠章节号推进,靠「当前版本的一个可命名缺陷」推进。**
«There is one flaw with the networks we have described so far»(L393)——「one flaw」的单数性是复杂度预算的直接证据;失败方案也要展示并保留其适用域(virtual edges 的括号让步,L394)。

**L3|难度分诊:N 个对象先宣布几个容易、哪个难,火力集中给唯一难的。**
«The first three are relatively straightforward: for example, with nodes we can form a node feature matrix $N$ by assigning each node an index $i$ and storing the feature for $node_i$ in $N$.»(L202)→ «However, representing a graph’s connectivity is more complicated.»(L204)。容易的合并处理只给一个例子,不让 N 个对象平均消耗笔墨。

**L4|双重编码:每个定量主张给两种表征(自然语言 + 符号/数字),并明说「另一种说法是」。**
«Another way of stating this is with Big-O notation, it is preferable to have $O(n_{edges})$, rather than $O(n_{nodes}^2)$.»(L228)。

**L5|动词预算:核心运算压缩成 4–6 个日常「物流动词」首现斜体后全程复用;新机制至多引入一个新动词。**
gather/aggregate/pool/route/update 构成动作流水线(实测 aggregate×35、update×26、pool×24、gather×9),send/receive 出现 0 次;message passing 三步复用 pooling 的 gather/aggregate,只新增 update(L331–343)。机制效果写成可数命题(L361)。

**L6|重述链:概念不是被定义一次学会的,而是被一条重述链深化——每词 3–10 次出场,每次只加一个新侧面,且新侧面来自读者此刻刚获得的能力。**
embedding:图注并列出场(L62)→ 引用语境裸用埋伏笔(«such as a word embedding of the abstract» L138)→ 可学习性(L245)→ 同位语定义(L247)→ 可观测化(«These ‘graph embeddings’ are the outputs of the GNN model right before prediction.» L438)→ PCA 可视化(L440)→ playground 可调维度。重述载体沿「图注→正文→bullet→符号→交互控件→经验图表→形式化」升级。

**L7|逃逸舱五分诊:正文一个句子只服务于构造链上的当前增量,其余一切按类型入舱。**
① 不在主干构造链上 → 整节推入命名容器(multigraphs、采样、GAT、可解释性、生成模型全住 §6,L516–632);② 开放研究问题 → 一句状态声明+引用(«Learning permutation invariant operations is an area of recent research.[@Mena2018-ce][@Murphy2018-fz]» L208);③ 别名/等价路径 → You-could-also 旁注(«You could also 1) gather messages, 3) update them and 2) aggregate them and still have a permutation invariant operation.» L345);④ 需深入对比才能下结论 → 前向指针(«For a more in-depth discussion on aggregation operations go to the Comparing aggregation operations section.» L283);⑤ 过程性/可动手验证 → 交互图承载(置换矩阵多重性 L218)。欠条开在诱惑最强的位置(L102/L157/L283/L514),不是文末统一「进一步阅读」。

**L8|检查点:交互杠杆与讲授概念一一对应;给可证伪挑战 + 对照问题;下一节假定实验已做;经验结论先划外部效度边界。**
杠杆=前文概念(层数/维度/聚合函数/消息传递开关,L424–436);挑战有成败判据(«For example, see if you can edit the molecule on the left to make the model prediction increase. Do the same edits have the same effects for different model architectures?» L443);回收(«When exploring the architecture choices above, you might have found some models have better performance than others.» L453);效度边界(«The answers are going to depend on the data, [@Dwivedi2020-xm] [@You2020-vk], and even different ways of featurizing and constructing graphs can give different answers.» L453)。

---

## 七、写作流程(从零写一篇此类文章,6 阶段)

**阶段一|立契约(写作前)**
产出:读者画像声明、两门参照系、2–3 个正交轴坐标系、标题与两句摘要、路线图(3–5 步,读者动词)、坡度承诺。
自查清单:
- [ ] 读者已会什么/不会什么写成了概率化画像句(模板 S14)?域外知识是否从零科普、前置词汇只使用不定义(锚:L47 vs L51)?
- [ ] 选定两门参照系学科,此后每个新概念都能双通道映射(S34/S35)?锚点是否零重复?
- [ ] 坐标系(如三元组)是否在第一张图标出并被后文枚举复用(锚:L55/L241/L436)?
- [ ] 标题=体裁词+主题;摘要两句=领域事实句+双动词动作句,零数字零结论(S12)?
- [ ] 路线图只承诺承重主干,尾声与支线容器不计数(S17)?写完正文要回头逐条兑现。

**阶段二|排问题链与骨架**
产出:读者将依次产生的问题清单、九段骨架排布、每段结尾的未答问题、支线容器命名。
自查清单:
- [ ] 段顺序按「读者下一秒会问什么」排,而非学科章节(P1)?每段消费上一段生产的疑问?
- [ ] 每段出口是否留了钩子(问句/自曝局限/前向指针,模板 S20–S27)?
- [ ] 例证是否排成「熟悉的→反直觉的→野外的」三级阶梯,换挡句点出排序维度(S23)?
- [ ] 支线容器起口语暗喻名,开场自贬(S25)?容器各节自包含、以开放问题收尾?

**阶段三|建概念与术语账本**
产出:术语表(主词/别名/首现句式/标记级别)、动词预算表、每个核心词的重述链计划、符号延迟绑定表、图清单(图型/图注模板/交互类型)。
自查清单:
- [ ] 每个术语的首现句是否嵌在全部由旧词构成的主句里(S1/S2/S7)?铺垫不超过三句?
- [ ] 三级标记纪律:首现斜体、全文唯一总定义粗体(S3)、复现裸用?
- [ ] 每个机制有缺口句吗(S6)?可分解机制有 N 步清单吗(S8)?
- [ ] 每个符号入场前已有不含该符号的完整句子(S4/C4)?公式后有回译与「不是什么」?
- [ ] 核心词规划了 3–8 次出场,每次绑定新语境角色(C8)?

**阶段四|起草主线**
产出:九段正文初稿。
自查清单:
- [ ] 每节首句=「上一章已给 + 读者仍缺」(S20–S28 五式轮换,避免每章都用问句开场)?
- [ ] 棘轮每级只加一个机制,节首声明/节末清点/下节 delta 三遍点名(L1)?
- [ ] 每个抽象承诺当场或指明日期兑现(S19/S29)?每个类比后跟断点(S37)?每个教学简化跟实践落差(S44)?
- [ ] 分类族用同构排比 + 报数总起 + 「The remaining [类别] is *[X]*」式收口(S10)?
- [ ] 句长节奏:短句按岗位出现(引图 «The model looks like this.» L293、转折、命名、判决、推广、路标),长句不连排?段落 1–3 句?观察指令只放在读图读数据、坦白简化、节尾自曝与换挡处(口径统一 #7)?
- [ ] 情态词定岗:can=能力、might=愿望、could=想象、would=提案、often=频率,全文不换岗(P12)?

**阶段五|设计交互与图注**
产出:hero 图、核心演化图序列、playground、全部图注。
自查清单:
- [ ] 首屏是否有零术语祈使句图注的 hero 图(G1)?
- [ ] 每类图的图注模板冻结、系列图只换变量词(G2)?遮正文自测图注自包含(G3)?
- [ ] 图注无问题句;描述/祈使/caveat 三分工(G4)?正文指示句只用固定短语库(G5)?
- [ ] 核心图每节只新增一个元素并显式宣告(G7)?例子角色化且回指(G8)?
- [ ] 交互先问论证功能(揭示/构造/比较),动词匹配功能(G9)?展示降维/统计图前先预判误读(锚:«A perfect model would visibility separate labeled data, but since we are reducing dimensionality and also have imperfect models, this boundary might be harder to see.» L441 [原文如此])?
- [ ] playground 杠杆与已讲概念一一对应;布置可证伪挑战+对照问题(L8)?下一节回收?

**阶段六|诚实与回环审计(完稿前)**
产出:修订稿。
自查清单:
- [ ] 每条经验趋势同句配反例(S39)?统计结论带统计性主语(S42)?选型问题先答「无一致最优」(S40)?结论打架直说 mixed messages(S41)?
- [ ] 每个你答不了的问题用开放问题句式+引用收尾(S43)?
- [ ] 归属核对:引用贴术语(S46)、分级归属动词(S47)、并举例证逐例挂引、图示谱系入致谢(锚:L642)?
- [ ] 引用密度按章节功能分配:教学主干每段至多一引,综述后篇可密集?
- [ ] 图的简化全部披露(G10)?对自己展示物的坦白下探到图注层级?
- [ ] 路线图每步被兑现?每章结尾钩子被下一章回收?结尾四件套齐全(S48/S49)且回环句呼应开篇对比框架?
- [ ] 术语一致性:全文 grep 同义词,确认别名只在首现句出现一次?

---

## 核对记录(本次综合实际执行)

- 原文校准:完整通读 `distill-analysis/article.md` 820+ 行(本会话 Read 全文),八份维度分析全部完整读取;文中所有 «» 引文在撰写时逐条人工对照原文行核验(行号即核对位置)。
- 计数与引文逐字校验(本会话执行):`node distill-analysis/_check_synth.mjs`(会话临时脚本,已归档为 `tools/check-synthesis.mjs`)。该脚本做两件事:① 统计本文 P/S/C/G/L 标记条数;② 提取本文全部 «» 书名号引文,逐条验证是否为 `article.md` 的逐字子串并打印失败项。要求输出:P=14、S=49、C=8、G=10、L=8(方法合计 75),且 `failures 0`。
- 过程记录:首轮校验发现 24 处非逐字用法(以省略号截断的引文、误用 «» 包裹的含占位符骨架与图注模板、核对记录内嵌命令的正则自引用),已全部改为纯逐字引文或将骨架/模板改用「」,复验以本条命令为准。
- 未执行:分节词数统计(正文总词数 9040 为 04 文档的脚本实测,本综合未重跑;2026-09 已按统一口径补做,见口径统一 #7、#8);原图色值一致性(清洗版丢失色值,无法核实,见口径统一 #5)。
