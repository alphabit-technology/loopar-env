import {a, h6, i, span, ul, li, p} from "../elements.js";
import {div} from "../elements.js";
import Component from "../base/component.js";

export default class Tab extends Component {
   block_component = true;
   className = "card card-fluid";

   constructor(props) {
      super(props);
   }

   /*`
   <div className="card">
      <!-- .card-header -->
      <div className="card-header">
        <ul className="nav nav-tabs card-header-tabs">
          <li className="nav-item">
            <a className="nav-link active" data-toggle="tab" href="#card-home">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link show" data-toggle="tab" href="#card-profile">Profile</a>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="#">Disabled</a>
          </li>
        </ul>
      </div><!-- /.card-header -->
      <!-- .card-body -->
      <div className="card-body">
        <!-- .tab-content -->
        <div id="myTabCard" className="tab-content">
          <div className="tab-pane fade active show" id="card-home">
            <h5 className="card-title"> Special title treatment </h5>
            <p className="card-text"> With supporting text below as a natural lead-in to additional content. </p><a href="#" className="btn btn-primary">Go somewhere</a>
          </div>
          <div className="tab-pane fade" id="card-profile">
            <h5 className="card-title"> Special title treatment </h5>
            <p className="card-text"> With supporting text below as a natural lead-in to additional content. </p><a href="#" className="btn btn-danger">Go somewhere</a>
          </div>
        </div><!-- /.tab-content -->
      </div><!-- /.card-body -->
    </div>`*/

   get tabs_links() {
      return [
         {label: "Home", href: "#card-home", active: true},
         {label: "Profile", href: "#card-profile"},
      ]
   }

   get get_tabs() {
      return [
         {
            id: "card-home", active: true, children: [
               h6({className: "card-title"}, "Special title treatment"),
               p({className: "card-text"}, "With supporting text below as a natural lead-in to additional content."),
               a({className: "btn btn-primary"}, "Go somewhere")
            ]
         },
         {
            id: "card-profile", children: [
               h6({className: "card-title"}, "Special title treatment"),
               p({className: "card-text"}, "With supporting text below as a natural lead-in to additional content."),
               a({className: "btn btn-danger"}, "Go somewhere")
            ]
         }
      ]
   }

   render(content = null) {
      return super.render([
         div({className: 'card-header'}, [
            this.tabs_links.map(link => {
               return li({
                  className: "nav-item"
               }, [
                  a({
                     className: "nav-link" + (link.active ? " active" : ""),
                     href: link.href,
                     "data-toggle": "tab"
                  }, link.label)
               ])
            })
         ]),
         div({className: "card-body"}, [
            div({className: "tab-content"}, [
               this.get_tabs.map(tab => {
                  return div({
                     className: "tab-pane fade" + (tab.active ? " active show" : ""),
                     id: tab.id
                  }, [
                     tab.children
                  ])
               })
            ])
         ])
      ]);
   }
}