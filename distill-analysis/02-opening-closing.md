# 维度二 · 开篇与收束策略 —— 《A Gentle Introduction to Graph Neural Networks》写作方法论

**证据基础**:本文件所有结论与引文均取自 `distill-analysis/article.md`(已完整通读)。引文逐字复制,保留原文的弯撇号(`’`)、弯引号(`“”"`)、连字符与原文笔误(如 `real-word`、`We wish two highlight`,标注[原文如此]);遇引用标记 `[@…]` 时在标记前截断并标注[截断]。下方「逐字证据」的 31 条引文已全部经脚本核验为 article.md 中的逐字子串(核验结果:31/31 通过,0 失败)。

**开篇骨架速写**(下文定位用):标题(体裁承诺)→ 摘要恰好 2 句(现状一句 + 范围承诺一句,共 32 词)→ **首屏英雄交互图**(位于摘要之后、作者栏与正文任何文字之前)→ 姊妹篇按语 → 动机段(5 句论证链)→ 路线图段(8 句、四部编号)→ 定义起跑段(1 个过渡短语 + 1 句定义)→ 安抚句。收束 = 仅 4 句的 "Final thoughts";「下一步」不以书单形式存在,而是分散为 playground 微实验、"directions you could go from here" 方向段、内联 `See more in…` 指路、与全篇散布的 `is an open research question` 式开放问题。

---

## 哲学层 —— 写作价值观

1. **标题与摘要签的是「温和引路契约」:只承诺探索与动机,不承诺结论、数字或新颖性。** 标题自称 "A Gentle Introduction";摘要仅有的两个动词是 `explore` 与 `motivate`,全文开篇无一处性能或成果声明。推断:解释型文章的可信度来自不越界的范围承诺——读者被许诺的是「理解」,不是「结果」,因此作者敢于把最重的笔墨花在「为什么这样设计」上。

2. **先给可操作的现象,后给名词与定义。** 正文区的第一个内容是摘要后、作者栏前的交互图,图注只教 `Hover over a node… to see how it accumulates information`;而 `let’s establish what a graph is` 的定义要等动机段与路线图全部讲完才出现。推断:作者相信体验先于术语——全文最深的机制(信息跨层累积,即后文的消息传递)可以在读者还不认识任何术语时先被「看见」,理解可以后置,参与不能后置。

3. **一切新知锚定在读者已有的世界里,开篇与收束共用同一组锚点。** 第一句从 `all around us` 起步;第一节先承认 `You’re probably already familiar with… social networks` 再转折;images/text 作为对照系贯穿全篇,直到 Final thoughts 仍以 `very different from those of images and text` 收环。推断:锚点复用是收束感的真正来源——文章像被拉拢的环,而不是被排完的清单。

4. **反常识是开篇的引擎,但惊奇必须被显式命名。** 作者不只制造意外,还直接标注意外:`you might not think could be modeled as graphs`、`Although counterintuitive`。推断:只有说出「你原本不会想到」,读者才知道自己刚才被颠覆了哪条预期;未命名的惊奇只是噪音。

5. **收束 = 回环 + 开门,而非总结陈词。** Final thoughts 只有 4 句:复现对比框架(回环)、两个刻意降格的完成时回顾(`outlined some of…` / `walked through`)、把文中资产复指为活的直觉工具,最后以「机会 + 兴奋」把故事交还给领域。没有 "In conclusion",不复述四部路线图,不列要点。推断:好的收束让文章「合上」的同时宣告门还开着。

6. **读者离开时带走的「下一步」是可动手的实验与开放问题,不是阅读清单。** 文末没有 further reading 列表;下一步以三种形态存在:playground 里的递进微实验指令、显式命名的 `directions you could go from here`、以及散布全篇的 `is an open research question`。推断:作者把读者推向「做」而非「再读」——进一步阅读的出口被内联设在需求产生的那一句,甚至有一处在文章开头(姊妹篇按语)。

---

## 操作层 —— 可直接执行的技法

### 开篇(技法 1–14)

1. **摘要写成恰好两句:第一句被动语态陈述领域现状,第二句用「We + 动词1 + - and + 动词2」同时给出覆盖范围与论述角度。** 第一句 13 词、第二句 19 词,共 32 词,零引用零数字。迁移规则:任何主题,摘要 = 「世界里已发生什么」一句 + 「我们做什么、以及为什么要这样做」一句;第二个动词承担立场(不只是介绍 X,还要 motivate X 背后的选择)。

2. **第一句话做「旧词引新物」的信息排布:语法主语是读者已认识的概念,新事物压到句尾。** `Neural networks have been adapted to leverage the structure and properties of graphs.`——已知的 neural networks 占主语位,本文真正要讲的 graphs 及其性质放在句末焦点位(与标题的词序 Graph Neural Networks 恰好相反)。迁移:从读者词汇表里挑一个已有词当主语,把你教的东西放到谓语之后的宾语位。

3. **标题即体裁合同:形容词标态度、名词标层级。** "A Gentle Introduction to…" 用 gentle(对读者的姿态)与 introduction(内容定位)在第一句之前完成承诺。迁移:标题 = 体裁词 + 主题,让读者在读摘要前就知道自己签的是什么等级、什么温度的合同。

4. **在正文任何说理文字之前放一个「英雄交互图」,图注写成「祈使句 + to see how + 因果预告」。** 位置:紧随摘要、先于作者栏;功能:三重钩子——(a) 祈使句让第一个动作属于读者;(b) `to see how it accumulates information… through the layers` 预告的正是全文最深机制;(c) 图注只动用三个最低限度名词(node / network / layers),不出现任何后文才定义的术语,制造「读完再回来才全懂」的回访价值。迁移:任何主题,顶部放一个 10 秒内可操作的最小演示,图注只写「做什么、会看见什么变化」。

5. **动机段搭五句论证链:普遍断言 → 自然定义 → 历史 + 命名 → 近期升级 → 多域应用清单。** ① 普遍真理开场(`…are all around us; …`);② 用 `naturally expressed as` 把定义伪装成自然推论而非教学动作;③ 给领域十年历史 + 引用,并在括号里完成正式命名 `(called graph neural networks, or GNNs)`;④ `Recent developments have increased…` 制造时效性;⑤ `We are starting to see practical applications in areas such as…` 列 5 个跨度极大的领域、每个配一条引用。迁移规则:已知(就在你身边)→ 正名(这是有历史的严肃领域)→ 重要性(正在加速 + 医学/物理/社会等多域实证)。

6. **在动机链里埋三个时间层次的时机词:成熟(`for over a decade`)、加速(`Recent developments`)、窗口期(`We are starting to see`)。** 迁移:用过去、最近、正在开始三种时间状语,把主题写成「此刻正在发生的事」,而不是教科书里的死知识。

7. **路线图段用「一句总起 + 编号 + 读者动词」:** `We divide this work into four parts. First, we look at… Second, we explore… Third, we build… Fourth and finally, we provide…`——每一站以读者届时在做的动作(look / explore / build / play)命名,而不是复述章节标题。迁移:路线图里每个编号后跟的第一词必须是「你将获得的动词」。

8. **在路线图中插一句难度梯度承诺,标出起点、终点与坡度:** `We move gradually from a bare-bones implementation to a state-of-the-art GNN model.` 迁移:明说起点有多低、终点有多高、移动是渐进的——读者由此获得「我跟得上」的预判。

9. **路线图的最后一站承诺互动与直觉,而非总结或展望:** `Fourth and finally, we provide a GNN playground where you can play around with… to build a stronger intuition of how each component… contributes to the predictions it makes.` 迁移:把终点站设计成读者的游乐场,并写明玩耍的认知收益(build a stronger intuition),为收束时复指该资产埋下伏笔。

10. **定义放在动机与路线图全部完成之后,用一个显式起跑短语过渡;定义句概念先行、术语括号后置。** `To start, let’s establish what a graph is. A graph represents the relations (*edges*) between a collection of entities (*nodes*).`——过渡短语同时宣告动作(establish)与对象(what a graph is);定义写成「X 表示 Y 之间的 Z」,新术语以斜体括号第二次出现。迁移:先卖完 why 再教 what;定义永远写成关系句,术语永远放括号里。

11. **在「太抽象」的异议刚会产生的那一句,就地给出带时间锚点的安抚:** `…if this seems abstract now, we will make it concrete with examples in the next section.` 迁移:预判读者的下一个不适感,在产生不适的当句承诺「何时、用什么」消除它——时间锚点(next section)让承诺可核对。

12. **章节开篇用「你已知道 X,However + 意外 Y」模板,并把反常识显式命名:** `You’re probably already familiar with some types of graph data, such as social networks. However,… we will show two types of data that you might not think could be modeled as graphs: images and text. Although counterintuitive,…` 迁移:先替读者说出他的已知,再精确点名你即将推翻的那条预期,并给意外贴上「反直觉」的标签。

13. **在难度升级处发表「独占性声明」:** `This data is hard to phrase in any other way besides a graph.` 迁移:当读者的旧工具(矩阵、网格)恰好失效时,一句话宣告「唯有本文工具能表达此类对象」,为引入新方法提供排他性理由。

14. **每个大节以「已完成 + 但是/所以 + 新问题」的问答铰链开场,问题句即本节大纲:** `So, how do we go about solving these different graph tasks…?` / `We have built a simple GNN, but how do we make predictions…?` / `We’ve described a wide range of GNN components here, but how do they actually differ in practice?` 迁移:节首第一分句盘点已到手的东西,第二分句抛出本节要回答的问题——进度感与悬念感同时到位。

### 收束与「下一步」(技法 15–20)

15. **收束节用小而人格化的标题("Final thoughts",而非 "Conclusion"/"Summary"),正文只写四句,按固定配方:** ① 用贯穿全文的对比框架重述对象(`…strengths and challenges that are very different from those of images and text`,与开篇的 everywhere 论证及全篇 images/text 对照系形成回环);② 完成时克制回顾(`we have outlined some of the milestones…`);③ 把正文中的交互资产复指为活的直觉工具(`hopefully the GNN playground can give an intuition…`);④ 机会从句 + 情绪从句开未来(`creates a great opportunity…, and we are excited to see what the field will bring`)。迁移规则:不列要点、不复述路线图编号,用「回环意象 + 双回顾动词 + 资产复指 + 开门句」四件套;总长不超过一小段。

16. **回顾动词刻意降格、拒绝全称:** `outlined some of…`、`walked through some of the important design choices`——两处 `some of` 主动收缩覆盖面。迁移:收束时的自我评价比读者预期低半档,可信度反而升一档;只认领「里程碑」与「设计选择」这类确实做到的事。

17. **收束之前,先在正文铺一个字面意义的「方向段」:** `There are many directions you could go from here to get better performance. We wish two highlight two general directions…`——先承认岔路有很多,再承诺只讲两条,每条配引用并具体化(更复杂的图算法 / 构造图本身)。迁移:把「未来工作」写成从本文出发的分岔路口,方向数量显式声明,让读者能对号入座。

18. **「下一步」写成三个递进的具体微实验 + 一个作者不回答的问题:** `Play around with different model architectures to build your intuition. For example, see if you can edit the molecule… to make the model prediction increase. Do the same edits have the same effects for different model architectures?` 迁移:行动指令具体到可点击的对象(左边的分子)、可观察的指标(prediction 变大),最后以一个开放问题收尾,把验证权交给读者。

19. **进阶阅读不走文末清单,而是内联分流,且最早的一处放在文章开头:** `See more in Graph Attention Networks.` / `More topics can be found in the Into the weeds section.` / 顶部姊妹篇按语 `This article is one of two Distill publications…`。迁移:深度出口设在读者产生需求的那一句(刚提到 Transformers 就指向 GAT 一节),需要更深数学的读者在第一屏就拿到出口;文章同时在系列中自我定位。

20. **用明确标注的「附录湿地」收纳溢出话题,并把开放问题写成邀请:** "Into the Weeds" 以 `Next, we have a few sections on a myriad of graph-related topics…` 开场,预告这是主线之外的杂草区;全篇散布 `How to sample a graph is an open research question.` 式句子。迁移:主线装不下的一切收进一个自嘲式命名的附录;未解问题留在明处不加掩饰——它们就是读者可以进场的位置,也是最诚实的「下一步」。

---

## 逐字证据 —— 自 article.md 逐字摘引(31 条)

格式:章节 → 引文 → 所示范的技法编号。

### 摘要(正文首屏,line 9)

1. > "Neural networks have been adapted to leverage the structure and properties of graphs."
   —— 示范技法 1、2:被动语态现状句;已知概念占主语位、新事物压句尾。

2. > "We explore the components needed for building a graph neural network - and motivate the design choices behind them."
   —— 示范技法 1:「We + 动词1 + and + 动词2」的范围与角度承诺;破折号强调第二动词(motivate = 全文立场:不只讲是什么,还讲为什么)。

### 首屏英雄交互图图注(line 13)

3. > "Hover over a node in the diagram below to see how it accumulates information from nodes around it through the layers of the network."
   —— 示范技法 4:祈使句(第一个动作归读者)+ `to see how` 因果预告 + 全文最深机制(跨层信息累积 = 消息传递)的零术语预演。

### 顶部姊妹篇按语(line 45)

4. > "This article is one of two Distill publications about graph neural networks. Take a look at Understanding Convolutions on Graphs to understand how convolutions over images generalize naturally to convolutions over graphs."
   —— 示范技法 19:进一步阅读的出口放在文章最前端;同时在系列中为本文定位。

### 正文第一段:动机论证链(line 47)

5. > "Graphs are all around us; real world objects are often defined in terms of their connections to other things."
   —— 示范技法 5①:普遍断言开场,分号后紧跟一个无法反驳的日常证据。

6. > "A set of objects, and the connections between them, are naturally expressed as a *graph*."
   —— 示范技法 5②:`naturally` 把定义伪装成自然推论;术语 *graph* 斜体首现。

7. > "Researchers have developed neural networks that operate on graph data (called graph neural networks, or GNNs) for over a decade" [截断于引用标记前]
   —— 示范技法 5③、6:历史权威(十年 + 引用)+ 括号内完成命名与缩写。

8. > "We are starting to see practical applications in areas such as antibacterial discovery" [截断于引用标记前]
   —— 示范技法 5⑤、6:窗口期时机词 `starting to see` + 跨域应用清单(原文连列 5 个领域、各配引用)。

### 正文第二段:路线图(line 49)

9. > "This article explores and explains modern graph neural networks. We divide this work into four parts."
   —— 示范技法 7:路线图总起句,数量显式宣布。

10. > "We move gradually from a bare-bones implementation to a state-of-the-art GNN model."
    —— 示范技法 8:难度梯度承诺(低起点 / 高终点 / 渐进坡度)。

11. > "Fourth and finally, we provide a GNN playground where you can play around with a real-word task and dataset to build a stronger intuition of how each component of a GNN model contributes to the predictions it makes."
    —— 示范技法 9:最后一站 = 读者的游乐场 + 直觉收益承诺(`real-word` 为原文笔误,照录)。

### 正文第三段:定义起跑(line 51)

12. > "To start, let’s establish what a graph is. A graph represents the relations (*edges*) between a collection of entities (*nodes*)."
    —— 示范技法 10:显式起跑短语;关系式定义、术语括号后置。

### 引言末尾:安抚句(line 72)

13. > "Graphs are very flexible data structures, and if this seems abstract now, we will make it concrete with examples in the next section."
    —— 示范技法 11:在「太抽象」异议的诞生点就地承诺,时间锚点 `in the next section` 可核对。

### 第一节开篇:已知 → 反常识(line 76)

14. > "You’re probably already familiar with some types of graph data, such as social networks."
    —— 示范技法 12:先替读者说出已知(`probably` 留有余地)。

15. > "However, graphs are an extremely powerful and general representation of data, we will show two types of data that you might not think could be modeled as graphs: images and text."
    —— 示范技法 12:However 转折 + 精确点名将被推翻的预期(`might not think could be modeled as graphs`)。

16. > "Although counterintuitive, one can learn more about the symmetries and structure of images and text by viewing them as graphs" [截断]
    —— 示范技法 12:反常识被显式贴标签(`Although counterintuitive`),并立刻兑换成收益(`learn more about the symmetries`)。

### 独占性声明(line 106)

17. > "This data is hard to phrase in any other way besides a graph."
    —— 示范技法 13:旧工具失效处的一句话排他性论证。

### 大节开篇的问答铰链(line 200 / 264 / 412)

18. > "So, how do we go about solving these different graph tasks with neural networks?"
    —— 示范技法 14(The challenges of using graphs in machine learning 节首):承接上节的问题铰链。

19. > "We have built a simple GNN, but how do we make predictions in any of the tasks we described above?"
    —— 示范技法 14(GNN Predictions by Pooling Information 节首):「已完成 + but + 新问题」。

20. > "We’ve described a wide range of GNN components here, but how do they actually differ in practice?"
    —— 示范技法 14(GNN playground 节首):盘点资产后立刻转向实践性悬念,引出互动实验。

### 任务的历史赌注(line 414)

21. > "Predicting the relation of a molecular structure (graph) to its smell is a 100 year-old problem straddling chemistry, physics, neuroscience, and machine learning."
    —— 示范技法 6 的变体:时机词(`100 year-old`)+ 跨学科广度为选定的实验任务加注分量。

### playground 微实验指令(line 443)

22. > "For example, see if you can edit the molecule on the left to make the model prediction increase. Do the same edits have the same effects for different model architectures?"
    —— 示范技法 18:具体到可点击对象的挑战 + 一个作者不作答的问题。

### 收束前的方向段(line 509 / 513)

23. > "There are many directions you could go from here to get better performance. We wish two highlight two general directions, one related to more sophisticated graph algorithms and another towards the graph itself."
    —— 示范技法 17:显式方向段,`from here` 把未来工作锚在本文当前位置(`We wish two highlight` 为原文笔误,照录)。

24. > "One of the frontiers of GNN research is not making new models and architectures, but “how to construct graphs”" [截断]
    —— 示范技法 17:第二条方向以「不是 A 而是 B」的重新定框呈现,弯引号保留原文。

### Final thoughts(line 636,收束全文仅此一段)

25. > "Graphs are a powerful and rich structured data type that have strengths and challenges that are very different from those of images and text."
    —— 示范技法 15①:回环——复现全篇的 images/text 对比框架收拢开篇的 everywhere 论证。

26. > "In this article, we have outlined some of the milestones that researchers have come up with in building neural network based models that process graphs."
    —— 示范技法 16:完成时回顾动词 `outlined` + 刻意降格 `some of`。

27. > "We have walked through some of the important design choices that must be made when using these architectures, and hopefully the GNN playground can give an intuition on what the empirical results of these design choices are."
    —— 示范技法 15③:`walked through` 与路线图的 move gradually 呼应;交互资产被复指为读后仍可用的直觉工具;`hopefully` 保留人声。

28. > "The success of GNNs in recent years creates a great opportunity for a wide range of new problems, and we are excited to see what the field will bring."
    —— 示范技法 15④:开门句 = 机会从句 + 情绪从句(`we are excited`)+ 把叙事交还给领域(`what the field will bring`)。

### 开放问题与内联指路(line 539 / 518 / 102)

29. > "How to sample a graph is an open research question."
    —— 示范技法 20:未解问题不加掩饰地留在正文里,本身就是对读者的邀请。

30. > "Next, we have a few sections on a myriad of graph-related topics that are relevant for GNNs."
    —— 示范技法 20:附录湿地 Into the Weeds 的开场白,预告体量与「杂」的定性。

31. > "See more in Graph Attention Networks."
    —— 示范技法 19:内联分流式进一步阅读,出口设在需求产生的句子处(刚提到 Transformers 之时)。

---

## 附:本维度五个问题的简答定位

- **第一句话做了什么 / 摘要句式骨架**:见技法 1–2 与证据 1–2(现状被动句 + 双动词范围承诺,无结果声明)。
- **动机论证链(已知→反常识→重要性)**:第一段内完成「已知→正名→重要性」(技法 5–6,证据 5–8);反常识一拍被安排在第一节(技法 12,证据 14–16)——先让读者承认主题重要,再扩张其版图。
- **首个交互图的位置与钩子功能**:摘要之后、作者栏与正文之前;三重钩子 = 参与指令 + 机制预告 + 零术语(技法 4,证据 3)。
- **Final thoughts 如何既收束又打开**:回环(证据 25)+ 降格回顾(证据 26–27)+ 机会与情绪开门(证据 28);无套路化总结。
- **读者被留下的「下一步」**:playground 微实验与无答案之问(技法 18,证据 22)、显式方向段(技法 17,证据 23–24)、开放问题(证据 29)、内联与开篇的阅读出口(技法 19,证据 4、31)。
