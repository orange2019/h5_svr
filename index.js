/**
 * vue-express-ssr index
 */

const express = require('express');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const {
  createBundleRenderer
} = require('vue-server-renderer');
const config = require('./config');

const SSR = false;

let app = express();
const Log = require('./log');

const bodyParser = require('body-parser'); // 处理请求中body的内容
const methodOverride = require('method-override');

// const session = require("express-session"); // session中间件
// const RedisStrore = require("connect-redis")(session);

// const sessionStore = {
//   host: process.env.NODE_ENV == "production" ? "127.0.0.1" : "47.52.193.103",
//   // host: 'ec2-54-169-177-12.ap-southeast-1.compute.amazonaws.com',
//   port: 6379
// };
// // session 支持
// app.use(
//   session({
//     // name: 'connect.sid',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       secure: false,
//       maxAge: 1000 * 60 * 60 * 24 * 7
//     },
//     secret: "123456", // session加密
//     store: new RedisStrore(sessionStore)
//   })
// );

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(bodyParser.raw({
  type: 'application/xml'
}));
app.use(bodyParser.text({
  type: 'text/xml'
}));

// allow overriding methods in query (?_method=put)
app.use(methodOverride('_method'));

let statics = [
  ['/js', path.join(__dirname, './dist/js')],
  ['/css', path.join(__dirname, './dist/css')],
  ['/images', path.join(__dirname, './dist/images')],
  ['/favicon.ico', path.join(__dirname, './favicon.ico')],
  ['/vendor', path.join(__dirname, './vendor')]
];
statics.forEach(staticOpt => {
  // staticOpt : ['映射路径' , '源路径']]]
  app.use(staticOpt[0], express.static(staticOpt[1]));
  console.log(`set static resource [ ${staticOpt[0]} , ${staticOpt[1]}]`);
});

const request = require('superagent');
const uuid = require('uuid');
const crypt = require('./crypt');

app.use('/api', async (req, res) => {
  let url = req.originalUrl;
  let apiLog = Log('api');

  // let apiUrl = (process.env.NODE_ENV == 'production') ? 'http://ec2-18-188-112-81.us-east-2.compute.amazonaws.com:4001' : '127.0.0.1:4001'
  let apiUrl = 'http://127.0.0.1:4001'
  url = url.replace('/api', apiUrl + '/h5');

  const reqUuid = uuid.v4();
  // let data = JSON.stringify({
  //   body : req.body,
  //   query: req.query,
  //   session: req.session
  // })
  // apiLog.info(`${reqUuid}|${req.originalUrl}` , 'data' , data)
  let content = {
    body: req.body,
    query: req.query,
    // session: req.session
  };
  let cryptStr = crypt.hmacMd5(content, reqUuid);

  let sign = crypt.sign(cryptStr, config.primary_key);
  let postData = {
    uuid: reqUuid,
    // data : CryptoJS.AES.encrypt(data , 'kaximu2018').toString()
    content: content,
    sign: sign
  };
  apiLog.info(`${reqUuid}|${req.originalUrl}`, 'reqBody', postData);

  try {
    let ret = await request
      .post(url)
      .send(postData)
      .type('json');
    let retBody = ret.body;

    apiLog.info(`${reqUuid}|${req.originalUrl}`, 'retBody', retBody);

    // Object.keys(retBody.content.session).forEach(key => {
    //   if (key !== 'cookie') {
    //     req.session[key] = retBody.content.session[key];
    //   }
    // });

    return res.json(retBody.content.result);
  } catch (err) {
    apiLog.info(`${reqUuid}|${req.originalUrl}`, 'err', err);
    return res.json({
      code: -1,
      message: 'request err'
    });
  }
});

let nodeEnv = process.env.NODE_ENV;

if (nodeEnv == 'dev') {
  // 开发环境
  const config = require('./build/webpack.server');
  const compiler = webpack(config);

  const history = require('connect-history-api-fallback');
  app.use(
    history({
      index: '/index.html'
    })
  );

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath,
      quiet: true //向控制台显示任何内容
    })
  );
  app.use(
    webpackHotMiddleware(compiler, {
      log: console.log,
      path: '/__webpack_hmr',
      heartbeat: 10 * 1000
    })
  );
} else {
  // 正式环境部署

  if (!fs.existsSync(path.join(__dirname, './dist'))) {
    console.warn('请运行打包命令：npm run build');
    process.exit();
  }

  if (!SSR) {
    // 不使用服务端渲染
    app.get('*', (req, res) => {
      let htmlStr = fs
        .readFileSync(path.join(__dirname, './dist/index.html'))
        .toString();
      res.send(htmlStr);
    });
  } else {
    let renderer = null;
    let serverBundlePath = path.join(
      __dirname,
      './dist/vue-ssr-server-bundle.json'
    );
    if (fs.existsSync(serverBundlePath)) {
      let serverBundle = require(serverBundlePath);

      let template = fs.readFileSync(
        path.join(__dirname, './src/index.ssr.html'),
        'utf-8'
      );
      let clientManifest = require('./dist/vue-ssr-client-manifest.json');

      renderer = createBundleRenderer(serverBundle, {
        runInNewContext: false, // 推荐
        template, // （可选）页面模板
        clientManifest // （可选）客户端构建 manifest
      });
    }

    app.get('*', (req, res) => {
      console.log('>>>>>>>>>>>>>>>>>>>>>', req.url);
      const context = {
        url: req.url
      };
      // 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
      // 现在我们的服务器与应用程序已经解耦！
      if (!renderer) {
        return res.send('404 err');
      }

      renderer.renderToString(context, (err, html) => {
        if (err) {
          console.error('err:', err);
          return res.send('500 err');
        }
        // console.log('html:', html)
        // 处理异常……
        return res.end(html);
      });
    });
  }
}

const PROT = process.env.port || 4003;

app.listen(PROT, function () {
  console.log(`Vue express ssr server: app listening on port ${PROT}!\n`);
});