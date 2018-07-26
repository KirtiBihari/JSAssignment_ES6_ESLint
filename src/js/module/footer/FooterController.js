import {FooterView} from "./FooterView"
import {Generic} from "../../Generic"
const generic = new Generic()
const footerview = new FooterView()

export class FooterController {
  createFooter() {
    const footerTemplate = footerview.getFooterTemplate()
    generic.appendHTMLToContainer(footerTemplate, "footer")
  }
}
