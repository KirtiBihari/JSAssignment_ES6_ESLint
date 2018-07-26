import {Generic} from "../../Generic"
import bootstrap from "bootstrap"
const generic = new Generic()

window.bootstrap = bootstrap

export class ModalBoxView {
  openModalBox(modalBoxId, modalHeaderText, btnSubmitText, btnCloseText, submitMethod, submitMethodType, modalbodyTemp) {
    const modalContainer = `<div id="${modalBoxId}" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
    <div class="modal-content">
    <div class="modal-header bg-dark text-light">
    <h5 class="modal-title">${modalHeaderText}</h5>
    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
    <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div class="modal-body">
    </div>
    <div class="modal-footer">
    <button id="btn-close" type="button" class="btn btn-secondary" data-dismiss="modal">${btnCloseText}</button>
    <button id="btn-submit" type="button" class="btn btn-primary">${btnSubmitText}</button>
    </div>
    </div>
    </div>
    </div>`

    const modalContainerTemplate = generic.createHTMLElement(modalContainer)
    const modalContainerBody = modalContainerTemplate.querySelector("div.modal-body")
    console.log(modalbodyTemp)
    const modalBodyTemplate = generic.createHTMLElement(modalbodyTemp)
    modalContainerBody.appendChild(modalBodyTemplate)
    const modalSubmitBtn = modalContainerTemplate.querySelector("button#btn-submit")
    modalSubmitBtn.addEventListener("click", (event) => {
      submitMethod(event, submitMethodType)
    })
    return modalContainerTemplate
  }

  addCollectionModalTemplate() {
    return `<form id="addcollectionform" class="needs-validation" novalidate>
    <div class="form-row">
    <div class="col-md-12 col-sm-12 mb-1">
    <label for="cName">Name</label>
    <input type="text" class="form-control" id="cName" placeholder="Name" value="" required>
    <div class="invalid-feedback">
    Please enter name
    </div>
    </div>
    <div class="col-md-12 col-sm-12 mb-1">
    <label for="cDesc">Description</label>
    <textarea class="form-control rounded-0" id="cDesc" rows="10" required></textarea>
    <div class="invalid-feedback">
    Please enter some description
    </div>
    </div>
    </div>
    </form>`
  }

  addCollectionDetailsModalTemplate() {
    return `<form id="movielistInCollectionform" class="needs-validation" novalidate>
    <div class="form-row">
    <div class="col-md-12 col-sm-12 mb-1">
    <label for="editcName">Name</label>
    <input type="text" class="form-control" id="editcName" placeholder="Name" value="" required>
    <div class="invalid-feedback">
    Please enter name
    </div>
    </div>
    <div class="col-md-12 col-sm-12 mb-1">
    <label for="editcDesc">Description</label>
    <textarea class="form-control rounded-0" id="editcDesc" rows="10" required></textarea>
    <div class="invalid-feedback">
    Please enter some description
    </div>
    </div>
    <div class="col-md-12 col-sm-12 mb-1">
    <label>Movie List</label>
    <ul id="mlist">
    </ul>
    <div class="invalid-feedback">
    Please enter some description
    </div>
    </div>
    </div>
    </form>`
  }

  addMovieToCollectionModalTemplate() {
    return `<form id="addmovieform" class="needs-validation" novalidate >
    <div class="form-row">
    <div class="col-md-12 col-sm-12 mb-1">
    <label>Name :</label>
    <label class="text-weight-bold" id="lbl_mName"></label>
    </div>
    <div class="col-md-12 col-sm-12 mb-1">
    <label for="selcolletion">Select Collection:</label>
    <select class="form-control" id="selcolletion">
    </select>
    <div class="invalid-feedback">
    Please select a collection
    </div>
    </div>
    </div>
    </form>`
  }

  deleteCollectionModalTemplate() {
    return "<p id='c_d_msg'></p>"
  }
}
