
const dataMaster = (state = '', action) => {
  // console.log('Payload : ', action.payload);
  switch(action.type) {
    case 'setDataMaster':
      return { 
        state: action.payload
      }
      break;
    default:
      return state;
  }
  return state;
};
  
export default dataMaster;  