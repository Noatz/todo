import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import './styles.css';

const Body = ({data, addItem}) => {
  const { project } = useParams();
  const content = data[project];
  if (content === undefined) return <Fragment></Fragment>

  const showHideAddItem = e => {
    const element = document.getElementById("add-item");
    element.style.display = element.style.display === 'none' ? 'block' : 'none';
  }

  const onChange = e => {
    console.log(e.keyCode);
    if (e.keyCode === 13 && e.target.value !== '') {
      document.getElementById("add-item").style.display = 'none';
      addItem(project, e.target.value);
      document.getElementById("add-item-value").value = '';
    }
  }

  return (
    <div style={bodyStyle}>
      <h3>{content.name}</h3>
      {content.items.map((item, i) => {
        return (
          <Fragment key={i}>
            <label>
              <input type="checkbox"/>{item}<br/>
            </label>
            <hr/>
          </Fragment>
        );
      })}

      <div id="add-item" style={{display: 'none'}}>
        <input id='add-item-value' type="text" placeholder="Add item..." onKeyUp={onChange}/>
        <hr/>
      </div>
      <button className="add" onClick={showHideAddItem}>+ Add task</button>
    </div>
  );
}

const bodyStyle = {
  width: '100%',
  height: '100vh',
  padding: '1%',
  borderLeft: '1px solid black',
}

export default Body;