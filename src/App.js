import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import SideNav from './components/SideNav';
import Body from './components/Body';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const data = [
      {name: 'Home', items: ['Clean kitchen', 'Feed dogs']},
      {name: 'Work', items: ['Send invoice', 'Prepare for daily standup']},
      {name: 'Hustle', items: []}
    ]
    setData(data);
  }, []);

  const addProject = (projectName) => {
    setData(prev => {
      return [...prev, {name: projectName, items: []}];
    });
  }

  const addItem = (i, item) => {
    setData(prev => {
      prev[i] = {name: prev[i].name, items: prev[i].items.concat([item])};
      return [...prev];
    });
  }

  const editItem = (i, j, changedValue) => {
    setData(prev => {
      prev[i].items[j] = changedValue;
      return [...prev];
    });
  }

  const deleteItem = (e, i, j) => {
    setData(prev => {
      prev[i].items.splice(j, 1);
      return [...prev];
    });
  }

  return (
    <Router>
      <div style={style}>
        <SideNav data={data} addProject={addProject}/>
        <Switch>
          <Route path="/:project">
            <Body data={data} addItem={addItem} editItem={editItem} deleteItem={deleteItem}/>
          </Route>
          <Route path="*">
            <Redirect to="/0"/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const style = {
  display: "flex"
}

export default App;