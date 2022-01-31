import { v4 as uuidv4 } from 'uuid'




const elems = {}
export default elems




elems.create = (type) => {
  return {
    id: uuidv4(),

    type: type,
  }
}