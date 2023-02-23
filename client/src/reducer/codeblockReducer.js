import { ACTION_TYPES } from "./codeblockActionTypes";

export const INITIAL_STATE = {
    loading: false,
    codeblock:'',
    CodeReceived:'',
    error: false,
  };

  export const codeblockReducer = (state , action) =>{
    switch(action.type){
        case ACTION_TYPES.FETCH_START:
            return {
                loading:true,
                error:false,
                codeblock:'',
                CodeReceived:'',
            }
            case ACTION_TYPES.FETCH_SUCCESS:
                return {
                    ...state,
                    loading:false,
                    codeblock:action.payload,
                    CodeReceived:'',
                }
                case ACTION_TYPES.FETCH_ERROR:
                    return {
                        error:true,
                        loading:false,
                        codeblock: '',
                        CodeReceived:'',
                    }
                case ACTION_TYPES.UPDATE_CODE:
                    return {
                            ...state,
                            CodeReceived:action.payload
                        }

            default:
                return state;
    }

  };
  