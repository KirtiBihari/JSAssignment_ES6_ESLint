import $ from "jquery"
import {ModalBoxView} from "./ModalBoxView"
import {Generic} from "../../Generic"
import {JsonAPIService} from "../../service/JsonAPIService"
import {currentMovieDetails} from "../moviedetails/MovieDetailsController"
import {store, getCollectionStateData} from "../../state/store"
import {currentCollectionDetails} from "../collections/CollectionController"
const generic = new Generic()
const modalBoxView = new ModalBoxView()
window.$ = $
const jsonAPIService = new JsonAPIService()

export class ModalBoxController {
  createAddCollectionModal() {
    const modalBodyhtml = modalBoxView.addCollectionModalTemplate()
    const addCollectionModalTemp = modalBoxView.openModalBox("addcollectionModal", "Add Collection", "Add", "Close", this.modalSubmitMethod, "addcollection", modalBodyhtml)
    generic.appendHTMLToContainer(addCollectionModalTemp, "#ModalContainer")
    $("#addcollectionModal").on("show.bs.modal", function() {
      document.querySelector("#addcollectionModal #cName").value = ""
      document.querySelector("#addcollectionModal #cDesc").value = ""
    })
  }

  createMovieDetailsInCollectionModal() {
    const modalBodyhtml = modalBoxView.addCollectionDetailsModalTemplate()
    const movieDetailsCollectionModalTemp = modalBoxView.openModalBox("movielistInCollectionModal", "Collection Details", "Update", "Close", this.modalSubmitMethod, "editcollection", modalBodyhtml)
    generic.appendHTMLToContainer(movieDetailsCollectionModalTemp, "#ModalContainer")
  }

  createAddMovieInCollectionModal() {
    const modalBodyhtml = modalBoxView.addMovieToCollectionModalTemplate()
    const addMovieInCollectionModalTemp = modalBoxView.openModalBox("addMovieToCollectionModal", "Add Movie To Collection", "Add", "Close", this.modalSubmitMethod, "addmovietocollection", modalBodyhtml)
    generic.appendHTMLToContainer(addMovieInCollectionModalTemp, "#ModalContainer")
  }

  createDeleteCollectionModal() {
    const modalBodyhtml = modalBoxView.deleteCollectionModalTemplate()
    const deleteCollectionModalTemp = modalBoxView.openModalBox("collectiondeleteConfirmModal", "Delete Collection", "Yes", "No", this.modalSubmitMethod, "deletecollection", modalBodyhtml)
    generic.appendHTMLToContainer(deleteCollectionModalTemp, "#ModalContainer")
  }

  modalSubmitMethod(event, _modalName) {
    switch (_modalName) {
    case "addcollection":
      if (document.querySelector("#addcollectionModal #cName").value.trim() === "") {
        generic.showSnackBar("Please Enter Name", "error")
      }
      else if (document.querySelector("#addcollectionModal #cDesc").value.trim() === "") {
        generic.showSnackBar("Please Enter Description", "error")
      }
      else {
        const newCollectionData = {
          "Name": document.querySelector("#addcollectionModal #cName").value.trim(),
          "Description": document.querySelector("#addcollectionModal #cDesc").value.trim(),
          "Movies": "",
        }
        generic.showLoader()
        jsonAPIService.postJsonData("http://localhost:3000/UserCollection", newCollectionData).then((data) => {
          if (data) {
            store.dispatch({type: "ADD_COLLECTION", dataItem: data})
            generic.showSnackBar("Collection created successfully", "success")
            generic.removeModalBox("addcollectionModal")
            generic.hideLoader()
          }
        })
      }
      break
    case "addmovietocollection":
      const form = $("#addmovieform")[0]
      let selectedOptionId = -1
      if ($(".form-row #selcolletion option:selected").length > 0) {
        selectedOptionId = $(".form-row #selcolletion option:selected")[0].id
      }
      if (selectedOptionId !== -1) {
        if (form.checkValidity() === false) {
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add("was-validated")
        // this.addMovieToCollectionCall(selectedOptionId.substr(4), currentMovieDetails)
        const colId = selectedOptionId.substr(4)
        const collectionList = getCollectionStateData()
        const cindex = collectionList.findIndex(x => x.id === parseInt(colId))
        let movieData
        let existMovieIndex
        if (cindex >= 0) {
          if (!(collectionList[cindex].Movies === "")) {
            movieData = JSON.parse(collectionList[cindex].Movies)
            existMovieIndex = movieData.findIndex(x => x.id === currentMovieDetails.id)
            if (existMovieIndex < 0) {
              movieData.push(currentMovieDetails)
            }
          }
          else {
            movieData = []
            movieData.push(currentMovieDetails)
          }
          const movieStrData = JSON.stringify(movieData)
          const updateColData = {
            "Name": collectionList[cindex].Name,
            "Description": collectionList[cindex].Description,
            "Movies": movieStrData,
          }
          generic.showLoader()
          jsonAPIService.putJsonData("http://localhost:3000/UserCollection/" + collectionList[cindex].id, updateColData).then((data) => {
            if (data) {
              store.dispatch({type: "EDIT_COLLECTION", dataItem: data})
              generic.showSnackBar("Movie successfully added to collection", "success")
              generic.removeModalBox("addMovieToCollectionModal")
              generic.hideLoader()
            }
          })
        }
      }
      else {
        generic.showSnackBar("No Collection Selected", "error")
      }
      break
    case "editcollection":
      let movieupdatedStr
      if ($("#editcName").val().trim() === "") {
        generic.showSnackBar("Please Enter Name", "error")
      }
      else if ($("#editcDesc").val().trim() === "") {
        generic.showSnackBar("Please Enter Description", "error")
      }
      else {
        if (currentCollectionDetails.Movies.length > 0) {
          movieupdatedStr = JSON.stringify(currentCollectionDetails.Movies)
        }
        const updateCollectionData = {
          "Name": $("#editcName").val().trim(),
          "Description": $("#editcDesc").val().trim(),
          "Movies": movieupdatedStr,
        }
        generic.showLoader()
        jsonAPIService.putJsonData("http://localhost:3000/UserCollection/" + currentCollectionDetails.id, updateCollectionData).then((data) => {
          if (data) {
            store.dispatch({type: "EDIT_COLLECTION", dataItem: data})
            generic.showSnackBar("Collection updated successfully", "success")
            generic.removeModalBox("movielistInCollectionModal")
            generic.hideLoader()
          }
        })
      }

      break
    case "deletecollection":
      generic.showLoader()
      const deleteColId = currentCollectionDetails.id
      jsonAPIService.deleteJsonData("http://localhost:3000/UserCollection/" + deleteColId).then((data) => {
        if (data) {
          console.log(data)
          store.dispatch({type: "DELETE_COLLECTION", dataItem: {id: deleteColId}})
          generic.showSnackBar("Collection deleted successfully", "success")
          generic.removeModalBox("collectiondeleteConfirmModal")
          generic.hideLoader()
        }
      })
      break
    default:
      break
    }
  }
}
