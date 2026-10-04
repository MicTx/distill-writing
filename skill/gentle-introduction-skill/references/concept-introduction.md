# 概念引入流程与术语管理

> 何时读本册:阶段一建术语账本时;起草阶段每引入一个新概念/新术语/新符号之前。«…» 为出处文章逐字引文,只作锚例。核心主张:**术语是刚被提出的那个问题的答案;概念不是被定义一次学会的,而是被一条重述链深化。**

## 概念引入八步(C1–C8)

```
[C1 造缺口] → [C2 命名] → [C3 拆解] → [C4 符号绑定] → [C5 双锚落地]
     → [C6 最小可操作例] → [C7 边界与断点] → [C8 复现计划(角色递进)]
        ↑______ C8 的每次复现可回到 C5/C6,换语境换锚,不换词 ______↑
```

**C1|造缺口:术语出现前 1–3 句,先让读者感到「缺一种方式做 X」。**
做法:痛点场景先行,或需求句直陈。锚例:«However, it is not always so simple. For instance, you might have information in the graph stored in edges, but no information in nodes, but still need to make predictions on nodes.»(§机制)→ «We need a way to collect information from edges and give them to nodes for prediction.»(§机制)。找不到任何一个「先列术语表、后讲内容」的位置——没有缺口就不引入名词。

**C2|命名:缺口句的下一句交付名词。**
做法:首现斜体、别名一次收编、绰号带学名与引用;命名时可夹口语插入语降密度。锚例:«We can do this by *pooling*.»(§机制);«One solution to this problem is by using the global representation of a graph (U) which is sometimes called a **master node** [@Battaglia2018-pi][@Gilmer2017-no] or context vector.»(§机制);口语插入语:«(or your favorite differentiable model)»(§机制)。完整句式见 sentence-patterns.md A 组(S1–S11)。

**C3|拆解:命名后立即给「X proceeds/works in N steps:」+ 编号步骤,步骤动词斜体首现。**
锚例:«Pooling proceeds in two steps:»(步骤动词 *gather*、*aggregated* 各自斜体首现);«Message passing works in three steps:»——第二步复用 pooling 的动词,只新增一个新动词。
场景:可分解机制的首段之后;同族概念用同构拆解句式建立「家族相貌」;不可分解的概念才允许停留在一句话定义。

**C4|符号绑定:完整口头程序与图之后才引入符号;绑定句内重述语义;公式后必接自然语言回译 + 「它不是什么」。**
锚例:«We represent the *pooling* operation by the letter $\rho$»(§机制);«Another way of stating this is with Big-O notation, it is preferable to have $O(n_{edges})$, rather than $O(n_{nodes}^2)$.»(§挑战);回译:«the inner product is essentially “gathering” all node features values of dimension $j$” that share an edge with $node_i$»(§容器——用前文已建立的动词给公式贴标签);边界:«It should be noted that this message passing is not updating the representation of the node features, just pooling neighboring node features.»(§容器)。
规则:每个符号入场前,必须已存在一个不含该符号的完整句子表述同一件事;符号引入句 = 「我们把 X 记作 Y,它表示 [重述]」双段结构;任何公式段落的收尾句必须是自然语言。直觉型与形式型读者各取一条通道,且互相校验。

**C5|双锚落地:定义 → 本域一例 → 读者旧域类比(两门参照系各一次)。**
锚例(任务类的三拍):graph-level 定义 → «For example, for a molecule represented as a graph, we might want to predict what the molecule smells like, or whether it will bind to a receptor implicated in a disease.» → «This is analogous to image classification problems with MNIST and CIFAR, where we want to associate a label to an entire image.» + 文本侧第二锚(情感分析一类)(§任务)。
规则:类比端选读者必然熟悉的对象,不选最相近的。两门参照系全文复用,但具体锚点一对一:一个锚点(某个旧任务、旧对象)只映射一个新概念,不拿同一个锚点解释两件事,防止读者把类比当成同构。两门参照系各映射一次是理想;某一门映射牵强时只用另一门,不要硬凑。

**C6|最小可操作例:小到全部情况可穷举、可操作;真实数据集只用于下游验证,不用于首次引入。**
锚例:«We order the nodes, in this case each of 25 pixels in a simple 5x5 image of a smiley face»(§以已知引入——25 个像素,一屏可览);4 节点小例穷举全部可能情形;图注 «Click on an image pixel to toggle its value, and see how the graph representation changes.»(§以已知引入)。
「过程性/分支性/组合爆炸」的内容优先交给可操作的演示,正文只留一句结论——组合太多时明说「大例子算不完」,把穷举留给小例。

**C7|边界与断点:教学简化自己拆穿;类比断点显式写出;命名变体降级为旁注。**
锚例:实践落差 «Of course, in practice, this is not usually how text and images are encoded: these graph representations are redundant»(§以已知引入);类比断点 «However, the number of neighboring nodes in a graph can be variable, unlike in an image where each pixel has a set number of neighboring elements.»(§机制);旁注段 «You could also call it a GNN block. Because it contains multiple operations/layers (like a ResNet block).»(§机制)——「这东西还能叫什么」的讨论一律不进主句,写成一到两句的旁注并顺手给出叫法背后的理由。
失效声明必须与残余价值声明成对出现(失效的类比仍建立了什么直觉),否则读者会整体抛弃该类比。

**C8|复现计划:每个核心术语规划 3–10 次出场,词形冻结、语境角色逐次加深;载体沿固定序列升级。**
载体升级序列:**图注 → 正文 → bullet → 符号 → 交互控件 → 经验图表 → 形式化**。
锚例(一个词的角色递进):permutation invariant 的出场序列——问题(«they are not permutation invariant»)→ 研究指针 → 定义中的设计目标(«preserves graph symmetries (permutation invariances)»)→ 约束改写与连字符形态 → 场景保持性论证;pooling 依次是:解法 → 外链 → 旧域类比 → 积木宣言(«This pooling technique will serve as a building block for constructing more sophisticated GNN models.»)→ 移入层内 → 整节深化。
规则:每次出场只加一个新侧面,且新侧面来自读者**此刻刚获得的能力**(会更新→能看见→能调节);除词性变化外禁止换同义词。

## 术语账本(动笔前建,模板)

| 术语 | 主词 | 别名(首现句一次收编) | 首现句式 | 标记级别 | 重述链计划 | 符号 |
|---|---|---|---|---|---|---|
| 例:核心机制 | mechanism | “X 流程”(首现并列) | S6 缺口两连句 | 斜体首现 | 问题→定义→约束→性质→极限(5 站) | 第 3 节后绑定 |

短文、中篇只需前三列(术语、主词、别名),写进设计单即可;长文填全表,并配下面两张表;系列全系列共用一张账本,每篇只追加新词,另记一列「定义之前的日常说法」:后面才定义的术语,前面的篇章先用日常说法,到定义那篇再收编。

配套两张表:
- **动词预算表**:核心运算 = 4–6 个日常动词;每个新机制标注「复用哪些旧动词 / 至多新增哪个新动词」。
- **符号延迟绑定表**:每个符号 ↔ 已有的不含符号的完整句子(位置)。

## 术语规则速查

1. **首现句嵌在旧词主句里**:新术语的同位槽(括号/where 从句)落在全部由旧词构成的句子中;禁止「X:定义。」式词条句开局。铺垫不超过三句,通常恰好一句(缺口句或功能句)。
2. **三级标记纪律**:首现斜体 = 新词;总定义整句粗体,全文至多一处;复现裸用。标记系统本身在教读者「这是不是新词」。中文排版少用斜体,首现改为只加粗术语本身或写成「术语(English)」(见 sentence-patterns.md 中文适配)。
3. **别名一次性收编**:动笔前建同义词表;首现句把全部别名并列(逗号+or / also called),此后全文只用主词。关键动词与角色名同样适用括号加注——锚例:«to route (or pass) information»、«Mr. Hi (Instructor) and John H (Administrator)»——一次性给出等价项,此后锁死选定的那一个。检索式自查:全文搜同义词,别名应只在首现句出现一次。
4. **括号回译消歧**:每个可能被误读的抽象词,首现配一个括号改写;括号内容删掉后句子必须仍完整。锚例:«there is no guarantee that these different matrices would produce the same result in a deep neural network (that is to say, they are not permutation invariant).»(§挑战)
5. **例后命名**:术语是从多例归纳出的范畴词时,倒置顺序——至少三个跨域例子之后再命名(S9)。
6. **操作性日常定义**:任何影响理解的标签词(哪怕来自日常),首现后给可检验判据(S11)。
7. **拟人化边界**:隐喻只负责动机——拟人动词加引号、绰号与学名并列、数学实体在括号外隐喻在括号内(锚例:«*gather* all the neighboring node embeddings (or messages)»——括号外是精确对象,括号内才是隐喻,方向不可逆);拟人段之后必跟编号步骤。隐喻负责「为什么」,清单负责「怎么做」。
8. **弱断言保护非标准视角**:借来的、有争议的或仅为教学服务的读法,用 can be considered / might be viewed / is reminiscent of 等非断言动词引入,视角的刺激性由句式的克制来平衡。

## 逃逸舱五分诊

正文一个句子只服务于构造链上的当前增量。任何想写下的其他内容,先分诊:

| 类型 | 判据 | 去处 | 锚例 |
|---|---|---|---|
| ① 整节支线 | 不在主干构造链上 | 命名容器(附录/深水区) | 独立成章收纳变体话题 |
| ② 开放研究问题 | 你答不了 | 一句状态声明 + 引用 | «How to sample a graph is an open research question.[@Rozemberczki2020-lq]» |
| ③ 别名/等价路径 | 「也可以叫/换序也成立」 | 一句 You-could-also 旁注 | «You could also 1) gather messages, 3) update them and 2) aggregate them and still have a permutation invariant operation.»(§机制) |
| ④ 需深入对比才能下结论 | 值得讲但此刻不能讲 | 前向指针(精确到节名) | «For a more in-depth discussion on aggregation operations go to the Comparing aggregation operations section.» |
| ⑤ 过程性/可动手验证 | 动态、分支、组合爆炸 | 可操作演示(或静态降级) | 图注即操作契约 |

判断口诀:展开欲超过一句,就是推送信号。欠条开在诱惑最强的位置(读者刚产生好奇心的那一句旁),不是文末统一「进一步阅读」。

---

*本册所有 «…» 引文摘自 Sanchez-Lengeling, Reif, Pearce, Wiltschko, A Gentle Introduction to Graph Neural Networks, Distill 2021, CC-BY 4.0, https://distill.pub/2021/gnn-intro/,仅作锚例。*
