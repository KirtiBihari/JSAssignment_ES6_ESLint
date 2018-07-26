import {Generic} from "../../Generic"
const generic = new Generic()

export class SearchBarView {
  getSearchBarTemplate(_searchText) {
    const searchBarTemp = `<section id="search" class="search">
    <div class="container">
    <form>
    <div class="form-group searchbox">
    <input type="text" class="form-control" id="input_moviesearch" name="movie_v1[query]" autocomplete="off" value="${_searchText}" placeholder="Search for movie">
    <span id="btn_moviesearch" class="search-icon">
    <i class="fa fa-search" aria-hidden="true"></i>
    </span>
    </div>
    </form>
    </div>
    </section>`
    return generic.createHTMLElement(searchBarTemp)
  }
}
