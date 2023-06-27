import {loopar} from "./loopar.js";
export class Sesion{
   constructor(){}

   set(key, value, resolve){
      loopar.server.req.session[key] = value;

      loopar.server.req.session.save(err =>{
         err && loopar.throw(err);
         resolve();
      });
   }
}