🌍 Ultimate PRD: TextileCalc - Global Textile Engineering Platform
1. 项目愿景 (Project Vision)
打造全球最专业、最美观、工具最全的纺织服装行业计算平台。

用户群： 纺织工程师、外贸跟单、服装设计师、采购商。

核心价值： 解决行业复杂的计算痛点（纱支、克重、用量、装箱）。

商业目标： 通过 SEO 覆盖全球流量，实现高 RPM 的 AdSense 变现。

2. 技术栈 (Tech Stack)
Framework: Next.js 14 (App Router)

Language: TypeScript

Styling: Tailwind CSS + Shadcn/ui (Radix UI)

Internationalization: next-intl (Middleware-based auto-detection)

Icons: Lucide React

Form Handling: React Hook Form + Zod (确保计算输入的严谨性)

Deployment: Vercel

3. 核心架构规范 (Architecture)
3.1 目录结构 (Directory Structure)
Plaintext

├── messages/                  # i18n 翻译文件 (en.json, zh.json, etc.)
├── app/
│   ├── [locale]/              # 动态路由根目录
│   │   ├── layout.tsx         # 全局布局 (NextIntlClientProvider)
│   │   ├── page.tsx           # 首页 (Bento Grid)
│   │   ├── tools/             # 工具类页面
│   │   │   ├── yarn/          # 纱线类工具
│   │   │   ├── fabric/        # 面料类工具
│   │   │   └── apparel/       # 服装类工具
│   │   └── blog/              # SEO 文章板块
├── components/
│   ├── ui/                    # Shadcn 基础组件
│   ├── shared/                # Navbar, Footer, LanguageSwitcher
│   ├── calculators/           # 各个计算器的具体逻辑组件
│   └── ads/                   # AdPlaceholder (广告位组件)
├── utils/
│   └── calculations.ts        # 纯数学公式函数 (业务逻辑分离)
└── middleware.ts              # i18n 自动路由中间件
3.2 国际化策略 (i18n Strategy)
默认语言： English (en)

支持语言： English, Chinese (zh), Spanish (es - 后面加).

检测逻辑： Middleware 读取 Accept-Language 头 -> 自动重定向。

URL 结构： domain.com/en/tools/yarn-converter

4. 功能模块详解 (Feature Specification)
4.1 首页 (Landing Page)
Hero Section: 极简风格，大标题 + 搜索框 (快速查找工具)。

Tool Dashboard (Bento Grid):

将所有工具按分类展示（Card 样式）。

每个 Card 包含：Icon、Title、One-line Description。

4.2 工具矩阵 (The Tool Suite) - 共 12 个
🧶 Category A: Yarn & Spinning (纱线)
Yarn Count Converter: Ne ↔ Nm ↔ Tex ↔ Denier 互转。

Resultant Count (合股纱): 计算多股纱线的最终支数 (e.g., 32s/2)。

Twist Calculator: 捻度换算 (TPI ↔ TPM) 及 捻系数计算。

Draft Calculator: 纺纱牵伸倍数计算。

🧵 Category B: Fabric & Weaving (面料)
GSM Calculator: 输入纱支、密度(EPI/PPI) -> 估算克重。

Cover Factor: 计算面料紧度系数 (Pierce Formula)。

Weave Beam Weight: 经轴重量计算 (长度 x 头份)。

Fabric Production: 织机产量计算 (转速 x 效率)。

👕 Category C: Apparel & Merchandising (服装/外贸)
Fabric Consumption: (核心) 输入主要尺寸 -> 计算单件耗料量。

Container Loading (CBM): 纸箱尺寸 x 箱数 -> 计算总体积 & 柜型建议。

Cost Estimator: 简单的 纱价+工费+利润 计算器。

🛠 Category D: Utilities (通用)
Textile Unit Converter: 长度 (Y/M)、重量 (Lb/Kg) 换算。

4.3 广告与变现 (Monetization)
组件： <AdPlaceholder /> (灰色带斜线背景，模拟真实广告位)。

布局：

Top Banner: 导航栏下方。

In-Content: 计算器组件的正下方。

Sidebar: PC 端侧边栏推荐位。

4.4 SEO 内容系统
动态 Metadata: 每个工具页根据 locale 生成对应的 Title/Description。

SEO Article Section: 每个工具页底部必须包含 <article> 区域，用于渲染 MDX 或富文本内容（FAQ, Guides）。

5. UI 设计规范 (Design System)
Theme: "Clean Professional"

Colors:

Background: bg-slate-50

Card: bg-white

Border: border-slate-200

Primary: bg-blue-600 (Hover: bg-blue-700)

Typography: Inter (Google Fonts).

Interaction:

Inputs: Ring focus state.

Results: Highlighted with bg-slate-100 and Monospace font for numbers.

6. Execution: The "Mega Prompt" for Cursor
Copy the text below into Cursor's Composer (Ctrl+I) to generate the project: