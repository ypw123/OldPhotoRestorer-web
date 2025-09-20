## OldPhotoRestorer-web

老照片修复 & 图像生成 Demo（Vite + React + TS + Tailwind）。

### 功能概述
1. 上传老照片（前端目前仍是模拟“修复”流程）
2. 接入阿里云百炼 `wanx2.1-t2i-plus` 文生图（本地代理）
3. 占位老照片修复接口 `/api/wanx/restore` （当前原样返回，待接入真实修复模型）
3. 即将扩展：真实修复 API / 历史记录 / Supabase 存储

### 开发启动
```
pnpm install
pnpm run dev
```

### 百炼模型接入
通过一个极简 Node http 服务器代理调用，避免在浏览器暴露 Key。

#### 配置步骤
1. 复制 `.env.example` 为 `.env` 并填入：
```
ALIYUN_BAILIAN_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxx
API_PORT=8787 # 可选
```
2. 启动：
```
pnpm run api       # 启动代理，仅后端
pnpm run dev       # 启动前端
pnpm run dev:full  # 并行启动两者
```

#### 前端调用
`usePhotoRestoration` Hook 新增：
```
generateFromPrompt(prompt: string): Promise<void>
```
示例（尚未放到 UI）：
```ts
// const { generateFromPrompt } = usePhotoRestoration();
// await generateFromPrompt('a vintage photo of a peaceful village');
```

#### API 说明
代理地址：`POST /api/wanx/t2i`
请求体：
```json
{
	"prompt": "your text",
	"negative_prompt": "(optional)",
	"size": "1024*1024",
	"n": 1
}
```
返回示例（截取）：
```json
{
	"output": { "results": [{ "url": "https://..." }] }
}
```

### 安全与注意事项
- 不要把真实 Key 提交仓库或写死在前端
- 需要进一步增加：速率限制、请求日志、错误重试、超时控制
- 大任务可考虑异步：把 `X-DashScope-Async` 设为 `True`，轮询任务状态

### 后续计划
- 接入真实老照片修复推理服务
- 增加拖拽压缩/格式校验与错误提示
- 图片生成/修复历史记录（本地 + 远端）
- 移动端优化 & PWA

### License
MIT
