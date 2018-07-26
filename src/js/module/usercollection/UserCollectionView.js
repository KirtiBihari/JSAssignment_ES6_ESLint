
import {Generic} from "../../Generic"
const generic = new Generic()

export class UserCollectionView {
  getUserCollectionContainertemplate() {
    const userColTemp = `<section id="userCollectionListContent">
    <div class="container">
    <div class="col-lg-12 col-md-12 col-sm-12 px-0">
    <h4>User Top Collection</h4>
    <span class="btnContainer">
    <a class="btn btn-dark" href="#" data-toggle="modal" data-target="#addcollectionModal">Add Collection</a>
    </span>
    <hr>
    <div id="userCollection" class="row">
    </div>
    </div>
    </div>
    </section>`
    return generic.createHTMLElement(userColTemp)
  }
}
