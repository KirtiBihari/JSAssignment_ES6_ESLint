import {PopularMovieView} from "./PopularMovieView"
import {Generic} from "../../Generic"
import {JsonAPIService} from "../../service/JsonAPIService"
import {MainContent} from "../../MainContent"
import {appConfig} from "../../Constants"

const generic = new Generic()
const popularMovieView = new PopularMovieView()
const jsonAPIService = new JsonAPIService()

export class PopularMoviesController {
  constructor() {
    this.pageNo = 1
  }
  createPopularMovieContainer() {
    const popularMovieViewTemplate = popularMovieView.getPopularMovieContainerTemplate()
    const paginationpreviousLink = popularMovieViewTemplate.querySelector("nav#movie-pagination .previousLink")
    paginationpreviousLink.addEventListener("click", (event) => {
      this.onClickPrev(event)
    })
    const paginationnextLink = popularMovieViewTemplate.querySelector("nav#movie-pagination .nextLink")
    paginationnextLink.addEventListener("click", (event) => {
      this.onClickNext(event)
    })
    generic.appendHTMLToContainer(popularMovieViewTemplate, "main")
  }

  createPopularMovieCard(_pageno) {
    generic.showLoader()
    const popularMovieUrl = appConfig.BaseURL + appConfig.MediaType + "/popular?api_key=" + appConfig.APIKEY + "&language=en-US&page=" + _pageno
    console.log(popularMovieUrl)
    jsonAPIService.getJsonData(popularMovieUrl).then((data) => {
      if (data) {
        const popularMovieCardsTemp = popularMovieView.getPopularMovieCardsTemplate(data.results, appConfig.ImgBaseURL)
        const popularMovieCards = popularMovieCardsTemp.querySelectorAll("div.moviecard")
        popularMovieCards.forEach(mcard => {
          mcard.addEventListener("click", (event) => {
            this.goToMovieDetails(event)
          })
        })
        const pmovieEle = document.getElementById("popular-movies")
        pmovieEle.innerHTML = ""
        generic.appendHTMLToContainer(popularMovieCardsTemp, "div#popular-movies")
        generic.hideLoader()
        if (_pageno === 1) {
          const prevEle = document.querySelector("nav#movie-pagination .previousLink")
          prevEle.classList.add("linkdisabled")
        }
      }
    })
  }
  onClickNext(event) {
    this.pageNo += 1
    console.log(this.pageNo)
    this.createPopularMovieCard(this.pageNo)
    if (this.pageNo === 2) {
      const prevEle = document.querySelector("nav#movie-pagination .previousLink")
      prevEle.classList.remove("linkdisabled")
    }
  }
  onClickPrev(event) {
    this.pageNo -= 1
    console.log(this.pageNo)
    this.createPopularMovieCard(this.pageNo)
    if (this.pageNo === 1) {
      const prevEle = document.querySelector("nav#movie-pagination .previousLink")
      prevEle.classList.add("linkdisabled")
    }
  }
  goToMovieDetails(event) {
    const curEleId = event.currentTarget.id
    const movieDetailsUrl = appConfig.BaseURL + appConfig.MediaType + "/" + curEleId.substr(1) + "?api_key=" + appConfig.APIKEY
    jsonAPIService.getJsonData(movieDetailsUrl).then((data) => {
      MainContent.updateViewByViewState("moviedetails", data)
    })
  }
}
