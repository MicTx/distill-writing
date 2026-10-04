# 结构模板与过渡句

> 何时读本册:设计全文结构、写开头/结尾、卡在章节衔接处时。«…» 为出处文章逐字引文,只作锚例(示范句式,不示范内容);引文括注的 § 为该文小节(简称见 SKILL.md)。句式不挑领域;九段骨架默认服务机制型主题,其他题材和篇幅见「伸缩指南」(档名与 SKILL.md「规模分档」一致)。

## 第一原理:问题链

全文排成一条问题链:**每章的消费对象,都是上一章生产的疑问。** 排序不服从学科逻辑:

- 先「是什么/哪里有」(让读者相信对象无处不在)→ 产出「用来干什么」之问;
- 再「能做什么」(任务图景)→ 产出「怎么解」之问;
- 再「难在哪」(旧工具的精确死因)→ 产出「那正确做法是什么」之问;
- 再「怎么做」(从最简版逐级搭建)→ 产出「实际有效吗」之问;
- 再「真的吗」(可动手实验)→ 产出「更深呢」之问;
- 最后「更多」(深水区容器)→ 收束回环。

顺序因果:任务先于方法(否则读者不知方法为何物)、障碍先于方法(否则不知为何要这些设计)、实验后于方法(否则无物可玩)、容器殿后(否则主线断裂)。

## 九段骨架

| # | 段 | 功能 | 参考占比 |
|---|---|---|---|
| 0 | 开篇承诺 | 签体裁合同、给钩子、卖 why、铺路线、最小定义、安抚 | ≈6% |
| 1 | 以已知引入 | 例证三级阶梯,证明对象无处不在 | ≈11% |
| 2 | 任务图景 | 同构排比定义「能做什么」(N 类) | ≈7% |
| 3 | 核心挑战 | 朴素方案的精确死因 → 命名过的优雅替代 | ≈6% |
| 4 | 核心机制 | 从最简版逐级搭建,每级一个机制 | ≈15% |
| 5 | 变体与设计选择 | 把机制的设计维度摆成可选项,留给段 6 检验 | ≈7% |
| 6 | 动手实验与实证 | 把讲授构件变成可操纵杠杆,再用实验结果回答设计问题 | ≈16% |
| 7 | 深水区 | 命名容器,收纳一切「值得讲但会打断主线」的支线 | ≈30% |
| 8 | 收束 | 回环 + 降格回顾 + 资产复指 + 开门 | ≈1% |

占比按原文词数实测(正文加图注),只取比重感:机制、设计选择与实证合计近四成,深水区约三成,收束极短。原文是近八千词的长文;各档都按下面的伸缩指南定比重,不要照搬这里的比例。

**伸缩指南**:段的存在服务于问题链,不是硬性八股。档名与 SKILL.md「规模分档」一致;表里的节数、棘轮级数和图数是经验建议,不是原文实测,拿来做篇幅预算,不是配额。

| 档 | 九段怎么留 | 节 | 棘轮 | 图 |
|---|---|---|---|---|
| 对话级(≤800 字) | 不套九段,按 SKILL.md 分档表的五步写 | 不分节 | 1 级 | 0–1,可用小表代替 |
| 短文(800–2000 字) | 0 压成一段;合并 1+2(例子与能做什么一气呵成);把 3 压成 4 的第一级(「朴素做法为什么不行」作为第一级棘轮);5 并入 4 的末级;6 换成一个读者能自己动手的小练习,放不下就省;砍 7;8 写两三句 | 3–5 | 2–4 级 | 1–3 |
| 中篇(2000–4000 字,公众号单篇的常见篇幅) | 保留 0、1、3、4、8;2 压成一段报数总起;5 并入 4 的末级;6 换成一个思想实验或可心算的小例,有实证材料时只留最站得住的一条结论(连同它的反例);7 砍掉,想深挖的内容留一两句指向外部资料(引用须真实) | 4–6 | 3–5 级 | 3–6 |
| 长文(4000 字以上) | 完整九段;7 占一成到一成半就够(三成是出处那篇近八千词长文的体量,不是目标),篇幅吃紧时先砍 7 | 7–12 | 4 级以上 | 主线每 1–2 段一张 |
| 系列(多篇连载) | 每篇按自己的档伸缩;5 可拆成多篇(每个设计维度一篇);7 可独立成姊妹篇,主线留前向指针 | 按每篇的档 | 每篇的级数按自己的档;级与级跨篇首尾相接:上篇最后挂着的缺陷,就是下篇第一级的缺口 | 按每篇的档 |

- 篇幅预算:每级棘轮(缺口 → 机制 → 最小例 → 自曝缺陷)大约要 300–600 字,按这个数和目标篇幅倒推级数;放不下的级压成一句前向指针,或整级砍掉。开篇与收束合计不超过全文两成(首屏钩子只留一句话或一张图,要一步步算完的例子放进第一节),大头留给核心机制和它的最小例。短文里每级的增量点名可以从三遍压成两遍:节末清点,加下节开头的 delta 句。
- 系列衔接:每篇开头用一两句交代上篇给了什么、这篇补哪个缺口,不重讲上篇;篇尾的出口钩子就是下篇的入口。首篇没有上篇可接,开头改用一句话交代整个系列要走到哪(不写死篇数,规划还可能改)。只读其中一篇的读者也要能跟上:首次用到前面篇章定义的术语时,旁边补半句提醒,不重讲;一篇要靠前面好几篇打底时,篇首点明先读哪几篇。
- 系列的参照与术语:坐标系全系列固定;参照系可以按坐标轴各选(量音高的类比搬不到节奏上),规划里写明哪条轴借哪门,选定后不换。全系列共用一张主词表,每篇只追加新词。前面的篇章不用后面才定义的术语原名,先用日常说法,到定义那篇再收编;前向指针可以点出名字,不下定义。贯穿全系列的核心图写进规划,图号怎么编见 `visual-figures.md`「纯文本交付」。
- 题材伸缩:骨架默认服务「机制型」主题(有设计维度可实证、有变量可操纵)。非机制型主题降级使用——历史成因/观念演变类没有可对比的设计选择,把段 5 并入段 4 作末级棘轮(「变体」改讲同一机制的不同历史形态);无可操纵变量的主题,段 6 用思想实验或可心算小例替代(替代形式见 visual-figures.md「静态降级方案」)。定量规律类(复利、概率这类靠公式说话的主题)没有可比的设计,却有可拧的变量:段 5 改成一次只拧一个变量,段 6 用可心算的算例和参数对比表。
- 判据只有一条:删掉或合并后,「上一段出口的疑问是否仍被下一段消费」。

## 逐段模板

### 段 0|开篇承诺:六件事

在读者读到任何实质内容之前,按序完成:

1. **摘要恰好两句**(有摘要位时:标题下的导语、公众号摘要栏;没有摘要位的博客,由开头第一段承担钩子与路线图):领域事实句(英文用被动语态,中文用话题句;旧词作主语、新事物压句尾)+ 本文动作句(「We + 动词1 + 覆盖范围 - and + 动词2 + 立场」)。零数字、零结论,第二个动词承担立场。中文的两个动词要具体(搭、拆、算、比),不用「梳理」「阐述」「探讨」一类公文动词。
   锚例:«Neural networks have been adapted to leverage the structure and properties of graphs. We explore the components needed for building a graph neural network - and motivate the design choices behind them.»(摘要)
2. **首屏钩子**:零术语、10 秒内可操作的演示(交互图或静态降级,见 visual-figures.md)。图注只写「做什么、会看见什么」。
3. **动机五句链**:普遍断言 → 自然定义 → 历史+命名 → 近期升级 → 跨域应用清单。
   锚例(第一句):«Graphs are all around us; real world objects are often defined in terms of their connections to other things.»(§引言)
   埋三个时间层次:成熟(`for over a decade`)、加速(`Recent developments`)、窗口期(`We are starting to see`)——把主题写成「此刻正在发生的事」。时间层次只写真实发生的进展。常青主题(原理多年未变,如哈希表、贝叶斯定理)没有「近期升级」可写,就把「此刻」落在读者今天就在用的地方(「你每天用的 Python 字典」),不虚构趋势。
4. **序数词路线图**:3–5 步,总起句报数;每步以读者届时在做的**动作**命名,不复述章节标题;只数主干,开篇本身、深水区和收束都不计数,承诺因此必然可兑现。锚例:«We divide this work into four parts. First, we look at what kind of data is most naturally phrased as a graph, and some common examples.»(§引言)
5. **坡度承诺**:明说起点多低、终点多高、移动是渐进的。锚例:«We move gradually from a bare-bones implementation to a state-of-the-art GNN model.»(§引言)→ 任意主题版:「我们从最简的 [X] 出发,逐步走到 [当前最佳实践]。」
6. **最小定义 + 安抚句**:给无法再简化的核心定义(写成关系句,见 sentence-patterns.md S1);紧接着承认它还抽象,并写明在哪兑现——写明位置,承诺才可核对。锚例:«Graphs are very flexible data structures, and if this seems abstract now, we will make it concrete with examples in the next section.»(§引言尾,兼作章前桥)

短文、中篇里六件事可以压成一两段:功能尽量保留,台词可以省;某件事没有真实素材(常青主题没有近期进展、版面没有摘要位),就整件省掉,不为凑齐而编造。

标题即体裁合同:形容词标态度、名词标层级(锚例标题 "A Gentle Introduction to…"——温和+入门),让读者在读摘要前就知道自己签的是什么等级、什么温度的合同。

### 段 1|以已知引入:例证三级阶梯

例子按「与读者旧表征的距离」降序:熟悉的 → 反直觉的 → 野外的。内部拍节(完整版七拍,短文、中篇按需取舍;第 6 拍只要用了教学表示就不能省):

1. **承认已知**(概率化画像句,见 S14);
2. **反直觉预告**:精确点名即将被颠覆的对象(见 S15/S16);
3. **双联句翻转**:同一句内完成换轨——第一句完整陈述旧表征(带具体参数),第二句以「另一种看法是…,其中…」开头并当场列出元素对应表。锚例:«We typically think of images as rectangular grids with image channels, representing them as arrays (e.g., 244x244x3 floats).» + «Another way to think of images is as graphs with regular structure, where each pixel represents a node and is connected via an edge to adjacent pixels.»(§以已知引入)
4. **最小可操作例**:小到全部情况可穷举、可操作(见 concept-introduction.md C6);
5. **句式克隆到第二对象**:同一翻转程序原样套用,证明它是可复用程序而非个案;
6. **实践落差供认**(见 S44):教学表示引入后立刻声明「实践中不这么做」,失效归因到可见结构;
7. **野外数据 + 必要性收束**:升到真实世界硬案例,再以一句排他性论证收束例子群——锚例:«This data is hard to phrase in any other way besides a graph.»(§例证)→ 任意主题版:「这类 [对象] 很难用 [读者的旧工具] 表达。」例子群至此从「可以这样表示」升格为「只能这样表示」。

**换挡句**:每组例子之间,用一句话说出前后两组在哪个维度上不同——过渡句就是排序键的显式化。锚例:«Let’s move on to data which is more heterogeneously structured. In these examples, the number of neighbors to each node is variable (as opposed to the fixed neighborhood size of images and text).»(§例证)

普适性主张要求跨域取样:若核心命题是「X 无处不在」,例子必须跨到任何一个领域都无法独占,全称命题才被支撑;每个例子自带一句领域速成,读者无需出文。

### 段 2|任务图景:同构排比

- **报数总起**:先一句话宣布共有几类。锚例:«There are three general types of prediction tasks on graphs: graph-level, node-level, and edge-level.»(§任务)→「[领域] 上的任务共有三类:[甲]、[乙]、[丙]。」
- **统一性先行 + 绕道宣言**:先亮漫游终点的结论,再预告绕道。锚例:«we will show that all of the following problems can be solved with a single model class, the GNN. But first, let’s take a tour through the three classes of graph prediction problems in more detail, and provide concrete examples of each.»(§任务)
- **N 个严格同构的小节**:每节同位置放同类内容——定义句 → 带名字的例子/数据集/故事 → 图 → 类比双通道(两门参照系各一次)。数据集可以叙事化:锚例:«As the story goes, a feud between Mr. Hi (Instructor) and John H (Administrator) creates a schism in the karate club.»(§任务)→ 预测任务变成剧情悬念。
- **分类族收口**:末节以「剩下的最后一类是 X」封口,读者知道序列到此为止(见 S10)。

### 段 3|核心挑战:选型论证链

先立约束 → 难度分诊(宣布几个容易、哪个难,火力集中给唯一难的)→ 替读者说出朴素方案并承认其优点 → 用 2–3 个精确死因打掉(每因配图或例)→ 交付命名过的优雅替代 → 量化对比压成一句话。

锚例(立靶与正解):«Perhaps the most obvious choice would be to use an adjacency matrix, since this is easily tensorisable. However, this representation has a few drawbacks.» / «One elegant and memory-efficient way of representing sparse matrices is as adjacency lists.»(§挑战)

难度分诊锚例:«The first three are relatively straightforward: for example, with nodes we can form a node feature matrix $N$ by assigning each node an index $i$ and storing the feature for $node_i$ in $N$.» → «However, representing a graph’s connectivity is more complicated.»(§挑战)

### 段 4|核心机制:复杂度棘轮

- **章首加粗总定义**:全文至多一处,留给最核心的对象;同时回答「它做什么」与「它不破坏什么」(见 S3)。
- 每级 = 一个小节;级间靠「节尾自曝钩子 → 下节缺陷回收」推进(见 S26/S27)。
- **级内六拍**:① recap+问句开场 → ② 最简情形先行 → ③ 转折困境(具体反例场景)→ ④ 命名解法+编号步骤 → ⑤ 图示/条件句 parade(完全平行的枚举句,一句配一张图)→ ⑥ 回收一句 + 暴露下一缺口。
- 条件句 parade 锚例:«If we only have node-level features, and are trying to predict binary edge-level information, the model looks like this.»(§机制)→「若我们只有 [甲信息]、却要预测 [乙目标],模型长这样。」句子本身当图的标题用,不把 N 种情形合并进一个长段落。
- 机制效果写成**可数命题**(见 S32)。

### 段 5|变体与设计选择

位置:紧接核心机制的最后一级,作为棘轮的延续,不必另起一章(原文就是机制章的最后两节:学习边的表示、加入全局表示)。

- 把「在哪做、先做谁」等设计维度显式化为 decision,不写成「正确答案」。锚例:«Which graph attributes we update and in which order we update them is one design decision when constructing GNNs.»(§机制)→「先更新 [X] 还是先 [Y],是构建 [系统] 时的一项设计决策。」
- 这里只摆出选项和各自的代价;哪个更好,留给段 6 的实验和实证回答。

### 段 6|动手实验与实证

- **枢纽位置**:放在全部构件讲完之后;先给可操纵的实验场,紧接着用实验结果回答段 5 留下的设计问题。每个滑块/开关/练习对应读者已读过的一节。
- **任务先给叙事权重,再立刻降维到最小切面**。锚例:«Predicting the relation of a molecular structure (graph) to its smell is a 100 year-old problem straddling chemistry, physics, neuroscience, and machine learning.» → «To simplify the problem, we consider only a single binary label per molecule»(§实验)
- **布置有成败判据的挑战 + 对照问题**;下一节假定实验已做。锚例:«For example, see if you can edit the molecule on the left to make the model prediction increase. Do the same edits have the same effects for different model architectures?» → «When exploring the architecture choices above, you might have found some models have better performance than others.»(§实验/§实证)
- **实证拍节**:每个图表配「前置问句 + 后置观察句」;观察句以注意力指令开头。锚例:«Are there some clear GNN design choices that will give us better performance?» → «The first thing to notice is that, surprisingly, a higher number of parameters does correlate with higher performance.»(§实证)
- 结论含混就直说 mixed messages,并在混杂中拎出唯一站得住的趋势(见 S41/S42)。
- **无交互媒介的降级**:给可手算的最小练习或思想实验(小到全部情况可穷举),下一节仍以「你大概已经发现……」回收。
- 任务选贯穿全文的旧例子,让实验成为旧相识的毕业典礼,而不是新道具登场。
- **方向段**:主线收尾、进入深水区之前,可铺一段显式的「方向段」:先承认岔路有很多,再承诺只讲两三条,每条配引用并具体化。锚例:«There are many directions you could go from here to get better performance. We wish two highlight two general directions, one related to more sophisticated graph algorithms and another towards the graph itself.»(§实证·节尾;`We wish two highlight` 为原文笔误,照录)

### 段 7|深水区:命名容器

- 容器起口语暗喻名;开场一句自我降格,告诉读者可以止步而不损失主干。锚例:«Next, we have a few sections on a myriad of graph-related topics that are relevant for GNNs.»(§容器)
- 各节自包含、彼此无依赖,以开放研究问题+引用收尾;继续复用主线词汇系统,不开第二套术语,降低边际负荷。
- 图密度显著低于主线——视觉上也在告诉读者「这里是深水区」。
- **前向指针开在诱惑最强的位置**,不是文末统一「进一步阅读」。锚例:«For a more in-depth discussion on aggregation operations go to the Comparing aggregation operations section.»(§机制)/«See more in Other types of graphs.»(§实证·节尾)

### 段 8|收束:四件套

收束节用小而人格化的标题(如 "Final thoughts",而非 "Conclusion"),正文只写一小段,按固定配方:

1. **回环句**:复现开篇的对比框架,让文章显式闭合(见 S48);
2. **降格回顾**:回顾动词刻意降半档(outlined / walked through 一类),加 `some of` 主动收缩覆盖面——自我评价比读者预期低半档,可信度反而升一档;
3. **资产复指**:把文中的演示/练习/工具复指为读后仍可用的直觉工具;
4. **开门句**:机会从句 + 情绪从句,把故事交还给领域(见 S49)。机会从句要有真实依据;常青主题没有新机会可报,改用一个可动手的下一步或一个开放问题开门。

禁止:In conclusion 式套话、复述路线图编号、列要点、在文末单设「局限」一节。不设局限节不等于不谈局限:局限要在它出现的地方就地付清(S39/S44/S45),收尾只做有分寸的展望。

## 过渡句五式(节首)

写完一章后,把下一章首句改写成「上一章已给 + 读者仍缺」的一句话。五式轮换,避免每章都用问句开场:

| 式 | 句式 | 锚例 |
|---|---|---|
| ① recap + 问句 | 「我们已 [完成成果],但 [本节问题]?」 | «We have described some examples of graphs in the wild, but what tasks do we want to perform on this data?» |
| ② 问句 + 第一步降维 | 「所以,怎么 [大目标]?第一步是 [可立即执行的小动作]。」 | «So, how do we go about solving these different graph tasks with neural networks? The first step is to think about how we will represent graphs to be compatible with neural networks.» |
| ③ 完成确认 + 新能力 | 「既然 [前置条件] 已完成,我们将 [新动作]。」 | «Now that the graph’s description is in a matrix format that is permutation invariant, we will describe using graph neural networks (GNNs) to solve graph prediction tasks.» |
| ④ 读者熟悉度 + 反直觉预告 | 「你大概已熟悉 [X]。然而…」 | «You’re probably already familiar with some types of graph data, such as social networks.» |
| ⑤ 容器自述 | 「接下来是若干与 [主线] 相关的 [主题域] 小节。」 | «Next, we have a few sections on a myriad of graph-related topics that are relevant for GNNs.» |

**章前桥**:过渡在新章标题之前就开始——上一章的最后一句先完成交接(段 0 的安抚句即是锚例:承诺「下一节具体化」的那句放在引言末尾,而非新章开头)。

完整逐字句式骨架(含槽位标注)见 `sentence-patterns.md` C 组。

## 标题层级判据

- **h2** = 读者旅程的一个新阶段(需要一个新的旅程理由);**h3** = 同一阶段内的并列情形、棘轮的下一级、或独立支线话题(能用一句话接回上一块)。
- 并列的清单式内容用**粗体行内标题**(`**X as Y.**` 开头),让排比在页面上可见但不污染目录;目录只保两层。
- 若核心命题是「任何 X 都是 Y」,可把它物化为一组句法完全相同的小标题(锚例:Images as graphs / Text as graphs / **Molecules as graphs.**)——读者扫目录即完成一次论证。

---

*本册所有 «…» 引文摘自 Sanchez-Lengeling, Reif, Pearce, Wiltschko, A Gentle Introduction to Graph Neural Networks, Distill 2021, CC-BY 4.0, https://distill.pub/2021/gnn-intro/,仅作锚例。*
