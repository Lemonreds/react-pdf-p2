### react-pdf-p2

基于 react-pdf 的修改，增加了虚拟滚动的逻辑（react-window）,优化了大文件 PDF 下的体验。

- https://github.com/mozilla/pdf.js
- https://www.npmjs.com/package/react-pdf
- https://www.npmjs.com/package/react-window
- https://github.com/wojtekmaj/react-pdf/issues/94#issuecomment-451736240

### 分片加载

react-pdf 是基于 pdf.js 实现的，pdf.js 默认支持文件分片加载，只要服务端实现了 HTTP-Ranges 的规范。

<img src="https://i.bmp.ovh/imgs/2022/03/7d98f1ba438007cc.png" 
width="500"
height="500"
/>

nodejs 的实现可以参考根目录 ./server 文件的代码。

注意：

浏览器默认不会暴露 Accept-Ranges,Content-Range，这两个头，会导致 pdf.js 误以为服务端不支持范围请求，
进而直接请求整个文件，故服务端返回的响应头还要加上：

```
Access-Control-Expose-Headers: Accept-Ranges,Content-Range
```

### 禁用预读取

pdf.js 默认会预读取文件，意味着如果文件过大，即使是分片加载，也会一直在下载，可以禁用预读取，只读取当前展示的页码。

```javascript
// react-pdf-p2/Document.jsx

// 禁止 PDF.js 预读取
window.PDFJS.disableAutoFetch = true;
```

示例中是 305 页的 pdf 文件，但是启用了分片请求以及禁用预读取后，会只加载当前页部分的数据：

<img src="https://i.bmp.ovh/imgs/2022/03/32ec5a140a344c44.png" 
width="500"
height="500"
/>

### 效果图

<img src="https://i.bmp.ovh/imgs/2022/03/03d5e84af8f62504.png" 
width="500"
height="500"
/>

### 启动本地 DEMO

启用后端服务

- cd ./node-server
- yarn install
- npm run start

启用前端服务

- cd /
- yarn install
- npm run start

浏览器访问

http://127.0.0.1:3001/example1.html
