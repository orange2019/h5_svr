const request = require('superagent')

class Request {

  async get(url , query = {} , type = 'json'){
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

  async post(url , data = {} , type = 'json'){
  
    let res = await request
        .post(url)
        .send(data)
        .type(type)
    
    // console.log(res)
    if(res.status == 200){
      return res.body
    }else{
      return null
    }
    
    
  }


}

export default new Request