import {DeskSidebar} from "/plugins/desk-sidebar.js"
import TopBar from "/src/components/top-bar.js";
import {div, aside, nav, main, header} from "/components/elements.js";
import {http} from "./utils/http.js";
import BaseInterface from "./base-interface.js";

export default class DeskInterface extends BaseInterface {
   constructor(props){
      super(props);
   }

   render(){
      const data = this.data;

      const header_wrapper = header({className: 'app-header app-header-dark'}, [
         div({className: 'top-bar'}, [
            React.createElement(TopBar, {user: data.user, refresh: this.refresh.bind(this)})
         ])
      ]);

      const sidebar =
         aside({className: 'app-aside app-aside-expand-md app-aside-light'}, [
            div({className: 'aside-content'}, [
               div({className: 'aside-menu overflow-hidden'}, [
                  nav({className: 'stacked-menu stacked-menu', id: "stacked-menu"}, [
                     DeskSidebar({
                        data: data,
                        ref: sidebar => this.sidebar = sidebar,
                     })
                  ])
               ]),
               /*footer({className: 'aside-footer border-top p-2'}, [
                  button({
                     className: 'btn btn-light btn-block text-primary',
                     onClick: () => {
                        loopar.toggle_skin();
                     }
                  }, [
                     span({className: 'd-compact-menu-none'}, [
                        "Night Mode",
                        i({className: 'fas fa-moon ml-1'})
                     ])
                  ])
               ])*/
            ])
         ]);

      const container = main({className: 'app-main'}, [
         div({className: 'wrapper'}, [
            ...this.state.children
         ])
      ]);

      const dialogs = this.dialogs;

      return [
         dialogs,
         div({className: "toast-bottom-left", id: "toast-container", style: {position: "fixed", bottom: "0px", left: "0px", right: "0px", zIndex: 999999}},
            this.notifies,
         ),
         header_wrapper,
         sidebar,
         container,
         this.state.open_dialogs > 0 ? div({className: "modal-backdrop fade show"}) : null
      ];
   }

   async refresh(){
      return new Promise(resolve => {
         http.send({
            action: "/core/desk/sidebar",
            params: {},
            success: r => {
               console.log(["refresh", r]);
               this.sidebar.setState({data: {menu_data: r.content.sidebarData}});
               resolve(r);
            }
         });
      });
   }
}