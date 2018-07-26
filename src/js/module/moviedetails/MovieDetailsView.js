import {Generic} from "../../Generic"
const generic = new Generic()

export class MovieDetailsView {
  getMovieDetailsTemplate(data, baseImgURL) {
    const movieDetailsTemp = `<section id="sec${data.id}" class="images inner movieDetailContent">
    <div class="movie-details container">
    <div class="row">
    <div class="col-lg-4 col-md-3 col-sm-12">
    <div class="image_content">
    <img class="poster" src="${baseImgURL}w300_and_h450_bestv2/${data.poster_path}" alt="${data.original_title}">
    </div>
    </div>
    <div class="col-lg-8 col-md-9 col-sm-12">
    <div class="title">
    <span>
    <a href="#">
    <h2>${data.original_title}</h2>
    </a>
    <span class="release_date">(${data.release_date})</span>
    </span>
    </div>
    <ul class="actions">
    <li>
    <div class="percentage">
    <div class="c100 p${Math.floor(data.popularity)}blue">
    <span>${Math.floor(data.popularity)}%</span>
    <div class="slice">
    <div class="bar"></div>
    <div class="fill"></div>
    </div>
    </div>
    <span class="text">User
    <br>Score</span>
    </div>
    </li>
    <li>
    <div class="editOption">
    <a class="btn btn-dark text-light" href="#"><i class="fa fa-list text-light" aria-hidden="true"></i></a>
    </div>
    </li>
    </ul>
    <div class="overview-content">
    <h3>Overview</h3>
    <div class="overview">
    <p>${data.overview}</p>
    </div>
    </div>
    </div>
    </div>
    </div>
    </section>`
    return generic.createHTMLElement(movieDetailsTemp)
  }
}
