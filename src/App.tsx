import Home from "./Home";
import Calculator from "./Calculator";
import Result from "./Result";
import BirthdayStore from "./BirthdayStore";
import { observer } from "mobx-react-lite";

const App = observer(() => {
  const { page } = BirthdayStore || {};

  let content = <Home />;
  if (page === "calculator") content = <Calculator />;
  if (page === "results") content = <Result />;

  return content;
});

export default App;
