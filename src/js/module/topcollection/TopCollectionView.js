
import {Generic} from "../../Generic"
const generic = new Generic()

export class TopCollectionView {
  getTopCollectionContainertemplate() {
    const topColTemp = `<section id="topcollection">
    <div class="container">
    <div class="col-lg-12 col-md-12 col-sm-12 px-0">
    <h4>Top Collections</h4>
    <hr>
    <div id="topcollection-movies" class="row">
    </div>
    <div class="row">
    <a id="addCollectionBtn" class="btn btn-dark float-right mx-1" href="#" data-toggle="modal" data-target="#addcollectionModal">Add Collection</a>
    <a class="btn btn-dark float-right mx-1" href="#" id="btn-morecollection">More Collections</a>
    </div>
    </div>
    </div>
    </section>`
    return generic.createHTMLElement(topColTemp)
  }
}
