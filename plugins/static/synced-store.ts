import { SyncedText } from "@syncedstore/core";




export {
  StaticSyncedStore,
};




class StaticSyncedStore {
  cloneText(text: SyncedText) {
    const clone = new SyncedText()
    
    clone.applyDelta(text.toDelta())

    return clone
  }
}