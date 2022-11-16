// const initialState = {
//   dataFavorite: []
// }

const dataFavorite = (state = [], action) => {
  // console.log('Payload : ', action.payload);
  switch(action.type) {
    case 'setData':
      return { 
        state: action.payload
      }
      break;
    // case 'addItem':
    //   return { 
    //     ...state,
    //     dataFavorite: [...state.dataFavorite, action.payload]
    //   }
    //   break;
    default:
      return state;
  }
  return state;
};
  
export default dataFavorite;  