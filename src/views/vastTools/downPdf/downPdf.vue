<template>
  <div class="down-pdf-page">
    <!-- 装饰背景 -->
    <div class="bg-decoration bg-decoration-left">
      <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect
          x="20"
          y="10"
          width="60"
          height="80"
          rx="4"
          fill="#e6f4ff"
          stroke="#91caff"
          stroke-width="1.5"
          stroke-dasharray="4 3"
        />
        <circle
          cx="90"
          cy="30"
          r="12"
          fill="none"
          stroke="#91caff"
          stroke-width="1.5"
          stroke-dasharray="3 3"
        />
        <circle
          cx="15"
          cy="100"
          r="8"
          fill="none"
          stroke="#bae0ff"
          stroke-width="1.5"
          stroke-dasharray="3 3"
        />
      </svg>
    </div>
    <div class="bg-decoration bg-decoration-right">
      <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect
          x="40"
          y="20"
          width="60"
          height="80"
          rx="4"
          fill="#e6f4ff"
          stroke="#91caff"
          stroke-width="1.5"
          stroke-dasharray="4 3"
        />
        <circle
          cx="20"
          cy="50"
          r="10"
          fill="none"
          stroke="#91caff"
          stroke-width="1.5"
          stroke-dasharray="3 3"
        />
        <circle
          cx="100"
          cy="110"
          r="14"
          fill="none"
          stroke="#bae0ff"
          stroke-width="1.5"
          stroke-dasharray="3 3"
        />
      </svg>
    </div>

    <!-- Hero 区域 -->
    <section class="hero-section">
      <h1 class="hero-title">
        输入内容，<span class="highlight">下载 PDF</span>
      </h1>
      <p class="hero-subtitle">输入需要转换或生成的内容，立即获取 PDF 文件</p>

      <div class="input-card">
        <label class="input-label">
          请输入内容<span class="required">*</span>
        </label>
        <el-input
          v-model="content"
          type="textarea"
          :rows="8"
          :maxlength="5000"
          show-word-limit
          placeholder="在这里输入您想要下载为 PDF 的内容..."
          resize="none"
        />

        <div class="examples-row">
          <span class="examples-label">示例：</span>
          <div class="example-tags">
            <span
              v-for="item in examples"
              :key="item.label"
              class="example-tag"
              @click="content = item.content"
            >
              {{ item.label }}
            </span>
          </div>
        </div>

        <el-button
          type="primary"
          class="download-btn"
          :loading="generating"
          @click="handleDownload"
        >
          <el-icon><Download /></el-icon>
          生成并下载 PDF
        </el-button>

        <p class="security-note">
          <el-icon><Lock /></el-icon>
          您的内容不会被存储，安心使用
        </p>
      </div>
    </section>

    <!-- 三步流程 -->
    <section class="steps-section">
      <h2 class="section-title">简单三步，轻松获取 PDF</h2>
      <div class="steps-list">
        <div v-for="(step, index) in steps" :key="step.title" class="step-item">
          <div v-if="index > 0" class="step-connector" />
          <div class="step-icon-wrap">
            <el-icon :size="28"><component :is="step.icon" /></el-icon>
          </div>
          <h3 class="step-title">
            <span class="step-badge">{{ index + 1 }}</span>
            {{ step.title }}
          </h3>
          <p class="step-desc">{{ step.desc }}</p>
        </div>
      </div>
    </section>

    <!-- 特性介绍 -->
    <section class="features-section">
      <div
        v-for="feature in features"
        :key="feature.title"
        class="feature-item"
      >
        <div class="feature-icon-wrap">
          <el-icon :size="32"><component :is="feature.icon" /></el-icon>
        </div>
        <h3 class="feature-title">{{ feature.title }}</h3>
        <p class="feature-desc">{{ feature.desc }}</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, h } from "vue";
import { ElMessage } from "element-plus";
import {
  Download,
  Lock,
  EditPen,
  Document,
  Cloudy,
} from "@element-plus/icons-vue";
import { generatePdf } from "@/api/downPdf";
import { downloadBlob } from "@/utils/download";

const content = ref("");
const generating = ref(false);

const examples = [
  {
    label: "会议纪要",
    content: `会议纪要

会议主题：项目进度评审
会议时间：2026年6月18日
参会人员：张三、李四、王五

一、议题讨论
1. 项目整体进度符合预期
2. 下一阶段的开发计划已确定

二、决议事项
1. 完成 UI 页面开发
2. 下周进行功能测试

三、待办事项
- 张三：完成 PDF 工具开发
- 李四：编写测试用例`,
  },
  {
    label: "学习笔记",
    content: `Vue 3 学习笔记

一、组合式 API
- ref：用于基本类型响应式数据
- reactive：用于对象类型响应式数据
- computed：计算属性
- watch：侦听器

二、生命周期钩子
- onMounted：组件挂载后
- onUnmounted：组件卸载前

三、核心概念
- 响应式系统基于 Proxy
- 组件通信：props / emit / provide / inject`,
  },
  {
    label: "项目计划",
    content: `项目计划书

项目名称：个人博客系统
项目周期：2026.06 - 2026.08

阶段一：基础搭建（2周）
- 项目初始化
- 路由与布局设计
- 侧边栏导航

阶段二：功能开发（4周）
- 工具模块开发
- PDF 下载功能
- 内容管理

阶段三：优化上线（2周）
- 性能优化
- 部署上线`,
  },
  {
    label: "文章大纲",
    content: `文章大纲：前端性能优化实践

一、引言
- 性能优化的重要性
- 常见性能指标（FCP、LCP、TTI）

二、加载性能优化
- 代码分割与懒加载
- 资源压缩与 CDN
- 图片优化策略

三、运行时性能优化
- 虚拟列表
- 防抖与节流
- 组件缓存

四、总结与展望`,
  },
];

const steps = [
  {
    icon: EditPen,
    title: "输入内容",
    desc: "在输入框中输入或粘贴您想要转换为 PDF 的内容",
  },
  {
    icon: Document,
    title: "生成 PDF",
    desc: "点击生成按钮，系统将自动将内容转换为 PDF 文件",
  },
  {
    icon: Download,
    title: "下载文件",
    desc: "转换完成后，点击下载按钮即可保存 PDF 文件到本地",
  },
];

const ShieldIcon = {
  render() {
    return h(
      "svg",
      {
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
      },
      [
        h("path", {
          d: "M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z",
          stroke: "currentColor",
          "stroke-width": "1.5",
          fill: "none",
        }),
      ],
    );
  },
};

const LightningIcon = {
  render() {
    return h(
      "svg",
      {
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
      },
      [
        h("path", {
          d: "M13 2L3 14h8l-1 8 10-12h-8l1-8z",
          stroke: "currentColor",
          "stroke-width": "1.5",
          fill: "none",
          "stroke-linejoin": "round",
        }),
      ],
    );
  },
};

const features = [
  {
    icon: ShieldIcon,
    title: "安全可靠",
    desc: "您的数据安全是我们的首要任务",
  },
  {
    icon: LightningIcon,
    title: "快速高效",
    desc: "几秒钟即可生成高质量 PDF",
  },
  {
    icon: Cloudy,
    title: "无需注册",
    desc: "免费使用，无需注册登录",
  },
];

async function handleDownload() {
  if (!content.value.trim()) {
    ElMessage.warning("请输入内容");
    return;
  }

  generating.value = true;
  try {
    const { blob, fileName } = await generatePdf({ content: content.value });
    downloadBlob(blob, fileName);
    ElMessage.success("PDF 下载成功");
  } catch {
    // 错误提示已在 request 拦截器或 postBlob 中处理
  } finally {
    generating.value = false;
  }

  // try {
  //   const container = document.createElement("div");
  //   container.style.cssText = `
  //     position: fixed;
  //     left: -9999px;
  //     top: 0;
  //     width: 794px;
  //     padding: 60px;
  //     background: #fff;
  //     font-family: "Microsoft YaHei", "PingFang SC", sans-serif;
  //     font-size: 16px;
  //     line-height: 1.8;
  //     color: #333;
  //     white-space: pre-wrap;
  //     word-break: break-word;
  //   `;
  //   container.textContent = content.value;
  //   document.body.appendChild(container);

  //   const canvas = await html2canvas(container, {
  //     scale: 2,
  //     useCORS: true,
  //     backgroundColor: "#ffffff",
  //   });
  //   document.body.removeChild(container);

  //   const imgData = canvas.toDataURL("image/png");
  //   const pdfWidth = 210;
  //   const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  //   const pdf = new jsPDF({
  //     orientation: pdfHeight > pdfWidth ? "portrait" : "portrait",
  //     unit: "mm",
  //     format: [pdfWidth, Math.max(pdfHeight, 297)],
  //   });

  //   pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  //   pdf.save("document.pdf");
  //   ElMessage.success("PDF 下载成功");
  // } catch {
  //   ElMessage.error("PDF 生成失败，请重试");
  // } finally {
  //   generating.value = false;
  // }
}
</script>

<style scoped>
.down-pdf-page {
  position: relative;
  min-height: 100%;
  padding: 40px 24px 60px;
  background: linear-gradient(180deg, #f5f8fc 0%, #fafbfc 40%, #fff 100%);
  overflow-x: hidden;
}

.bg-decoration {
  position: absolute;
  opacity: 0.6;
  pointer-events: none;
  z-index: 0;
}

.bg-decoration-left {
  top: 20px;
  left: 20px;
  width: 120px;
}

.bg-decoration-right {
  top: 10px;
  right: 20px;
  width: 120px;
}

.hero-section {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.hero-title {
  font-size: 36px;
  font-weight: 600;
  color: #333;
  margin: 0 0 12px;
  letter-spacing: 1px;
}

.hero-title .highlight {
  color: #1890ff;
}

.hero-subtitle {
  font-size: 15px;
  color: #666;
  margin: 0 0 32px;
}

.input-card {
  background: #fff;
  border-radius: 12px;
  padding: 28px 32px 24px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  text-align: left;
}

.input-label {
  display: block;
  font-size: 14px;
  color: #333;
  margin-bottom: 10px;
  font-weight: 500;
}

.input-label .required {
  color: #ff4d4f;
  margin-left: 2px;
}

.input-card :deep(.el-textarea__inner) {
  border-radius: 8px;
  padding: 12px 14px;
  font-size: 14px;
  line-height: 1.7;
  border-color: #d9d9d9;
}

.input-card :deep(.el-textarea__inner:focus) {
  border-color: #1890ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
}

.input-card :deep(.el-input__count) {
  color: #999;
  font-size: 12px;
}

.examples-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

.examples-label {
  font-size: 13px;
  color: #666;
  flex-shrink: 0;
}

.example-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.example-tag {
  display: inline-block;
  padding: 4px 14px;
  font-size: 13px;
  color: #1890ff;
  background: #e6f7ff;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;
}

.example-tag:hover {
  background: #bae7ff;
}

.download-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  max-width: 320px;
  height: 44px;
  margin: 24px auto 16px;
  font-size: 15px;
  border-radius: 8px;
  background: #1890ff;
  border-color: #1890ff;
}

.download-btn:hover {
  background: #40a9ff;
  border-color: #40a9ff;
}

.security-note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 12px;
  color: #999;
  margin: 0;
}

.security-note .el-icon {
  font-size: 13px;
}

.steps-section {
  position: relative;
  z-index: 1;
  max-width: 960px;
  margin: 64px auto 0;
  text-align: center;
}

.section-title {
  font-size: 22px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px;
}

.section-title::after {
  content: "";
  display: block;
  width: 40px;
  height: 3px;
  background: #1890ff;
  border-radius: 2px;
  margin: 10px auto 0;
}

.steps-list {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 0;
  margin-top: 40px;
}

.step-item {
  position: relative;
  flex: 1;
  max-width: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
}

.step-connector {
  position: absolute;
  top: 28px;
  right: 100%;
  width: calc(100% - 72px);
  height: 0;
  border-top: 2px dashed #d9d9d9;
  transform: translateX(50%);
}

.step-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #e6f7ff;
  color: #1890ff;
  margin-bottom: 12px;
}

.step-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px;
}

.step-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #1890ff;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
}

.step-desc {
  font-size: 13px;
  color: #666;
  line-height: 1.6;
  margin: 0;
}

.features-section {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  gap: 48px;
  max-width: 960px;
  margin: 64px auto 0;
  padding: 40px 24px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.04);
}

.feature-item {
  flex: 1;
  text-align: center;
  max-width: 240px;
}

.feature-icon-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  color: #1890ff;
  margin-bottom: 12px;
}

.feature-title {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px;
}

.feature-desc {
  font-size: 13px;
  color: #666;
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 26px;
  }

  .input-card {
    padding: 20px 16px;
  }

  .steps-list {
    flex-direction: column;
    align-items: center;
    gap: 32px;
  }

  .step-item {
    max-width: 320px;
  }

  .step-connector {
    display: none;
  }

  .features-section {
    flex-direction: column;
    align-items: center;
    gap: 32px;
  }

  .bg-decoration {
    display: none;
  }
}
</style>
