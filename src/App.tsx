import { useState } from "react";
import Home from "./Home";
import Calculator from "./Calculator";

function App() {
  const [homePage, setHomePage] = useState(true);

  const content = homePage ? <Home setHomePage={setHomePage} /> : <Calculator />;

  return (
    // <Home setHomePage={setHomePage} />
    <>{content}</>
  );
}

export default App;
