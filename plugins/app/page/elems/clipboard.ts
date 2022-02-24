import { Context } from "@nuxt/types"
import { AppPage } from "../page"




export {
  AppClipboard,
}




class AppClipboard {
  page: AppPage




  constructor(page: AppPage) {
    this.page = page
  }




  copy() {
  }
  
  
  
  
  async paste(text: string) {
  }
  
  
  
  
  cut() {
  }
}