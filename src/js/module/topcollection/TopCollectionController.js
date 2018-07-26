import {TopCollectionView} from "./TopCollectionView"
import {CollectionController} from "../collections/CollectionController"
import {Generic} from "../../Generic"
import {MainContent} from "../../MainContent"
// import {JsonAPIService} from "../../service/JsonAPIService"
import {getCollectionStateData} from "../../state/store"
const generic = new Generic()
const topCollectionView = new TopCollectionView()
const collectionController = new CollectionController()
// const jsonAPIService = new JsonAPIService()

export class TopCollectionController {
  createTopCollectionContainer() {
    const topCollectionTemplate = topCollectionView.getTopCollectionContainertemplate()
    const moreColBtn = topCollectionTemplate.querySelector("#btn-morecollection")
    moreColBtn.addEventListener("click", () => {
      MainContent.updateViewByViewState("usercollection")
    })
    generic.appendHTMLToContainer(topCollectionTemplate, "main")
  }
  createTopCollection() {
    let topColdata = getCollectionStateData()
    if (topColdata.length > 4) {
      topColdata = topColdata.slice(0, 4)
    }
    const collectionContainerKey = "div#topcollection-movies"
    document.querySelector(collectionContainerKey).innerHTML = ""
    if (topColdata.length > 0) {
      topColdata.forEach(mCol => {
        collectionController.createCollectionCard(mCol, collectionContainerKey)
      })
    }
    else {
      generic.appendHTMLToContainer(collectionController.noCollectionTemplate(), collectionContainerKey)
    }
  }
}
