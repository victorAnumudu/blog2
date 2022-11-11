
// importing routes
import Restricted from "./routes/Restricted";
// import Unrestricted from "./routes/Unrestricted";

// import { AuthContext } from "./AuthorizationContext";

function App() {
  // let { isLoggedIn } = AuthContext();
  return (
    // <div className="App">{isLoggedIn ? <Restricted /> : <Unrestricted />}</div>
    <div className="App"><Restricted /></div>

  );
}

export default App;
