# 维度六:图示与交互的修辞角色

《A Gentle Introduction to Graph Neural Networks》写作方法论逆向工程
材料:`distill-analysis/article.md`(HTML 清洗版全文,822 行)。行号均指该文件。

**基线数据(已用脚本核实,非估计)**:全文共 **43 个图块**(`[[交互图/图示]]` 标记,`node distill-analysis/_count.js` 输出 `figure blocks: 43`),其中 **37 条有实质文字图注**、**2 条空图注**(L297、L584,图注标记后无内容)、**4 个完全无图注**(L163、L268、L303、L310)。任务描述中"80 条图注"与实测不符 —— 即使把 4 组三联图的 (Left)(Center)(Right) 逐格拆分(12 格)再加上多面板图表的分题,也远达不到 80。下文按实测 37 条归纳。另:原文节点/边的具体色值在 HTML→markdown 清洗中丢失,凡涉及颜色之处只依据文字证据(如 "(black node)"、"Each point is colored by..."),原图色值是否全文严格一致无法从本文件核实,如实注明。

---

## 哲学层 —— 写作价值观

**1. 交互是论证手段,不是装饰:让读者亲手操作出结论,代替作者口头断言。**
证据:文章的第一个命题("GNN 逐层积累邻域信息")不是写在引言里,而是放在摘要下方的 hero 交互图中,图注是一句祈使句 "Hover over a node in the diagram below to see how it accumulates information..."(L13)——读者在任何定义出现之前就先"看到"了全文核心机制。全篇 13 条含交互指令的图注全部以"动词指令 + to see/to visualize + 可观察效果"的结构收尾。推断其价值观:由读者亲手触发的现象自带证据效力,"我看到了"优于"作者说"。

**2. 图注是一等公民的教学单元,可以承载正文没有的信息,必须能脱离正文独立成立。**
证据:有向边/无向边的完整定义(含等价性论述)只出现在图注里(L69),正文只有一句 "We can additionally specialize graphs by associating directionality to edges"(L65);(V,E,U) 记号表由图注首次定义(L255);"No pooling type can always distinguish..."(L567)这条结论本身就是图注。推断其价值观:图会被单独截图、转发、引用,图注是图的自带说明书与教学正文,而非附属标签。

**3. 视觉记号一旦引入就冻结为词汇,后文直接当名词使用。**
证据:目标节点的黑色在图注中被词汇化 —— "Hover over a node (black node)"(L289);(V,E,U) 在 L255 定义后,L396 直接写 "the global representation of a graph (U)";散点图颜色编码每条图注都声明 "Each point is colored by X"(L481/L491/L503)。推断其价值观:读者只应为一套视觉解码规则付一次学习成本,此后所有图免费复用 —— 这是图层面的"术语表纪律"。

**4. 核心架构图是贯穿全文的角色,逐节增量演化,每次只新增一种信息流。**
证据:从 "A single layer of a simple GNN"(L253,不用连通性)→ GCN(L365,加邻节点池化)→ 消息传递层(L379,加边→节点)→ Graph Nets(L398,加全局)→ 三源条件化(L405),正文明说 "We can update our architecture diagram to include this new source of information for nodes:"(L363)。推断其价值观:新图里读者只需寻找"新增的那个箭头",把对比内建于图序列本身,而不是靠文字重新描述。

**5. 图必须诚实于自己的简化,可信度是交互图权威性的前提。**
证据:正文两度主动披露图的简化 —— "It should be noted that the figure uses scalar values per node/edge/global, but most practical tensor representations have vectors"(L237)、"For simplicity, the previous diagrams used scalars to represent graph attributes"(L247);统计表图注自带局限声明 "Numbers are dependent on featurization decisions."(L146);PCA 图之前先预告理想与现实的落差(L441)。推断其价值观:预先承认图的局限,反而加固图其余部分的证词效力。

**6. 图是有作者的成果,署名与出处被制度化。**
证据:Author Contributions 专列 "Adam Pearce and Emily Reif made the interactive diagrams and set up the figure aesthetics."(L648);Acknowledgments 承认 "Many of our GNN architecture diagrams are based on the Graph Nets diagram"(L642);Reuse 条款给图单设版权与 "Figure from …" 转载标记(L801)。推断其价值观:视觉层与文字层同等重要,值得专人负责、单独署名、单独授权。

---

## 操作层 —— 可执行的技法

**1. 首屏 hero 交互图:祈使句图注 + 效果从句。**
做法:摘要下方、作者栏之前放全篇第一个交互图,图注第一句就是操作指令,并说明操作后将看到什么:"Hover over a node in the diagram below to see how it accumulates information from nodes around it through the layers of the network."(L13)
迁移规则:任意主题,把你最想留下的那个机制做成可悬停/可点击的第一屏;图注句式固定为「祈使动词 + 对象 + to see how + 机制描述」。不解释术语,只描述现象。

**2. 按图型建立图注句式模板,系列图只换变量词。**
做法:三联图一律 "(Left) A (Center) B (Right) C"(L112/L118/L126/L134);双面板一律 "On the left we have..., on the right..."(L177/L195/L532);架构图一律 "Schematic for/of X, which ..."(L367/L381/L400/L407/L532/L612/L623,共 7 条);性能图共用一个三段模板 —— "Chart of [变量] vs model performance, and scatterplot of model performance vs number of parameters. Each point is colored by [变量]. Hover over a point to see the GNN architecture parameters."(L481/L491/L503 逐字复用,仅换一个名词)。
迁移规则:为你的每类图(概念图/对照图/数据图)各写一个图注模板并冻结;同一系列的第 2、3 张图照抄模板、只替换核心变量词,让读者扫一眼就知道该找什么。

**3. 图注自包含测试:把定义写进图注,正文只留一句引导。**
做法:有向边的完整定义在图注(L69),包括 "Note that having a single undirected edge is equivalent to having one directed edge from $v_{src}$ to $v_{dst}$, and another directed edge from $v_{dst}$ to $v_{src}$." —— 这条等价性正文完全没有;(V,E,U) 记号与下标含义由图注首次给出(L255)。
迁移规则:写完图注后遮住正文自测 —— 不看正文能否读懂此图?凡图所教学的核心概念,定义放图注;正文那句只负责"为什么要看这个图"。

**4. 颜色与形状编码必须在图注中词汇化。**
做法:"Hover over a node (black node) to visualize which edges..."(L289)—— 用括号把颜色钉死为记号;"Each point is colored by the number of layers."(L481)/"colored by aggregation type"(L491)/"colored by message passing"(L503)—— 每张着色图都在图注声明颜色→变量映射。
迁移规则:任何用颜色/形状/线型承载含义的图,图注必须有一句「X is colored by Y」;该命名一旦确立,全文后继图沿用同一映射,不再解释。

**5. 每张图前给一句指示句(deixis),图与文互相挂钩。**
做法:"Note that each of these three representations below are different views of the same piece of data."(L82)、"The example below shows every adjacency matrix that can describe this small graph of 4 nodes."(L218)、"We can update our architecture diagram to include this new source of information for nodes:"(L363,冒号收尾直接引图)、"The model looks like this."(L293/L301)。
迁移规则:正文指向图只用固定短语库(the diagram below / the example below / 祈使句里的 below / 冒号结尾);一个子节内多张图时,用超短句(≤6 词)逐张指认,不写"如下图所示"式的空指示。

**6. 图系列可以省略图注,用条件句当图注。**
做法:pooling 小节连续 5 张模型图(L268、L295、L303、L310)全部无图注或空图注,每张由一个 if-从句引入:"If we only have node-level features, and are trying to predict binary edge-level information, the model looks like this."(L301)
迁移规则:展示同一系统的多个变体时,让「条件句 + looks like this」承担图注职能 —— 条件本身就是两图之间的唯一差异,比图注更省字。

**7. 教学节先文后图,实证节先图后文。**
做法:前半程(概念构建)一律先在正文定义再上图 —— pooling 两步列表(L277-281)在前,hover 图(L287)在后;message passing 三步列表(L333-343)在前,图(L351)在后。playground 之后的性能图反转次序:图(L459)在前,正文解读在后,且解读句式固定:"The first thing to notice is that, surprisingly, ..."(L465)、"We can notice that..."(L475)、"Overall we see that..."(L507)。
迁移规则:讲原理时图是正文的确认(先文后图);呈现数据时图是正文的论据来源(先图后文),且解读第一句用 "The first thing to notice is..." 引导读者视线。

**8. 一图只承担一个新概念:让核心图逐节演化。**
做法:架构图序列 6 次变体,每次恰好新增一种信息流(无连通性 → 邻节点 → 边→节点 → 全局 → 三源条件化);唯一"一图多概念"的是变体汇总图,图注明示 "Some of the different ways we might combine edge and node representation"(L388)。
迁移规则:把你的核心示意图当成长期角色;每个新小节只允许它新增一个箭头/元素,并在正文用 "We can update our architecture diagram..." 显式宣告增量;多概念并列只留给"变体总览图"且在图注说明。

**9. 例子角色化:一小批例子贯穿全文,新概念用旧例子演示并显式回指。**
做法:smiley 5×5(L82→L86)、Othello(L126→L210 "the Othello graph from before"→L218)、karate club(L134→L173→L177→L271)、分子(L108→L161→L313→L414,最终毕业为 playground 任务)。回指句式:"the edge task we specified in Edge level task sub section"(L306)、"an initial graph built from the previous visual scene"(L195)。
迁移规则:开篇选定 3-4 个贯穿示例;此后每个新概念优先用已出场的老例子演示,并用 "the X from before" / "the task we specified in ..." 明写回指,不引入一次性道具例子。

**10. 交互按论证功能分三类,指令动词与功能绑定。**
做法:hover 型=使不可见的依赖可见("Hover over a node... to visualize which edges are gathered and aggregated",L289;"to highlight adjacent nodes",L353);click/edit 型=读者构造与反事实("Click on an image pixel to toggle its value, and see how the graph representation changes",L86;"Edit the text above...",L96);playground 型=参数实验("Edit the molecule to see how the prediction changes, or change the model params...",L448)。
迁移规则:设计每个交互前先问它承担哪种论证 —— 揭示(用 hover)、反驳/构造(用 click/edit)、比较(用参数面板);图注的动词必须匹配功能,且永远以 "to see how X changes / to visualize Y" 说明可观察后果。

**11. playground 的位置法则:放在全部控制杆逐一讲完之后、实证总结之前。**
做法:playground(L446)出现在最简单的 GNN、pooling、message passing、边表示、全局表示五节全部讲完之后;其四个设计杠杆(L424-436:层数、维度、聚合函数、消息传递样式)与前文小节一一对应;紧随其后的 "Some empirical GNN design lessons" 用散点图回答 playground 诱出的提问。为何是气味任务:分子例子从 L108 首次出场一路贯穿,playground 不是新例子而是旧例子的毕业典礼;且任务本身有纵深 —— "Predicting the relation of a molecular structure (graph) to its smell is a 100 year-old problem straddling chemistry, physics, neuroscience, and machine learning."(L414)
迁移规则:互动实验区放在教程的枢纽点 —— 每个滑块/开关都对应读者已读过的一节,读者是把刚学的构件第一次同时拧动;任务选贯穿全文的旧例子,让实验成为对已熟悉对象的重新审视。

**12. 布置有成功判据的具体实验,下一节回收读者的实验结果。**
做法:不止说"玩玩",而是给出可判定的任务与追问:"Play around with different model architectures to build your intuition. For example, see if you can edit the molecule on the left to make the model prediction increase. Do the same edits have the same effects for different model architectures?"(L443)下一节开头即假定读者已做过:"When exploring the architecture choices above, you might have found some models have better performance than others."(L453)
迁移规则:给读者 2-3 个"有明确成功判据"的小实验 + 一个开放式问句;后续章节用 "you might have found..." 把读者的私人实验结果接回公共论证线。

**13. 可视化之前先教"怎么读",并预判误读。**
做法:playground 之前先解释 penultimate-layer embedding、PCA 降维,再声明理想与现实的差距:"A perfect model would visibility separate labeled data, but since we are reducing dimensionality and also have imperfect models, this boundary might be harder to see."(L441)
迁移规则:凡展示降维/统计图,先写一句「理想情况下你会看到 X,但因为 Y,可能不明显」;把读者可能的过度解读提前一句话拆掉。

**14. 图后第一段主动坦白图的简化。**
做法:图(L232)之后紧接 "It should be noted that the figure uses scalar values per node/edge/global, but most practical tensor representations have vectors per graph attribute."(L237);下一节再重复一次:"For simplicity, the previous diagrams used scalars to represent graph attributes; in practice feature vectors, or embeddings, are much more useful."(L247)
迁移规则:凡图与真实情况有出入(维度假装成一维、数据被截断),在图后第一段用 "For simplicity, the figure/diagrams..." 主动交代,并在需要时升级图的保真度。

**15. 数据图注固定携带局限性声明与外部指针。**
做法:"Summary statistics on graphs found in the real world. Numbers are dependent on featurization decisions. More useful statistics and graphs can be found in KONECT"(L146);"Choice of sampling strategy depends highly on context since they will generate different distributions of graph statistics"(L546)。
迁移规则:数据图的图注末尾固定加「数字的局限 + 想深挖去哪」两句;让图注自身完成免责与导流。

**16. 问题句只入正文,不入图注。**
做法:实测 37 条图注中祈使句开头 7 条(L13/L86/L96/L234/L289/L353/L448)、描述句开头+内嵌祈使 6 条(L55/L222/L461/L481/L491/L503)、纯描述 24 条、**问题句 0 条**;而设问全部在正文:"but how do we make predictions in any of the tasks we described above?"(L264)、"but how do they actually differ in practice?"(L412)、"Are there some clear GNN design choices that will give us better performance?"(L453)。
迁移规则:图注三分工 —— 是什么(描述)/怎么玩(祈使)/注意什么(caveat);悬念与设问只放正文,图注永远给出答案或指令,不向读者留谜。

**17. 数学全部行内化:公式写进句子,下标承担语义。**
做法:全文无一个独立公式块,最长的矩阵乘法推导也嵌在句子里(L598、L602);下标自解释:$v_{src}$、$v_{dst}$、$node_{dim}$、$p_{E_n \to V_{n}}$(L285)、$O(n_{edges})$ vs $O(n_{nodes}^2)$(L228);全文唯一一句整句粗体留给 GNN 的定义(L241)。
迁移规则:入门文把每条公式写成句子的组成部分(主语/宾语),不设展示公式;记号设计让下标自己说话;全文只允许一处整句加粗,留给最核心的定义。(注:原文公式是否用颜色标注,在 markdown 清洗中不可核实。)

**18. 用图的密度与类型标记文体档位。**
做法:主干教程(至 playground 节末)37 个图块,几乎每 1-2 段一图;Into the Weeds 进阶区 9 个小节仅 6 图,其中 matrix multiplication、对偶、生成模型等小节纯文字+行内数学;图的类型也随文体切换 —— 教学区是可操作示意图,实证区全是数据图表,进阶区回到静态 schematic。
迁移规则:前半程(教)图文交替密、交互多;转折点(实证)图型整体切换为数据图;进阶附录减图,把视觉预算留给主干。

**19. 正文可以引用图作为论据来源(图→文的依赖方向)。**
做法:"From the example dataset table, we see the number of nodes in a graph can be on the order of millions, and the number of edges per node can be highly variable."(L204)—— 稀疏性论证的证据在图里,正文只是引用。
迁移规则:把数据表/结果图当论文的证据库,后文论证直接 "From the table/figure above, we see...";不要在正文复述图里的全部数字,只取论证需要的那一个。

**20. 把图的出处、作者、实现写进制度性文本。**
做法:致谢写明图的谱系(L642),贡献栏写明谁做交互图、谁定美学(L648),playground 图注外正文披露技术实现 "This playground is running live on the browser in tfjs."(L444),Reuse 条款给图单设授权(L801)。
迁移规则:在致谢/贡献/复用条款里给视觉层单列条目:图基于谁的体系、谁制作、何种许可证、代码在哪;让读者知道图是可追溯的成果。

---

## 逐字证据 —— 逐字摘引(均已脚本核验与原文完全一致)

> 校验方式:`node distill-analysis/_verify.js` 对 37 条候选引文做全文精确子串匹配,结果 `verified=37 failed=0`。引文含原文自身的拼写与标点(如 L441 的 "visibility" 系原文如此),未做任何改动。

1. "Hover over a node in the diagram below to see how it accumulates information from nodes around it through the layers of the network."(首图图注,摘要下方)→ 技法 1:hero 交互图 + 祈使句 + 效果从句。
2. "Three types of attributes we might find in a graph, hover over to highlight each attribute."(图注,序言)→ 技法 2/10:描述句打头、祈使句内嵌的混合模板。
3. "Note that having a single undirected edge is equivalent to having one directed edge from $v_{src}$ to $v_{dst}$, and another directed edge from $v_{dst}$ to $v_{src}$."(图注,序言·有向边)→ 技法 3:图注承载正文没有的等价性定义。
4. "Note that each of these three representations below are different views of the same piece of data."(正文,Images as graphs)→ 技法 5:below 指示句 + 一图多视图的元说明。
5. "Click on an image pixel to toggle its value, and see how the graph representation changes."(图注,Images as graphs)→ 技法 10:click 构造型交互,指令绑定可观察变化。
6. "Edit the text above to see how the graph representation changes."(图注,Text as graphs)→ 技法 10:edit 构造型;注意方位词 above 指向图内嵌的输入框。
7. "(Left) 3d representation of the Citronellal molecule (Center) Adjacency matrix of the bonds in the molecule (Right) Graph representation of the molecule."(图注,Graph-valued data in the wild)→ 技法 2:三联图定位词模板,逐格一句。
8. "Summary statistics on graphs found in the real world. Numbers are dependent on featurization decisions."(图注,Graph-valued data in the wild)→ 技法 15:数据图注自带局限声明。
9. "On the left we have the initial conditions of the problem, on the right we have a possible solution, where each node has been classified based on the alliance."(图注,Node-level task)→ 技法 2:左右对照 = 问题态 vs 解态。
10. "For example, the Othello graph from before can be described equivalently with these two adjacency matrices."(正文,The challenges of using graphs)→ 技法 9:旧例子的显式回指。
11. "The example below shows every adjacency matrix that can describe this small graph of 4 nodes."(正文,The challenges of using graphs)→ 技法 5:"The example below" 指示句。
12. "All of these adjacency matrices represent the same graph. Click on an edge to remove it on a "virtual edge" to add it and the matrices will update accordingly."(图注,The challenges of using graphs)→ 技法 2/10:描述 + 祈使混合;交互直接改写图与矩阵。
13. "Hover and click on the edges, nodes, and global graph marker to view and change attribute representations."(图注,The challenges of using graphs)→ 技法 10:一句图注并列两种交互动词。
14. "It should be noted that the figure uses scalar values per node/edge/global, but most practical tensor representations have vectors per graph attribute."(正文,图 L232 之后)→ 技法 14:图后第一段坦白图的简化。
15. "For simplicity, the previous diagrams used scalars to represent graph attributes; in practice feature vectors, or embeddings, are much more useful."(正文,The simplest GNN)→ 技法 14:对既往图集体的简化披露。
16. "A single layer of a simple GNN. A graph is the input, and each component (V,E,U) gets updated by a MLP to produce a new graph."(图注,The simplest GNN)→ 技法 3/4:图注首次定义 (V,E,U) 记号。
17. "Hover over a node (black node) to visualize which edges are gathered and aggregated to produce an embedding for that target node."(图注,GNN Predictions by Pooling Information)→ 技法 4:颜色词汇化 "(black node)"。
18. "If we only have node-level features, and are trying to predict binary edge-level information, the model looks like this."(正文,GNN Predictions by Pooling Information)→ 技法 6:条件句代替图注。
19. "Hover over a node, to highlight adjacent nodes and visualize the adjacent embedding that would be pooled, updated and stored."(图注,Passing messages between parts of the graph)→ 技法 10:hover 使隐藏依赖可见。
20. "We can update our architecture diagram to include this new source of information for nodes:"(正文,Passing messages between parts of the graph)→ 技法 5/8:冒号引图 + 宣告架构图的增量更新。
21. "Schematic for a GCN architecture, which updates node representations of a graph by pooling neighboring nodes at a distance of one degree."(图注,Passing messages between parts of the graph)→ 技法 2:"Schematic for X, which ..." 架构图模板。
22. "The first step "prepares" a message composed of information from an edge and it's connected nodes and then "passes" the message to the node."(图注,Learning edge representations)→ 技法 2/4:图注中的引号动词与图内标签一一对应。
23. "Schematic of a Graph Nets architecture leveraging global representations."(图注,Adding global representations)→ 技法 8:极简图注,增量已由正文承担。
24. "We've described a wide range of GNN components here, but how do they actually differ in practice?"(正文,GNN playground 开篇)→ 技法 16:设问入正文,为 playground 铺垫。
25. "Predicting the relation of a molecular structure (graph) to its smell is a 100 year-old problem straddling chemistry, physics, neuroscience, and machine learning."(正文,GNN playground)→ 技法 11:为贯穿全文的旧例子赋予任务纵深。
26. "A perfect model would visibility separate labeled data, but since we are reducing dimensionality and also have imperfect models, this boundary might be harder to see."(正文,GNN playground,PCA 图之前)→ 技法 13:预判误读("visibility" 为原文拼写)。
27. "Play around with different model architectures to build your intuition. For example, see if you can edit the molecule on the left to make the model prediction increase."(正文,GNN playground)→ 技法 12:布置有判据的具体实验。
28. "Edit the molecule to see how the prediction changes, or change the model params to load a different model. Select a different molecule in the scatter plot."(图注,playground 主图)→ 技法 10/11:一个图注枚举全部三种可操作对象。
29. "When exploring the architecture choices above, you might have found some models have better performance than others."(正文,Some empirical GNN design lessons)→ 技法 12:回收读者的实验结果。
30. "The first thing to notice is that, surprisingly, a higher number of parameters does correlate with higher performance."(正文,Some empirical GNN design lessons,图 L459 之后)→ 技法 7:先图后文的解读引导句。
31. "Chart of number of layers vs model performance, and scatterplot of model performance vs number of parameters. Each point is colored by the number of layers."(图注,Some empirical GNN design lessons)→ 技法 2/4:图表题模板 + 颜色映射声明。
32. "Each point is colored by aggregation type. Hover over a point to see the GNN architecture parameters."(图注,Some empirical GNN design lessons)→ 技法 2:同模板第 3 次复用,仅换变量词。
33. "No pooling type can always distinguish between graph pairs such as max pooling on the left and sum / mean pooling on the right."(图注,Comparing aggregation operations)→ 技法 3:图注即结论,论证性图注。
34. "From the example dataset table, we see the number of nodes in a graph can be on the order of millions, and the number of edges per node can be highly variable."(正文,The challenges of using graphs)→ 技法 19:正文引用图作论据。
35. "Many of our GNN architecture diagrams are based on the Graph Nets diagram"(Acknowledgments)→ 技法 20:图的谱系承认。
36. "Adam Pearce and Emily Reif made the interactive diagrams and set up the figure aesthetics."(Author Contributions)→ 技法 20:交互图专人署名。

---

### 图注语法总账(实测 37 条)

| 类别 | 数量 | 占比 | 例 |
|---|---|---|---|
| 祈使句开头 | 7 | 19% | Hover over a node... / Click on an image pixel... / Edit the molecule... |
| 描述句 + 内嵌祈使 | 6 | 16% | All of these adjacency matrices represent the same graph. Click on an edge... |
| 纯描述句 | 24 | 65% | Two adjacency matrices representing the same graph. |
| 问题句 | 0 | 0% | (设问全部在正文) |
| 其中含 "Schematic" 开头 | 7 | 19% | Schematic for a GCN architecture... |

自包含性:概念图/记号图高度自包含(L69、L255 连定义带定理都在图注内);系列图与数据图用极简图注(L214 仅 7 词)配合正文指示句,信息由正文补足。空图注与无图注共 6 例,全部集中在 pooling 模型图序列与子图近似图 —— 由 "the model looks like this" 类条件句代行图注职能。
