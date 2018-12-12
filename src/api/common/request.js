const request = require('superagent')

class Request {

  async get(url, query = {}, type = 'json') {
    let res = await request
      .get(url)
      .query(query)
      .type(type)

    // console.log(res)
    if (res.status == 200) {
      return res.body
    } else {
      return null
    }
  }

  async post(url, data = {}, type = 'json') {

    let res = await request
      .post(url)
      .send(data)
      .type(type)

    // console.log(res)
    if (res.status == 200) {
      let ret = res.body
      console.log(ret)
      if (ret.code == -100 || ret.code == -101) {
        this.dataHref('/auth/err?code=' + ret.code)
      }
      return res.body
    } else {
      return null
    }


  }

  dataHref(url) {
    document.getElementById("href-true").setAttribute("href", url); //传入参数  
    document.getElementById("href-true").click(); //模拟点击  
  }


}

export default new Request