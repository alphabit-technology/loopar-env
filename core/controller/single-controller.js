'use strict'

import {loopar} from "../loopar.js";
import CoreController from './core-controller.js';

export default class BaseController extends CoreController {
   //layout = "desk";
   default_action = 'list';
   has_sidebar = true;

   constructor(props) {
      super(props);
   }

   async action_list() {
      const list = await loopar.get_list(this.document);

      return this.render(list);
   }

   async action_create() {
      const document = await loopar.new_document(this.document, this.data);

      if (this.has_data()) {
         await document.save();
         this.redirect('update?document_name=' + document.name);
      } else {
         Object.assign(this.response, await document.__data__());
         this.response.app = 'form';

         return this.render(this.response);
      }
   }

   async action_update() {
      const document = await loopar.get_document(this.document, this.document_name, this.has_data() ? this.data : null);

      if (this.has_data()) {
         await document.save();
         return await this.success(`Document ${document.name} saved successfully`, {document_name: document.name});
         //return this.render({success: true, message:  `Document ${document.name} saved successfully`, document_name: document.name});
      } else {
         Object.assign(this.response, await document.__data__());
         this.response.app = 'form';

         return this.render(this.response);
      }
   }

   async action_view() {
      console.log(["base controller acton vie"])
      const document = await loopar.get_document(this.document, this.document_name);

      return this.render(document);
   }

   async action_delete() {
      const document = await loopar.get_document(this.document, this.document_name);
      const result = await document.delete();

      this.res.send(result);
   }

   async success(message, options={}) {
      return await this.render({success: true, message: message, ...options});
   }

   async error(message, options={}) {
      return await this.render({success: false, message: message, ...options});
   }
}