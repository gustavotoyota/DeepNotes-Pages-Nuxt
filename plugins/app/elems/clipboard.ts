import { Context } from "@nuxt/types"




export type {
  IAppClipboard,
}




interface IAppClipboard {
  copy(): void;
  paste(text: string): void;
  cut(): void;
}




export const init = ({ $app }: Context): IAppClipboard => {
  return new class implements IAppClipboard {
    copy() {
    }
    
    
    
    
    async paste(text: string) {
    }
    
    
    
    
    cut() {
    }
  }
}