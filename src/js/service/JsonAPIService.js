import $ from "jquery"
window.$ = $

export class JsonAPIService {
  apiPromiseCall(_url, _data, _type) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: _url,
        type: _type,
        data: _data,
        dataType: "json",
        success: (data) => {
          resolve(data)
        },
        error: (err) => {
          reject(err)
        },
      })
    })
  }

  getJsonData(_url) {
    return this.apiPromiseCall(_url, {}, "GET")
  }
  postJsonData(_url, _data) {
    return this.apiPromiseCall(_url, _data, "POST")
  }
  putJsonData(_url, _data) {
    return this.apiPromiseCall(_url, _data, "PUT")
  }
  deleteJsonData(_url, _id) {
    return this.apiPromiseCall(_url, {}, "DELETE")
  }
}
