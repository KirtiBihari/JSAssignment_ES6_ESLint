import {Generic} from "../../Generic"
const generic = new Generic()

export class SearchListView {
  getSearchListContainer() {
    const searchListContainer = `<section id="searchmoviesContent">
    <div class="container">
    <div class="col-lg-12 col-md-12 col-sm-12 px-0">
    <h4>Search Movies</h4>
    <hr>
    <div id="search-movies" class="row">
    </div>
    </div>
    </div>
    </section>`
    return generic.createHTMLElement(searchListContainer)
  }
  getSearchListTemplate(movieDataList, baseImgURL) {
    let movieData = ""
    movieDataList.forEach(i => {
      movieData += `<div class="col-lg-6 col-md-12 col-sm-12 px-0">
      <div class="row">
      <div class="col-lg-4 col-md-6 col-sm-12">
      <div class="image_content">
      <img class="poster" src="${baseImgURL}w342/${i.poster_path}" alt="${i.title}">
      </div>
      </div>
      <div class="col-lg-8 col-md-6 col-sm-12">
      <div class="percentage">
      <div class="c100 p${Math.floor(i.popularity)}blue">
      <span>${Math.floor(i.popularity)}%</span>
      <div class="slice">
      <div class="bar"></div>
      <div class="fill"></div>
      </div>
      </div>
      <div class="text">${i.original_title}
      <br>(${i.release_date})</div>
      </div>
      <p class="overview">${i.overview}</p>
      <hr>
      <a id="sItem_${i.id}" class="moreInfo" href="#">More Info</a>
      </div>
      </div>
      </div>`
    })
    return generic.createMultipleHTMLElement(movieData)
  }
}

