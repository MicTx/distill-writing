# 01 · 宏观结构与叙事架构
《A Gentle Introduction to Graph Neural Networks》(Distill, 2021) 写作方法论逆向工程 · 维度一

分析对象:`distill-analysis/article.md`(820 行清洗版全文)。文中所有行号均指该文件;所有英文逐字引文用 «» 包裹,核对方法见文末「核对记录」。

## 0. 结构基线(先立坐标,再谈哲学)

| # | h2(行号) | 内含 h3(行号) | 该章回答的读者问题 |
|---|---|---|---|
| 0 | 引言,无 h2(47–72) | — | 这是什么?为什么现在读? |
| 1 | Graphs and where to find them(74) | Images as graphs(78)/ Text as graphs(90)/ Graph-valued data in the wild(104) | 世界上哪里有图? |
| 2 | What types of problems have graph structured data?(149) | Graph-level(159)/ Node-level(169)/ Edge-level(182) | 图上能做什么任务? |
| 3 | The challenges of using graphs in machine learning(198) | 无 h3 | 为什么不能直接套现有网络? |
| 4 | Graph Neural Networks(239) | The simplest GNN(243)/ GNN Predictions by Pooling Information(262)/ Passing messages between parts of the graph(327)/ Learning edge representations(370)/ Adding global representations(391) | 模型怎么一层层搭出来? |
| 5 | GNN playground(410) | Some empirical GNN design lessons(451) | 这些设计选择真的重要吗? |
| 6 | Into the Weeds(516) | 10 个 h3(520/537/551/559/574/587/593/606/617/626) | 想更深的人去哪里? |
| 7 | Final thoughts(634) | — | 收束与回环 |

**问题链**:引言结尾悬置「太抽象」→ §1 承诺具体化;§1 列完数据悬置「用来干什么」→ §2 以问句开篇;§2 列完任务悬置「怎么解」→ §3 以问句开篇;§3 解决了表示悬置「模型呢」→ §4 以 Now-that 句式开篇;§4 堆完组件悬置「实际有效吗」→ §5 以问句开篇;§5 结论含混悬置「更深呢」→ §6 容器承接;§7 回到引言的对比框架收束。每一章的消费对象都是上一章生产的疑问,这是全文排序的第一原理。

---

## 哲学层

**原则 1|章节顺序服从「读者下一秒会问什么」,不服从学科知识的逻辑。**
全文排成一条问题链:数据→任务→障碍→模型→实验。教科书通常先给模型再给应用,本文反其道:读者必须先相信「图无处不在」(§1)、「图上有正经任务」(§2)、「现有工具做不了」(§3),才会关心模型(§4)的每一个设计决定。证据:主线五个 h2 的开篇句全部显式承接上一章(§2/§3/§5 直接以问句开篇,见逐字证据 A 节);引言路线图把「数据」列为 First、「模型搭建」列为 Third(article.md:49)。

**原则 2|主线是一台复杂度棘轮:每前进一步只增加一个机制,且每级末尾必须自曝缺陷。**
引言预先承诺 «We move gradually from a bare-bones implementation to a state-of-the-art GNN model.»(article.md:49)。§4 的五个 h3 恰好是五级:最简 GNN(不用连接性)→ pooling 路由信息 → message passing → edge 表示 → global 表示。每级收尾都精确指出本级「还做不到什么」——如 pooling 一节结尾的 «Note that in this simplest GNN formulation, we’re not using the connectivity of the graph at all inside the GNN layer.»(article.md:325),而下一节的标题就是这句话的答案。任何两级从不同时引入两个新机制。

**原则 3|抽象当场兑现:每个新概念出现后几行内,必须落成可交互的例子或一对类比。**
全文 43 处交互图(核对记录见文末),几乎每个定义句之后紧跟图;任务分类法(graph/node/edge-level)每类都配「图像类比 + 文本类比」双通道(图像分类/情感分析;图像分割/词性标注,article.md:167、180),用读者已有的两大参照系给新概念定位。这一价值观在引言里被直白声明:«if this seems abstract now, we will make it concrete with examples in the next section»(article.md:72)。

**原则 4|深度是可展期的债务:主线在精确位置开欠条,支线统一结算。**
主线在「正需要深度却会打断叙事」的位置开前向指针——如引入 pooling 时一句 «For a more in-depth discussion on aggregation operations go to the Comparing aggregation operations section.»(article.md:283)、任务总起处一句 «More topics can be found in the Into the weeds section»(article.md:157)——把一切延展收进一个被命名的容器(§6)。主线因此能保持「每个机制 1–3 段 + 1 张图」的浅度:全文主线数学只有两处、各压成一句(Big-O 一句 article.md:228、ρ 记号一句 article.md:285),矩阵乘法=图上行走的推导整体外迁至支线小节(article.md:593)。

**原则 5|诚实的不确定性是结构的一部分,不是需要掩盖的缺陷。**
§5 的问题(«do deeper GNN models perform better than shallower ones?» article.md:453)最终得到的答案是 «The previous explorations have given mixed messages.»(article.md:497),作者保留矛盾结论并明说 «The answers are going to depend on the data»(article.md:453)。解释文不伪造规律;「取决于数据」本身被当作一个发现来报告。

**原则 6|结构是显式承诺,排比是可数的。**
引言用序数词承诺 «We divide this work into four parts.»(article.md:49),且只承诺承重主干——四部分大致对应前五个 h2(§2、§3 合为「图有何特殊之处」,此映射为我的推断),§6 深水区与 §7 尾声不计数,承诺因此必然可兑现。排比段有总起句报数(«There are three general types of prediction tasks on graphs: graph-level, node-level, and edge-level.» article.md:151)和显式终点句(«The remaining prediction problem in graphs is *edge prediction*.» article.md:184),读者永远知道序列共几项、自己身处第几项。

---

## 操作层

**T1|把全文排成「七幕问题链」,并让顺序不可交换。**
做法:幕 0 钩子(交互 demo + 两句摘要 + 路线图 + 最小定义)→ 幕 1「是什么/哪里有」(例证三级阶梯)→ 幕 2「能做什么」(任务三分排比)→ 幕 3「难在哪」(朴素方案的精确死因)→ 幕 4「怎么做」(从最简版逐级搭建)→ 幕 5「真的吗」(可玩实验场)→ 幕 6「更多」(深度容器)→ 幕 7 回环收束。顺序的因果:幕 1 产出「用来干什么」之问、幕 2 产出「怎么解」之问、幕 3 产出「那正确做法」之问、幕 4 产出「实际有效吗」之问、幕 5 产出「更深呢」之问。任务先于模型(否则读者不知模型为何物)、障碍先于模型(否则读者不知为何要这些设计)、实验后于模型(否则无物可玩)、深水区最后(否则主线断裂)。
迁移规则:任意新技术的解释文,先列出读者将依次产生的 5–6 个问题,按问题发生顺序排章,而不是按领域章节排;每章结尾留一个未回答的问题给下一章当入口。

**T2|序数词路线图,只承诺承重主干;尾声回环兑现。**
做法:引言第三段以 «We divide this work into four parts.» 总起,随后以 First / Second / Third / Fourth and finally 四个序数词逐步展开,每步用「读者将获得什么理解」措辞而非章节标题措辞(如 «First, we look at what kind of data is most naturally phrased as a graph, and some common examples.» article.md:49);支线容器与尾声不进入计数。尾声第一句回到引言框架:«Graphs are a powerful and rich structured data type that have strengths and challenges that are very different from those of images and text.»(article.md:636)。
迁移规则:路线图 3–5 步、每步一个动词短语;写完正文后回头检查每步是否被兑现;尾声第一句必须呼应引言第一段的对比框架,让文章显式闭合。

**T3|第一屏放零解释的交互钩子;摘要两句式。**
做法:正文第一句摘要之后、作者栏之前,放一个不配任何解释文字的交互图,图注只写操作指令(«Hover over a node in the diagram below to see how it accumulates information from nodes around it through the layers of the network.» article.md:13)。摘要恰好两句:领域事实句 + 本文动作句(«Neural networks have been adapted to leverage the structure and properties of graphs.» / «We explore the components needed for building a graph neural network - and motivate the design choices behind them.» article.md:9)。
迁移规则:任何解释文,把「最小可玩切片」放在标题下第一屏;摘要 = 一件已发生的事 + 一件本文要做的事,两句为限,不写结论。

**T4|最小定义 + 「将会具体化」安抚句。**
做法:引言给出两个术语的最简定义 «A graph represents the relations (*edges*) between a collection of entities (*nodes*).»(article.md:51),紧接着承认它还太抽象并承诺兑现时间:«Graphs are very flexible data structures, and if this seems abstract now, we will make it concrete with examples in the next section.»(article.md:72)。
迁移规则:每个无法再简化的抽象定义后,跟一句「现在觉得空是正常的,第 X 节具体化」;把读者的困惑显名化,而不是假装定义已经足够。

**T5|h2 开篇过渡句五式(全集见逐字证据 A 节)。**
做法:①recap+问句(«We have described some examples of graphs in the wild, but what tasks do we want to perform on this data?» article.md:151);②问句+第一步降维(«So, how do we go about solving these different graph tasks with neural networks? The first step is to think about how we will represent graphs to be compatible with neural networks.» article.md:200);③完成确认+新能力(«Now that the graph’s description is in a matrix format that is permutation invariant, we will describe using graph neural networks (GNNs) to solve graph prediction tasks.» article.md:241);④读者熟悉度+反直觉预告(«You’re probably already familiar with some types of graph data, such as social networks.» article.md:76);⑤容器自述(«Next, we have a few sections on a myriad of graph-related topics that are relevant for GNNs.» article.md:518)。
迁移规则:写完一章后,把下一章改写成「上一章已给 + 读者仍缺」的一句话,放进新章第一句;五式可轮换,避免每章都用问句开场。

**T6|例证三级阶梯:熟悉的 → 反直觉的 → 野外的,换挡处写换挡句、讲完重构写边界句。**
做法:§1 先 social networks(读者已知),再 images/text(«we will show two types of data that you might not think could be modeled as graphs: images and text» article.md:76),换挡进野外数据时显式宣告 «Let’s move on to data which is more heterogeneously structured.»(article.md:106)并以 «This data is hard to phrase in any other way besides a graph.»(article.md:106)给出升级理由。讲完反直觉的教学表示,立刻声明工程实践并非如此:«Of course, in practice, this is not usually how text and images are encoded»(article.md:100)。
迁移规则:举例按「读者已知 → 认知重构 → 真实世界硬案例」三级排布;每级之间写一句显式换挡句;凡为教学目的夸大或简化了表示,必须跟一句「实践中其实……」的边界句。

**T7|类比双通道:每个新任务/新机制同时给出图像类比与文本类比。**
做法:graph-level 任务 → «This is analogous to image classification problems with MNIST and CIFAR, where we want to associate a label to an entire image.» + «With text, a similar problem is sentiment analysis where we want to identify the mood or emotion of an entire sentence at once.»(article.md:167);node-level → «Following the image analogy, node-level prediction problems are analogous to *image segmentation*, where we are trying to label the role of each pixel in an image.» + «With text, a similar task would be predicting the parts-of-speech of each word in a sentence»(article.md:180)。两类参照系(图像、文本)贯穿全文,后续又出现 convolution 类比(article.md:359)、Global Average Pooling 类比(article.md:308)、transformer=全连接图(article.md:615)。
迁移规则:开头就选定两门读者必然熟悉的「参照系学科」,之后每个新概念都强制做两次映射(在 A 里它像什么、在 B 里它像什么);参照系一旦选定,全文复用,不再临时引入第三个。

**T8|三分排比模板:报数总起 + 同构小节 + 「剩下的」收口。**
做法:总起句报数(article.md:151),承诺统一解法(«we will show that all of the following problems can be solved with a single model class, the GNN» article.md:155),然后三个 h3 严格同构:定义句(«In a graph-level task, our goal is to predict the property of an entire graph.» article.md:161;«Node-level tasks are concerned with predicting the identity or role of each node within a graph.» article.md:171)→ 带名字的例子/数据集/故事 → 交互图 → 类比双通道;第三小节用 «The remaining prediction problem in graphs is *edge prediction*.»(article.md:184)显式封口。
迁移规则:任何分类法介绍,先一句话报数,再给完全同构的小节(每节同位置放同类内容),末节开头用「剩下的最后一类是……」让读者知道序列到此为止。

**T9|统一性先行:先给大结论做钩子,再宣布绕道。**
做法:讲三类任务之前先宣称它们共享一个模型类,再说明要先绕道细节:«But first, let’s take a tour through the three classes of graph prediction problems in more detail, and provide concrete examples of each.»(article.md:155)。
迁移规则:在进入长篇细节漫游前,先亮出漫游终点的结论(「这些看似不同的问题将被同一个东西解决」),并显式告诉读者「我们马上要绕道,绕多久、看什么」。

**T10|选型论证链:显然方案 → 缺点清单 → 优雅替代 → 复杂度一句话。**
做法:§3 先给约束 «Machine learning models typically take rectangular or grid-like arrays as input.»(article.md:202),再立靶 «Perhaps the most obvious choice would be to use an adjacency matrix, since this is easily tensorisable. However, this representation has a few drawbacks.»(article.md:204),用两张图把两个缺点(稀疏浪费、置换不唯一)讲透,然后引出真实方案 «One elegant and memory-efficient way of representing sparse matrices is as adjacency lists.»(article.md:226),最后用一句 Big-O 收尾(article.md:228)。
迁移规则:解释任何技术选型,先替读者说出他们会想到的朴素方案并承认其优点,再列 2–3 个精确死因(每因配图或例),然后给命名过的替代方案;量化对比压成一句话,不展开推导。

**T11|章首加粗定义句。**
做法:§4 第一段内即给出一个加粗的、可独立引用的完整定义:«A GNN is an optimizable transformation on all attributes of the graph (nodes, edges, global-context) that preserves graph symmetries (permutation invariances).»(article.md:241)。
迁移规则:核心对象在章节第一段获得一句加粗定义,句式为「X 是一个……的变换/结构,它保持……」;定义里同时回答「它做什么」与「它不破坏什么」。

**T12|复杂度阶梯命名:从「最简版」命名起步,给每个机制起名字。**
做法:第一级以 «The simplest GNN» 为标题,正文重申其自我设限:«We will start with the simplest GNN architecture, one where we learn new embeddings for all graph attributes (nodes, edges, global), but where we do not yet use the connectivity of the graph.»(article.md:245)。每个新机制当场命名:«we call this a GNN layer»(article.md:249)、*pooling*、*message passing*、**master node**(«which is sometimes called a **master node**» article.md:396)、‘virtual edges’(article.md:394)。命名时夹口语降格插入语降低 intimidate 感:«(or your favorite differentiable model)»(article.md:249)。
迁移规则:渐进构建时给每一级起可引用的名字(最简版 / +X 版),新机制出现当段就命名并给别名;用一两处口语插入语(「或任何你喜欢的……」)中和术语密度。机制的效果写成可数命题,如 «after three layers, a node has information about the nodes three steps away from it»(article.md:361)。

**T13|条件句 parade:完全平行的枚举句,一句配一张图。**
做法:pooling 一节用同构句式连排三种情形,每句后紧跟一张图:«If we only have node-level features, and are trying to predict binary edge-level information, the model looks like this.»(article.md:301);«If we only have node-level features, and need to predict a binary global property, we need to gather all available node information together and aggregate them.»(article.md:308)。
迁移规则:枚举 N 种情形时,用同一个句首(「如果我们只有 X 而要预测 Y……」)逐项造句,句子本身当图的标题用;不把 N 种情形合并进一个长段落。

**T14|小节六拍内部模板(动机→例子→图示→推进的完整化)。**
做法与解剖(三例):
- §4 «GNN Predictions by Pooling Information»(262–325,六拍最全):①接住上文的问句 «We have built a simple GNN, but how do we make predictions in any of the tasks we described above?»;②最简情形先行(«for each node embedding, apply a linear classifier.» article.md:266);③转折句 «However, it is not always so simple.»(273)+ 具体困境;④命名解法 + 编号步骤 «We can do this by *pooling*. Pooling proceeds in two steps:»(273,gather/aggregate 两条列表);⑤交互图 + 条件句 parade(句句配图);⑥回收一句(«This pooling technique will serve as a building block for constructing more sophisticated GNN models.» 323)+ 暴露下一缺口一句(325)。
- §2 «Node-level task»(169–180,四拍):①定义句;②例子人格化为故事(«As the story goes, a feud between Mr. Hi (Instructor) and John H (Administrator) creates a schism in the karate club.» 173);③交互图(左初始条件、右可能解);④类比双通道(180)。
- §1 «Images as graphs»(78–88,三拍半):①熟悉框架 «We typically think of images as rectangular grids with image channels»;②重构句 «Another way to think of images is as graphs with regular structure»;③机制细节立即参数化(每非边界像素恰有 8 邻居、节点存 3 维 RGB 向量);④引入可视化工具 adjacency matrix + 交互图。
共性:小节从不以总结收尾——长节以「暴露下一层问题」收尾,短节直接让位给下一个平行小节。
迁移规则:每个小节做成「回答一个问题 + 抛出下一个问题」的闭环;答案先给最简情形再给复杂情形;例子尽量带专名与故事;任何机制描述落到可数细节(几个邻居、几维向量)。

**T15|节尾钩子句:用「Note that…」自曝局限,为下一节制造需求。**
做法:«Note that in this simplest GNN formulation, we’re not using the connectivity of the graph at all inside the GNN layer.»(article.md:325);下一级小节则把钩子接住并升级为开场缺陷陈述:«There is one flaw with the networks we have described so far: nodes that are far away from each other in the graph may never be able to efficiently transfer information to one another»(article.md:393)。
迁移规则:每节最后一句永远是为下一节挖的坑(「注意,我们到目前为止还没用到 X」),而非总结;下一节第一句以「目前方案有一个缺陷:……」回收该坑。

**T16|深度阀三件套:精确前向指针 + 命名容器 + 容器自贬开场。**
做法与解剖:
- 主线保持多浅:机制章每个 h3 约 3–8 个短段 + 1–2 张图;数学仅 Big-O 一句(228)与 ρ 记号一句(285);「图卷积=矩阵乘法=图上行走」的全部推导住在支线小节(593–604)。
- 支线承接什么(§6 十个 h3 可归五类):结构变体(Other types of graphs,520)、工程实践(Sampling and Batching,537)、理论视角(Inductive biases 551 / GCN as subgraph function approximators 574 / Edges and the Graph Dual 587 / matrix multiplications 593)、相邻模型(Graph Attention Networks 606)、开放议题(explanations 617 / generative modelling 626)。
- 如何标记可跳过:①章名本身是口语暗喻 «Into the Weeds»,开篇自贬定位 «Next, we have a few sections on a myriad of graph-related topics that are relevant for GNNs.»(518);②主线在诱惑最强的精确位置开欠条,而不是文末统一「进一步阅读»:任务总起处(157)、pooling 引入处(283)、text-as-graph 处(«See more in Graph Attention Networks.» 102)、playground 结论处(«See more in Other types of graphs.» 514);③支线各节自包含、彼此无依赖、每节以开放研究问题+引用收尾;④支线 10 节中仅 6 节有图示(520/537/559/574/606/617),交互密度显著低于主线 37 处——视觉上也在告诉读者「这里是深水区」。
迁移规则:把「值得讲但会打断主线」的一切编入一个命名的容器;主线指针写在读者刚产生好奇心、但展开会破坏节奏的那一句旁边;容器开场用一句自我降格的话(「接下来是若干零散话题……」);支线各节写成自包含短文。

**T17|粗体行内标题控制目录深度:目录只保两层。**
做法:第三层并列物不占 h3/h4,而用粗体行内标题开头:**Molecules as graphs.** / **Social networks as graphs.** / **Citation networks as graphs.** / **Other examples.**(article.md:108–140)。h2/h3 的切分判据:h2 = 读者旅程的一个阶段(需要新的旅程理由);h3 = 同一阶段内的并列情形、复杂度阶梯的下一级、或独立支线话题(能用一句话接回上一块)。
迁移规则:目录控制在两层以内;并列的清单式内容用粗体行内标题,让排比在页面上可见但不污染目录;判断一段内容该是 h3 还是 h2,问「它是否需要一个新的旅程理由」。

**T18|坐标系先行:开篇建立一个小型正交三元组,之后一切枚举沿这套坐标展开。**
做法:引言第一张图注即报出 «Three types of attributes»(节点/边/全局,article.md:55);此后任务三分(§2)、pooling 方向 parade(edges→nodes、nodes→edges、nodes→global,article.md:293–308)、message passing 开关与 playground 维度(«nodes, edges and global representation» article.md:436)全部沿同一三元组展开。
迁移规则:选 2–3 个正交轴作为全文骨架,在最前面用一张图标出;此后每个新话题都映射回这套轴,读者只需学一次坐标系,就能预判后续所有枚举的形状。

**T19|playground 三件套:百年问题开任务 + 问答-观察句式 + 混合结论汇总。**
做法:先给任务叙事重量 «Predicting the relation of a molecular structure (graph) to its smell is a 100 year-old problem straddling chemistry, physics, neuroscience, and machine learning.»(article.md:414),再立刻降维 «To simplify the problem, we consider only a single binary label per molecule»(416);每个实验发现以问句起(«Are there some clear GNN design choices that will give us better performance?» 453)以观察句式收(«The first thing to notice is that, surprisingly, a higher number of parameters does correlate with higher performance.» 465 / «We can notice that models with higher dimensionality tend to have better mean and lower bound performance» 475 / «Overall we see that the more graph attributes are communicating, the better the performance of the average model.» 507);最后诚实汇总矛盾:«The previous explorations have given mixed messages.»(497),并在混乱中拎出唯一清晰的趋势(507)。
迁移规则:实验/评测章节,任务先给宏大叙事再宣布本文只取最小切面;每个图表配「前置问句 + 后置观察句」;结论含混就直说 mixed messages,并在混杂中标注那一条最站得住的趋势。

**T20|图注写成第二人称祈使句。**
做法:交互图的图注以指令动词开头或内嵌操作指令(39 条图注中 13 条含 hover/click/edit/select/toggle 等指令,统计见核对记录):«Hover over a node in the diagram below to see how it accumulates information from nodes around it through the layers of the network.»(13)、「Click on an image pixel to toggle its value, and see how the graph representation changes.»(86)、「Edit the text above to see how the graph representation changes.»(96)、「Play around with different model architectures to build your intuition.»(443)。
迁移规则:凡交互图,图注=给读者的操作指令(悬停/点击/编辑/拖动 + 你将看到什么),而非对图表内容的客观描述;静态图才用描述式图注。

---

## 逐字证据

### A. 七个 h2 的开篇过渡句(逐字全集)

| h2 | 开篇句(逐字) | 句式 |
|---|---|---|
| §1 Graphs and where to find them(74)| «You’re probably already familiar with some types of graph data, such as social networks.» + «However, graphs are an extremely powerful and general representation of data, we will show two types of data that you might not think could be modeled as graphs: images and text.»(76)| 读者熟悉度 + 反直觉预告(T5④)|
| §2 What types of problems…(149)| «We have described some examples of graphs in the wild, but what tasks do we want to perform on this data?» + «There are three general types of prediction tasks on graphs: graph-level, node-level, and edge-level.»(151)| recap + 问句,随即报数(T5①/T8)|
| §3 The challenges…(198)| «So, how do we go about solving these different graph tasks with neural networks?» + «The first step is to think about how we will represent graphs to be compatible with neural networks.»(200)| 问句 + 第一步降维(T5②)|
| §4 Graph Neural Networks(239)| «Now that the graph’s description is in a matrix format that is permutation invariant, we will describe using graph neural networks (GNNs) to solve graph prediction tasks.»(241)| 完成确认 + 新能力(T5③)|
| §5 GNN playground(410)| «We’ve described a wide range of GNN components here, but how do they actually differ in practice?» + «This GNN playground allows you to see how these different components and architectures contribute to a GNN’s ability to learn a real task.»(412)| recap + 问句(T5①)|
| §6 Into the Weeds(516)| «Next, we have a few sections on a myriad of graph-related topics that are relevant for GNNs.»(518)| 容器自述(T5⑤)|
| §7 Final thoughts(634)| «Graphs are a powerful and rich structured data type that have strengths and challenges that are very different from those of images and text.» + «In this article, we have outlined some of the milestones that researchers have come up with in building neural network based models that process graphs.»(636)| 回环收束(T2)|

另有「章前桥」一例:§1 的 h2 出现之前,引言最后一句先完成了交接:«Graphs are very flexible data structures, and if this seems abstract now, we will make it concrete with examples in the next section.»(72)——过渡工作在新章标题之前就已开始。

### B. 结构技法引文

1. «Neural networks have been adapted to leverage the structure and properties of graphs.»——摘要(article.md:9)——T3:摘要第一句 = 领域事实句。
2. «We explore the components needed for building a graph neural network - and motivate the design choices behind them.»——摘要(article.md:9)——T3:摘要第二句 = 本文动作句。
3. «Hover over a node in the diagram below to see how it accumulates information from nodes around it through the layers of the network.»——钩子图图注(article.md:13)——T3/T20:零解释 demo + 祈使句图注。
4. «We divide this work into four parts.»——引言(article.md:49)——T2:序数词路线图总起。
5. «First, we look at what kind of data is most naturally phrased as a graph, and some common examples.»——引言(article.md:49)——T2:每步用读者理解措辞,而非章节标题措辞。
6. «We move gradually from a bare-bones implementation to a state-of-the-art GNN model.»——引言(article.md:49)——T12:复杂度棘轮的预先承诺。
7. «Fourth and finally, we provide a GNN playground where you can play around with a real-word task and dataset»——引言(article.md:49)——T2:终点步承诺可玩性。
8. «A graph represents the relations (*edges*) between a collection of entities (*nodes*).»——引言(article.md:51)——T4:两术语最小定义。
9. «Graphs are very flexible data structures, and if this seems abstract now, we will make it concrete with examples in the next section.»——引言尾(article.md:72)——T4:安抚句 + 章前桥。
10. «You’re probably already familiar with some types of graph data, such as social networks.»——§1 开篇(article.md:76)——T5④:从读者已知起步。
11. «we will show two types of data that you might not think could be modeled as graphs: images and text»——§1(article.md:76)——T6:反直觉预告。
12. «Of course, in practice, this is not usually how text and images are encoded»——§1(article.md:100)——T6:教学表示的边界句。
13. «Let’s move on to data which is more heterogeneously structured.»——§1 wild(article.md:106)——T6:三级阶梯的显式换挡句。
14. «This data is hard to phrase in any other way besides a graph.»——§1 wild(article.md:106)——T6:升级到硬案例的理由句。
15. «There are three general types of prediction tasks on graphs: graph-level, node-level, and edge-level.»——§2(article.md:151)——T8:排比报数总起。
16. «we will show that all of the following problems can be solved with a single model class, the GNN»——§2(article.md:155)——T9:统一性先行。
17. «But first, let’s take a tour through the three classes of graph prediction problems in more detail, and provide concrete examples of each.»——§2(article.md:155)——T9:绕道宣言。
18. «In a graph-level task, our goal is to predict the property of an entire graph.»——§2 Graph-level(article.md:161)——T8:同构定义句之一。
19. «Node-level tasks are concerned with predicting the identity or role of each node within a graph.»——§2 Node-level(article.md:171)——T8:同构定义句之二(与上一条句式对位)。
20. «The remaining prediction problem in graphs is *edge prediction*.»——§2 Edge-level(article.md:184)——T8:序列显式收口。
21. «This is analogous to image classification problems with MNIST and CIFAR, where we want to associate a label to an entire image.»——§2(article.md:167)——T7:类比双通道之图像侧。
22. «Following the image analogy, node-level prediction problems are analogous to *image segmentation*, where we are trying to label the role of each pixel in an image.»——§2(article.md:180)——T7:类比双通道之图像侧(第二小节,句式升级为 "Following the image analogy")。
23. «As the story goes, a feud between Mr. Hi (Instructor) and John H (Administrator) creates a schism in the karate club.»——§2 Node-level(article.md:173)——T14:数据集人格化为故事。
24. «Machine learning models typically take rectangular or grid-like arrays as input.»——§3(article.md:202)——T10:先立约束。
25. «Perhaps the most obvious choice would be to use an adjacency matrix, since this is easily tensorisable. However, this representation has a few drawbacks.»——§3(article.md:204)——T10:显然方案 + 缺点宣告。
26. «One elegant and memory-efficient way of representing sparse matrices is as adjacency lists.»——§3(article.md:226)——T10:优雅替代的命名引入。
27. «Now that the graph’s description is in a matrix format that is permutation invariant, we will describe using graph neural networks (GNNs) to solve graph prediction tasks.»——§4 开篇(article.md:241)——T5③:完成确认 + 新能力。
28. «A GNN is an optimizable transformation on all attributes of the graph (nodes, edges, global-context) that preserves graph symmetries (permutation invariances).»——§4(article.md:241)——T11:章首加粗定义句。
29. «We will start with the simplest GNN architecture, one where we learn new embeddings for all graph attributes (nodes, edges, global), but where we do not yet use the connectivity of the graph.»——§4 最简 GNN(article.md:245)——T12:地板起步 + 自我设限声明。
30. «This GNN uses a separate multilayer perceptron (MLP) (or your favorite differentiable model) on each component of a graph; we call this a GNN layer.»——§4(article.md:249)——T12:当场命名 + 口语插入语。
31. «We have built a simple GNN, but how do we make predictions in any of the tasks we described above?»——§4 pooling(article.md:264)——T14 拍①:小节以 recap+问句开。
32. «However, it is not always so simple.»——§4 pooling(article.md:273)——T14 拍③:转折推进。
33. «We can do this by *pooling*. Pooling proceeds in two steps:»——§4 pooling(article.md:273)——T14 拍④:命名解法 + 编号步骤。
34. «If we only have node-level features, and are trying to predict binary edge-level information, the model looks like this.»——§4 pooling(article.md:301)——T13:条件句 parade。
35. «If we only have node-level features, and need to predict a binary global property, we need to gather all available node information together and aggregate them.»——§4 pooling(article.md:308)——T13:parade 第二连,句式完全平行。
36. «This pooling technique will serve as a building block for constructing more sophisticated GNN models.»——§4 pooling 节尾(article.md:323)——T14 拍⑥:回收一句。
37. «Note that in this simplest GNN formulation, we’re not using the connectivity of the graph at all inside the GNN layer.»——§4 pooling 节尾(article.md:325)——T15:自曝缺口钩子,直接引出下一节 message passing。
38. «There is one flaw with the networks we have described so far: nodes that are far away from each other in the graph may never be able to efficiently transfer information to one another»——§4 global 开篇(article.md:393)——T15:下一级小节以缺陷陈述回收钩子。
39. «One solution to this problem is by using the global representation of a graph (U) which is sometimes called a **master node**»——§4(article.md:396)——T12:机制命名 + 别名。
40. «By stacking message passing GNN layers together, a node can eventually incorporate information from across the entire graph: after three layers, a node has information about the nodes three steps away from it.»——§4(article.md:361)——T12:机制效果写成可数命题。
41. «We’ve described a wide range of GNN components here, but how do they actually differ in practice?»——§5 开篇(article.md:412)——T5①:recap+问句。
42. «Predicting the relation of a molecular structure (graph) to its smell is a 100 year-old problem straddling chemistry, physics, neuroscience, and machine learning.»——§5(article.md:414)——T19:任务叙事权重。
43. «To simplify the problem, we consider only a single binary label per molecule»——§5(article.md:416)——T19:立刻降维到最小切面。
44. «Are there some clear GNN design choices that will give us better performance?»——§5 lessons(article.md:453)——T19:发现以前置问句。
45. «The first thing to notice is that, surprisingly, a higher number of parameters does correlate with higher performance.»——§5(article.md:465)——T19:观察句式收尾。
46. «Overall we see that the more graph attributes are communicating, the better the performance of the average model.»——§5(article.md:507)——T19:混乱中拎出的唯一清晰趋势。
47. «The previous explorations have given mixed messages.»——§5(article.md:497)——T19:混合结论的诚实汇总。
48. «Next, we have a few sections on a myriad of graph-related topics that are relevant for GNNs.»——§6 开篇(article.md:518)——T16:容器自贬开场。
49. «More topics can be found in the Into the weeds section»——§2 前向指针(article.md:157)——T16:主线欠条(任务总起处)。
50. «For a more in-depth discussion on aggregation operations go to the Comparing aggregation operations section.»——§4 前向指针(article.md:283)——T16:主线欠条(pooling 引入处)。
51. «See more in Other types of graphs.»——§5 前向指针(article.md:514)——T16:主线欠条(playground 结论处)。
52. «Graphs are a powerful and rich structured data type that have strengths and challenges that are very different from those of images and text.»——§7 开篇(article.md:636)——T2:尾声回环引言框架。
53. «Click on an image pixel to toggle its value, and see how the graph representation changes.»——§1 图注(article.md:86)——T20:祈使句图注。
54. «Play around with different model architectures to build your intuition.»——§5(article.md:443)——T20:祈使句直接进正文。

---

## 核对记录

- 逐字性核对:用 Node 脚本(`node distill-analysis/.tmp-check.js`,本分析会话内运行)从本文档提取全部 143 个 «» 英文引文区间,逐一验证是否为 `article.md` 原文的逐字子串。结果:**failures = 0**,全部逐字匹配;超 40 词的引文 = 0。首轮核对曾发现 12 处不匹配(11 处为我使用省略号截断的行内引文、1 处破折号两侧实为 U+2009 窄空格而非普通空格),已全部改为纯逐字引文后复验通过。
- 交互图统计(同一脚本):全文共 43 处交互图;主线(第 1–515 行)37 处;Into the Weeds(第 516–633 行)6 处,分属 6 个 h3 小节(其他图类型 530、采样 544、聚合比较 565、子图逼近 582、注意力 610、可解释性 621)。
- 图注统计:39 条图注中 13 条含显式读者操作指令(hover/click/edit/select/toggle 等);文中所引 4 条祈使句图注(13/86/96/443)均已逐字验证。
- 结构事实(h2/h3 清单、行号、小节拍节划分)均来自对 `article.md` 第 1–820 行的完整通读;「路线图四部分 ≈ 前五个 h2(§2、§3 合为第二部分)」为基于措辞的推断,已在原则 6 中标注。
