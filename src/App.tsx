import React, { createContext, useState } from "react";
import { LoginBasePage } from "./pages/LoginBasePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const AuthContext = createContext({});

function App() {
  const [auth, setAuth] = useState({});
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <AuthContext.Provider value={{ auth, setAuth }}>
        <div className="App">
          <LoginBasePage />
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <ReactQueryDevtools initialIsOpen={false} />
        </div>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
