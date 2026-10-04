# 05 · 类比与具象化系统

> 分析对象:`distill-analysis/article.md`(*A Gentle Introduction to Graph Neural Networks*, Distill 2021)。
> 本文只讨论写作方法论,不复述 GNN 知识。所有英文引文均逐字复制自 article.md(为可读性去除了斜体/粗体标记与 `[@...]` 引用标记,词句与标点未作任何改动);图注引文已去掉「> 图注: 」前缀,并以(图注)标注。行号以 article.md 为准。

**事实勘误(逐字核对结果)**:任务描述中提到的「国际象棋」例子在原文中不存在(`grep -i chess` 零命中)。最接近的误记来源应是《奥赛罗》——原文 line 126 的图注是 `Image of a scene from the play “Othello”`,指莎士比亚戏剧的人物互动图,而非棋盘游戏。「人类学多样性」倒是字面成立的:空手道俱乐部数据集出自人类学期刊 *J. Anthropol. Res.*(line 693,Zachary 1977)。原文真实的例子谱系是:图像、文本、分子(Citronellal/Caffeine)、莎士比亚剧作《奥赛罗》、空手道俱乐部、引文网络、视觉场景(格斗比赛)、编程代码、数学方程、气味数据集(Leffingwell)。

---

## 〇、核心解剖:「Images as graphs / Text as graphs」的七步展开

任务第一问:如何用读者已知引入未知?作者在 "Graphs and where to find them" 一节用了一个可完整复用的七步程序(每步一句概括 + 逐字引文):

1. **承认读者的既有熟悉域**——先站到读者这边,点名他们已经会的东西:"You’re probably already familiar with some types of graph data, such as social networks."(L76)
2. **预告反直觉对象,并直说"你会觉得不可能"**——把惊讶预期亮在前面:"we will show two types of data that you might not think could be modeled as graphs: images and text"(L76)
3. **为承受反直觉支付回报**——明说翻转视角能买到什么:"Although counterintuitive, one can learn more about the symmetries and structure of images and text by viewing them as graphs"(L76)
4. **先复述旧表征,再原位翻转**——新视角必须以旧视角为参照系,同一句内完成换轨:"We typically think of images as rectangular grids with image channels, representing them as arrays (e.g., 244x244x3 floats). Another way to think of images is as graphs with regular structure, where each pixel represents a node and is connected via an edge to adjacent pixels."(L80)
5. **用最小可操作例子落地**——不是示意图,是可点击的 25 像素笑脸:"We order the nodes, in this case each of 25 pixels in a simple 5x5 image of a smiley face"(L82);图注把它变成动作:"Click on an image pixel to toggle its value, and see how the graph representation changes."(L86,图注)
6. **把同一翻转程序平行套用到第二对象**——句式克隆,证明程序可复用而非个案:"This creates a simple directed graph, where each character or index is a node and is connected via an edge to the node that follows it."(L92)
7. **供认实践落差,但保留类比的残余价值**——主动声明"实践中不这么干",用结构原因解释为什么,同时回收直觉:"Of course, in practice, this is not usually how text and images are encoded: these graph representations are redundant"(L100);"The adjacency matrix for text is just a diagonal line, because each word only connects to the prior word, and to the next one."(L100);残余价值在节首已预付:"build an intuition that will help understand other less grid-like graph data"(L76)。

这七步回答了「如何用已知引入未知」:未知不是被"解释"进来的,是被"翻转"出来的——旧表征先被完整尊重,然后同一个对象在同一句话里换上 新表征,再立刻让读者亲手操作验证,最后作者自己指出这层新衣在哪里穿不上。

---

## 一、哲学层 —— 写作价值观

1. **反直觉主张必须预付回报,并自曝其反直觉。** 原则:宣称"你想不到的 X 其实是 Y"之前,先替读者说出"你想不到",再承诺翻转视角的具体收益。为什么:作者两次在同一句内完成这两个动作(L76 "you might not think could be modeled" + "Although counterintuitive, one can learn more about the symmetries and structure"),说明其写作模型里,读者的抵抗是被预计算的成本,而非被忽略的噪音。

2. **例子的多样性本身就是论点,不是修辞装饰。** 原则:当核心主张是普适性("图无处不在"),证据必须跨域到任何一个领域都无法独占。为什么:开篇即断言 "Graphs are all around us; real world objects are often defined in terms of their connections to other things."(L47),随后例子横跨化学(分子)、文学(《奥赛罗》)、人类学(空手道俱乐部,数据集出自 J. Anthropol. Res.,L693)、科学计量(引文网络)、软件工程(代码/方程)——只有跨域取样才能支撑"普适"这一全称命题;且每个新例子都附带一句领域速成(共价键 L108、政治分裂 L173),领域知识被压缩进例子内部,读者无需出文。

3. **拟人化只负责动机,数学负责定义,两者从不同时承担定义功能。** 原则:隐喻词(消息、主人节点、稀释)可以出场,但必须在同段内兑换成编号步骤或符号。为什么:讲 message passing 时,拟人句 "neighboring nodes or edges exchange information"(L329)之后紧随三步清单 gather/aggregate/update(L335-343),且隐喻始终以括号别名形式挂在数学实体上——原文写法是 "neighboring node embeddings (or messages)"(L335),数学名词在括号外、隐喻在括号内,锚定方向不可逆。

4. **抢在读者质疑之前供认类比的失效处,并把失效本身变成教学点。** 原则:每个类比陈述后主动写明它在哪里断裂、为什么断裂。为什么:L100 承认图表征"实践中不用"之后,失效没有伤害类比,反而生产了新知识(带状/对角邻接矩阵 = 结构规整性的可视化证据);L359 讲完卷积类比立刻写 "However, the number of neighboring nodes in a graph can be variable, unlike in an image..."。失效点被系统性地用作通往下一节的门。

5. **坡度优先于全景:最简版本必须显式声明自己省略了什么。** 原则:教学性简化模型要自带"缺陷声明",递进的每一级都以上一级的缺陷开场。为什么:路线图承诺 "We move gradually from a bare-bones implementation to a state-of-the-art GNN model."(L49);"最简 GNN" 被明说 "we do not yet use the connectivity of the graph"(L245),后文再补 "Note that in this simplest GNN formulation, we’re not using the connectivity of the graph at all inside the GNN layer."(L325),直到 "There is one flaw with the networks we have described so far"(L393)引出全局表征。简化从不假装完整。

6. **同一数据坚持多表征并置,让读者在表征间自由换轨。** 原则:同一份数据至少给两种视图并排,并显式声明等价。为什么:分子、奥赛罗、空手道俱乐部的图注全部是 "(Left) 3d representation … (Center) Adjacency matrix … (Right) Graph representation"(L112/L126/L134)的固定三联句式,正文补一句 "Note that each of these three representations below are different views of the same piece of data."(L82)。类比因此不依赖单一路径:看不懂图的人走矩阵,看不懂矩阵的人走图。

---

## 二、操作层 —— 可直接执行的技法

(每条 = 作者做了什么 + 迁移规则:换成任意主题的作者如何照做。)

1. **平行"X as Y"小节族**:作者用 "Images as graphs" / "Text as graphs" 两个小节标题,随后用 "**Molecules as graphs.**" / "**Social networks as graphs.**" / "**Citation networks as graphs.**" 三个加粗段首(L78/L90/L108/L122/L138),`grep` 统计 "as graphs" 在全文出现 10 次。迁移:把核心命题"任何 X 都是 Y"物化为一组句法完全相同的小标题,让标题本身重复论点;读者扫目录即完成一次论证。

2. **「先认已知,再亮反直觉」两步过渡**:先写 "You’re probably already familiar with… such as social networks",同段再写 "we will show two types of data that you might not think could be modeled as graphs"(L76)。迁移:引入颠覆性主张前,先列举读者已有的相邻经验并归零(你们知道的只是特例),再点名即将被颠覆的对象;"probably already familiar" 是必需的缓冲垫。

3. **「通常认为…另一种看法是…」双联句**:每个新表征都以旧表征为跳板:"We typically think of images as rectangular grids… Another way to think of images is as graphs…"(L80);后文复用同一句式讲 GCN:"Another way to see GCN… is as a neural network that operates on learned embeddings of subgraphs"(L576)。迁移:任何视角翻转都写成两句连用:第一句完整陈述主流表征(带具体参数如 244x244x3),第二句以 "Another way to think of/see X is as Y, where…" 开头,where 从句立刻给出新表征的元素对应表。

4. **元素对应表内嵌于类比句**:翻转句的 where 从句给出旧对象→新对象的逐项映射:"where each pixel represents a node and is connected via an edge to adjacent pixels"(L80);"where nodes are atoms and edges are covalent bonds"(L108);"where each character or index is a node and is connected via an edge to the node that follows it"(L92)。迁移:类比永远不止说"X 像 Y",必须当场列出 X 的零件分别扮演 Y 的什么角色;零件映射不全的类比不使用。

5. **最小可操作例子(一屏原则)**:邻接矩阵用 25 像素笑脸(L82),排列爆炸用 4 节点图穷举(L218 "every adjacency matrix that can describe this small graph of 4 nodes")。迁移:每个抽象概念配一个能被完整画出的最小实例——小到全部情况可穷举、可交互;真实数据集只用于下游验证,不用于首次引入。

6. **三视图并置 + 等价声明**:同一数据固定三联(实物图/邻接矩阵/图),图注句式恒定,正文补 "different views of the same piece of data"(L82)。迁移:同一数据至少两种表征并排;图注位置编号固定(Left/Center/Right);第一次出现时用一句正文明确三者等价,此后不再解释。

7. **例子按"与旧表征的距离"排序,过渡句显式点出排序维度**:从 images/text(固定邻居数)过渡到真实图数据时写 "In these examples, the number of neighbors to each node is variable (as opposed to the fixed neighborhood size of images and text)."(L106)。迁移:例子序列按"读者旧框架能解释多少"降序排列;每组例子之间,用一句话说出前后两组在哪个维度上不同——过渡句就是排序键的显式化。

8. **用"只能如此表述"收束例子群**:讲完异质数据后断言 "This data is hard to phrase in any other way besides a graph."(L106)。迁移:例子展示的终点是一句必要性论证——前面所有例子从"可以这样表示"升级为"只能这样表示",例子群至此转化为存在性证明。

9. **任务级双向类比对照表**:每类图任务立即映射到读者已知的图像/文本任务:"This is analogous to image classification problems with MNIST and CIFAR"(L167);"Following the image analogy, node-level prediction problems are analogous to image segmentation"(L180)。迁移:为新领域的每个任务层,在读者旧领域找到严格对应物,并用同一句式("This is analogous to X, where…"/"Following the X analogy…")标定;对应物选最家喻户晓的(MNIST、图像分割、词性标注),不选最相近的。

10. **数据集叙事化**:空手道俱乐部数据集不按表格介绍,按剧情介绍:"As the story goes, a feud between Mr. Hi (Instructor) and John H (Administrator) creates a schism in the karate club."(L173)。迁移:经典数据集自带历史/人物/冲突,把它讲成一句有角色的故事("As the story goes…"),预测任务变成剧情悬念(成员会投靠谁),读者对 label 的理解从定义式变为叙事式。

11. **拟人动词加引号,标记其为教学隐喻**:图注写 "The first step “prepares” a message composed of information from an edge and it’s connected nodes and then “passes” the message to the node."(L381,图注);经验教训处写 node representations ‘diluted’(L485)。迁移:凡把数学操作说成人的动作(准备、传递、稀释),动词一律加引号,首次出现时尤其如此;引号是对读者的契约——这是隐喻,不是术语,别拿去检索文献。

12. **绰号与学名并列,绰号不单独存在**:全局向量 "which is sometimes called a master node or context vector"(L396)——绰号后面立刻跟学名,且挂两篇文献引用(L396 的 [@Battaglia2018-pi][@Gilmer2017-no])。迁移:给抽象对象起拟人绰号可以,但绰号必须与正式名以 "or" 并列出现一次,并注明绰号的文献出处,防止读者把昵当名。

13. **数学实体在前、隐喻别名在括号在后**:原文写 "gather all the neighboring node embeddings (or messages)"(L335)——括号外是数学对象,括号内才是隐喻。迁移:需要同时给直觉名和精确名时,精确名做主语、直觉名做括号注;顺序不可颠倒,否则读者会以隐喻为锚。

14. **拟人段落紧随编号算法步骤**:讲完 "neighboring nodes or edges exchange information"(L329),立刻 "Message passing works in three steps:" + gather/aggregate/update 三条列表(L331-343);pooling 同样 "Pooling proceeds in two steps:"(L273-281)。迁移:任何被拟人化描述的机制,同段或紧邻段必须给出编号步骤清单,动词换成可实现的操作(gather/aggregate/update);拟人句负责"为什么",清单负责"怎么做"。

15. **为反复出现的直觉操作分配符号**:“We represent the *pooling* operation by the letter ρ”(L285);gather 被锚定为 "the g function described above"(L335)。迁移:一旦某个直觉操作在文中出现第二次,就给它分配一个符号并显式声明("We represent X by the letter…"),此后精确讨论一律走符号,隐喻只做导引。

16. **类比断点句式「However, unlike…」**:卷积类比讲完立即划界:"However, the number of neighboring nodes in a graph can be variable, unlike in an image where each pixel has a set number of neighboring elements."(L359)。迁移:每个类比陈述后必写一句以 However/unlike 开头的断点声明,指出旧域成立而新域不成立的那个具体维度;不写断点的类比不交付。

17. **「Of course, in practice…」实践落差声明 + 结构性归因**:承认图表征冗余后,用邻接矩阵的形态解释原因:"The adjacency matrix for text is just a diagonal line, because each word only connects to the prior word, and to the next one."(L100)。迁移:为教学而简化的表征,须在引入后的短窗口内声明"实践中并非如此",且失效必须归因到简化模型自身的可见结构(对角线=链),让读者看见失效的机制而非仅被告知失效。

18. **失效后的残余价值回收**:L100 供认落差,但节首已预付 "build an intuition that will help understand other less grid-like graph data"(L76);同一落差还顺手生产新知识(带状矩阵=规整结构的证据)。迁移:每次承认类比失效,必须补一句它仍然建立的可迁移直觉是什么;失效声明永远与残余价值声明成对出现,否则读者会整体抛弃该类比。

19. **「上一版的缺陷」作为递进引擎**:每一级复杂度都以陈述当前最简版的缺口开场:"However, it is not always so simple."(L273);"There is one flaw with the networks we have described so far: nodes that are far away from each other in the graph may never be able to efficiently transfer information to one another"(L393);"Unfortunately for large graphs, this quickly becomes computationally expensive"(L394)。迁移:教学性递进不靠章节号,靠缺陷链——每节末/下节初显式列出上一版的局限,新组件以"修复者"身份登场;失败方案(virtual edges)也要展示并说明它何时仍然可用。

20. **祈使句交互图注,把"看"变成"做"**:图注全部写成操作指令:"Click on an image pixel to toggle its value, and see how the graph representation changes."(L86,图注);"Edit the text above to see how the graph representation changes."(L96,图注);"see if you can edit the molecule on the left to make the model prediction increase"(L443)。迁移:每个可视化配一句祈使句图注,动词是可执行动作(click/edit/hover/select),宾语带预期因果(see how X changes);类比的可信度由读者的操作结果背书,而非作者断言。

21. **抽象标签用日常物定义**:数据集标签 "pungent" 不用化学定义,用厨房定义:"We say a molecule has a “pungent” scent if it has a strong, striking smell. For example, garlic and mustard…"(L416),再加 "The molecule piperitone, often used for peppermint-flavored candy, is also described as having a pungent smell."(L416)。迁移:专业数据集的感知类标签,先用一句话的日常语言定义,再给两三个厨房/客厅级的实例;实例必须具体到食物、气味、场景,然后才回引数据集与专业标注者(professional perfumer)。

22. **弱断言保护非标准视角**:对"Transformer 也是一种 GNN"这类非常规读法,用 "can be considered to view text as a fully connected graph"(L102)而非断言句。迁移:借来的、有争议的或仅为教学服务的视角,用 can be considered / might be viewed / is reminiscent of 等非断言动词引入,视角的刺激性由句式的克制来平衡。

---

## 三、逐字证据 —— 逐字摘引(共 51 条)

> 全部引文经 `grep -F` 逐字校验(斜体/粗体/引用标记按上文约定去除,词句标点原样)。每条标注:所在章节 · 行号 · 示范的技法编号。

### A. 「Images as graphs / Text as graphs」展开链(→ 问题 1)

1. "You’re probably already familiar with some types of graph data, such as social networks." —— Graphs and where to find them · L76 · 技法 2(先认已知)
2. "we will show two types of data that you might not think could be modeled as graphs: images and text" —— 同上 · L76 · 技法 2(自曝反直觉)
3. "Although counterintuitive, one can learn more about the symmetries and structure of images and text by viewing them as graphs" —— 同上 · L76 · 技法 2(预付回报)+ 哲学 1
4. "We typically think of images as rectangular grids with image channels, representing them as arrays (e.g., 244x244x3 floats)." —— Images as graphs · L80 · 技法 3(先完整陈述旧表征,带具体参数)
5. "Another way to think of images is as graphs with regular structure, where each pixel represents a node and is connected via an edge to adjacent pixels." —— Images as graphs · L80 · 技法 3+4(双联句 + 元素对应表)
6. "This creates a simple directed graph, where each character or index is a node and is connected via an edge to the node that follows it." —— Text as graphs · L92 · 技法 4(同一句式克隆到第二对象,证明翻转程序可复用)
7. "Note that each of these three representations below are different views of the same piece of data." —— Images as graphs · L82 · 技法 6(多表征等价声明)
8. "Of course, in practice, this is not usually how text and images are encoded: these graph representations are redundant" —— Text as graphs(节末)· L100 · 技法 17(实践落差供认)+ 哲学 4
9. "The adjacency matrix for text is just a diagonal line, because each word only connects to the prior word, and to the next one." —— 同上 · L100 · 技法 17(失效的结构性归因:对角线=链式结构)
10. "build an intuition that will help understand other less grid-like graph data, which we will discuss later" —— Graphs and where to find them · L76 · 技法 18(残余价值声明)+ 哲学 4

### B. 例子的多样性与其选择逻辑(→ 问题 2)

11. "It’s a very convenient and common abstraction to describe this 3D object as a graph, where nodes are atoms and edges are covalent bonds." —— Molecules as graphs · L108 · 技法 4(领域例子同样走"X as a graph, where…"模板)+ 哲学 2
12. "Unlike image and text data, social networks do not have identical adjacency matrices." —— Social networks as graphs · L130 · 技法 7(例际对比句:新例子群与旧例子群在矩阵形态上被显式区分)
13. "In these examples, the number of neighbors to each node is variable (as opposed to the fixed neighborhood size of images and text)." —— Graph-valued data in the wild · L106 · 技法 7(过渡句显式点出排序维度)
14. "This data is hard to phrase in any other way besides a graph." —— 同上 · L106 · 技法 8(例子群收束为必要性论证)
15. "As the story goes, a feud between Mr. Hi (Instructor) and John H (Administrator) creates a schism in the karate club." —— Node-level task · L173 · 技法 10(数据集叙事化:有角色、有冲突、有悬念)+ 哲学 2
16. "For example with a social network, we can specify edge types based on the type of relationships (acquaintance, friend, family)." —— Other types of graphs · L524 · 技法 4(连抽象概念 multigraph 也回到社交关系三例:熟人/朋友/家人)
17. "These operations might make sense in some contexts (citation networks) and in others, these might be too strong of an operation (molecules, where a subgraph simply represents a new, smaller molecule)." —— Sampling Graphs and Batching · L539 · 技法 6(旧例子返场:同一操作在两个旧例域产生相反后果)
18. "For example, with molecules we might care about the presence or absence of particular subgraphs, while in a citation network we might care about the degree of connectedness of an article." —— Graph explanations and attributions · L619 · 技法 9(连"可解释性"这种抽象议题也双例对照)

### C. 拟人化系统:哪里拟人、哪里回到精确数学(→ 问题 3)

19. "We can do this using message passing, where neighboring nodes or edges exchange information and influence each other’s updated embeddings." —— Passing messages between parts of the graph · L329 · 技法 14(拟人动词 exchange/influence,但宾语锚定 embeddings)
20. "For each node in the graph, gather all the neighboring node embeddings (or messages), which is the g function described above." —— 同上 · L335 · 技法 13+15(数学实体在括号外、隐喻"messages"在括号内;操作即刻符号化为 g 函数)
21. "The first step “prepares” a message composed of information from an edge and it’s connected nodes and then “passes” the message to the node." —— Learning edge representations · L381(图注)· 技法 11(拟人动词加引号,标记为教学隐喻)
22. "One solution to this problem is by using the global representation of a graph (U) which is sometimes called a master node or context vector." —— Adding global representations · L396 · 技法 12(绰号 master node 与学名 context vector 以 or 并列)
23. "This global context vector is connected to all other nodes and edges in the network, and can act as a bridge between them to pass information" —— 同上 · L396 · 技法 11(bridge 隐喻;拟人句独立成段,随后即接 conditioning 的技术细节 L403)
24. "We represent the *pooling* operation by the letter ρ" —— GNN Predictions by Pooling Information · L285 · 技法 15(直觉操作分配符号,隐喻兑换为数学)
25. "This is reminiscent of standard convolution: in essence, message passing and convolution are operations to aggregate and process the information of an element’s neighbors in order to update the element’s value." —— Passing messages · L359 · 技法 22(跨域类比用 is reminiscent of 弱断言引入)
26. "However, the number of neighboring nodes in a graph can be variable, unlike in an image where each pixel has a set number of neighboring elements." —— 同上 · L359 · 技法 16(类比断点句:卷积类比在此维度失效)
27. "By stacking message passing GNN layers together, a node can eventually incorporate information from across the entire graph: after three layers, a node has information about the nodes three steps away from it." —— 同上 · L361 · 技法 14(拟人化的"知道"兑换为精确的"三层=三步")
28. "GNN with a higher number of layers will broadcast information at a higher distance and can risk having their node representations ‘diluted’ from many successive iterations" —— Some empirical GNN design lessons · L485 · 技法 11(‘diluted’ 引号隐喻 + 引文献 [@Corso2020-py] 背书)

### D. 简单→复杂的例子与模型递进链(→ 问题 4)

29. "We move gradually from a bare-bones implementation to a state-of-the-art GNN model." —— 引言(四部分路线图)· L49 · 哲学 5(坡度在开篇即被承诺)
30. "We order the nodes, in this case each of 25 pixels in a simple 5x5 image of a smiley face" —— Images as graphs · L82 · 技法 5(最小例子:25 节点,一屏可览)
31. "The example below shows every adjacency matrix that can describe this small graph of 4 nodes." —— The challenges of using graphs in ML · L218 · 技法 5(4 节点小到可穷举全部排列)
32. "We will start with the simplest GNN architecture, one where we learn new embeddings for all graph attributes (nodes, edges, global), but where we do not yet use the connectivity of the graph." —— The simplest GNN · L245 · 技法 19(最简版自带"省略声明")+ 哲学 5
33. "Note that in this simplest GNN formulation, we’re not using the connectivity of the graph at all inside the GNN layer." —— GNN Predictions by Pooling Information(节末)· L325 · 技法 19(简化在告别时再次自白,为 message passing 铺垫)
34. "However, it is not always so simple. For instance, you might have information in the graph stored in edges, but no information in nodes, but still need to make predictions on nodes." —— GNN Predictions by Pooling Information · L273 · 技法 19(缺口陈述 + 具体反例场景驱动 pooling 登场)
35. "There is one flaw with the networks we have described so far: nodes that are far away from each other in the graph may never be able to efficiently transfer information to one another" —— Adding global representations · L393 · 技法 19(缺陷链:全局表征以修复者身份登场)
36. "Unfortunately for large graphs, this quickly becomes computationally expensive" —— 同上 · L394 · 技法 19(情感词 Unfortunately 标记失败方案,但括号内保留其适用域 small graphs/molecules)
37. "We could imagine a social network, where we wish to anonymize user data (nodes) by not using them, and only using relational data (edges)." —— GNN Predictions by Pooling Information · L271 · 技法 10(假设情景句 We could imagine…,把抽象的"仅边特征预测节点"落地为隐私场景)
38. "We say a molecule has a “pungent” scent if it has a strong, striking smell." —— GNN playground · L416 · 技法 21(抽象标签的日常语言定义)
39. "The molecule piperitone, often used for peppermint-flavored candy, is also described as having a pungent smell." —— GNN playground · L416 · 技法 21(厨房级实例:薄荷糖)
40. "This is analogous to image classification problems with MNIST and CIFAR, where we want to associate a label to an entire image." —— Graph-level task · L167 · 技法 9(任务级类比锚定到最家喻户晓的基准)
41. "Following the image analogy, node-level prediction problems are analogous to image segmentation, where we are trying to label the role of each pixel in an image." —— Node-level task · L180 · 技法 9("Following the image analogy" 显式声明类比正在被沿用)

### E. 类比失效的承认与补救(→ 问题 5)

42. "other models, such as Transformers, can be considered to view text as a fully connected graph where we learn the relationship between tokens" —— Text as graphs(补注)· L102 · 技法 22(弱断言 can be considered 保护非标准读法;承认"文本即链式图"并非唯一表征)
43. "The previous explorations have given mixed messages." —— Some empirical GNN design lessons · L497 · 技法 19/哲学 4(经验规则的失效被如实呈现:反例与趋势并列)
44. "Another way to see GCN (and MPNN) of k-layers with a 1-degree neighbor lookup is as a neural network that operates on learned embeddings of subgraphs of size k." —— GCN as subgraph function approximators · L576 · 技法 3(同一"Another way to see X as Y"句式在文章末段仍在复用,证明其为全篇骨架句式)
45. "A graph and its dual contain the same information, just expressed in a different way. Sometimes this property makes solving problems easier in one representation than another, like frequencies in Fourier space." —— Edges and the Graph Dual · L591 · 技法 6+22(多表征等价 + 远域类比 Fourier,一笔带过不展开)
46. "The difference lies in the assumed pattern of connectivity between entities, a GNN is assuming a sparse pattern and the Transformer is modelling all connections." —— Graph Attention Networks · L615 · 技法 16(两个被类比为同一物的模型,最终以一个差异维度收束对比)
47. "we want to take advantage of the fact that a dog is still a dog whether it is in the top-left or bottom-right corner of an image" —— Inductive biases · L555 · 技法 4(最抽象的性质——平移不变性——用一条狗的两个位置表达)
48. "Click on an image pixel to toggle its value, and see how the graph representation changes." —— Images as graphs · L86(图注)· 技法 20(祈使句图注:类比由读者操作验证)
49. "Edit the text above to see how the graph representation changes." —— Text as graphs · L96(图注)· 技法 20(同一祈使句模板克隆)
50. "For example, see if you can edit the molecule on the left to make the model prediction increase." —— GNN playground · L443 · 技法 20(把验证升级为挑战式任务:see if you can…)
51. "(Left) 3d representation of the Citronellal molecule (Center) Adjacency matrix of the bonds in the molecule (Right) Graph representation of the molecule." —— Molecules as graphs · L112(图注)· 技法 6(三视图图注的固定句式,分子/奥赛罗/空手道三例共用)

> 说明:以上共 51 条(A 组 10 条、B 组 8 条、C 组 10 条、D 组 13 条、E 组 10 条),全部不超过 40 词,超出任务要求的最低数量(≥12 条、句式维度 ≥18 条)。所有引文均在 2026-09-29 会话中以 `grep -F` 逐字校验通过(仅第 20 条因原文斜体标记 `*gather*` 首次未命中,复核 L335 原行后确认词句逐字一致)。

---

## 附:五个维度问题的结论速查

| 问题 | 结论 | 关键证据 |
|---|---|---|
| images/text as graphs 如何展开 | 七步程序:认已知→自曝反直觉→预付回报→双联句翻转→最小可操作例→句式克隆到第二对象→供认落差并回收残余价值 | §〇;L76/80/82/86/92/100 |
| 例子的选择逻辑 | 普适性论点要求跨域取样;例子按"与旧表征的距离"降序排列;每个例子自带一句领域速成;旧例子反复返场承担新论证功能 | 哲学 2;技法 7/6/8;L106/108/130/173/539 |
| 拟人化边界 | 拟人只做动机:隐喻动词加引号、绰号并列学名、数学实体在括号外隐喻在括号内、拟人段后必跟编号步骤与符号化(ρ、g) | 哲学 3;技法 11-15;L329/335/381/396 |
| 简单→复杂坡度 | 数据规模链(25 像素→4 节点→剧作→真实数据集)与模型链(最简 GNN→pooling→message passing→edge→global→playground)同步爬坡,衔接机制是"上一版的缺陷"开场 | 哲学 5;技法 19;L49/82/218/245/325/393 |
| 类比失效是否承认、如何补救 | 系统性承认:实践落差(Of course, in practice…)、类比断点(However, unlike…)、经验反例(mixed messages);补救=结构性归因+残余价值声明+弱断言保护 | 哲学 4;技法 16-18/22;L100/359/394/497 |
