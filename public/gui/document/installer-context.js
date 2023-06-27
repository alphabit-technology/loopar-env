import {BaseDesk} from "/apps/base-desk.js";

export default class InstallerContext extends BaseDesk {
   is_desk_app = false;
   context = 'form';

   constructor(options) {
      super(options);

      this.make();
   }

   make(){
      super.make();
      this.render();
   }

   render() {
      super.render();
   }

   async install() {
      await this.send("install");
   }

   async connect() {
      await this.send("connect");
   }
}