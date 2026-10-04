# 08 | 学术诚实与语气 —— 《A Gentle Introduction to Graph Neural Networks》写作方法论

> 分析对象:`distill-analysis/article.md`(已完整读取,822 行)。
> 引用规模已用命令核实:`grep -o "\[@[^]]*\]" article.md | wc -l` → **72 处**,且全部位于正文(引用列表之前),与任务给定数量一致。
> 限定词分布已用 grep 扫描:tend(s) to / might / usually / often / slight(ly) / However / Of course / Fortunately / Unfortunately / open research 等散布于全文约 78 处命中,集中于 "GNN playground" 实证节与 "Into the Weeds" 综述节。
> 本文所有英文引文均逐字复制自 article.md(保留原文弯引号、方括号引用与其相对标点的位置);第 441 行原文 "visibility separate" 系原文如此,照抄不改。

---

## 哲学层 —— 写作价值观

1. **诚实优先于说服:每条经验趋势都同步交出反例。** "Some empirical GNN design lessons" 一节中,没有一条结论是裸露的——给出均值趋势后立刻指出最大值不服从(L475)、最佳模型不在层数多的一端(L485)、汇总操作只有 "a very slight improvement"(L495),最后用一句 "The previous explorations have given mixed messages" 收拢。推断:作者把读者的信任视为长期资产,宁可削弱叙事的爽感,也不让读者拿着一句被夸大的结论去踩坑。

2. **归属是礼仪而非负担:借来的一切都要点名归还——框架、图示、甚至一个术语的别名。** MPNN 归 Gilmer、图示归 Battaglia(L241),连 "master node" 这个别称也挂上两篇引用(L396),致谢节再单独承认 "Many of our GNN architecture diagrams are based on the Graph Nets diagram"(L642)。推断:作者清楚综述型文章的全部权威来自对前人工作的精确记账,归属越细,自身可信度越高。

3. **把"不知道"写进正文,而不是藏进脚注。** "X is an open research question/topic/area + 引用" 是全文反复出现的固定句式(L384、L511、L535、L539、L563、L572),共 6 处以上。推断:作者把开放问题当作文章结构的一部分——它既划定本文的边界,也为读者指明出口,承认未知反而强化了已知部分的可信度。

4. **信任读者是同行:从读者已知的东西出发,把选择权留给读者。** "You’re probably already familiar with some types of graph data"(L76)先肯定读者;两次使用 "(or your favorite differentiable model)"(L249、L598)承认读者有自己的工具偏好;交互区先说 "you might have found"(L453)再给作者的分析。推断:居高临下的反面不是降低标准,而是假定读者聪明、只是恰好不熟悉这个具体领域。

5. **把困惑正常化:读者的不理解被预告、被接住,而非被责备。** 抽象概念刚出现就写 "if this seems abstract now, we will make it concrete with examples in the next section"(L72);教学式简化随后自己拆穿 "Of course, in practice, this is not usually how text and images are encoded"(L100)。推断:作者预设困惑是材料的属性而不是读者的缺陷,因此语气永远不需要防守。

6. **轻盈感来自节制:幽默只以括号旁注出现,转折词成对服役。** 全文的"幽默"几乎只有 "(or your favorite ...)" 这一个姿势;Unfortunately(L394)与 Fortunately(L522)各出现一次,分别承担一次方法上的坏消息与好消息。推断:克制的轻量调剂维持了长文的可读节奏,而不侵蚀学术语体的庄重——笑点密度与可信度成反比,作者选了可信度。

---

## 操作层 —— 可直接执行的技法

1. **概念归属:引用紧贴被归属的术语,中间不隔任何词。** 做法见 `message passing*[@Gilmer2017-no]`(L329)、`*multigraphs*[@Harary1969-qo]`(L524)、`‘weave’ fashion[@Kearnes2016-rl]`(L384)——括号引用直接黏在术语后,连空格都省了。→ 迁移规则:引入任何非你首创的名词,引用必须与该名词物理相邻;若隔了半句,归属就模糊了。

2. **断言归属:引用黏在断言的关键词上、句号之前。** `for over a decade[@Scarselli2009-ku].`(L47)——"超过十年"这个可核查的时间断言由引用独自担保。→ 迁移规则:句中哪个词是可被质疑的事实断言,引用就贴着哪个词放,让读者一眼看出引用为谁作保。

3. **例证列表:一行多例,逐例挂引,不用一条引用兜底整串。** `antibacterial discovery [@Stokes2020-az], physics simulations [@Sanchez-Gonzalez2020-yo], fake news detection [@Monti2019-tf], ...`(L47)——五个应用各配一引,且此语境下引用与词之间有空格、逗号在引用外(与技法 1 的无空格黏贴形成对照)。→ 迁移规则:并列举证时,每个例子独立负责制;一条引用覆盖一串例子等于都没覆盖。

4. **补充性引用降级进括号,与支撑性引用在版式上区分。** `such as a word embedding of the abstract. (see [@Mikolov2013-vr], [@Devlin2018-mi] , [@Pennington2014-kg]).`(L138)——"see" 明示这是延伸阅读,不承担论证责任。→ 迁移规则:引用先分类——归属 / 证据 / 延伸;延伸类加 "see" 或放进括号,让读者知道跳过它不损失论证链。

5. **开放问题用固定句式 + 句号后引用收尾,给读者指路而非硬给答案。** `Selecting and designing optimal aggregation operations is an open research topic.[@Xu2018-sf]`(L563)、`How to sample a graph is an open research question.[@Rozemberczki2020-lq]`(L539)——注意引用放在句号之后,像路标而不像论据。→ 迁移规则:每个你答不了的问题,用"X is an open question.[引用]"一句带过,后续交给文献;禁止用含糊措辞伪装成已有答案。

6. **证据型引用只出现在可被质疑的经验判断上。** `The answers are going to depend on the data, [@Dwivedi2020-xm] [@You2020-vk], and even different ways of featurizing and constructing graphs can give different answers.`(L453)——"答案取决于数据"这个泼冷水式结论,由两篇基准研究背书。→ 迁移规则:引用优先供给那些最可能被从业者反驳的句子;无人会质疑的常识不必挂引。

7. **引用密度按章节功能分配:教学主干近零,综述后篇密集。** 正文 72 处引用中,"Into the Weeds" 一节(约 L516–632)占 30+ 处,而搭建 GNN 的核心教学段(L243–408)仅零星数处。→ 迁移规则:手把手教学段落每段至多一引(不打断叙事流),文献综述段落可 3–4 引;让引用密度本身成为"这里是导览、那里是前沿"的信号。

8. **经验结论的动词一律降级:tend to / appears / can,而非 is / will。** `models with higher dimensionality tend to have better mean and lower bound performance`(L475)、`it appears that sum has a very slight improvement`(L495)、`max or mean can give equally good models`(L495)。→ 迁移规则:描述自己数据上的观察时,把系动词换成倾向动词,把确定性副词换成 "slight / often / in practice";任何句子写成普遍定律之前先自问样本是什么。

9. **给出趋势的同一句或下一句,立刻给出不服从趋势的反例。** `...tend to have better mean and lower bound performance but the same trend is not found for the maximum.`(L475);`while the mean performance tends to increase with the number of layers, the best performing models do not have three or four layers, but two.`(L485)。→ 迁移规则:趋势与反例是同一论证单元,拆到两段读者就只记得趋势;句式模板:"趋势 X,但 [最值/反例] 不服从"。

10. **被问"哪个最好"时,标准答案是"没有一致最优 + 各自适用场景"。** `There is no operation that is uniformly the best choice.`(L570)随后逐个说明 mean / max / sum 各自何时有用。→ 迁移规则:凡遇选型问题,先声明无普适最优,再用"X 适合场景 A,Y 适合场景 B"的结构替代排名;这比任何排名都更显专业。

11. **直认混合信号,不强行统一叙事。** `The previous explorations have given mixed messages.`(L497)——在多组实验结果互相打架时,作者直接承认,然后指出唯一较清晰的信号。→ 迁移规则:数据不讲故事时,就写"信号混杂",并挑出真正稳的那一条;绝不为叙事圆润而抹平矛盾。

12. **对均值结论加 "average" 限定,防止读者外推到个体。** `the more graph attributes are communicating, the better the performance of the average model.`(L507)——是"平均模型"变好,不保证你的模型变好。→ 迁移规则:统计性结论必须携带统计性主语(平均、中位、下界);把外推的风险写进名词短语里。

13. **局限就地承认:介绍完方法的紧邻下一段,用 "There is one flaw..." 亲手指认。** L393 在描述完全局表示之前,先承认此前所有网络 "There is one flaw with the networks we have described so far"——承认局限本身就是引出下一节的钩子。→ 迁移规则:不要攒一个"局限性"大节;每个方法的失效条件在其登场后 1–2 句内就地交代,并把承认转化为推进叙事的动力。

14. **教学简化要自己拆穿:"Of course, in practice..." 句式。** 教完"图像和文本都是图"之后紧跟 `Of course, in practice, this is not usually how text and images are encoded: these graph representations are redundant`(L100)。→ 迁移规则:每做一次为教学而设的简化,下一句就用"当然,实践中……"注明与工程现实的差距;简化可以被原谅,被隐瞒的简化不行。

15. **对"显而易见"的内容,先肯定读者已经知道,再补充他不知道的。** `You’re probably already familiar with some types of graph data, such as social networks. However, graphs are an extremely powerful and general representation`(L76);随后 `Graphs are a useful tool to describe data you might already be familiar with.`(L106)。→ 迁移规则:用 "you’re probably already familiar with X" 开场接管已知,把新信息全部压在 However 之后;绝不从零定义读者已懂的东西。

16. **预先接住困惑:抽象概念出现的同时承诺具体化。** `if this seems abstract now, we will make it concrete with examples in the next section.`(L72)——把"你可能觉得抽象"说在前头,并给出兑付时间。→ 迁移规则:凡引入抽象度陡增的概念,立即加一句"如果现在觉得抽象,X 节会给出实例";困惑被预告后就不再是读者的失败。

17. **惊讶要与读者共享,用 "surprisingly / counterintuitive" 标出作者自己也没想到。** `The first thing to notice is that, surprisingly, a higher number of parameters does correlate with higher performance.`(L465);`Although counterintuitive, one can learn more about the symmetries and structure of images and text by viewing them as graphs`(L76)。→ 迁移规则:数据与直觉相悖时,先插一个惊讶副词再报数据,把作者摆到与读者同一起跑线;只有符合直觉的结论才允许平铺直叙。

18. **幽默只以括号旁注的形式存在,且全文限量供应。** `(or your favorite differentiable model)`(L249)与 `your favorite differentiable transformation (e.g. MLP)`(L598)是全文主要的俏皮话,均不进主干句。→ 迁移规则:任何主题下,玩笑写成括号插入语、每千字至多一次、且必须顺便传递真实信息(此处是"换任何可微模型皆可");主干句永远保持庄重。

19. **Fortunately / Unfortunately 成对服役,各承担一次方法层面的坏消息与好消息,不做感叹词滥用。** `Unfortunately for large graphs, this quickly becomes computationally expensive (although this approach, called ‘virtual edges’, has been used for small graphs such as molecules).[@Gilmer2017-no]`(L394);`Fortunately, the message passing framework is flexible enough that often adapting GNNs to more complex graph structures is about defining how information is passed and updated`(L522)。→ 迁移规则:全文各用一次即可,位置放在方案转折点;且坏消息后面必须跟括号让步(例外情形),好消息后面必须跟条件从句(何时成立)。

20. **对自己制造的展示物(可视化、玩具模型)同样诚实。** `A perfect model would visibility separate labeled data, but since we are reducing dimensionality and also have imperfect models, this boundary might be harder to see.`(L441);图注里也写 `Numbers are dependent on featurization decisions.`(L146)。→ 迁移规则:展示实验结果时同步声明展示手段的失真(降维、简化、特征化选择),且这类声明要下探到图注层级——对自己最不利的坦白放在读者最可能忽略的地方,才是真诚实。

21. **归属句式按贡献类型换动词:proposed by / introduced by / developed with / is the basis of。** `the “message passing neural network” framework proposed by Gilmer et al.[@Gilmer2017-no] using the Graph Nets architecture schematics introduced by Battaglia et al.[@Battaglia2018-pi]`(L241);`this idea was developed with Dual-Primal Graph Convolutional Networks.[@Monti2018-ov]`(L591);`This concept is the basis of Graph Attention Networks (GAT) [@Velickovic2017-hf]`(L608)。→ 迁移规则:区分"提出框架""提供图示""发展出想法""是该工作的基础"等不同程度的归属,人名与括号引用紧邻;连示意图的谱系也要在致谢节单独交代(L642)。

22. **结尾不忏悔:局限已散在各节,收尾只做有分寸的展望。** Final thoughts(L636)不设 "Limitations" 小节,只写 `The success of GNNs in recent years creates a great opportunity for a wide range of new problems, and we are excited to see what the field will bring.` → 迁移规则:把边界承认分散到每个具体论断处就地结清;结尾一节的唯一任务是收束与展望,语气可以是兴奋的,因为账已经在前面付清了。

---

## 逐字证据

(每条 ≤ 40 词;"章节"为原文标题;引文保留原文弯引号与方括号引用的精确位置)

1. **[摘要/导语]** `Researchers have developed neural networks that operate on graph data (called graph neural networks, or GNNs) for over a decade[@Scarselli2009-ku].` —— 示范技法 2:时间断言 "for over a decade" 由黏在其后的引用独自担保。

2. **[导语]** `We are starting to see practical applications in areas such as antibacterial discovery [@Stokes2020-az], physics simulations [@Sanchez-Gonzalez2020-yo], fake news detection [@Monti2019-tf]` —— 示范技法 3:一行多例,逐例挂引,逗号置于引用之外。

3. **[Citation networks as graphs]** `Additionally, we can add information about each paper into each node, such as a word embedding of the abstract. (see [@Mikolov2013-vr], [@Devlin2018-mi] , [@Pennington2014-kg]).` —— 示范技法 4:"(see ...)" 明示延伸阅读类引用,降级进括号。

4. **[Graph Neural Networks]** `We’re going to build GNNs using the “message passing neural network” framework proposed by Gilmer et al.[@Gilmer2017-no] using the Graph Nets architecture schematics introduced by Battaglia et al.[@Battaglia2018-pi]` —— 示范技法 21:proposed by / introduced by 区分框架与图示两类归属,人名紧邻引用。

5. **[Passing messages between parts of the graph]** `We can do this using *message passing*[@Gilmer2017-no], where neighboring nodes or edges exchange information and influence each other’s updated embeddings.` —— 示范技法 1:引用与术语 "message passing" 物理相邻、无空格黏贴。

6. **[Other types of graphs]** `For example, we can consider multi-edge graphs or *multigraphs*[@Harary1969-qo], where a pair of nodes can share multiple types of edges` —— 示范技法 1:术语首次定义处即完成归属。

7. **[Some empirical GNN design lessons]** `The answers are going to depend on the data, [@Dwivedi2020-xm] [@You2020-vk], and even different ways of featurizing and constructing graphs can give different answers.` —— 示范技法 6:泼冷水的 "it depends" 结论由两篇基准研究背书,证据型引用的典型位置。

8. **[Some empirical GNN design lessons]** `Are there some clear GNN design choices that will give us better performance? For example, do deeper GNN models perform better than shallower ones?` —— 示范技法 5 的前置动作:先以真问题的形式暴露诱惑,再诚实地回答"取决于数据"。

9. **[Some empirical GNN design lessons]** `The first thing to notice is that, surprisingly, a higher number of parameters does correlate with higher performance.` —— 示范技法 17:surprisingly 把作者摆回与读者同一起跑线。

10. **[Some empirical GNN design lessons]** `We can notice that models with higher dimensionality tend to have better mean and lower bound performance but the same trend is not found for the maximum.` —— 示范技法 8+9:tend to 降级动词,同句交出反例(最大值不服从)。

11. **[Some empirical GNN design lessons]** `while the mean performance tends to increase with the number of layers, the best performing models do not have three or four layers, but two.` —— 示范技法 9:趋势从句 + 反例主句的连写结构。

12. **[Some empirical GNN design lessons]** `Overall it appears that sum has a very slight improvement on the mean performance, but max or mean can give equally good models.` —— 示范技法 8:appears + very slight 双重限定,连对自己偏好的聚合操作也不抬高。

13. **[Some empirical GNN design lessons]** `The previous explorations have given mixed messages.` —— 示范技法 11:七词短句直认信号混杂,不强行统一叙事。

14. **[Some empirical GNN design lessons]** `Overall we see that the more graph attributes are communicating, the better the performance of the average model.` —— 示范技法 12:结论落在 "the average model" 上,统计性主语防外推。

15. **[Comparing aggregation operations]** `There is no operation that is uniformly the best choice.` —— 示范技法 10:被问最优时的标准开局,随后逐项说明各自适用场景。

16. **[Comparing aggregation operations]** `Selecting and designing optimal aggregation operations is an open research topic.[@Xu2018-sf]` —— 示范技法 5:开放问题固定句式,引用置于句号之后,形同路标。

17. **[Sampling Graphs and Batching in GNNs]** `How to sample a graph is an open research question.[@Rozemberczki2020-lq]` —— 示范技法 5:同一句式的第二次出现,构成全文的"诚实指纹"。

18. **[Adding global representations]** `There is one flaw with the networks we have described so far: nodes that are far away from each other in the graph may never be able to efficiently transfer information to one another` —— 示范技法 13:局限就地承认,且成为引出全局表示的叙事钩子。

19. **[Adding global representations]** `Unfortunately for large graphs, this quickly becomes computationally expensive (although this approach, called ‘virtual edges’, has been used for small graphs such as molecules).[@Gilmer2017-no]` —— 示范技法 19:Unfortunately 坏消息必配括号让步(小图上的例外)。

20. **[Into the Weeds]** `Fortunately, the message passing framework is flexible enough that often adapting GNNs to more complex graph structures is about defining how information is passed and updated by new graph attributes.` —— 示范技法 19:Fortunately 好消息必配条件说明(灵活性的具体含义)。

21. **[导语]** `Graphs are very flexible data structures, and if this seems abstract now, we will make it concrete with examples in the next section.` —— 示范技法 16:预告困惑并承诺兑付时间。

22. **[Graphs and where to find them]** `You’re probably already familiar with some types of graph data, such as social networks.` —— 示范技法 15:先接管读者已知,再谈未知;never 从定义开始居高临下。

23. **[Graphs and where to find them]** `Although counterintuitive, one can learn more about the symmetries and structure of images and text by viewing them as graphs` —— 示范技法 17:counterintuitive 预先承认反直觉,与读者共担认知成本。

24. **[Graphs and where to find them]** `Of course, in practice, this is not usually how text and images are encoded: these graph representations are redundant` —— 示范技法 14:亲手拆穿自己的教学简化。

25. **[The simplest GNN]** `This GNN uses a separate multilayer perceptron (MLP) (or your favorite differentiable model) on each component of a graph; we call this a GNN layer.` —— 示范技法 18:全文唯一的幽默姿势——括号旁注,顺带传递"换任意可微模型皆可"的真信息。

26. **[GNN Predictions by Pooling Information]** `However, it is not always so simple.` —— 示范技法 13 的微缩版:七词转折句,承认刚描述的简单方案不总成立。

27. **[Learning edge representations]** `However, the node and edge information stored in a graph are not necessarily the same size or shape, so it is not immediately clear how to combine them.` —— 示范技法 8:not necessarily / not immediately clear 双重软化,把"我不知道怎么合并"写成中性事实。

28. **[GNN playground]** `A perfect model would visibility separate labeled data, but since we are reducing dimensionality and also have imperfect models, this boundary might be harder to see.` —— 示范技法 20:对自己展示手段(降维可视化、不完美的模型)的坦白("visibility" 为原文原样)。

29. **[GNN playground 图注]** `Numbers are dependent on featurization decisions. More useful statistics and graphs can be found in KONECT[@Kunegis2013-er]` —— 示范技法 20 + 4:不确定性声明下探到图注,并以引用指路延伸阅读。

30. **[Some empirical GNN design lessons]** `When exploring the architecture choices above, you might have found some models have better performance than others.` —— 示范技法 15 的进阶:假定读者已通过交互自己观察到现象,分析建立在读者的亲历之上。

31. **[Edges and the Graph Dual]** `Sometimes this property makes solving problems easier in one representation than another, like frequencies in Fourier space.` —— 示范技法 8:Sometimes 限定 + 用读者已知领域(傅里叶)类比,双重降低断言强度。

32. **[Graph Attention Networks]** `This concept is the basis of Graph Attention Networks (GAT) [@Velickovic2017-hf] and Set Transformers[@Lee2018-ti].` —— 示范技法 21:is the basis of 归属句式,把当前讨论定位进已有工作谱系。

33. **[Edges and the Graph Dual]** `this idea was developed with Dual-Primal Graph Convolutional Networks.[@Monti2018-ov]` —— 示范技法 21:developed with 精确标注"想法随某工作而发展"的弱归属。

34. **[Node-level task]** `A classic example of a node-level prediction problem is Zach’s karate club.[@Zachary1977-jg]` —— 示范技法 2:对 "classic" 这一可质疑的断言,引用贴在句末作保。

35. **[Acknowledgments]** `Many of our GNN architecture diagrams are based on the Graph Nets diagram [@Battaglia2018-pi].` —— 示范技法 21 的极致:连图示的视觉谱系也在致谢节单独记账。

36. **[Final thoughts]** `The success of GNNs in recent years creates a great opportunity for a wide range of new problems, and we are excited to see what the field will bring.` —— 示范技法 22:结尾不忏悔、只展望;兴奋的语气之所以可信,是因为所有边界账目已在各节就地付清。

---

### 维度问题的回答索引

- **72 处引用的放置与三类功能**:技法 1–7;证据 1–8、16–17、32–34。
- **经验结论的限定(however / it depends / no uniformly best / slight)**:技法 8–12;证据 7、10–15、26–27。
- **局限与边界的承认位置与语气**:技法 5、13、14、20(节内就地承认为主,结尾无忏悔节);证据 16–20、24、28–29。
- **避免居高临下**:技法 15–17;证据 21–23、30。
- **概念归属的尊重**:技法 21、35 号证据;证据 4–6、32–35。
- **轻盈感与节奏**:技法 18–19;证据 19–20、25。
