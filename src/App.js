import "./App.css";
import React from "react";
import Visual from "./components/Visual";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Tutorial from "./components/Tutorial";

function App() {
  return (
    <div className="body">
      <Header />
      <main className="main">
        <Visual />
      </main>
      <Footer />
      <Tutorial />
    </div>
  );
}

export default App;
