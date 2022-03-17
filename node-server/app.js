const http = require('http');
const path = require('path');
// 引入 mz 模块转换成 Promise 的 fs 模块
const fs = require('mz/fs');

const server = http.createServer(async (req, res) => {
  // 获取 range 请求头
  // 格式为 Range:bytes=0-5
  let range = req.headers['range'];

  // 获取请求的文件路径
  // 如: http://127.0.0.1:3000/demo.pdf
  let p = path.join(__dirname, `/static/${req.url}`);

  // 确认文件是否存在
  let fileState;
  try {
    fileState = await fs.stat(p);
  } catch (e) {
    res.end('File Not Found');
  }
  // 存在的话，获取文件的总字节大小
  let total = fileState.size;

  // 跨域响应头
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // 如不设置 Access-Control-Expose-Headers
  // 浏览器将不会暴露响应头出来，获取为null
  res.setHeader('Access-Control-Expose-Headers', 'Accept-Ranges,Content-Range');

  // 支持 HTTP-RANGES
  res.setHeader('Accept-Ranges', 'bytes');
  // 设置文件的 Content-Type
  res.setHeader('Content-Type', 'application/pdf');

  // 如果分段请求
  if (range) {
    // 获取范围请求的开始和结束位置
    let [, start, end] = range.match(/(\d*)-(\d*)/);

    // 处理请求头中范围参数不传的问题
    start = start ? parseInt(start) : 0;
    end = end ? parseInt(end) : total - 1;
    // 响应客户端
    res.statusCode = 206;
    // 分段的总长度
    res.setHeader('Content-Length', end - start + 1);
    // 分段的开始位置和结束位置
    res.setHeader('Content-Range', `bytes ${start}-${end}/${total}`);
    // 返回文件流
    fs.createReadStream(p, { start, end }).pipe(res);
  } else {
    // 没有 range 请求头时将整个文件内容返回给客户端
    res.statusCode = 200;
    res.setHeader('Content-Length', Number(total));
    fs.createReadStream(p).pipe(res);
  }
});

// 监听端口
server.listen(3000, () => {
  console.log('server start 3000');
});
