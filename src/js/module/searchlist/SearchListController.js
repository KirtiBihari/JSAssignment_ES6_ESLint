import {SearchListView} from "./SearchListView"
import {Generic} from "../../Generic"
import {MainContent} from "../../MainContent"
import {JsonAPIService} from "../../service/JsonAPIService"
import {appConfig} from "../../Constants"
const generic = new Generic()
const searchListView = new SearchListView()
const jsonAPIService = new JsonAPIService()

export class SearchListController {
  createSearchListContainer() {
    const searchListContainerTemp = searchListView.getSearchListContainer()
    generic.appendHTMLToContainer(searchListContainerTemp, "main")
  }
  createSearchList(movieSearchData) {
    const searchListTemplate = searchListView.getSearchListTemplate(movieSearchData, appConfig.ImgBaseURL)
    const searchListMoreInfoLinks = searchListTemplate.querySelectorAll("a.moreInfo")
    searchListMoreInfoLinks.forEach(morelink => {
      morelink.addEventListener("click", (event) => {
        this.goToMoreInfo(event)
      })
    })
    generic.appendHTMLToContainer(searchListTemplate, "div#search-movies")
  }

  goToMoreInfo(event) {
    generic.showLoader()
    const curEleId = event.currentTarget.id
    const movieInfoAPIUrl = appConfig.BaseURL + appConfig.MediaType + "/" + curEleId.substr(6) + "?api_key=" + appConfig.APIKEY
    jsonAPIService.getJsonData(movieInfoAPIUrl).then((data) => {
      if (data) {
        console.log("movieInfoAPIUrl" + data)
        MainContent.updateViewByViewState("moviedetails", data)
        generic.hideLoader()
      }
    })
  }
}
