# 腾讯云静态网站部署

## 构建

运行 `npm run build:tencent`，生成目录为 `dist-tencent/`。

该目录是完整的纯静态网站，不依赖 Node.js、数据库、境外接口或 `chatgpt.site`。上传时必须上传目录内的全部文件，并确保 `index.html` 位于网站根目录。

## 腾讯云配置

1. 在 CloudBase「静态网站托管」或 COS「静态网站」中上传 `dist-tencent/` 内全部内容。
2. 默认首页设置为 `index.html`，错误页面也可暂时指向 `index.html`。
3. 绑定审核通过的自定义域名并开启 HTTPS。
4. 域名确定后，把 `tencent/index.html` 中的 `og:image` 改为 `https://你的域名/og.png`，重新构建上传，以获得正确的微信分享封面。
5. 如果使用中国大陆节点，先完成 ICP 备案；如果暂时使用香港节点，可以先部署测试。

## 缓存建议

- `index.html`：不缓存或缓存 5 分钟。
- `assets/*`：缓存 30 天。
- `og.png`：缓存 1 天。
