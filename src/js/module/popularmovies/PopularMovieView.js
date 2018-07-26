import {Generic} from "../../Generic"
const generic = new Generic()

export class PopularMovieView {
  getPopularMovieContainerTemplate() {
    const popularMovieContainer = `<section id="popularlist">
    <div class="container">
    <div class="col-lg-12 col-md-12 col-sm-12 px-0">
    <h4>Popular Movies</h4>
    <hr>
    <div id="popular-movies" class="row">
    </div>
    </div>
    </div>
    <nav id="movie-pagination" aria-label="Page navigation">
    <ul class="pagination justify-content-center">
    <li class="page-item">
    <a class="page-link previousLink disabled" href="#" tabindex="-1">Previous</a>
    </li>
    <li class="page-item">
    <a class="page-link nextLink" href="#">Next</a>
    </li>
    </ul>
    </nav>
    </section>`
    const popularMovieContainerTemplate = generic.createHTMLElement(popularMovieContainer)
    return popularMovieContainerTemplate
  }

  getPopularMovieCardsTemplate(moviePopularData, baseImgURL) {
    let moviesCards = ""
    moviePopularData.forEach(mdata => {
      moviesCards += `<div id="m${mdata.id}" class="col-lg-3 col-md-4 col-sm-12 px-0 moviecard">
      <a class="movie-info" href="#">
      <img src="${baseImgURL}w342/${mdata.poster_path}" alt="${mdata.title}">
      <div class="info">
      <span class="info-name d-block text-light">${mdata.title}</span>
      </div>
      </a>
      </div>`
    })
    return generic.createMultipleHTMLElement(moviesCards)
  }
}
