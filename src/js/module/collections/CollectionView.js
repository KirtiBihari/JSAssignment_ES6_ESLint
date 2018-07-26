import {Generic} from "../../Generic"
const generic = new Generic()

export class CollectionView {
  getCollectionTemplate(data) {
    const colTemplateStr = `<div id="c${data.id}" class="col-lg-3 col-md-4 col-sm-12">
    <div class="card">
    <div class="collection-tag">${data.Name}</div>
    <div class="card-body">
    <p class="card-text">${data.Description}
    </p>
    </div>
    <div class="action-tools">
    <a id="del${data.id}" href="#" class="btn btn-dark"><i class="fa fa-times-circle-o" aria-hidden="true"></i></a>
    </div>
    </div>
    </div>`
    return generic.createHTMLElement(colTemplateStr)
  }
  getNoCollectionTemplate() {
    const noColTemplateStr = `<div class="col-lg-12 col-md-12 col-sm-12 px-0 text-center">
    <h5>No Collection Available</h5>
    </div>`
    return generic.createHTMLElement(noColTemplateStr)
  }
}
