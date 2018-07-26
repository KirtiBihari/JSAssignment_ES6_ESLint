
import {HeaderView} from "./HeaderView"
import {appConfig} from "../../Constants"
import {Generic} from "../../Generic"
const generic = new Generic()
const headerview = new HeaderView()

export class HeaderController {
  constructor() {
    this.menuItems = [
      {id: 1, Name: "Dashboard"},
      {id: 2, Name: "UserCollection"},
    ]
  };
  createHeader() {
    const headerTemplate = headerview.getHeaderTemplate(this.menuItems, appConfig.LogoFullPath)
    generic.appendHTMLToContainer(headerTemplate, "header")
  }
  updateNavLink(_currentView) {
    headerview.updateNavLinkActive(_currentView)
  }
}
