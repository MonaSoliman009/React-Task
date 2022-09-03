import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/navbar";
import Protected from "./components/protected";
import Practice from "./pages/practice/practice";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Practice} />
          <Protected />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
