import { Route,Switch } from "react-router-dom";
import "./App.css";
import Lobby from "./pages/lobby/Lobby";
import io from "socket.io-client";
import CodeBlock from "./pages/codeblock/CodeBlock";
import { useEffect, useState } from "react";
import roomContext from "./context/roomContext";
import roleContext from "./context/roleContext";
import socketContext from "./context/socketContext";

export const URL = process.env.REACT_APP_SERVER_URL;
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

function App() {
  const [socket, setSocket] = useState(null);
  const [room, setRoom] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    setSocket(io(SOCKET_URL));

  }, []);

  return (
    <div className="App">
      <socketContext.Provider value={{ socket }}>
        <roleContext.Provider value={{ role, setRole }}>
          <roomContext.Provider value={{ room, setRoom }}>
            <Switch>
            <Route path="/" exact>
              <Lobby />
            </Route>
            <Route path="/codeblock/:id">
              <CodeBlock/> 
            </Route>
            </Switch>
          </roomContext.Provider>
        </roleContext.Provider>
      </socketContext.Provider>
    </div>
  );
}

export default App;
