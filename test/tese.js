class BaseModel {
  constructor({data,code,message}){
    this.code = code
    this.data = data
    this.message = message
  }

  resultDataModel(){
    this.code = 1000
    return {
      code: this.code,
      data: this.data,
      message: this.message
    }
  }
}

class Success extends BaseModel {
  constructor({code,data={},message='success'}){
    super({code,data,message})
  }
}


const Res = new Success({code:0})
Res.resultDataModel()
console.log(Res)