import React from "react";
import { HashRouter,Route,Routes } from "react-router-dom";

import Dashboard from './Pages/Dashboard/index';
import Section from './Pages/Section/index';

class App extends React.Component {
  render() {
    return (
      <>
      <HashRouter>
        <Routes>
        <Route path="/" exact element={<Dashboard />} />
        <Route path="section/:lessonId" exact element={<Section />} />
        </Routes>
      </HashRouter>
      </>
    );
  }
}

export default App;


