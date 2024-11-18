import "bootstrap/dist/css/bootstrap.min.css";
import { Suspense, useEffect, useState } from "react";
import { Loading } from "./components/Loading.jsx";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { socket } from "./utils/socket.js";
import { ConnectionState } from "./components/ConnectionState.jsx";
import { MyForm } from "./components/MyForm.jsx";
import { showSuccessToast } from "./helpers/toastMessages.js";
import { ToastContainer } from "react-toastify";

// eslint-disable-next-line react/prop-types
export const PageWithHeader = ({ children }) => (
  <div className="flex h-full flex-col">{children}</div>
);

export const App = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("message", (msg) => {
      console.log("my message", msg);
      showSuccessToast(msg, 10000);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("message");
    };
  }, []);
  function onConnect() {
    setIsConnected(true);
  }

  function onDisconnect() {
    setIsConnected(false);
  }
  console.log(isConnected);

  return (
    <Suspense
      fallback={
        <PageWithHeader>
          <Loading name="suspense" />
        </PageWithHeader>
      }
    >
      <div className="h-full dark:bg-black lg:p-4">
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        hello there
        <ConnectionState isConnected={isConnected} />
        <MyForm />
      </div>
    </Suspense>
  );
};
