import {Generic} from "./Generic"
import {HeaderController} from "./module/header/HeaderController"
import {FooterController} from "./module/footer/FooterController"
import {SearchBarController} from "./module/searchbar/SearchBarController"
import {PopularMoviesController} from "./module/popularmovies/PopularMoviesController"
import {TopCollectionController} from "./module/topcollection/TopCollectionController"
import {UserCollectionController} from "./module/usercollection/UserCollectionController"
import {MovieDetailsController} from "./module/moviedetails/MovieDetailsController"
import {SearchListController} from "./module/searchlist/SearchListController"
import {ModalBoxController} from "./module/modalbox/ModalBoxController"
import {CollectionController} from "./module/collections/CollectionController"
import {JsonAPIService} from "./service/JsonAPIService"
import {store} from "./state/store"
import $ from "jquery"
window.$ = $

const generic = new Generic()
const headerCtrl = new HeaderController()
const footerCtrl = new FooterController()
const SearchBarCtrl = new SearchBarController()
const popularMoviesCtrl = new PopularMoviesController()
const topCollectionCtrl = new TopCollectionController()
const usercollectionCtrl = new UserCollectionController()
const movieDetailsCtrl = new MovieDetailsController()
const SearchListCtrl = new SearchListController()
const modalBoxCtrl = new ModalBoxController()
const collectionCtrl = new CollectionController()
const jsonAPIService = new JsonAPIService()
export let currentView = ""
export const MainContent = {
  createHeaderFooter: () => {
    headerCtrl.createHeader()
    footerCtrl.createFooter()
  },
  createLoaderandSnackBar: () => {
    generic.createLoader()
    generic.createSnackBar()
  },
  createModals: () => {
    modalBoxCtrl.createAddCollectionModal()
    modalBoxCtrl.createMovieDetailsInCollectionModal()
    modalBoxCtrl.createAddMovieInCollectionModal()
    modalBoxCtrl.createDeleteCollectionModal()
  },
  createNewCollection: (data, collectionContainerKey) => {
    collectionCtrl.createCollectionCard(data, collectionContainerKey)
  },
  updateViewByViewState: (_viewName, data = null) => {
    currentView = _viewName
    switch (_viewName) {
    case "init":
      generic.clearMainContent()
      SearchBarCtrl.createSearchBar()
      popularMoviesCtrl.createPopularMovieContainer()
      popularMoviesCtrl.createPopularMovieCard(popularMoviesCtrl.pageNo)
      topCollectionCtrl.createTopCollectionContainer()
      currentView = "dashboard"
      break
    case "dashboard":
      generic.clearMainContent()
      SearchBarCtrl.createSearchBar()
      popularMoviesCtrl.createPopularMovieContainer()
      popularMoviesCtrl.createPopularMovieCard(popularMoviesCtrl.pageNo)
      topCollectionCtrl.createTopCollectionContainer()
      topCollectionCtrl.createTopCollection()
      break
    case "usercollection":
      generic.clearMainContent()
      usercollectionCtrl.createUserCollectionContainer()
      usercollectionCtrl.createUserCollection()
      break
    case "searchdata":
      const searchKey = $("#input_moviesearch").val()
      generic.clearMainContent()
      SearchBarCtrl.createSearchBar(searchKey)
      SearchListCtrl.createSearchListContainer()
      SearchListCtrl.createSearchList(data)
      break
    case "moviedetails":
      generic.clearMainContent()
      movieDetailsCtrl.createMovieDetails(data)
      break
    default:
      break
    }
    headerCtrl.updateNavLink(currentView)
  },
  getAllCollection() {
    const getCollectionUrl = "http://localhost:3000/UserCollection"
    jsonAPIService.getJsonData(getCollectionUrl).then((data) => {
      if (data) {
        store.dispatch({type: "GET_COLLECTION", dataItem: data})
      }
    })
  },
  renderAllCollection(cdata) {
    if (currentView === "dashboard" || currentView === "usercollection") {
      let collectionContainerKey = ""
      if (currentView === "dashboard") {
        collectionContainerKey = "div#topcollection-movies"
        if (cdata.length > 4) {
          console.log(cdata.slice(0, 4))
          cdata = cdata.slice(0, 4)
        }
      }
      else if (currentView === "usercollection") {
        collectionContainerKey = "div#userCollection"
      }
      document.querySelector(collectionContainerKey).innerHTML = ""
      if (cdata.length > 0) {
        cdata.forEach(mCol => {
          collectionCtrl.createCollectionCard(mCol, collectionContainerKey)
        })
      }
      else {
        generic.appendHTMLToContainer(collectionCtrl.noCollectionTemplate(), collectionContainerKey)
      }
    }
  },
  viewNavigation(e) {
    const curElementId = e.currentTarget.id
    console.log(curElementId.substr(4))
    this.updateViewByViewState(curElementId.substr(4))
  },
}
