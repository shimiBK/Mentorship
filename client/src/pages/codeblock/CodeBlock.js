import "./codeblock.css"
import { useEffect, useState , useReducer ,useContext } from "react";
import { useParams } from 'react-router-dom';
import { ACTION_TYPES } from "../../reducer/codeblockActionTypes";
import { INITIAL_STATE, codeblockReducer } from "../../reducer/codeblockReducer";
import {URL} from "../../App"
import socketContext from "../../context/socketContext";
import Loading from '../../components/Loading';
import axios from 'axios';
import CodeMirrorEditor from '../../components/CodeMirrorEditor';
import ScreenFireworks from '../../components/ScreenFireworks';
import { checkSolution } from "../../utils/utils";





const CodeBlock = () => {

    const [state, dispatch] = useReducer(codeblockReducer, INITIAL_STATE);
    const [isTrue,setIsTrue] = useState(false);
    const [role,setRole] = useState("");
    const {codeblock , loading , codeReceived } = state;
    const {socket} = useContext(socketContext);
    const { id } = useParams();



    const sendMessageToRoom = (studentCode) =>{
        const codeOfStudent = studentCode;
        socket.emit("send_code", { id , codeOfStudent } ); // send the student's code to the codeblock room
        //check if the student's code equals to the solution.
        setIsTrue(checkSolution(codeOfStudent,codeblock.solution));
    }


    const onChange = (studentCode) =>{

        dispatch({ type: ACTION_TYPES.UPDATE_CODE, payload: studentCode });
        sendMessageToRoom(studentCode);

    }


 

    useEffect(() => {
      if(socket){
        socket.on("receive_code", (code) => {
        dispatch({ type: ACTION_TYPES.UPDATE_CODE, payload: code.codeOfStudent }); 
      });

    }
    },[socket]);
    
    
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


    useEffect(()=>{
           if (id  && socket) {
            socket.emit("join_codeblock", id );            
            socket.on("role", (newRole) => {
                setRole(newRole);
            });
        }

        return () => {

            if (socket) {
              socket.off("receive_code");
              socket.off("role");
            }
        }

    },[id,socket])
    


    const renderContent = (
        <div className="contentContainer">
            <h1 className="cBlockTitle">{codeblock.title}</h1>
            <h3 className="roleTitle">{`You are on ${role} mode`}</h3>
            <h2 className="codeTask">{codeblock.code}</h2>
            {role==="student" && 
            <div className="editCodeContainer">
              <div className="editorFrame">
              <CodeMirrorEditor value={codeReceived} onChange={onChange} />
              </div>
            </div>}
            {role==="mentor" && 
            <div className="editCodeContainer">
                <div className="editorFrame">
                <CodeMirrorEditor value={codeReceived} onChange={onChange} readOnly/>
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