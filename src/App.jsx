import React from "react";
import { HashRouter,Route,Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Product from './Pages/Product/index';
import Section from './Pages/Section/index';

class App extends React.Component {
  render() {
    return (
      <>
      <HashRouter>
        <Routes>
        <Route path="/" exact element={<Dashboard />} />
        <Route path="/product/:productId" exact element={<Product />} />
        <Route path="section/:sectionId" exact element={<Section />}>
            <Route path=":resourceId" element={<Section />} />
          </Route>
        </Routes>
      </HashRouter>
      </>
    );
  }
}

export default App;


