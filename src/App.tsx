import Routers from "./routers/Routers";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      <Routers />
      <ToastContainer
        className="z-50"
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </>
  );
}

export default App;
