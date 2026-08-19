# Cloudflare Pages 部署

本项目按照“GitHub → Cloudflare Pages → 自定义域名”的方式发布。

## Cloudflare Pages 构建配置

- Production branch：`main`
- Framework preset：`None`
- Build command：`npm run build:cloudflare`
- Build output directory：`dist-tencent`
- Root directory：留空
- Node.js：项目要求 Node.js 22 或更高版本

项目不是单文件 HTML，因此不能把构建命令留空。Cloudflare 会安装依赖、执行构建，然后发布 `dist-tencent` 中的静态文件。

## 自定义域名

计划使用：`qixi.test2026819.online`

建议先在 Pages 项目中添加这个自定义子域名，再根据 Cloudflare 页面提示配置 DNS。若把整个 `test2026819.online` 的 NS 服务器切换到 Cloudflare，DNS 将由 Cloudflare 托管；如果暂时不切换 NS，也可以在原域名服务商处添加 `qixi` 的 CNAME，指向 Cloudflare Pages 分配的 `<项目名>.pages.dev`，但必须先在 Pages 项目中完成“添加自定义域名”。

Cloudflare 自动签发 HTTPS 证书。域名状态显示 Active、证书生效后，再用手机访问并分享。

## 更新网站

后续修改代码并推送到 GitHub 的 `main` 分支，Cloudflare Pages 会自动重新构建和发布。

## 中国大陆访问说明

这条路线不需要 ICP 备案，因为网站不部署在中国大陆服务器上；但 Cloudflare 并不承诺中国大陆网络稳定可达。正式分享前需分别用移动、联通、电信网络以及微信内置浏览器实测。若仍存在打不开或速度不稳定，最终仍需要切换到中国大陆云服务并完成 ICP 备案，或使用提供中国大陆合规加速的产品。
