# 腾讯云静态网站部署

## 构建

运行 `npm run build:tencent`，生成目录为 `dist-tencent/`。

该目录是完整的纯静态网站，不依赖 Node.js、数据库、境外接口或 `chatgpt.site`。上传时必须上传目录内的全部文件，并确保 `index.html` 位于网站根目录。

## 正式域名

正式访问地址：`https://qixi.test2026819.online/`

分享封面地址：`https://qixi.test2026819.online/og.png`

## EdgeOne Pages 配置（无需 ICP）

1. 新建 Pages 项目，加速区域选择「全球可用区（不含中国大陆）」。
2. 上传 `tencent-deploy.zip`，或连接仓库并把构建命令设为 `npm run build:tencent`、输出目录设为 `dist-tencent`。
3. 项目部署成功后，在「域名管理」添加 `qixi.test2026819.online`。
4. 按控制台提示，在 DNSPod 为主机记录 `qixi` 添加 CNAME 记录。
5. 等待域名状态和 SSL 证书均显示正常后再分享链接。

注意：不要使用 EdgeOne 自动生成的项目域名作为朋友圈链接；在中国大陆网络下应使用绑定后的自定义域名。

## 缓存建议

- `index.html`：不缓存或缓存 5 分钟。
- `assets/*`：缓存 30 天。
- `og.png`：缓存 1 天。
