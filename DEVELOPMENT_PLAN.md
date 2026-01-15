# TextileCalc 开发计划 (Development Plan)

## 📊 当前状态分析 (Current Status)

### ✅ 已完成
- **基础架构**: Next.js 14 + TypeScript + Tailwind CSS + Shadcn/ui
- **国际化**: 支持 10 种语言 (en, zh, es, hi, tr, vi, id, pt, bn, ur)
- **核心工具**: 12 个计算器已实现
- **UI/UX**: Bento Grid 首页、响应式设计
- **广告系统**: AdPlaceholder 组件已实现

### ⚠️ 待修复问题
1. **翻译完整性**:
   - ❌ 8 个组件的 Zod 错误消息未翻译
   - ❌ 10 个工具页面的 SEO 文章内容未翻译
   - ❌ 其他语言缺少错误消息翻译
   - ❌ 其他语言缺少 SEO 内容翻译

2. **SEO 优化**:
   - ⚠️ 部分工具页面缺少完整的 SEO 文章内容
   - ⚠️ 缺少结构化数据 (Schema.org)
   - ⚠️ 缺少 sitemap.xml 和 robots.txt
   - ⚠️ 缺少 Open Graph 和 Twitter Card 元数据

---

## 🎯 阶段一：修复现有问题 (Phase 1: Fix Current Issues)

### 优先级 P0 (Critical - 1-2 周)

#### 1.1 完成所有组件的错误消息翻译
**目标**: 所有表单验证错误消息支持多语言

**任务清单**:
- [ ] 修复剩余 8 个组件的 Zod schema 错误消息
  - CBMCalculator
  - CostEstimator
  - WeaveBeamWeight
  - FabricConsumption
  - DraftCalculator
  - CoverFactor
  - TwistCalculator (如需要)
  - ResultantCount (如需要)

**实施步骤**:
```typescript
// 模板示例
export function ComponentName() {
  const errorsT = useTranslations('common.errors');
  const schema = z.object({
    field: z.number().min(0.01, errorsT('mustBeGreaterThan0')),
  });
}
```

#### 1.2 为所有语言添加错误消息翻译
**目标**: 10 种语言都支持错误消息

**任务清单**:
- [ ] 为 hi, tr, vi, es, pt, id, bn, ur 添加 `common.errors` 翻译
- [ ] 测试所有语言的错误消息显示

#### 1.3 完成所有工具页面的 SEO 内容翻译
**目标**: 所有工具页面都有完整的多语言 SEO 文章

**任务清单**:
- [ ] 为剩余 10 个工具添加 `seoContent` 翻译 (en, zh)
  - resultant-count
  - twist-calculator
  - draft-calculator
  - gsm-calculator
  - cover-factor
  - weave-beam-weight
  - fabric-consumption
  - cbm-calculator
  - cost-estimator
  - unit-converter
- [ ] 更新所有工具页面使用翻译的 SEO 内容

---

## 🚀 阶段二：SEO 优化 (Phase 2: SEO Optimization)

### 优先级 P1 (High - 2-3 周)

#### 2.1 元数据优化
**目标**: 提升搜索引擎排名和点击率

**任务清单**:
- [ ] 为所有工具页面添加完整的 Metadata
  - Title (包含关键词)
  - Description (150-160 字符，包含 CTA)
  - Keywords (meta keywords)
  - Canonical URL
- [ ] 添加 Open Graph 标签
  - og:title, og:description, og:image, og:url, og:type
- [ ] 添加 Twitter Card 标签
  - twitter:card, twitter:title, twitter:description, twitter:image
- [ ] 添加多语言 hreflang 标签

**实施示例**:
```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const t = await getTranslations('tools.yarnCountConverter');
  return {
    title: t('seoTitle'),
    description: t('seoDescription'),
    keywords: 'yarn count, Ne, Nm, Tex, Denier, textile calculator',
    openGraph: {
      title: t('seoTitle'),
      description: t('seoDescription'),
      images: ['/og-image.jpg'],
      locale: locale,
      alternateLocale: routing.locales.filter(l => l !== locale),
    },
    twitter: {
      card: 'summary_large_image',
      title: t('seoTitle'),
      description: t('seoDescription'),
    },
    alternates: {
      canonical: `/${locale}/tools/yarn/yarn-count-converter`,
      languages: Object.fromEntries(
        routing.locales.map(loc => [loc, `/${loc}/tools/yarn/yarn-count-converter`])
      ),
    },
  };
}
```

#### 2.2 结构化数据 (Schema.org)
**目标**: 提升搜索结果展示 (Rich Snippets)

**任务清单**:
- [ ] 为每个工具页面添加 `HowTo` schema
- [ ] 添加 `SoftwareApplication` schema
- [ ] 添加 `BreadcrumbList` schema
- [ ] 添加 `FAQPage` schema (如适用)

**实施示例**:
```typescript
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": t('title'),
  "description": t('description'),
  "step": [
    {
      "@type": "HowToStep",
      "name": t('seoContent.howToUse'),
      "text": t('seoContent.howToUseText'),
    }
  ]
};
```

#### 2.3 技术 SEO
**目标**: 提升爬虫效率和索引

**任务清单**:
- [ ] 生成 `sitemap.xml` (包含所有语言版本)
- [ ] 创建 `robots.txt`
- [ ] 添加 `sitemap-index.xml` (多语言支持)
- [ ] 实现动态 sitemap 生成 (Next.js sitemap.ts)

**文件结构**:
```
app/
  sitemap.ts          # 动态生成 sitemap
  robots.ts           # 动态生成 robots.txt
```

#### 2.4 内容优化
**目标**: 提升页面质量和用户停留时间

**任务清单**:
- [ ] 为每个工具添加 FAQ 部分
- [ ] 添加相关工具推荐
- [ ] 添加使用案例和示例
- [ ] 优化文章内容的可读性 (使用标题、列表、代码块)

---

## 🛠️ 阶段三：新增工具 (Phase 3: New Tools)

### 优先级 P2 (Medium - 持续进行)

#### 3.1 纱线类工具扩展 (Yarn Tools)

**建议新增工具**:
1. **Yarn Strength Calculator** (纱线强度计算器)
   - 输入: 单纱强度、股数
   - 输出: 合股纱强度
   - 公式: 合股强度 = 单纱强度 × 股数 × 效率系数

2. **Yarn Elongation Calculator** (纱线伸长率计算器)
   - 输入: 原始长度、拉伸后长度
   - 输出: 伸长率百分比

3. **Yarn Evenness Calculator** (纱线均匀度计算器)
   - 输入: CV% 值
   - 输出: 均匀度评级

4. **Spinning Production Calculator** (纺纱产量计算器)
   - 输入: 锭数、转速、效率、时间
   - 输出: 产量 (kg/h, kg/day)

#### 3.2 面料类工具扩展 (Fabric Tools)

**建议新增工具**:
1. **Fabric Shrinkage Calculator** (面料缩水率计算器)
   - 输入: 原始尺寸、水洗后尺寸
   - 输出: 缩水率百分比

2. **Fabric Stretch Calculator** (面料弹性计算器)
   - 输入: 原始长度、拉伸后长度
   - 输出: 弹性百分比

3. **Fabric Width Calculator** (面料幅宽计算器)
   - 输入: 经纱密度、纱支
   - 输出: 理论幅宽

4. **Fabric Cost Calculator** (面料成本计算器)
   - 输入: 纱价、织造费用、后整理费用
   - 输出: 每米成本

#### 3.3 服装类工具扩展 (Apparel Tools)

**建议新增工具**:
1. **Garment Size Calculator** (服装尺寸计算器)
   - 输入: 基础尺寸、放量
   - 输出: 成品尺寸

2. **Thread Consumption Calculator** (线耗计算器)
   - 输入: 缝线类型、缝迹长度
   - 输出: 线耗量

3. **Button & Zipper Calculator** (扣件计算器)
   - 输入: 服装类型、数量
   - 输出: 所需扣件数量

4. **Label & Tag Calculator** (标签计算器)
   - 输入: 服装数量、标签类型
   - 输出: 标签成本

#### 3.4 通用工具扩展 (Utilities)

**建议新增工具**:
1. **Fabric Yardage Calculator** (面料码数计算器)
   - 输入: 米数、幅宽
   - 输出: 码数

2. **Yarn Weight Calculator** (纱线重量计算器)
   - 输入: 长度、纱支
   - 输出: 重量

3. **Fabric GSM to Oz Converter** (GSM 转 Oz 转换器)
   - 输入: GSM 值
   - 输出: Oz/yd²

4. **Color Fastness Calculator** (色牢度计算器)
   - 输入: 测试结果
   - 输出: 色牢度等级

#### 3.5 新增工具实施流程

**标准流程**:
1. **需求分析** (1 天)
   - 确定工具用途和计算公式
   - 设计输入输出界面
   - 确定 SEO 关键词

2. **开发实现** (2-3 天)
   - 在 `utils/calculations.ts` 添加计算函数
   - 创建 `components/calculators/ToolName.tsx` 组件
   - 创建 `app/[locale]/tools/category/tool-name/page.tsx` 页面
   - 添加翻译 (en, zh)

3. **测试验证** (1 天)
   - 单元测试计算函数
   - 界面测试
   - 多语言测试

4. **SEO 优化** (1 天)
   - 添加 SEO 内容翻译
   - 添加结构化数据
   - 更新 sitemap

5. **文档更新** (0.5 天)
   - 更新 README
   - 更新工具列表

---

## 🌍 阶段四：翻译完善 (Phase 4: Translation Enhancement)

### 优先级 P1 (High - 持续进行)

#### 4.1 翻译优先级

**Tier 1 (高优先级)**:
- ✅ English (en) - 完整
- ✅ Chinese (zh) - 完整
- ⚠️ Spanish (es) - 需要完善工具描述和 SEO 内容
- ⚠️ Hindi (hi) - 需要完善工具描述和 SEO 内容
- ⚠️ Turkish (tr) - 需要完善工具描述和 SEO 内容

**Tier 2 (中优先级)**:
- ⚠️ Vietnamese (vi) - 需要完善工具描述和 SEO 内容
- ⚠️ Portuguese (pt) - 需要完善工具描述和 SEO 内容
- ⚠️ Indonesian (id) - 需要完善工具描述和 SEO 内容

**Tier 3 (低优先级)**:
- ⚠️ Bengali (bn) - 需要完善工具描述和 SEO 内容
- ⚠️ Urdu (ur) - 需要完善工具描述和 SEO 内容

#### 4.2 翻译内容清单

**每个工具需要翻译的内容**:
- [ ] `title` - 工具标题
- [ ] `description` - 工具描述
- [ ] 所有输入字段标签
- [ ] 所有输出字段标签
- [ ] `seoTitle` - SEO 标题
- [ ] `seoDescription` - SEO 描述
- [ ] `seoContent.*` - SEO 文章内容 (How to Use, FAQ 等)
- [ ] 单位翻译 (`unitMh`, `unitKg`, 等)
- [ ] 错误消息 (`common.errors.*`)

#### 4.3 翻译工作流程

1. **使用翻译工具**:
   - 优先使用 DeepL / Google Translate 进行初翻
   - 人工审核和优化专业术语
   - 确保行业术语准确性

2. **质量控制**:
   - 每个语言至少 1 名母语者审核
   - 建立术语表 (Glossary)
   - 定期更新翻译

3. **自动化检查**:
   - 检查缺失的翻译键
   - 检查翻译键的一致性
   - 自动生成翻译报告

---

## 📈 阶段五：性能与监控 (Phase 5: Performance & Monitoring)

### 优先级 P2 (Medium - 1-2 周)

#### 5.1 性能优化
- [ ] 实现代码分割 (Code Splitting)
- [ ] 优化图片加载 (Next.js Image)
- [ ] 实现服务端缓存
- [ ] 优化首屏加载时间 (目标: < 2s)

#### 5.2 分析工具
- [ ] 集成 Google Analytics 4
- [ ] 集成 Google Search Console
- [ ] 实现错误监控 (Sentry)
- [ ] 实现性能监控 (Web Vitals)

#### 5.3 A/B 测试
- [ ] 测试不同的 CTA 文案
- [ ] 测试广告位置
- [ ] 测试页面布局

---

## 📅 实施时间表 (Timeline)

### 第 1-2 周: 修复现有问题
- 完成所有组件的错误消息翻译
- 完成所有工具页面的 SEO 内容翻译
- 为所有语言添加错误消息翻译

### 第 3-4 周: SEO 优化
- 实现完整的 Metadata
- 添加结构化数据
- 生成 sitemap 和 robots.txt
- 优化现有内容

### 第 5-8 周: 新增工具 (第一批)
- 新增 4-6 个高价值工具
- 完成翻译和 SEO 优化
- 测试和发布

### 第 9-12 周: 持续优化
- 根据数据分析优化工具
- 继续新增工具
- 完善翻译
- 性能优化

---

## 📝 开发规范 (Development Standards)

### 代码规范
1. **组件命名**: PascalCase (如 `YarnCountConverter`)
2. **文件命名**: kebab-case (如 `yarn-count-converter.tsx`)
3. **翻译键命名**: camelCase (如 `yarnCountConverter`)
4. **函数命名**: camelCase (如 `calculateGSM`)

### 翻译规范
1. **所有用户可见文本必须使用翻译**
2. **翻译键结构**: `category.subcategory.key` (如 `tools.yarnCountConverter.title`)
3. **SEO 内容**: 放在 `seoContent` 对象下
4. **错误消息**: 放在 `common.errors` 对象下

### SEO 规范
1. **每个工具页面必须有**:
   - 唯一的 Title (50-60 字符)
   - 唯一的 Description (150-160 字符)
   - 完整的 SEO 文章内容
   - 结构化数据
   - Open Graph 标签

2. **URL 结构**: `/{locale}/tools/{category}/{tool-name}`
3. **关键词密度**: 2-3% (自然分布)

---

## 🎯 成功指标 (Success Metrics)

### 技术指标
- ✅ 所有工具页面 Lighthouse SEO 分数 > 90
- ✅ 所有工具页面支持 10 种语言
- ✅ 页面加载时间 < 2s
- ✅ 移动端友好 (Mobile-Friendly)

### 业务指标
- 📈 月访问量增长 20%+
- 📈 平均会话时长 > 2 分钟
- 📈 跳出率 < 60%
- 📈 工具使用率 > 30%

### SEO 指标
- 📈 关键词排名提升
- 📈 自然搜索流量增长
- 📈 页面索引率 > 95%
- 📈 Rich Snippets 展示率

---

## 📚 参考资料 (References)

### 纺织工程公式
- [Textile Calculation Formulas](https://www.textilecalculations.com/)
- [Yarn Count Conversion](https://en.wikipedia.org/wiki/Yarn_count)

### SEO 最佳实践
- [Next.js SEO Guide](https://nextjs.org/learn/seo/introduction-to-seo)
- [Google Search Central](https://developers.google.com/search)

### 多语言支持
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [i18n Best Practices](https://www.w3.org/International/i18n-drafts/nav/learn)

---

## 🔄 持续改进 (Continuous Improvement)

### 每周任务
- [ ] 检查 Google Search Console 错误
- [ ] 分析用户行为数据
- [ ] 收集用户反馈
- [ ] 更新翻译

### 每月任务
- [ ] 审查 SEO 表现
- [ ] 优化低性能页面
- [ ] 新增 2-3 个工具
- [ ] 更新文档

### 每季度任务
- [ ] 全面 SEO 审计
- [ ] 用户调研
- [ ] 功能规划
- [ ] 技术债务清理

---

**最后更新**: 2024-01-15
**版本**: 1.0.0
