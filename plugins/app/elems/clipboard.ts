import { Context } from "@nuxt/types"




interface IAppClipboard {
  copy(): void;
  paste(text: string): void;
  cut(): void;
}

export type {
  IAppClipboard,
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