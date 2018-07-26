import {addCollectionReducer, editCollectionReducer, deleteCollectionReducer, getCollectionReducer} from "./store"

export default function collectionreducer(state = {}, action) {
  switch (action.type) {
  case "GET_COLLECTION":
    return getCollectionReducer(state, action)
  case "ADD_COLLECTION":
    return addCollectionReducer(state, action)
  case "EDIT_COLLECTION":
    return editCollectionReducer(state, action)
  case "DELETE_COLLECTION":
    return deleteCollectionReducer(state, action)
  default:
    return state
  }
}

