import React from "react";
import { HashRouter,Route,Routes } from "react-router-dom";

import Dashboard from './Pages/Dashboard/index';

class App extends React.Component {
  render() {
    return (
      <>
      <HashRouter>
        <Routes>
        <Route path="/" exact element={<Dashboard />} />
        </Routes>
      </HashRouter>
      </>
    );
  }
}

export default App;


