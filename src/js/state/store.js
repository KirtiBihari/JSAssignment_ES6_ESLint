import {createStore} from "redux"
import collectionreducer from "./reducer"
import {MainContent} from "../MainContent"

// State to track
// const stateList = []
let stateData = null

// Reducer
export const store = createStore(collectionreducer)
store.subscribe(renderCollection)
function renderCollection() {
  console.log(store.getState())
  MainContent.renderAllCollection(store.getState().userColData)
}

// GET Collection Reducer
export const getCollectionReducer = (state, action) => {
  // stateList = action.dataItem
  stateData = {userColData: action.dataItem}
  return stateData
}
// Add Collection Reducer
export const addCollectionReducer = (state, action) => {
  console.log(state)
  if (state.length === 0) {
    // stateList.push(state)
    stateData = {userColData: action.dataItem}
    return stateData
  }
  else {
    // stateList.push(state)
    stateData = {userColData: [
      ...state.userColData,
      {
        "id": action.dataItem.id,
        "Name": action.dataItem.Name,
        "Description": action.dataItem.Description,
        "Movies": action.dataItem.Movies,
      }],
    }
    return stateData
  }
}
// Edit Collection Reducer
export const editCollectionReducer = (state, action) => {
  // stateList.push(state)
  const editItemIndex = state.userColData.findIndex(x => x.id === action.dataItem.id)
  state.userColData[editItemIndex] = action.dataItem
  return state
}
// Delete Collection Reducer
export const deleteCollectionReducer = (state, action) => {
  const delItemIndex = state.userColData.findIndex(x => x.id === action.dataItem.id)
  state.userColData.splice(delItemIndex, 1)
  return state
}

export const getCollectionStateData = () => {
  return store.getState().userColData
}
