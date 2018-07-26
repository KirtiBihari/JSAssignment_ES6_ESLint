import $ from "jquery"
import {MovieDetailsView} from "./MovieDetailsView"
import {Generic} from "../../Generic"
// import {JsonAPIService} from "../../service/JsonAPIService"
import {appConfig} from "../../Constants"
import {getCollectionStateData} from "../../state/store"
const generic = new Generic()
const movieDetailsView = new MovieDetailsView()
window.$ = $
// const jsonAPIService = new JsonAPIService()
export let currentMovieDetails = null
export class MovieDetailsController {
  createMovieDetails(data) {
    currentMovieDetails = data
    const movieDetailsTemplate = movieDetailsView.getMovieDetailsTemplate(data, appConfig.ImgBaseURL)
    const addToCollectionBtn = movieDetailsTemplate.querySelector("div.editOption a")
    addToCollectionBtn.addEventListener("click", (event) => {
      this.onAddToCollection(event)
    })
    generic.appendHTMLToContainer(movieDetailsTemplate, "main")
  }
  onAddToCollection(event) {
    $(".form-row #lbl_mName").text(currentMovieDetails.title)
    const modalColComboBox = $(".form-row #selcolletion")
    modalColComboBox.html("")
    const collectionList = getCollectionStateData()
    for (const i of collectionList) {
      modalColComboBox.append(`<option id="copt${i.id}">
        ${i.Name}
        </option>`)
    }
    if (collectionList.length === 0) {
      $("#btn-submit").prop("disabled", true)
    }
    else {
      $("#btn-submit").prop("disabled", false)
    }
    $("#addMovieToCollectionModal").modal("show")
  }
}
