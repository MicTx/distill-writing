# 图示与交互策略

> 何时读本册:规划全文配图时(阶段二)、每张图与图注落笔前(阶段三)。«…» 为出处文章逐字引文,只作锚例(§ 为该文小节)。
>
> 出处文章发布在可交互媒介上;若你的目标媒介(静态博客/公众号/论文)没有交互能力,用文末「静态降级方案」——规则不变,载体降级。只能交付文字、由别人配图时,用「纯文本交付」的图位块格式。

## 十条策略(G1–G10)

**G1|首屏 hero 演示:祈使句图注 + 效果从句,零术语。**
位置在摘要之后、正文之前;图注句式固定为「祈使动词 + 对象 + to see how + 机制描述」,只动用最低限度名词,不出现任何后文才定义的术语——制造「读完再回来才全懂」的回访价值。
锚例:«Hover over a node in the diagram below to see how it accumulates information from nodes around it through the layers of the network.»(首屏图注)
为什么:由读者亲手触发的现象自带证据效力;全文最深的机制可以在读者不认识任何术语时先被看见。
没有可演示的机制时(观念类、历史类题材,没有可操作的现象),首屏改放一个读者能立刻自己验证的最小例子或反常识的具体事实,仍然零术语;宁可不放首屏图,也不放装饰图。

**G2|按图型建立图注模板并冻结,系列图只换变量词。**
为你的每类图(概念图/对照图/数据图)各写一个图注模板并冻结;同一系列的第 2、3 张图照抄模板、只替换核心变量词,读者扫一眼就知道该找什么。
锚例:三联图一律「(Left) A (Center) B (Right) C」——«(Left) 3d representation of the Citronellal molecule (Center) Adjacency matrix of the bonds in the molecule (Right) Graph representation of the molecule.»;双面板一律「On the left we have …, on the right …」——«On the left we have the initial conditions of the problem, on the right we have a possible solution, where each node has been classified based on the alliance.»;架构/原理图一律「Schematic for/of X, which …」——«Schematic for a GCN architecture, which updates node representations of a graph by pooling neighboring nodes at a distance of one degree.»;性能图三段模板逐字复用仅换名词——«Chart of number of layers vs model performance, and scatterplot of model performance vs number of parameters. Each point is colored by the number of layers.»
多表征并置 + 等价声明:同一数据至少两种视图并排,第一次出现时用一句正文明确它们等价。锚例:«Note that each of these three representations below are different views of the same piece of data.»(§以已知引入)

**G3|图注自包含:定义可以写进图注,正文只留一句引导。**
自测:遮住正文能否读懂此图?凡图所教学的核心概念,定义放图注;正文那句只负责「为什么要看这个图」。结论本身也可以是图注(论证性图注)。锚例(等价性只在图注):«Note that having a single undirected edge is equivalent to having one directed edge from $v_{src}$ to $v_{dst}$, and another directed edge from $v_{dst}$ to $v_{src}$.»(§引言·图注)
为什么:图会被单独截图、转发、引用,图注是图的自带说明书,而非附属标签。

**G4|图注三分工:是什么(描述)/怎么玩(祈使)/注意什么(caveat);问题句零条。**
锚例(实测出处文章 37 条实质图注:祈使句开头 7 条、描述句+内嵌祈使 6 条、纯描述 24 条、问题句 0 条)。悬念与设问全部放正文(«but how do we make predictions in any of the tasks we described above?»),图注永远给答案或指令,不向读者留谜。

**G5|正文指示句(deixis)用固定短语库;条件句可代图注。**
指向图只用固定短语:the diagram below / the example below / 冒号收尾引图 / 超短句。
锚例:«The example below shows every adjacency matrix that can describe this small graph of 4 nodes.»;«We can update our architecture diagram to include this new source of information for nodes:»(冒号直接引图);«The model looks like this.»(≤6 词逐张指认)。
同一系统的多变体连排时,if-从句承担图注职能:«If we only have node-level features, and are trying to predict binary edge-level information, the model looks like this.»(§机制)——条件本身就是两图之间的唯一差异,比图注更省字。

**G6|视觉记号词汇化并冻结:颜色/形状一旦承载含义,图注即命名,后文当名词用。**
锚例:«Hover over a node (black node) to visualize which edges are gathered and aggregated to produce an embedding for that target node.»;«Each point is colored by the number of layers.»(数据图)
为什么:读者只为一套解码规则付一次学习成本,此后所有图免费复用——这是图层面的「术语表纪律」。着色规则:凡用颜色/形状/线型承载含义的图,图注必有一句「X 按 Y 着色/标记」。

**G7|核心示意图是贯穿角色,逐节增量演化,每次只新增一种元素。**
每个新小节只允许核心图新增一个箭头/元素,并在正文显式宣告增量;多概念并列只留给「变体总览图」且在图注明示。
为什么:新图里读者只需寻找「新增的那个箭头」,对比内建于图序列本身。
同一机制可在图序列中逐级演化(基础版 → 加一类输入 → 加一条通路 → 三源汇合),增量宣告句即 G5 的锚例 «We can update our architecture diagram to include this new source of information for nodes:»。

**G8|例子角色化:一小批例子贯穿全文,新概念优先用旧例子演示并显式回指。**
开篇选定 3–4 个贯穿示例;此后每个新概念优先用已出场的老例子演示,并明写回指——锚例:«For example, the Othello graph from before can be described equivalently with these two adjacency matrices.»(§挑战,「the X from before」式回指)。不引入一次性道具例子;贯穿例子最终可「毕业」为动手实验的任务对象。

**G9|交互(或练习)按论证功能分三类,指令动词与功能绑定;图注必须回答「做什么操作、将看到什么」。**
- **揭示**(使不可见的依赖可见)→ hover/高亮一式:«Hover over a node, to highlight adjacent nodes and visualize the adjacent embedding that would be pooled, updated and stored.»
- **构造/反事实**(读者亲手改变系统)→ click/edit 一式:«Click on an image pixel to toggle its value, and see how the graph representation changes.» / «Edit the text above to see how the graph representation changes.»
- **比较**(参数实验)→ 面板/playground 一式:«Edit the molecule to see how the prediction changes, or change the model params to load a different model. Select a different molecule in the scatter plot.»(§实验·图注)

动手实验的位置法则:放在全部构件逐一讲完之后、实证总结之前;每个滑块/开关/变量对应读者已读过的一节,操纵即复习。实验前先教「怎么读」并预判误读——锚例:«A perfect model would visibility separate labeled data, but since we are reducing dimensionality and also have imperfect models, this boundary might be harder to see.»(§实验;`visibility` 为原文笔误,照录)。实验后布置有成败判据的挑战 + 对照问题,下一节假定实验已做(见 structure-templates.md 段 6)。

**G10|图文顺序随文体切换;图后第一段披露图的简化;数据图注自带局限与外链。**
- 教学节**先文后图**(先在正文定义再上图,图是正文的确认);实证节**先图后文**(图是正文的论据来源),解读第一句固定为注意力指令:«The first thing to notice is that, surprisingly, a higher number of parameters does correlate with higher performance.»(§实证)
- 图后第一段主动坦白图的简化:«It should be noted that the figure uses scalar values per node/edge/global, but most practical tensor representations have vectors per graph attribute.»(§挑战)——简化可以,沉默不可以;必要时在下一节再提醒一次。
- 数据图注末尾固定加「数字的局限 + 想深挖去哪」:«Numbers are dependent on featurization decisions. More useful statistics and graphs can be found in KONECT[@Kunegis2013-er]»(§例证·图注)
- 正文可引用图作论据来源,只取论证需要的那一个数字,不复述图里全部数据:«From the example dataset table, we see the number of nodes in a graph can be on the order of millions, and the number of edges per node can be highly variable.»(§挑战)
- 图密度标记档位:教学主线密(几乎每 1–2 段一图)、实证区图型整体切换为数据图、进阶容器减图——视觉预算留给主干。这是长文口径;短文、中篇按核心机制配图,一个机制一张即可(各档图数见 structure-templates.md「伸缩指南」)。
- 数学行内化:公式写进句子里(主语/宾语),不设独立展示公式块;下标自解释;整句加粗全文至多一处,留给最核心的定义(符号规则详见 concept-introduction.md C4)。

## 静态降级方案(无交互媒介时)

出处规则不变,载体降级;标注「降级」处为本册增补,非原文做法:

| 原载体 | 静态降级 |
|---|---|
| hero 交互图 | 摆成两态对比图(操作前/操作后),图注写「看 [X] 处:[变量] 改变后 [机制] 如何变化」 |
| hover 揭示 | 高亮标注图:把「悬停才看到的依赖」直接画出来并加注;或拆成「总览图 + 局部放大图」序列 |
| click/edit 构造 | 列出 2–3 个「如果读者改了 X,会发生 Y」的反事实小段;或给可手算的最小练习 |
| 参数面板比较 | 小表格/网格图:同一系统在 2–3 组参数下的并排结果 |
| 交互图注的祈使句 | 改为注意力指令:「注意 [图中记号]:它表示…」——仍回答「看什么、看到什么」,只是动作从「操作」降为「看」 |

降级时保留的硬规则:图注三分工不变、问题句仍零条、视觉记号仍冻结、简化仍披露、读者仍能亲手心算验证某个最小例子。

## 纯文本交付(只能交付文字时)

只能输出文字、由作者或设计师另行配图时,在图的位置放一个图位块,不要只写「此处配图」:

```
【图 N|图的标题】
画面:给配图者看——画什么、有哪些元素、颜色/形状各表示什么;系列图还要写比上一张新增了什么。
图注:给读者看的正式图注,按 G2–G4 写。
```

- 标签行【图 N|…】和「画面」不出现在读者眼前,不计入篇幅;「图注」是正文的一部分,计入篇幅。
- 能用 Markdown 表格或几行算式直接写出的(参数对比、数值演算),直接写进正文,不用图位块;需要时在下面加一句图注,同样计入篇幅。
- 连载时图号每篇从 1 重新编,跨篇提到时写「第 N 篇图 M」;贯穿全系列的核心图,新一篇第一张的画面说明写明它比上篇最后一张新增了什么。
- 数据图的数字不是出自真实来源时,图注里标明「示意数据」;真实数据写明来源,拿不准就标「[待补引用:…]」。
- 本册其他规则照常适用:图注三分工、零问题句、视觉记号冻结、简化披露、核心图逐节只新增一个元素。

## 图的谱系记账

视觉层与文字层同等重要:图的出处、作者、实现写进制度性文本(致谢/贡献/复用条款)。锚例:«Many of our GNN architecture diagrams are based on the Graph Nets diagram [@Battaglia2018-pi].»(§致谢)——连图示的视觉谱系也记账;归属细则见 final-checklist.md。

---

*本册所有 «…» 引文摘自 Sanchez-Lengeling, Reif, Pearce, Wiltschko, A Gentle Introduction to Graph Neural Networks, Distill 2021, CC-BY 4.0, https://distill.pub/2021/gnn-intro/,仅作锚例。*
