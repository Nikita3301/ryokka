import "./App.css";
import Header from "components/Header";
import Footer from "components/Footer";
import AppRouter from "src/AppRouter";


export default function App() {
  return (

      <div className="flex flex-col h-screen justify-between">
        <div>
          <Header />
        </div>
        <div className="overflow-y-auto bg-gray-700 flex-1">
          <AppRouter />
        </div>
        <div className="bottom-0">
          <Footer />
        </div>
      </div>
  );
}
