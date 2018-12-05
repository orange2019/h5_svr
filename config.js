let configEnv = {};

configEnv.dev = {
  domain: {
    img1: "http://127.0.0.1:4004",
    img2: "http://127.0.0.1:4002"
  }
};

configEnv.test = {
  domain: {
    img1: "http://img1.kxm.cc512.com",
    img2: "http://img2.kxm.cc512.com"
  }
};

configEnv.production = {
  domain: {
    img1: "http://img1.kxm.com",
    img2: "http://img2.kxm.com"
  }
};

let config = {
  primary_key: `-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgQC4W8MYWpdITYcq6ocbM1dNzXBjkP2On1hAl7aYrROIAUQE/vMM
qU3of5kvU32+19NnrpF/i77vAXMNrVYmRJc0pHi0QulGym6PtQsUE3uY6YniB2fK
xcqGWDB5fI4Otura+frhvxc2u+NUTcVfl32d6qHi7wdtHvQKZkDmQQipzwIDAQAB
AoGAIOVOxJO1ltMuoTvD69iXZWyY90sx0zcfmjb3//oyF/yR1IpheArluey6urUd
JOaB9Ggz0hxvb1pE21Xon19x00a/LUTt2eL7cBTu55Ad/BTMXzTeh2oSFKrgqidG
pXQ5dfRfrFJV07E1nk+S+hjHEqm6xTwktnLOQutDpOJ3ZlECQQD1wieoyowdI+la
e0ULxAefnUUrf8iTtMVdQeIPGXpAQk0dEjhBSKbekz2MLU/naSpGfpdiMhGZP08S
tRZs52a7AkEAwAqRl0sbgck0HYzdR/TyeF5GDby+oAkVl48T8ra4Y/FnxnTL8tYB
Jw8Jo5MIjnj9c/HuLznqFznAPY3/ayG5/QJAO6GWufAbu15hWuEaSdaQ+vvQMtPY
uW5djVlVHtDRxxHPYERxffXA97TGdGLyRnZQGbbRyLPZbVPdPe7OuDIVzQJAGI/B
ezYx+HGBZt4jVxavBFIaZ5tiThmbV10HUh2oi6/OdAVwKEjSsOotc2xUxdQXpoKk
0gl4NSw/uB+3MT6JCQJAPNDOuhpy+JJysHlRNw7KeFvj3bxSeJcdzVTdqaDkxv3G
+OSK7E9LgvYupWZEdhiU/htt8OBLoTsWGdiQ2YdKBQ==
-----END RSA PRIVATE KEY-----`
};

module.exports = Object.assign(config, configEnv[process.env.NODE_ENV] || {});
