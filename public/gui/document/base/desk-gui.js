import {div} from "/components/elements.js";
import {Header} from "/plugins/header.js";
import BaseDocument from "./base-document.js";

export default class BaseDesk extends BaseDocument {
   className = "page has-sidebar has-sidebar-open";
   sidebar_open = false;
   is_desk_app = true;
   has_header = true;

   constructor(props) {
      super(props);
   }

   render(content=[]) {
      const data = this.data;

      return super.render([
         div({className: 'page-inner page-inner-fill', style: {marginRight: "unset"}}, [
            div({className: 'message'}, [
               (this.is_desk_app && this.has_header)? div({className: 'message-header', style: {width: "200%"}}, [
                  Header({data: data, app: this}),
               ]) : null,
               div({className: 'message-body'}, [
                  ...super.__CONTENT__(content)
               ])
            ])
         ]),
         this.has_sidebar ?
            div(
               div({
                  className: 'page-sidebar sidebar-dar-primary d-none',
                  style: {position: "absolute", transition: "unset"},
                  ref: (self) => this.sidebar = self
               }, [
                  div({className: "nav nav-tabs nav-fill", ref: (self) => this.sidebar_header = self}),
                  div({className: "sidebar-section-fill", ref: (self) => this.sidebar_content = self})
               ])
            ): null
      ]);
   }

   toggle_sidebar(show = null) {
      const open = this.sidebar_open = show !== null ? show : !this.sidebar_open;

      this.sidebar[(open ? "remove" : "add") + "_class"]("d-none");
   }
}