import { ACTION_TYPES } from "./codeblockActionTypes";


export const INITIAL_STATE = {
    loading: false,
    codeBlocks:[],
    error: false,
  };


  export const codeBlocksReducer = (state , action) =>{
    switch(action.type){
        case ACTION_TYPES.FETCH_START:
            return {
                loading:true,
                error:false,
                codeBlocks:[]
            }
            case ACTION_TYPES.FETCH_SUCCESS:
                return {
                    ...state,
                    loading:false,
                    codeBlocks:action.payload,
                }
                case ACTION_TYPES.FETCH_ERROR:
                    return {
                        error:true,
                        loading:false,
                        codeBlocks: [],
                    }

            default:
                return state;
    }

  };