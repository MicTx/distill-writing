# 04|逐字级句式风格 —— 《A Gentle Introduction to Graph Neural Networks》写作方法论

> 分析对象:`distill-analysis/article.md`(正文词数 9040,句子 464 句,纯文本段 170 段)。
> 定量方法:Node 脚本 `node distill-analysis/_tmp_analyze.mjs` 与 `_tmp_verify.mjs` 对正文(剔除引用列表、清洗标记、图注前缀)做句长/主语/时态/过渡词/hedging/动词频次统计;所有引文均经 `raw.includes(quote)` 逐字校验通过。
>
> **勘误(2026-09)**:上述临时脚本未入库,本册数字无法复现;可复现的重算见 `tools/check-stats.mjs`。其中 **T1(落锤短句)与 T20(每 2–3 句一个观察指令)与实测不符**,哲学层第 5 条的「落锤」说法同理。详见 `00-synthesis.md` 口径统一 #7;skill 已按实测改写。

## 哲学层 —— 写作价值观

1. **句子是操作指令,不是知识陈述。** 作者写"我们接下来对信息做什么"(gather → aggregate → route → update),而不是"信息是什么"。证据:图运算动词 aggregate×35、update×26、pool×24、gather×9、pass×4、route×3 构成一条动作流水线,而 send/receive 出现 0 次——数学被翻译成"物流",每句让读者执行一步。(推断:作者相信读者的直觉跟着动词走,名词只负责装货。)

2. **先给情感坐标,再给事实。** Fortunately / Unfortunately / surprisingly / elegant 这类评价词总是前置在事实句之前(如 "Unfortunately for large graphs, this quickly becomes computationally expensive"),读者先知道该高兴还是该警惕,再接收技术内容。(推断:注意力方向比信息密度优先——评价副词是读者的导航仪。)

3. **每一次抽象都在同一段落内兑现为具体,并显式预告这次兑现。** "if this seems abstract now, we will make it concrete with examples in the next section" / "To make this notion concrete, we can see..."——抽象→具体不是隐含的写作习惯,而是被写进文本的承诺。(推断:作者把读者的"此刻懂不懂"当作可管理的对象,抽象句只是欠条,欠条必须当场或指明日期偿还。)

4. **诚实校准嵌在语法里,而非道德声明里。** 情态动词严格分级:can×116 只谈能力,might×21 谈意愿假设,could×12 谈备选想象,would×11 谈提议方案;知识边界直接用断言句划定("There is no operation that is uniformly the best choice.")。(推断:作者的信誉来自每个情态词都用在固定的断言强度上,读者可以据此反推哪句话是事实、哪句是猜想。)

5. **长度即节奏:长句承载密度,短句负责结算。** 句长中位数 19 词,但 ≤10 词短句占 17%,相邻句"短↔长"切换占 18%;每个多层机制句之后紧跟 5–12 词的落锤句("The model looks like this.")。(推断:句长是呼吸,作者刻意让读者在信息过载前呼气。)

6. **段落是呼吸单元,不是论证单元。** 平均每段仅 2.32 句,38% 的段落只有 1 句;被传统文章塞进段落里的例证与展开,在这里由图示承担。(推断:在图文交替的媒介里,文字段落只负责"说一句推进的话",图的_caption 就是下一段。)

## 操作层 —— 可直接执行的技法

**T1|落锤短句**:每个 25 词以上的机制长句写完后,下一句压到 5–12 词做断言收束。迁移规则:任意主题,写完一层复杂机制,立刻用一个"主语+系动词+短语"的短句把它钉死(如 "The model looks like this." / "This data is hard to phrase in any other way besides a graph.")。

**T2|长句用 where/which 从句和括号分层,不用破折号和分号**:全文 107 个长句(>25 词)中含括号 23、含冒号 17、含分号仅 1、破折号仅 3;分层主力是 where 从句(全文 34 处)与 which 从句(20 处)。模板:"X is as Y, where A represents a node and is connected via an edge to B." 迁移规则:定义复杂结构时,主句给判断,where 从句给逐项对应,括号给别名——三层以内。

**T3|冒号引出具体清单**:抽象复数名词之后接冒号+具体对象("...could be modeled as graphs: images and text")。迁移规则:凡出现 two types / three steps / four parts,必用冒号开清单,让冒号成为"抽象→具体"的显式管道。

**T4|we 的固定分工**:we 全文 194 次(约每 47 词一次),38 句以 We 开头;分工严格——we can(28 次)宣告能力与操作路径,we have 回顾已建成果,we want/wish 表意图,we divide/look/explore 做路标。迁移规则:讲解任何主题,操作句一律 "We can + 动词",阶段小结一律 "We have + 过去分词",不用"本文将""接下来会"这类无人称预告。

**T5|you 只在三种位置出场**:you 全文仅 14 次——(1)预判读者已知("You might see the term ... used");(2)指出读者的实际需求("or you need a normalized view of the features");(3)交互指令("Play around with ... to build your intuition")。迁移规则:you 永远不解释概念,只用于猜中读者心思、点破读者需求和给指令三件事。

**T6|以物为主语让机制自转**:机制描述句的主语是 node / graph / matrix / This,不是作者。27 句以 This 开头做承接(This is / This creates / This serves);"a node has information about the nodes three steps away from it" 让数据结构拥有知识。迁移规则:写机制时把主语让给你的对象,动词用日常动词;作者只在过渡和情感处现身。

**T7|给核心机制选一套单音节"物流动词"并全程复用**:gather(收集)→ aggregate(聚合)→ pool(汇总)→ route/pass(路由/传递)→ update(更新),每个动词首次出现时用斜体标记(*gather*、*aggregated*、*pooling*),此后不再定义、只换宾语。弃用 send/receive(0 次)。迁移规则:把你的核心运算压缩成 4–6 个日常动词,首现斜体锚定,之后所有新概念=旧动词+新宾语。

**T8|恒现在时,连故事也是现在时**:is/are 239 次 vs was/were 仅 2 次;Karate club 的历史典故写成 "As the story goes, a feud ... creates a schism"。迁移规则:机制、定义、示例全部一般现在时(它们"永远为真");过去时只出现在叙事桥段且常用现在时重述。

**T9|能力被动 "can be + 过去分词"**:被动结构 79 处中 30 处是 can be + V-ed(can be stored / used / adapted / described / solved)。这种被动不是回避责任,而是声明"该操作与施动者无关"。迁移规则:描述数据格式与模型能力时用 can be + 过去分词;谁做的不重要时就别写谁。

**T10|提案→否决→真方案的三拍结构**:先立最显然方案并升格("Perhaps the most obvious choice would be to use an adjacency matrix, since this is easily tensorisable."),再用 However/Unfortunately 打掉("However, this representation has a few drawbacks."),最后给带评价形容词的正解("One elegant and memory-efficient way ... is as adjacency lists")。迁移规则:任何设计决策都先替读者说出他会想到的方案,当场否决,再交出你的方案并附一个形容词(elegant / simple / common)。

**T11|评价副词前置在事实之前**:Fortunately、Unfortunately(各 1 次,均居句首)、surprisingly(嵌在 "The first thing to notice is that, surprisingly, ...")。迁移规则:在信息句前放一个情感方向词,先定向再投递;每千字至多 1–2 个,保持稀缺性。

**T12|抽象→具体的显式元话语**:转换处必有路标句——"if this seems abstract now, we will make it concrete with examples in the next section"(预告)、"To make this notion concrete, we can see ..."(兑现)、"A classic example of a node-level prediction problem is Zach’s karate club."(同句兑现)。迁移规则:抽象概念句之后,要么同句用 "An example of X is Y" 兑现,要么下句用 "To make this concrete," 明确宣告;跨段兑现时先写承诺句。

**T13|设问式过渡,不用"下一节将"**:章节衔接用"成果句 + but/how 设问"——"So, how do we go about solving these different graph tasks with neural networks?" / "We have built a simple GNN, but how do we make predictions ...?" / "We’ve described a wide range of GNN components here, but how do they actually differ in practice?" 迁移规则:每节开头先一句话确认已完成的事,再用问句制造下一节的缺口;however 6 次全在句首,but 18 次多埋在句中,分工不混。

**T14|数字路标与 N 步列表**:First / Second / Third / Fourth and finally 串起全文路线图;步骤句式固定为 "X proceeds/works in N steps:" + 冒号 + 破折号列表("Pooling proceeds in two steps:" / "Message passing works in three steps:")。迁移规则:路线图用序数词一次铺完;每个算法用同一个 "works in N steps:" 模板,步骤内每条以动词开头。

**T15|hedging 分级表**:can=能力事实(最强,116 次);might=我们想做/读者已知("we might want to generate graphs");could=备选想象("We could imagine ... / You could also ...");would=提议方案("One solution would be ...");often/usually/typically=经验频率("usually via a sum operation");无法判定时直接断言依赖性("The answers are going to depend on the data")。迁移规则:写作前先给自己的情态词定岗——能力用 can、愿望用 might、想象用 could、提案用 would、频率用 often,全文不换岗。

**T16|段落粒度:1–3 句,首句即主题句**:平均 2.32 句/段,单句段占 38%;首句要么是主题句,要么是承接上一图的 This 句。迁移规则:一段只推进一个动作;写完"主题句+一句展开"就断段,例证交给图或下一段,不追求段落的"完整性"。

**T17|统一的类比句式库**:每个新机制出现后紧跟一个类比句,句式固定——"This is analogous to ..." / "This is reminiscent of ..." / "This is similar to ..."(各 1 次)+ 读者已知领域(image segmentation、Global Average Pooling、Fourier space)。迁移规则:为每个新概念配一个来自读者旧领域的锚点,且全文复用同一组类比句式,让"类比"本身成为可识别的文体信号。

**T18|括号双锚:别名与近义词**:术语首现即在括号内给别名或展开——"(called graph neural networks, or GNNs)"、"(permutation invariances)";动词也给括号近义备选 "route (or pass) information";角色名加注 "(Instructor)" "(Administrator)"。迁移规则:新术语首现必配括号别名;关键动词配一个括号同义词,一次教两个词,零额外句子成本。

**T19|结尾回到 we 的情感**:全文最后一句不总结要点,而是 "The success of GNNs in recent years creates a great opportunity for a wide range of new problems, and we are excited to see what the field will bring." 迁移规则:结尾用一个 we+情感动词的展望句收束,与开篇的 we 呼应,把"我们一路同行"的契约签到最后一行。

**T20|每 2–3 句给一个"观察指令"**:Note that ×3、One thing to note is、The first thing to notice is、let’s(×2)——作者持续指挥读者的注意力。迁移规则:在关键句前插入 "Note that ... / The first thing to notice is that ..." 的注意力指令,每 300 词一个,形成导览节奏。

## 逐字证据

### 一、句长与分层(Q1–Q6)

1. "The model looks like this." —— §GNN Predictions by Pooling Information。5 词落锤句,紧接在 route/pooling 机制长句之后。【T1】
2. "This data is hard to phrase in any other way besides a graph." —— §Graph-valued data in the wild。12 词断言句收束整节论证。【T1】
3. "There is no operation that is uniformly the best choice." —— §Comparing aggregation operations。10 词短句直接划定知识边界。【T1/T15】
4. "Another way to think of images is as graphs with regular structure, where each pixel represents a node and is connected via an edge to adjacent pixels." —— §Images as graphs。25 词长句:主句判断 + where 从句逐项对应。【T2】
5. "It’s a very convenient and common abstraction to describe this 3D object as a graph, where nodes are atoms and edges are covalent bonds." —— §Graph-valued data in the wild。where 从句完成"抽象→对应关系"的分层。【T2/T12】
6. "A GNN is an optimizable transformation on all attributes of the graph (nodes, edges, global-context) that preserves graph symmetries (permutation invariances)." —— §Graph Neural Networks(原文加粗)。定义句:主句+括号别名+that 从句三层。【T2/T18】

### 二、主语选择(Q7–Q12)

7. "We divide this work into four parts." —— 引言。7 词,we 作路标句开启全文路线图。【T4/T14】
8. "Fourth and finally, we provide a GNN playground where you can play around with a real-word task and dataset to build a stronger intuition" —— 引言(real-word 为原文如此)。we 提供平台,you 负责把玩,一词一职。【T4/T5】
9. "You might see the term “dataflow graph” used in some of these contexts." —— §Graph-valued data in the wild。you+might:预判读者已知,不解释只点名。【T5/T15】
10. "The mean operation can be useful when nodes have a highly-variable number of neighbors or you need a normalized view of the features of a local neighborhood." —— §Comparing aggregation operations。同一句内并列"物的条件"与"你的需求"。【T5/T9】
11. "Which graph attributes we update and in which order we update them is one design decision when constructing GNNs." —— §Learning edge representations。名词性从句作主语,设计空间被写成物。【T6】
12. "In this case, distance between a node to either the Instructor or Administrator is highly correlated to this label." —— §Node-level task。数据结构作主语承载因果。【T6】

### 三、时态与语态(Q13–Q15)

13. "As the story goes, a feud between Mr. Hi (Instructor) and John H (Administrator) creates a schism in the karate club." —— §Node-level task。历史典故用现在时叙事+括号注角色。【T8/T18】
14. "It should be noted that the figure uses scalar values per node/edge/global, but most practical tensor representations have vectors per graph attribute." —— §The challenges of using graphs in machine learning。罕见的学术缓和句式,用于限定图与正文的差异。【T9】
15. "Researchers have developed neural networks that operate on graph data (called graph neural networks, or GNNs) for over a decade" —— 引言。首现即括号定名,GNN 缩写由此接管全文。【T18】

### 四、具体与抽象的先后顺序(Q16–Q22)

16. "Perhaps the most obvious choice would be to use an adjacency matrix, since this is easily tensorisable. However, this representation has a few drawbacks." —— §The challenges of using graphs。提案→否决的前两拍。【T10】
17. "One elegant and memory-efficient way of representing sparse matrices is as adjacency lists." —— 同上。第三拍:带评价形容词的正解。【T10】
18. "One solution would be to have all nodes be able to pass information to each other." —— §Adding global representations。would 提出候选方案。【T10/T15】
19. "Unfortunately for large graphs, this quickly becomes computationally expensive" —— 同上。评价副词先于事实给出方向。【T11】
20. "The first thing to notice is that, surprisingly, a higher number of parameters does correlate with higher performance." —— §GNN playground。注意力指令+惊讶副词双层前置。【T11/T20】
21. "Fortunately, the message passing framework is flexible enough that often adapting GNNs to more complex graph structures is about defining how information is passed and updated by new graph attributes." —— §Other types of graphs。30 词单句:Fortunately 定调 → 事实 → often 频率校准。【T11/T15】
22. "A classic example of a node-level prediction problem is Zach’s karate club." —— §Node-level task。抽象类与具体实例在同一句内完成交接。【T12】

### 五、抽象→具体的元话语(Q23–Q25)

23. "if this seems abstract now, we will make it concrete with examples in the next section." —— 引言末。跨段兑现的显式承诺。【T12】
24. "To make this notion concrete, we can see how information in different graphs might be represented under this specification:" —— §The challenges of using graphs。兑现句+冒号引出图示。【T3/T12】
25. "To start, let’s establish what a graph is." —— 引言。let’s 邀请式开场,全文仅 2 处。【T20】
26. "it is preferable to have $O(n_{edges})$, rather than $O(n_{nodes}^2)$." —— §The challenges of using graphs。非人称判断 it is preferable + 具体记号对照。【T6/T12】

### 六、图运算动词系统(Q27–Q31)

27. "For each item to be pooled, *gather* each of their embeddings and concatenate them into a matrix." —— §GNN Predictions by Pooling Information。步骤条目以斜体动词开头。【T7/T14】
28. "The gathered embeddings are then *aggregated*, usually via a sum operation." —— 同上。动词斜体锚定+usually 频率校准。【T7/T15】
29. "we can use pooling to route (or pass) information to where it needs to go." —— 同上。物流动词 route+括号近义备选。【T7/T18】
30. "By stacking message passing GNN layers together, a node can eventually incorporate information from across the entire graph: after three layers, a node has information about the nodes three steps away from it." —— §Passing messages between parts of the graph。冒号后用具体数字兑现"整个图"的抽象。【T3/T6/T12】
31. "This global context vector is connected to all other nodes and edges in the network, and can act as a bridge between them to pass information, building up a representation for the graph as a whole." —— §Adding global representations。物主语+bridge 隐喻+分词短语续写后果,36 词单句三层。【T2/T6/T7】
32. "In this sense, matrix multiplication is a form of traversing over a graph." —— §Graph convolutions as matrix multiplications。把矩阵运算动词化为"行走"。【T7】
33. "the inner product is essentially “gathering” all node features values of dimension $j$” that share an edge with $node_i$" —— 同上。数学内积被写成带引号的 gather,scare quotes 标记隐喻。【T7】

### 七、过渡词与推进(Q34–Q38)

34. "However, graphs are an extremely powerful and general representation of data, we will show two types of data that you might not think could be modeled as graphs: images and text." —— §Graphs and where to find them。However 句首转折+you might not think 预期违背+冒号给具体对。【T3/T13】
35. "So, how do we go about solving these different graph tasks with neural networks?" —— §The challenges of using graphs。So+设问,一节由此问句开启。【T13】
36. "We have built a simple GNN, but how do we make predictions in any of the tasks we described above?" —— §GNN Predictions by Pooling Information。成果句+but+设问的固定衔接式。【T13】
37. "We’ve described a wide range of GNN components here, but how do they actually differ in practice?" —— §GNN playground。同一衔接式的复用,形成文体节奏。【T13】
38. "But, the output graph has updated embeddings, since the GNN has updated each of the node, edge and global-context representations." —— §The simplest GNN。句首 But+逗号的口语化断言,配 since 给因果。【T13】

### 八、类比与收束(Q39–Q40)

39. "This is reminiscent of standard convolution: in essence, message passing and convolution are operations to aggregate and process the information of an element’s neighbors in order to update the element’s value." —— §Passing messages between parts of the graph。31 词:类比句式+冒号+in essence 重新定义。【T3/T17】
40. "The success of GNNs in recent years creates a great opportunity for a wide range of new problems, and we are excited to see what the field will bring." —— §Final thoughts。全文末句:物主语起势,we+excited 收束。【T19】

---

### 附:定量统计摘要(脚本实测,正文 9040 词 / 464 句 / 170 段)

| 指标 | 数值 |
|---|---|
| 句长 均值/中位/p10/p90 | 19.5 / 19 / 9 / 32 词 |
| 短句(≤10w)/中(11–25)/长(26–40)/极长(>40) | 17% / 59% / 22% / 2% |
| 相邻句 短(≤12)↔长(≥22) 交替 | 18% |
| 长句(>25w,n=107)内 冒号/括号/破折号/分号 | 17 / 23 / 3 / 1 句 |
| where 从句 / which 从句 / that 从句 | 34 / 20 / 90 |
| we / our / you / your | 194 / 18 / 14 / 3 |
| 句首 We / 句首 This | 38 / 27 句 |
| we can / we have / we want / we will | 28 / 16 / 11 / 8 |
| is/are vs was/were | 239 vs 2 |
| 被动(be+V-ed)其中 can be+V-ed | 79(其中 can be+V-ed 30) |
| can / might / could / would / may | 116 / 21 / 12 / 11 / 3 |
| often / usually / sometimes / typically | 7 / 3 / 3 / 2 |
| However(句首)/ but / For example / For instance | 6 / 18 / 12 / 3 |
| Fortunately / Unfortunately / Next / Additionally | 1 / 1 / 3 / 5 |
| aggregate / update / pool / gather / pass / route | 35 / 26 / 24 / 9 / 4 / 3 |
| send / receive | 0 / 0 |
| 每段句数 均值;1句段占比 | 2.32;38% |
