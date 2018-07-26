import $ from "jquery"
import {JsonAPIService} from "./service/JsonAPIService"
// import {ViewService} from "./service/viewService"
import {appConfig} from "./Constants"
window.$ = $
const jsonAPIService = new JsonAPIService()
// const viewServiceObj = new ViewService()

export class Generic {
  createHTMLElement(html) {
    const template = document.createElement("template")
    template.innerHTML = html
    return template.content.firstElementChild
  }
  createMultipleHTMLElement(html) {
    const template = document.createElement("template")
    template.innerHTML = html
    return template.content
  }
  appendHTMLToContainer(htmlContent, containerKey) {
    const container = document.querySelector(containerKey)
    container.appendChild(htmlContent)
  }
  getDataConfig() {
    const apiurl = appConfig.BaseURL + "configuration?api_key=" + appConfig.APIKEY
    jsonAPIService.getJsonData(apiurl).then((data) => {
      console.log(data)
      return data
    })
  }
  deleteElement(containerKeys) {
    $(containerKeys).remove()
  }
  removeModalBox(_modalId) {
    $("#" + _modalId).modal("hide")
    $("body").removeClass("modal-open")
    $(".modal-backdrop").remove()
  }
  createLoader() {
    const loaderhtml = `<div id="movieloader" class="loader-container" style="display:none">
    <div class="overlay"></div>
    <div class="loader">
    <svg class="circular" viewBox="25 25 50 50">
    <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" />
    </svg>
    </div>
    </div>`
    const loaderhtmlTemp = this.createHTMLElement(loaderhtml)
    this.appendHTMLToContainer(loaderhtmlTemp, "#LoaderContainer")
  }
  createSnackBar() {
    const snackBarhtml = `<div id="snackbar" style="display:none">
    </div>`
    const snackBarhtmlTemp = this.createHTMLElement(snackBarhtml)
    this.appendHTMLToContainer(snackBarhtmlTemp, "#SnackBarContainer")
  }
  showSnackBar(text, msgtype) {
    const snackBar = document.querySelector("div#snackbar")
    snackBar.innerHTML = text
    snackBar.style.display = "block"
    if (msgtype === "success") {
      snackBar.style.background = "#06a00c"
    }
    else {
      snackBar.style.background = "#e2291b"
    }
    setTimeout(function() {
      snackBar.style.display = "none"
    }, 3000)
  }
  showLoader() {
    $("#movieloader").show()
  }
  hideLoader() {
    $("#movieloader").hide()
  }
  clearMainContent() {
    $("main").html("")
  }
}
