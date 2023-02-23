import React from 'react'
import "./codeblock.css"
import { useEffect, useState , useReducer ,useContext } from "react";
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { ACTION_TYPES } from "../../reducer/codeblockActionTypes";
import { INITIAL_STATE, codeblockReducer } from "../../reducer/codeblockReducer";
import {URL} from "../../App"
import roleContext from "../../context/roleContext";
import socketContext from "../../context/socketContext";
import roomContext from "../../context/roomContext";
import Loading from '../../components/Loading';
import axios from 'axios';
import CodeMirrorEditor from '../../components/CodeMirrorEditor';
import ScreenFireworks from '../../components/ScreenFireworks';




const CodeBlock = () => {

    const [state, dispatch] = useReducer(codeblockReducer, INITIAL_STATE);
    const [isTrue,setIsTrue] = useState(false);
    const {codeblock , loading , CodeReceived} = state;
    const {role} = useContext(roleContext);
    const {socket} = useContext(socketContext);
    const {room} = useContext(roomContext);
    const { id } = useParams();
    const history = useHistory();

    const onChange = (value) =>{
        const newVal = value;
        dispatch({ type: ACTION_TYPES.UPDATE_CODE, payload: newVal });
        sendToMentor(value);
    }


    
    const sendToMentor = (value) =>{
        const code = value;
        socket.emit("send_message", { room , code} ); // send the student's code to the codeblock room
        //check if the student's code equals to the solution.
        checkSolution(code);

    }

    const checkSolution = (code) =>{
      
              if(code.trim() === state.codeblock.solution.trim()){
            setIsTrue(true);
        }

    }


    useEffect(() => {
      if(socket){

        const socketSubscription = socket.on("receive_message", (message) => {
        dispatch({ type: ACTION_TYPES.UPDATE_CODE, payload: message.code }); 
      });

      return () => {
        socketSubscription.off("receive_message");
      };
    }

      else{
        history.push('/');
      }
    }, [socket,history]);
    
    
    useEffect(()=> {
 
        const getCodeblock = async () =>{
            
            dispatch({ type: ACTION_TYPES.FETCH_START});
            try {
                const res = await axios.get(`${URL}/api/codeblocks/${id}`);
                dispatch({ type: ACTION_TYPES.FETCH_SUCCESS, payload: res.data })
            } catch (error) {
                dispatch({ type: ACTION_TYPES.FETCH_ERROR });
            }
        }
            getCodeblock();
          

    },[id])


    const renderContent = (
        <div className="contentContainer">
            <h1 className="cBlockTitle">{codeblock.title}</h1>
            <h3 className="roleTitle">{`You are on ${role} mode`}</h3>
            <h2 className="codeTask">{codeblock.code}</h2>
            {role==="student" && 
            <div className="editCodeContainer">
              <div className="editorFrame">
              <CodeMirrorEditor onChange={onChange} />
              </div>
            </div>}
            {role==="mentor" && 
            <div className="editCodeContainer">
                <div className="editorFrame">
                <CodeMirrorEditor value={CodeReceived} onChange={onChange} readOnly/>
                  </div>
             </div>}
            {isTrue && 
        <div className="successContainer">
            <ScreenFireworks/>
            <h3 className="sucessNote">Good Job!</h3>
            </div>}
        </div>
    )
    
    return (
        <div className="codeblock">
            {loading ?
            <Loading/> :
            renderContent
            }
        </div>
          )
    }
        

export default CodeBlock;