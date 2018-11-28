

let configEnv = {}

configEnv.dev = {
  domain: {
    img1: 'http://127.0.0.1:4004',
    img2: 'http://127.0.0.1:4002'
  }
}

configEnv.test = {
  domain: {
    img1: 'http://img1.kxm.cc512.com',
    img2: 'http://img2.kxm.cc512.com'
  }
  
}

configEnv.production = {
  domain: {
    img1: 'http://img1.kxm.com',
    img2: 'http://img2.kxm.com'
  }
}

let config = {
  'primary_key' : `-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQCTxS5zZcYCvciblqNcNmPIVKQaQcp3LJPAMQuF0D4B+vC6xg7l
Ua2YtN8eyVowq0z1PypQ7nAfUpWCwSpmS1cjaTcVviFIc8xRqQVu4vtfIxjX48QG
gK+3ir6q+08YLeu2wNqn2E5P62hmkgwVBIHTKA/wXxRozAUS0L9h53YpSQIDAQAB
AoGAL+i+JqvYhwsA/3DXhg4cS9clXV33RqwtOyKrmbbqY7n4UpXkPnU800XRESo3
E5B2Yw0XqyWjNISR9NKr7H6AwXsghkUVgMxWYXJp43pHMWRSji96yrMQGcGnmlLb
Mz5O0ru5UYXByETylx8B4shLcPuBQu1lcJCAECTX6pEuzAECQQDeFAjfbxptCa2j
5xe+8QTxkgUlErL/YLozlsxEdisUBnse7yDovVkvhCsj1JOZhZJmAYRYmk1P286P
lwiGYndjAkEAqld3mPa8RPBaqTkQiU85SJyTfdA9XL6kc6tjaFKvG2mndQ1Lks21
4byRlHhBS5XHnTXEI0q10rU17is/cDFqYwJAScUJ9X6onpPadFmtj6XsaHqC7v+5
Kg/tinmLPSqrwKkueOYiXm2XlKso0Wwp45N1QCE831nSWLbBdP1Mvacz1QJAeYt9
6CSuhBZo6nSwavmfq0MmLtDm6AWUPIDfprHRBqNl/Kym7zJfhJpT2nfQR4mxbGjP
8kq94IKy36X2Vyy7dwJBAKXJKABVdHfmk/gZ/SMk3y4PzoMunktbyxY6MbIjEGeQ
OZUBe+Rk2hypwpP1KfI/omEP8N7bv51ytNCsblwodyU=
-----END RSA PRIVATE KEY-----`

}

module.exports = Object.assign(config , configEnv[process.env.NODE_ENV] || {})