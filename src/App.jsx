import "./App.css";
import Header from "components/Header";
import Footer from "components/Footer";
import AppRouter from "src/AppRouter";
import { BrowserRouter } from "react-router-dom";
import ToastInit from "./components/ToastInit";

export default function App() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <BrowserRouter>
        <div>
          <Header />
        </div>
        <div className="overflow-y-auto bg-neutral-950 flex-1">
          <AppRouter />
        </div>
        <div className="bottom-0">
          <Footer />
        </div>
        <ToastInit/>
      </BrowserRouter>
    </div>
  );
}


