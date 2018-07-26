import "../../node_modules/bootstrap/scss/bootstrap.scss"
// import "../../node_modules/font-awesome/css/font-awesome.css"
import "../scss/customize.scss"
import "../scss/base.scss"
import "../scss/layout.scss"
import "../scss/module.scss"
import "../scss/state.scss"
import "../scss/circle.scss"

import {MainContent} from "./MainContent"

MainContent.getAllCollection()
// Create header Footer
MainContent.createHeaderFooter()
MainContent.createLoaderandSnackBar()
MainContent.createModals()
MainContent.updateViewByViewState("init")
