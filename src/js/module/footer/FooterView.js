import {Generic} from "../../Generic"
const generic = new Generic()

export class FooterView {
  getFooterTemplate() {
    const footerEle = `<div class="container">
    <div class="row">
    <div class="col-lg-6 copyright">Copyright &copy; www.moviebucket.com
    <br>
    <p>Designed and Maintained by the core team with the help of our contributors. Currently v4.1.1. Code licensed
    MIT, docs CC BY 3.0.</p>
    </div>
    <div class="col-lg-2 offset-lg-4">
    <h6 class="text-white">Other things</h6>
    <ul class="list-unstyled">
    <li>
      <a class="text-light" href="#">Sign in</a>
    </li>
    <li>
      <a class="text-light" href="#">About</a>
    </li>
    <li>
        <a class="text-light" href="#">data</a>
    </li>
    </ul>
    </div>
    </div>
    <div class="row">
    <div class="col-lg-12 text-right">
      <span class="social-icon ml-2 mr-2">
          <i class="fa fa-linkedin-square" aria-hidden="true"></i>
      </span>
      <span class="social-icon ml-2 mr-2">
          <i class="fa fa-twitter-square" aria-hidden="true"></i>
      </span>
      <span class="social-icon ml-2 mr-2">
          <i class="fa fa-facebook-official" aria-hidden="true"></i>
      </span>
    </div>
    </div>
    </div>`
    const footerTemplate = generic.createHTMLElement(footerEle)
    return footerTemplate
  }
}
