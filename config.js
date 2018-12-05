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
MIICWwIBAAKBgQCha4PTmuTq9K3tHKUAe1a/BlUfAe90TilIdXt3fRZhorwNqn95
7wpNA52Ck7usq9fkD70+6KAn8/b/cketJC6dMX2VgZx3IZGwvKZUG8yWIZhEO/J5
5v82tX1PPgq16lCrhfY9x8BVKwkxE94UF4eKEJGaGAS9Ix1QF0uCkHMg3wIDAQAB
AoGAClPXplU1qjanXhFEGUjK3wPntEkqadWKXKFvmdB9+xcvUuyCpWl+zjiZ/j23
dy+za1r6b6jwfj3koqlMHq6+8KOzAKrRj5cdhedCVMjLrWmMHqdl/I+Ek+Y/1XTt
+J54vLGED+TSzqJcdMu/+z3ipOVfVSQTFe7w543AJ8zDrBkCQQDOognuqZy5wUPF
lF24vlkbwQ73NQpKRntzG7RIT5x4eK/j29fwd+j+5gdzJH/OeDP/k8QnKEzK0iT6
y0PwswPdAkEAx/wv0hCPwY6MDhLA5VEkGVhyiQU8968POCP1ZUAp9p1cY3n7zAGS
YcxlJJ2OT2qgH8CwbcOW3lE+XUwSHtYZ6wJASHNybhdUl6EXJTjvX66GSf/4Ql97
my15bZPiM5SOdYNDkO5tmahBrtZy+EFs+rUU7mEeXuh3fIoQY0tQKB5slQJAG3UO
g8LuWd7eb9g3T8TSNgCkyRdFBaStbEHToXEr0cZNNwM6hQn6NR9BC8PuFA1JqtJj
5s4h2qhA7cJSApXWvQJAdbbnrJCu52y6UO3sGTithsW9wxq/hPVW1b+8egxVW1wL
vZxq5+sTEOH9XTvgelNqN025jVpeNPeeUQcFDY5jWg==
-----END RSA PRIVATE KEY-----`
};

module.exports = Object.assign(config, configEnv[process.env.NODE_ENV] || {});
