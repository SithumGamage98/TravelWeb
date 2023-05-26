import axios from "axios";
import Router from "./Router";
import { AuthContextProvider } from "./Components/userManagement/authentication/UserContext";

axios.defaults.withCredentials = true;

const App = () => {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
};

export default App;
