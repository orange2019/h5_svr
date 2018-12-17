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
        // this.dataHref('/auth/err?code=' + ret.code)
        this.jump(ret.code)
        ret.data = {}
        return ret
      }
      return res.body
    } else {
      return null
    }


  }

  jump(code) {

    if (code == -100) {
      if (window.android) {
        window.android.goToLogin();
      }
    }

    let html = `<div class="page bg-white">
    <div class="p-5 text-center">
      <span></span>`
    if (code == -100) {
      html += `<div>
          <span class="text-muted">授权失败</span>
        </div>
        <div>
          <hr>
          <small class="text-muted h1">请返回重新登录</small>
        </div>`
    } else if (code - 101) {
      html += `<p class="text-muted">您的账号还未通过审核，请耐心等待！</p>
        <hr>
        <p>若还未上传实名认证资料，请到 [我的] - [实名认证] 中上传真实资料信息</p>
        <a class="text-center">
          <a href="javascript:;" class="btn btn-outline-primary pl-5 pr-5">返回</a>
        </div>`
    }
    html += `</div>
      </div>`

    document.getElementById('err-bg').innerHTML = html
    document.getElementById('err-bg').style.display = 'block'

    document.getElementById('err-bg').onclick = () => {

      document.getElementById('err-bg').innerHTML = ''
      document.getElementById('err-bg').style.display = 'none';
      history.go(-1);
    }
  }


}

export default new Request