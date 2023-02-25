import { Route,Switch } from "react-router-dom";
import "./App.css";
import Lobby from "./pages/lobby/Lobby";
import io from "socket.io-client";
import CodeBlock from "./pages/codeblock/CodeBlock";
import { useEffect, useState } from "react";
import socketContext from "./context/socketContext";

export const URL = process.env.REACT_APP_SERVER_URL;
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io(SOCKET_URL));

  }, []);

  return (
    <div className="App">
      <socketContext.Provider value={{ socket }}>
            <Switch>
            <Route path="/" exact>
              <Lobby />
            </Route>
            <Route exact path="/codeblocks/:id" >
              <CodeBlock/> 
            </Route>
            </Switch>
      </socketContext.Provider>
    </div>
  );
}

export default App;
