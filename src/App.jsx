import React from "react";
import ListComponent from "./Components/ListComponent";

// import "./styles.css";

let obj = [{"name":"main","id":"main"}, [{"name":"Red","id":"red"}, [{"name":"Green","id":"green"}, {"name":"Blue","id":"blue"}, [{"name":"Yellow","id":"yellow"}, {"name":"Black","id":"black"}], {"name":"White","id":"white"}, {"name":"Orange","id":"orange"}]]]
class App extends React.Component {
  render() {
    return (
      <>
        <div className="list">
          <input type="text" className="input" placeholder="Add items in your list" />
          <span className="add">+</span>
        </div>
        <ListComponent list={obj} />
      </>
    );
  }
}

export default App;
