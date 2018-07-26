import {UserCollectionView} from "./UserCollectionView"
import {CollectionController} from "../collections/CollectionController"
import {Generic} from "../../Generic"
import {getCollectionStateData} from "../../state/store"
// import {JsonAPIService} from "../../service/JsonAPIService"
// import {appConfig} from "../../constants"
const generic = new Generic()
const userCollectionView = new UserCollectionView()
const collectionController = new CollectionController()
// const jsonAPIService = new JsonAPIService()

export class UserCollectionController {
  createUserCollectionContainer() {
    const UserCollectionTemplate = userCollectionView.getUserCollectionContainertemplate()
    generic.appendHTMLToContainer(UserCollectionTemplate, "main")
  }
  createUserCollection() {
    const movieColData = getCollectionStateData()
    const collectionContainerKey = "div#userCollection"
    document.querySelector(collectionContainerKey).innerHTML = ""
    if (movieColData.length > 0) {
      movieColData.forEach(mCol => {
        collectionController.createCollectionCard(mCol, collectionContainerKey)
      })
    }
    else {
      generic.appendHTMLToContainer(collectionController.noCollectionTemplate(), collectionContainerKey)
    }
  }
}
