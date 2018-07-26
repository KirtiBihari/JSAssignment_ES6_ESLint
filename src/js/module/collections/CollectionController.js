import $ from "jquery"
import {CollectionView} from "./CollectionView"
import {Generic} from "../../Generic"
import {JsonAPIService} from "../../service/JsonAPIService"
import {appConfig} from "../../Constants"
import {getCollectionStateData} from "../../state/store"
window.$ = $
const generic = new Generic()
const collectionView = new CollectionView()
const jsonAPIService = new JsonAPIService()
export let currentCollectionDetails = {}
export class CollectionController {
  createCollectionCard(colData, containerKey) {
    const colTemplate = collectionView.getCollectionTemplate(colData)
    // const colCard = colTemplate.querySelector("div#c" + colData.Id)
    colTemplate.addEventListener("click", (event) => {
      this.onEditCollection(event)
    })
    const colCardDel = colTemplate.querySelector("a#del" + colData.id)
    colCardDel.addEventListener("click", (event) => {
      this.onDeleteCollection(event)
    })
    generic.appendHTMLToContainer(colTemplate, containerKey)
  }

  onEditCollection(event) {
    const colId = event.currentTarget.id.substr(1)
    jsonAPIService.getJsonData("http://localhost:3000/UserCollection/" + colId).then((data) => {
      if (data) {
        currentCollectionDetails = data
        $(".form-row #editcName").val(currentCollectionDetails.Name)
        $(".form-row #editcDesc").val(currentCollectionDetails.Description)
        const moviesUlEle = $(".form-row #mlist")
        moviesUlEle.html("")
        if (currentCollectionDetails.Movies === null) {
          currentCollectionDetails.Movies = []
        }
        if (data.Movies.length > 0) {
          currentCollectionDetails.Movies = JSON.parse(currentCollectionDetails.Movies)
          for (const i of currentCollectionDetails.Movies) {
            moviesUlEle.append(`<li id="mopt${i.id}">
              <div class="mName" data-toggle="tooltip" data-placement="top" title="${i.title}"><span class="mImg">
              <img class="poster" src="${appConfig.ImgBaseURL}w92/${i.poster_path}" alt="${i.original_title}">
              </span>${i.title}</div>
              <a id="mdel_${i.id}" href="#" class="btn btn-light btn-addtocol"><i class="fa fa-times-circle-o" aria-hidden="true"></i></a>
              </li>`)
            $("#mdel_" + i.id).click(this.onMovieDelFromCollection)
          }
        }
        else {
          moviesUlEle.append(`<li id="mopt_noitem" class="text-center no-movies">
          <h5>No movies</h5></li>`)
        }
        $("#movielistInCollectionModal").modal("show")
      }
    })
  }
  onMovieDelFromCollection(e) {
    const currentEle = e.currentTarget
    const movieId = currentEle.id.substr(5)
    const mindex = currentCollectionDetails.Movies.findIndex(x => x.id === movieId)
    currentCollectionDetails.Movies.splice(mindex, 1)
    $("#mopt" + movieId).remove()
    if (currentCollectionDetails.Movies.length === 0) {
      const moviesUlEle = $(".form-row #mlist")
      moviesUlEle.append(`<li id="mopt_noitem" class="text-center no-movies">
      <h5>No movies</h5>
      </li>`)
    }
  }
  onDeleteCollection(event) {
    event.stopPropagation()
    const colId = event.currentTarget.id.substr(3)
    const colList = getCollectionStateData()
    const selectedCollection = colList.filter(x => x.id === parseInt(colId))
    currentCollectionDetails = selectedCollection[0]
    $("div.modal-body #c_d_msg").text("Are you sure to delete '" + currentCollectionDetails.Name + "' collection")
    $("#collectiondeleteConfirmModal").modal("show")
  }
  noCollectionTemplate() {
    return collectionView.getNoCollectionTemplate()
  }
}

// let addMovieToCollection = (cId, mdata, colDataList) => {
//   let cindex = colDataList.findIndex(x => x.id == cId);
//   let movieData;
//   let existMovieIndex;
//   if (cindex != -1) {
//       if (!(colDataList[cindex].Movies == "")) {
//           movieData = JSON.parse(colDataList[cindex].Movies);
//           existMovieIndex = movieData.findIndex(x => x.id == mdata.id);
//           if (existMovieIndex == -1) {
//               movieData.push(mdata);

//           }
//       } else {
//           movieData = [];
//           movieData.push(mdata);
//       }
//       let movieStrData = JSON.stringify(movieData);

//       $.ajax({
//           url: "http://localhost:3000/MovieData/" + colDataList[cindex].id,
//           method: "PUT",
//           data: {
//               "Name": colDataList[cindex].Name,
//               "Description": colDataList[cindex].Description,
//               "Movies": movieStrData,
//           },
//           success(result) {
//               alert("Movie successfully added");
//           }
//       });

//   }
// }
