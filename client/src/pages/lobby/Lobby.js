import "./lobby.css";
import React, { useEffect, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { ACTION_TYPES } from "../../reducer/codeblockActionTypes";
import { INITIAL_STATE, codeBlocksReducer } from "../../reducer/codeblocksReducer";
import Loading from "../../components/Loading";
import { URL } from "../../App";



const Lobby = () => {

    const [state, dispatch] = useReducer(codeBlocksReducer, INITIAL_STATE);

    const history = useHistory();

    const handleClick = async (codeBlockId) =>{

            history.push(`/codeblocks/${codeBlockId}`);
        }


    useEffect(()=>{
        
        const getCodeblocks = async () =>{
            
            dispatch({ type: ACTION_TYPES.FETCH_START});
            try {
                const res = await axios.get(`${URL}/api/codeblocks`);
                dispatch({ type: ACTION_TYPES.FETCH_SUCCESS, payload: res.data })
                             
            } catch (error) {
                dispatch({ type: ACTION_TYPES.FETCH_ERROR });
                console.log(error);
            }
        }

        getCodeblocks();

    },[]);




  return (
    <>
    <div className="lobby">
        <div className="titlesContainer">
            <h1 className="upperTitle">Welcome to Mentorship</h1>
            <h2 className="bottomTitle">Choose Code Block</h2>
        </div>
        {state.loading ? <Loading/> :
            <div className="listContainer">
                <ul className="list">
                    {state.codeBlocks.map((codeBlock) => (
                        <li key={codeBlock.id}>
                            <button className="cBlockBtn" onClick={() => handleClick(codeBlock.id)}>
                                {codeBlock.title}
                            </button>
                        </li>
                    ))}
                 </ul>
            </div>}
     </div>
    </>
  )
}

export default Lobby