# 逐字级句式库(49 条)

> 何时读本册:起草与逐句打磨时;任何「这句话怎么写」的问题。按需检索正在写的那类句子(先扫一遍各条的粗体标题行,再细读用得上的几条),不必逐条对照;只写中文时看每条的「中文:」和「场景」即可,英文骨架与锚例拿不准用法时再看;动笔前先读文末「中文适配」。每条 = 英文骨架([X]/[Y] 为槽位,任意主题可替换)+ 中文骨架(按中文语序重写,不是逐词直译)+ 出处文章逐字锚例(«…»,保留原文斜体 `*…*`、粗体、`$数学$`、`[@引用]` 标记与弯引号弯撇号;§ 为出处小节,简称见 SKILL.md)+ 适用场景。锚例示范句式,不示范内容。
>
> 分组:A 定义与命名 / B 动机与开篇 / C 过渡与推进 / D 具体化与实例 / E 类比 / F hedging 与边界 / G 归属 / H 收束与开门。文末附句子工艺规则(情态、节奏、主语、动词预算)与中文适配。

## A. 定义与命名(11 条)

**S1|关系式最小定义**
骨架:「A/An [X] represents the [关系] between [已知物甲] and [已知物乙]」,新术语放斜体括号。
中文:「[X] 描述的是 [一组已知物](**[术语乙]**)之间的 [关系](**[术语甲]**)。」——用关系句,不用「X 是指……的一种……」式长定语。
锚例:«A graph represents the relations (*edges*) between a collection of entities (*nodes*).»(§引言·最小定义)
场景:全文锚概念的第一次定义。定义写成关系句,而非「X is defined as」。

**S2|括号命名与别名一次建立**
骨架:「[普通语言描述] (called [全称], or [缩写])」/「[主词], or [别名]」/「[主词], also called *[别名]*」。
中文:「[普通描述](称为 [全称],简称 [缩写])」/「[主词](也叫 **[别名]**)」;此后只用主词。
锚例:«neural networks that operate on graph data (called graph neural networks, or GNNs)»(§引言);«in practice feature vectors, or embeddings, are much more useful.»(§机制);«The number of GNN layers, also called the *depth*.»(§实验)
场景:任何术语首现。删掉括号句子必须仍完整;别名只在首现句并列一次,此后锁死主词。

**S3|章首加粗总定义**
骨架:「**[X] is a/an [可优化类别] on [作用对象] that preserves [不变量].**」
中文:「**[X] 是一种作用于 [对象] 的 [可优化类别]:它 [做什么],但不改变 [不变量]。**」
锚例:«**A GNN is an optimizable transformation on all attributes of the graph (nodes, edges, global-context) that preserves graph symmetries (permutation invariances).**»(§机制·章首)
场景:全文至多一处(出处文章恰好一处),留给最核心的对象;同时回答「它做什么」与「它不破坏什么」。

**S4|功能先行引入**
骨架:「A way of [做 X] is through *[工具 Y]*」
中文:「要 [做 X],一种办法是借助 **[工具 Y]**。」——工具名照样压在句尾。
锚例:«A way of visualizing the connectivity of a graph is through its *adjacency matrix*.»(§以已知引入)
场景:工具/表示/机制以用途身份出场,工具名压句尾。

**S5|评价形容词正解**
骨架:「One [评价形容词] way of [做 X] is as [方案 Y]」
中文:「[做 X] 有一种 [既省内存又优雅] 的办法:[方案 Y]。」
锚例:«One elegant and memory-efficient way of representing sparse matrices is as adjacency lists.»(§挑战)
场景:否决朴素方案之后交付真方案;形容词位内嵌取舍理由。

**S6|缺口→命名两连句**
骨架:「We need a way to [做 X]. We can do this by *[Y]*.»
中文:「我们需要一种办法,[做 X]。答案是 **[Y]**。」
锚例:«We need a way to collect information from edges and give them to nodes for prediction. We can do this by *pooling*.»(§机制)
场景:任何新机制出场;没有缺口就不引入名词。

**S7|where 从句元素映射**
骨架:「…as a [新系统], where [旧对象甲] is/are [角色甲] and [旧对象乙] are [角色乙]」
中文:「把 [对象] 看成 [新系统]:[旧对象甲] 是 [角色甲],[旧对象乙] 是 [角色乙]。」——用冒号加逗号分句列对应,不要译成长定语。
锚例:«It’s a very convenient and common abstraction to describe this 3D object as a graph, where nodes are atoms and edges are covalent bonds.»(§例证)
场景:视角翻转/跨域映射;类比不止说「X 像 Y」,当场列零件对应表。

**S8|命名即拆解**
骨架:「[Y] proceeds/works in N steps:」+ 冒号 + 编号列表,步骤动词斜体首现。
中文:「[Y] 分 N 步:」+ 编号清单,步骤动词首现加标记。
锚例:«Pooling proceeds in two steps:»(§机制)/ «Message passing works in three steps:»(§机制);步骤内 «For each item to be pooled, *gather* each of their embeddings and concatenate them into a matrix.»
场景:可分解机制的首段之后;同族概念用同构拆解句式,建立「家族相貌」。

**S9|例后命名(归纳范畴词)**
骨架:「These are some examples of [范畴词 X], where [顺势定义]」
中文:「这些都是 **[范畴词 X]** 的例子:[顺势定义]。」
锚例:«These are some examples of inductive biases, where we are identifying symmetries or regularities in the data and adding modelling components that take advantage of these properties.»(§容器)
场景:术语是从多例归纳出的范畴词时,倒置定义顺序——至少三个跨域例子之后再命名。

**S10|分类族收口**
骨架:「The remaining [类别成员] is *[X]*.」
中文:「最后一类是 **[X]**。」
锚例:«The remaining prediction problem in graphs is *edge prediction*.»(§任务)
场景:N 元分类的最后一项;让读者知道序列到此为止。

**S11|操作性日常定义**
骨架:「We say [X] has “[标签]” if [可检验判据]」
中文:「所谓『[标签]』,这里指 [可检验判据]。」/「如果 [判据],我们就说它『[标签]』。」
锚例:«We say a molecule has a “pungent” scent if it has a strong, striking smell.»(§实验)
场景:影响理解的日常/感知类标签,给可操作判据而非学科定义。

## B. 动机与开篇(8 条)

**S12|摘要两句式**
骨架:「[领域已发生的事,被动语态,旧词作主语]. We [动词1] [覆盖范围] - and [动词2] [立场/为什么].」
中文:「[旧词作主语的领域事实]。我们 [动词1] [覆盖范围],并 [动词2] [立场/为什么]。」——主语用「我们」,不用「本文」;动词要具体,不用「梳理」「阐述」「探讨」。锚例的中文写法:「神经网络如今已能利用图的结构与性质。我们把搭一个图神经网络要用的零件逐个拆开,并讲清每个设计为什么这样选。」
锚例:«Neural networks have been adapted to leverage the structure and properties of graphs. We explore the components needed for building a graph neural network - and motivate the design choices behind them.»(摘要)
场景:有摘要位(标题下导语、公众号摘要栏)时的摘要;两句为限,零数字零结论,第二动词承担立场。没有摘要位时不必硬写,开头第一段负责钩子与路线图。

**S13|普遍断言开场**
骨架:「[X] are all around us; [无法反驳的日常证据].」
中文:「[X] 无处不在:[无法反驳的日常证据]。」
锚例:«Graphs are all around us; real world objects are often defined in terms of their connections to other things.»(§引言)
场景:动机段第一句,把主题写成世界的事实而非课程章节。

**S14|概率化读者画像**
骨架:「You’re probably already familiar with [X], such as [例子].」
中文:「你大概已经熟悉 [X],比如 [例子]。」
锚例:«You’re probably already familiar with some types of graph data, such as social networks.»(§以已知引入)
场景:开讲前接管已知;probably 留有余地,画像是显式假设而非隐含背景。

**S15|反直觉预告**
骨架:「However, we will show [N] types of [对象] that you might not think could be [新表述]: [清单].」
中文:「不过,下面有 [N] 种 [对象],你大概想不到它们也能 [新表述]:[清单]。」
锚例:«we will show two types of data that you might not think could be modeled as graphs: images and text»(§以已知引入)
场景:即将推翻读者预期时,精确点名将被颠覆的对象。

**S16|反直觉标签 + 预付回报**
骨架:「Although counterintuitive, one can [具体收益] by [新视角]」
中文:「这听上去反直觉,但把 [对象] 看成 [新视角],能让我们 [具体收益]。」
锚例:«Although counterintuitive, one can learn more about the symmetries and structure of images and text by viewing them as graphs»(§以已知引入)
场景:翻转视角的价值论证;惊讶必须被显式命名并兑换成收益。

**S17|序数词路线图**
骨架:「We divide this work into N parts. First, we [读者动词]… Second, we… Third, we… Fourth and finally, we…」
中文:「下面分 N 步走:先 [读者动作],再 [……],最后 [……]。」——不写「第一,我们……第二,我们……」的公文腔;短文一句话就够。
锚例:«We divide this work into four parts. First, we look at what kind of data is most naturally phrased as a graph, and some common examples.»(§引言)
场景:引言路线图;每步以读者届时在做的动作命名,不复述章节标题。只数主干各段:开篇本身、深水区容器和收束不进入计数(出处文章的四步是:哪些数据天然是图、图与其他数据有何不同、从零搭建模型、动手实验场;引言、深水区与收束都不在其中)。

**S18|坡度承诺**
骨架:「We move gradually from a [最低起点] to a [最高终点].」
中文:「我们从最简陋的 [起点] 出发,一步步走到 [终点]。」
锚例:«We move gradually from a bare-bones implementation to a state-of-the-art GNN model.»(§引言)
场景:长教程开局;明说起点多低、终点多高、移动是渐进的。

**S19|抽象安抚句**
骨架:「if this seems abstract now, we will make it concrete with examples in [何时/何地].」
中文:「如果现在觉得抽象,[下一节/某处] 会用例子把它讲具体。」
锚例:«if this seems abstract now, we will make it concrete with examples in the next section»(§引言尾)
场景:抽象度陡增处就地安抚;写明在哪兑现(下一节/某一节),读者才能核对承诺。

## C. 过渡与推进(9 条)

**S20|recap + 问句铰链**
骨架:「We have [已完成成果], but how [本节问题]?」
中文:「我们已经 [完成的成果],但 [本节问题]?」
锚例:«We have built a simple GNN, but how do we make predictions in any of the tasks we described above?»(§机制)
场景:任何节首;第一分句盘点已到手的东西,第二分句抛出本节要答的问题。

**S21|问句 + 第一步降维**
骨架:「So, how do we [大目标]? The first step is to [可立即执行的降维动作].」
中文:「那么,怎么 [大目标]?第一步是 [可立即执行的小动作]。」
锚例:«So, how do we go about solving these different graph tasks with neural networks? The first step is to think about how we will represent graphs to be compatible with neural networks.»(§挑战)
场景:从任务转向方法的交接处。

**S22|完成确认 + 新能力**
骨架:「Now that [前置条件已完成], we will [新动作].」
中文:「既然 [前置条件] 已经完成,我们就可以 [新动作]。」
锚例:«Now that the graph’s description is in a matrix format that is permutation invariant, we will describe using graph neural networks (GNNs) to solve graph prediction tasks.»(§机制·章首)
场景:阶段交接;先确认读者已获得的能力,再宣布新阶段。

**S23|例证群换挡句**
骨架:「Let’s move on to [下一类对象].」+ 一句排序维度说明。
中文:「接下来看 [下一类对象]。[与上一组的差别,即排序维度]。」
锚例:«Let’s move on to data which is more heterogeneously structured. In these examples, the number of neighbors to each node is variable (as opposed to the fixed neighborhood size of images and text).»(§例证)
场景:例子群之间;过渡句就是排序键的显式化。

**S24|统一性先行 + 绕道宣言**
骨架:「we will show that all of the following [问题清单] can be solved with a single [统一物], the [X]. But first, let’s take a tour through [细节], and provide concrete examples of each.」
中文:「我们会说明,下面这些问题都能用同一种 [统一物]——[X]——解决。不过先绕个路,把 [细节] 逐一走一遍,每类配一个具体例子。」
锚例:«we will show that all of the following problems can be solved with a single model class, the GNN. But first, let’s take a tour through the three classes of graph prediction problems in more detail, and provide concrete examples of each.»(§任务)
场景:进入长篇细节漫游前,先亮出漫游终点的结论并预告绕道。

**S25|容器自述**
骨架:「Next, we have a few sections on [主题域] that are relevant for [主线].」
中文:「接下来几节,是与 [主线] 相关的若干 [主题域] 话题。」+ 一句自贬(「只关心主干的读者可以到此为止」)。
锚例:«Next, we have a few sections on a myriad of graph-related topics that are relevant for GNNs.»(§容器·章首)
场景:附录/深水区开场;一句自我降格,告诉读者可以止步。

**S26|节尾自曝钩子**
骨架:「Note that in this [当前最简版], we’re not using [被延迟的能力] at all…」
中文:「注意,在这个 [最简版] 里,我们还完全没用到 [被延迟的能力]。」
锚例:«Note that in this simplest GNN formulation, we’re not using the connectivity of the graph at all inside the GNN layer.»(§机制·节尾)
场景:每节最后一句永远是为下一节挖的坑,而非总结。连着几节都这样收尾时,「注意」只留给第一次,之后写「到这里,[最简版] 还没用上 [被延迟的能力]」。

**S27|缺陷回收开场**
骨架:「There is one flaw with [已建方案]: [具体缺陷,描述到读者能预感解法]」
中文:「到目前为止的 [方案] 有一个毛病:[具体缺陷]。」
锚例:«There is one flaw with the networks we have described so far: nodes that are far away from each other in the graph may never be able to efficiently transfer information to one another»(§机制)
场景:下一级复杂度的登场;单数性 = 复杂度预算。

**S28|转折推进**
骨架:「However, it is not always so simple. For instance, you might have [困境场景].」
中文:「但事情没这么简单。比如,你手里可能 [困境场景]。」
锚例:«However, it is not always so simple. For instance, you might have information in the graph stored in edges, but no information in nodes, but still need to make predictions on nodes.»(§机制)
场景:最简情形讲完之后,用具体反例场景驱动新解法。

## D. 具体化与实例(5 条)

**S29|兑现句**
骨架:「To make this notion concrete, we can see [最小实例]:」(冒号引图)
中文:「为了把这个说法落到实处,来看 [最小实例]:」
锚例:«To make this notion concrete, we can see how information in different graphs might be represented under this specification:»(§挑战)
场景:抽象承诺的当场兑现;跨段兑现时先用 S19 承诺。

**S30|本域实例句**
骨架:「For example, for a [领域实例], we might want to [任务].」
中文:「比如,对于 [领域实例],我们可能想 [任务]。」
锚例:«For example, for a molecule represented as a graph, we might want to predict what the molecule smells like, or whether it will bind to a receptor implicated in a disease.»(§任务)
场景:抽象定义句后的第一例;感官细节降低理解门槛。

**S31|经典例命名句**
骨架:「A classic example of a [X] problem is [专名].」
中文:「[X] 问题的一个经典例子是 [专名]。」
锚例:«A classic example of a node-level prediction problem is Zach’s karate club.[@Zachary1977-jg]»(§任务)
场景:抽象类与具体实例在同一句内完成交接;专名后可挂引用作保。

**S32|可数命题句**
骨架:「By [操作], a [对象] can [能力]: after [N], [可心算断言].」
中文:「把 [操作] 叠起来,[对象] 就能 [能力]:[N] 次之后,[可心算断言]。」
锚例:«By stacking message passing GNN layers together, a node can eventually incorporate information from across the entire graph: after three layers, a node has information about the nodes three steps away from it.»(§机制)
场景:把机制效果写成可数、可心算验证的命题。

**S33|假设情景句**
骨架:「We could imagine a [场景], where we wish to [目标] by [约束].」
中文:「不妨设想一个 [场景]:我们想在 [约束] 的前提下 [目标]。」
锚例:«We could imagine a social network, where we wish to anonymize user data (nodes) by not using them, and only using relational data (edges).»(§机制)
场景:抽象约束的场景化;把抽象条件落成具体处境(如隐私保护)。

## E. 类比(4 条)

**S34|双通道类比句**
骨架:「This is analogous to [旧域任务], where [把类比端再解一次].」
中文:「这就像 [旧域任务]:[把类比端再解一次]。」
锚例:«This is analogous to image classification problems with MNIST and CIFAR, where we want to associate a label to an entire image.»(§任务)
场景:新任务/新机制映射到参照系学科;每个新分类维度配两个不同旧领域的锚。

**S35|类比沿用声明**
骨架:「Following the [旧域] analogy, [新任务] are analogous to *[旧域对应物]*, where …」
中文:「沿用 [旧域] 的类比,[新任务] 相当于 **[旧域对应物]**:[……]。」
锚例:«Following the image analogy, node-level prediction problems are analogous to *image segmentation*, where we are trying to label the role of each pixel in an image.»(§任务)
场景:第二类及以后;明示类比是持续调用的框架而非一次性修辞。

**S36|同族焊接句**
骨架:「This is reminiscent of [旧概念]: in essence, [X] and [Y] are operations to [共同本质].」
中文:「这让人想起 [旧概念]:说到底,[X] 和 [Y] 都是在 [共同本质]。」
锚例:«This is reminiscent of standard convolution: in essence, message passing and convolution are operations to aggregate and process the information of an element’s neighbors in order to update the element’s value.»(§机制)
场景:把新概念焊进读者已有概念网;每个新概念至少一次被叙述为旧概念的变体。

**S37|类比断点句**
骨架:「However, [新域维度] can be variable, unlike in [旧域] where [旧域性质].」
中文:「但有一处不同:[旧域] 里 [某性质固定],[新域] 里它 [可变]。」——后面接一句残余价值(「不过 [仍成立的部分] 照样可用」)。
锚例:«However, the number of neighboring nodes in a graph can be variable, unlike in an image where each pixel has a set number of neighboring elements.»(§机制)
场景:每个类比陈述之后;指出旧域成立而新域不成立的那个具体维度。

## F. hedging 与边界(8 条)

**S38|依赖性断言**
骨架:「The answers are going to depend on [对象]」
中文:「答案取决于 [对象]。」
锚例:«The answers are going to depend on the data»(§实证)
场景:无法判定时直说,不伪装成已有答案;可挂基准引用背书。

**S39|趋势 + 反例同句**
骨架:「[X] tend(s) to [趋势], but the same trend is not found for [最值/反例].」
中文:「[X] 往往 [趋势],但在 [最值/反例] 上看不到同样的趋势。」
锚例:«We can notice that models with higher dimensionality tend to have better mean and lower bound performance but the same trend is not found for the maximum.»(§实证)
场景:报告经验规律;趋势与反例是同一论证单元,拆到两段读者就只记得趋势。

**S40|无一致最优**
骨架:「There is no [X] that is uniformly the best choice.」
中文:「没有哪种 [X] 在所有情况下都是最好的选择。」
锚例:«There is no operation that is uniformly the best choice.»(§容器)
场景:被问「哪个最好」时的标准开局,随后逐项说明各自适用场景。

**S41|混合信号直认**
骨架:「The previous explorations have given mixed messages.」
中文:「前面这些探索给出的信号并不一致。」
锚例:同左(§实证)。
场景:多组结果互相打架时直接承认,再挑出真正稳的那一条。

**S42|统计性主语防外推**
骨架:「Overall we see that the more [X], the better the [平均/中位对象].」
中文:「总体来看,[X] 越多,[平均/中位对象] 越好。」——统计性主语(「平均模型」)不能省。
锚例:«Overall we see that the more graph attributes are communicating, the better the performance of the average model.»(§实证)
场景:统计性结论必须携带统计性主语(平均、下界),把外推风险写进名词短语。

**S43|开放问题句式**
骨架:「[How to 做 X / 做 X] is an open research question/topic.[引用]」(引用置于句号后,像路标)
中文:「[怎样做 X] 目前仍是一个开放问题。[引用]」
锚例:«How to sample a graph is an open research question.[@Rozemberczki2020-lq]»(§容器);«Selecting and designing optimal aggregation operations is an open research topic.[@Xu2018-sf]»
场景:你答不了的问题,一句带过,后续交给文献;禁止含糊措辞伪装成答案。

**S44|实践落差声明**
骨架:「Of course, in practice, this is not usually how [对象] [被处理]: [结构性原因].」
中文:「当然,实际中 [对象] 通常不是这样 [处理] 的:[结构性原因]。」
锚例:«Of course, in practice, this is not usually how text and images are encoded: these graph representations are redundant»(§以已知引入)
场景:为教学而设的简化/表示引入后的短窗口内;失效归因到可见结构。

**S45|好坏消息对**
骨架:坏消息「Unfortunately for [场景], this quickly becomes [代价] (although [例外域]).」/ 好消息「Fortunately, [框架] is flexible enough that often [条件].」
中文:坏消息「可惜,对于 [场景],这很快就会 [代价](不过 [例外域] 用过这一招)。」/ 好消息「好在 [框架] 足够灵活,通常 [条件] 就够了。」
锚例:«Unfortunately for large graphs, this quickly becomes computationally expensive (although this approach, called ‘virtual edges’, has been used for small graphs such as molecules).[@Gilmer2017-no]»(§机制);«Fortunately, the message passing framework is flexible enough that often adapting GNNs to more complex graph structures is about defining how information is passed and updated by new graph attributes.»(§容器)
场景:方案转折点;稀缺使用(原文各一次);坏消息必配括号让步,好消息必配条件从句。

## G. 归属(2 条)

**S46|引用贴术语**
骨架:「We can do this using *[术语]*[@引用], where [定义].」
中文:「我们可以用 **[术语]**[引用] 来做到这一点:[定义]。」
锚例:«We can do this using *message passing*[@Gilmer2017-no], where neighboring nodes or edges exchange information and influence each other’s updated embeddings.»(§机制)
场景:非你首创的名词首现;引用与术语物理相邻,不用「某某等人提出了」从句。

**S47|分级归属**
骨架:「the “[X]” framework proposed by [人名][@引用] using the [资产] introduced by [人名][@引用]」/「This concept is the basis of [X] [@引用]」
中文:「我们沿用 [人名] 提出的『[X]』框架[引用],以及 [人名] 引入的 [资产][引用]。」/「这个想法是 [X] 的基础[引用]。」
锚例:«We’re going to build GNNs using the “message passing neural network” framework proposed by Gilmer et al.[@Gilmer2017-no] using the Graph Nets architecture schematics introduced by Battaglia et al.[@Battaglia2018-pi]»(§机制·章首);«This concept is the basis of Graph Attention Networks (GAT) [@Velickovic2017-hf] and Set Transformers[@Lee2018-ti].»(§容器)
场景:区分「提出框架/提供图示/发展想法/是某工作的基础」等不同程度的归属;并举例证时逐例挂引,不用一条引用兜底整串。

**引用底线**(G 组全部句式通用):只引你确知存在、说得出出处的文献与数据。拿不准时写「[待补引用:要支撑的论断]」交给作者核实,不要编造作者、年份、标题或数字。S43 的开放问题句找不到可靠引用时也标待补——「这仍是开放问题」本身就是一个需要出处的判断。

## H. 收束与开门(2 条)

**S48|回环句**
骨架:「[X] are a [定性] [类别] that have strengths and challenges that are very different from those of [开篇参照系].」
中文:「[X] 是一种 [定性] 的 [类别],它的长处和难处,都与 [开篇参照系] 截然不同。」
锚例:«Graphs are a powerful and rich structured data type that have strengths and challenges that are very different from those of images and text.»(§收束)
场景:收束第一句;复现全篇对比框架,让文章显式闭合。

**S49|降格回顾 + 资产复指 + 开门句**
骨架:「In this article, we have outlined some of [确实做到的小事]…, and hopefully [交互资产] can give an intuition on …. The success of [领域] in recent years creates a great opportunity for [未来空间], and we are excited to see what the field will bring.」
中文:「这一路我们只走了 [领域] 的一小部分 [设计选择/里程碑],希望 [演示/练习] 能帮你对 [……] 形成直觉。」+ 开门句:有真实的新进展时写「[领域] 这几年的进展,让 [具体的新问题] 变得可以尝试,我们很期待接下来会发生什么」;常青主题改用一个可动手的下一步或一个开放问题。——不用「本文」,也不写空泛的「前景广阔」。
锚例:«We have walked through some of the important design choices that must be made when using these architectures, and hopefully the GNN playground can give an intuition on what the empirical results of these design choices are.»+«The success of GNNs in recent years creates a great opportunity for a wide range of new problems, and we are excited to see what the field will bring.»(§收束)
场景:收束中后段;回顾动词刻意降格(outlined / walked through + some of),交互资产被复指为读后仍可用的直觉工具,末句以机会从句+情绪从句开未来。机会从句要有真实依据,没有就换成可动手的下一步或开放问题。

## 句子工艺规则

以下规则出自对原文的定量统计(词频、句长、段长均为脚本实测)。数字只说明原文怎么写,不是配额:打磨时拿来对照,不要为凑比例硬造句子。

**情态定岗表**(全文不换岗;读者据此反推哪句是事实、哪句是猜想):

| 情态词 | 岗位 | 原文词频 |
|---|---|---|
| can | 能力事实(最强档) | ×116 |
| might | 愿望/假设 | ×21 |
| could | 备选想象 | ×12 |
| would | 提议方案 | ×11 |
| often / usually / typically | 经验频率 | ×8 / ×3 / ×2 |

**节奏**
- 短句按岗位出现:原文不超过 10 词的短句只占 13%,大多在做下面六件事之一。写短句前先问它担哪个岗;担不起岗的短句只会把论证切碎。
  - 引图 «The model looks like this.»(§机制)
  - 转折 «However, it is not always so simple.»(§机制);«However, this representation has a few drawbacks.»(§挑战)
  - 命名 «We can do this by *pooling*.»(§机制)
  - 判决 «There is no operation that is uniformly the best choice.»/«In practice, sum is commonly used.»(§容器)
  - 推广 «The same can be done for edges.»(§机制)
  - 路标 «See more in Graph Attention Networks.»(§以已知引入)
- 长句别扎堆:原文超过 25 词的长句占 24%,同段内长句之后仍接长句的只占 18%,同段三连长句全文只有 1 处。连写两个长句之后,换短句或另起一段。原文并没有「长句后必接 5–12 词落锤句」的规律:长句后紧跟 5–12 词句的比例是 20%,与全文 5–12 词句的基线比例相同。
- 段落 1–3 句:原文平均每段 2.5 句,约三分之一的段落只有 1 句,80% 的段落不超过 3 句。一段只推进一个动作,例证交给图或下一段,不追求段落的「完整性」。
- 长句分层用 where/which 从句和括号(原文 where×33、which×21),不用破折号和分号(94 个超过 25 词的长句里,含分号的 1 句、含破折号的 3 句)。
- 冒号开清单:凡出现 two types / three steps / four parts,用冒号引出具体对象,让冒号成为「抽象→具体」的显式管道。
- 评价副词前置且极度稀缺:原文一共 3 个,Fortunately、Unfortunately 各一次且都在句首,surprisingly 一次内嵌在观察句里。先定向再投递;一篇用一两个就够。
- 观察指令按位置放,不按频率放:Note that / It should be noted / The first thing to notice / Let’s 一类句子原文共 11 句,约每 700 词一处,只出现在四种位置。其余位置不加:指令一多,读者就分不清哪一处真正要紧。
  - 第一次读图、读数据 «The first thing to notice is that, surprisingly, a higher number of parameters does correlate with higher performance.»(§实证)
  - 坦白简化 «It should be noted that the figure uses scalar values per node/edge/global, but most practical tensor representations have vectors per graph attribute.»(§挑战)
  - 节尾自曝:见 S26。
  - 换挡领路 «Let’s explore the difference between these operations.»(§容器)

**主语分工**
- we 负责操作与回顾:操作句用「We can + 动词」,阶段小结用「We have + 过去分词」;不用无人称的「本文将」「接下来会」。
- you 只在三种位置出场:预判读者已知、点破读者实际需求、交互指令;you 永远不解释概念。
- 机制句以对象为主语让机制自转(原文以 This 开头的句子有 26 句):把主语让给你的对象,动词用日常动词,作者只在过渡和情感处现身。
- 能力被动「can be + 过去分词」:声明「该操作与施动者无关」时使用(原文共 37 处);谁做的不重要时就别写谁。
- 恒现在时:机制、定义、示例全部一般现在时(它们「永远为真」;原文 is/are×238,was/were×2);连历史典故也用现在时讲。锚例:«As the story goes, a feud between Mr. Hi (Instructor) and John H (Administrator) creates a schism in the karate club.»(§任务)

**动词预算**
- 把核心运算压缩成 4–6 个单音节日常「物流动词」(收集→聚合→汇总→路由→更新一类的动作流水线),每个首现斜体,此后只换宾语。
- 新机制至多引入一个新动词,其余复用旧动词——读者不需要为第二个机制重建心智模型。
- 拟人隐喻动词加引号,标记「这是隐喻不是术语」。锚例:«can risk having their node representations ‘diluted’ from many successive iterations»(§实证)
- 机制描述落到可数细节(几个邻居、几层、几步),让读者能心算验证。

## 中文适配

上面的统计来自英文原文。写中文时保留每条规则的功能,换掉英文特有的形式:

- **首现标记**:中文排版少用斜体。首现术语只把术语本身加粗,或写成「术语(English)」;整句加粗仍全文至多一处,留给总定义(S3)。
- **别用「被」字句顶替英文被动**:S12 第一句和「can be + 过去分词」在中文里改成主动句或话题句,旧词仍放句首当话题。写「神经网络如今已能利用图的结构」,不写「神经网络已被改造以利用图的结构」。
- **We can 不直译成「我们可以」**:操作句写成「我们先把……」「现在把……」「把 [X] 叠起来,就能……」。「可以」留给提案,对应 would。
- **情态词**:能力用「能」,想象用「不妨设想」,提案用「可以」,频率用「通常/往往」;同一个词全文不换岗。英文 might 同时管愿望和假设,中文要分开写:愿望用「你可能想……」,假设或推测用「大概/多半」。
- **恒现在时对应通则句**:中文没有时态,对应的写法是不带时间词的通则陈述,如「每个节点从邻居那里收集信息」。不要写成「首先……然后……最后……」的流水叙事,步骤交给编号清单(S8)。
- **中文长句的病根不同**:英文靠 where/which 分层,中文的毛病是逗号流水链和「的」字链(「基于……的……的……的方法」)。一个逗号段只说一件事,一句里逗号过了三个就回头查一遍;一个名词前的「的」超过两个,就拆成两句或改用冒号列举。
- **动词要具体**:「梳理」「阐述」「探讨」「赋能」这类公文动词,换成读者看得见的动作(搭、拆、算、比、挪)。这是上文动词预算里「日常动词」一条的中文版。
- **长短句口径**:短句约 15 字以内;长句指 40–50 字以上、且套了两层以上从属结构(定语套定语、条件套让步)的句子。单纯的逗号并列不算长句,但同样别连排。
- **引号**:正文用「」,引号里再套引号用『』。

---

*本册所有 «…» 引文摘自 Sanchez-Lengeling, Reif, Pearce, Wiltschko, A Gentle Introduction to Graph Neural Networks, Distill 2021, CC-BY 4.0, https://distill.pub/2021/gnn-intro/,仅作锚例。词频、句长与段长统计为对该文的脚本实测,口径与复核脚本在本 skill 的源仓库(gentle-introduction-skill 的 `tools/check-stats.mjs`);安装后的 skill 目录里没有这个脚本,写作时也用不到。*
