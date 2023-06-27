import {div, span, button, ul, li, a, image, section, hr, h5, p} from "/components/elements.js";
import BaseInterface from "./base-interface.js";
import {loopar} from "/loopar.js";

export default class WebInterface extends BaseInterface {
   constructor(props){
      super(props);
   }

   render(){
      const data = this.data;
      const menu_data = data.menu_data.__DOCUMENT__;
      const web_app = data.web_app.__DOCUMENT__;
      const menu_items = menu_data.menu_items.rows;
      const user = data.user;

      let user_info = []

      if(user){
         user_info = [
            div({className: "col-lg-4 col-md-6 mb-4 mb-lg-0"}, [
               div({className: "card border-0 shadow"}, [
                  div({className: "card-body p-5"}, [
                     div({className: "media align-items-center"}, [
                        div({className: "icon icon-shape icon-shape-primary rounded-circle mr-4"}, [
                           span({className: "oi oi-person"})
                        ]),
                        div({className: "media-body"}, [
                           h5({className: "mb-0"}, user.name),
                           p({className: "text-small text-muted mb-0"}, user.email)
                        ])
                     ])
                  ])
               ])
            ])
         ]
      }else{

      }

      console.log("web app user", user);

      const cover_style = {
         position: menu_data.fixed ? "fixed" : "unset",
         display: menu_data.fixed ? "block" : "none",
         width: "100%",
         height: 90,
         zIndex: "888888",
         backgroundColor: menu_data.opacity ? "var(--light)" : "transparent",
         opacity: menu_data.opacity ? 0.7 : 1,
      };

      const menu_style = {
         position: menu_data.fixed ? "fixed" : "unset",
         width: "100%",
         zIndex: "999999",
      };

      return [
         div({className: "toast-bottom-left", id: "toast-container", style: {position: "fixed", bottom: "0px", left: "0px", right: "0px", zIndex: 999999}},
            this.notifies,
         ),
         div({style: cover_style}),
         div({className: "navbar navbar-expand-lg navbar-light py-4 aos-init aos-animate", style: menu_style}, [
            div({className: "container"}, [
               button({className: "hamburger hamburger-squeeze hamburger-light d-flex d-lg-none", type: "button", "data-toggle": "collapse", "data-target": "#navbarNavDropdown", "aria-controls": "navbarNavDropdown", "aria-expanded": "false", "aria-label": "Toggle navigation"}, [
                  span({className: "hamburger-box"}, [
                     span({className: "hamburger-inner"})
                  ])
               ]),
               a({className: "navbar-brand ml-auto mr-0"}, [
                  image({src: "/assets/images/logo.svg", alt: "Logo", className: "img-fluid", width: "120px"})
               ]),
               div({className: "ml-auto order-lg-2"}, [
                  user ? a({className: "navbar-btn btn btn-subtle-success ml-auto order-lg-2", href: "/desk", redirect: true}, "Desk") :
                     a({className: "navbar-btn btn btn-subtle-success ml-auto order-lg-2", href: "/auth/login/login", redirect: true}, "Login"),

                  a({className: "navbar-btn btn btn-subtle-secondary ml-auto order-lg-2", onClick: () => {
                     loopar.toggle_skin();
                     this.setState({});
                  }}, span({className: `oi oi-${window.theme === "dark" ? "sun" : "moon"}`})),
               ]),
               div({className: "collapse navbar-collapse pl-3", id: "navbarNavDropdown"}, [
                  ul({className: "navbar-nav"}, [
                     menu_items.map((item) => {
                        const active = item.menu_link === loopar.current_page_name;
                        return li({className: `nav-item mr-lg-2 ${active ? "active" : ""}`, ref: self => this[item.menu_link] = self}, [
                           a({className: "nav-link py-2", href: "#", onClick: () => {
                              this.navigate(item.menu_link);
                           }}, item.menu_link)
                        ]);
                     })
                  ])
               ])
            ])
         ]),

         [...this.state.children],
         section({className: "py-5 bg-black", ref: footer => this.footer = footer}, [
            web_app.has_footer ? div({className: "container"}, [
               React.createElement("div", this.innerHtml(marked.parse(web_app.footer || ""))),
            ]) : null,
            web_app.has_copyright ? div({className: "container container-fluid-xl"}, [
               hr({className: "my-4"}),
               React.createElement("div", this.innerHtml(marked.parse(web_app.copyright || "")))
            ]) : null,
         ])
      ];
   }

   navigate(url){
      loopar.navigate(url);
      loopar.current_page_name = url;
      this.setState({});
   }

   make(){
      super.make();
      Object.values(this.footer.node.getElementsByTagName("a")).forEach(a => {
         a.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();

            this.navigate(a.href.split("/").pop());
         });
      });
   }

   onUpdate(){
      super.onUpdate();
      const menu_items = this.data.menu_data.__DOCUMENT__.menu_items.rows;

      menu_items.forEach(item => {
         this[item.menu_link].node.classList.remove("active");
      });

      this[loopar.current_page_name] && this[loopar.current_page_name].node.classList.add("active");
   }
}