import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import './styles.css';

const Body = ({data, addItem, editItem, deleteItem}) => {
  const { project } = useParams();
  const content = data[project];
  if (content === undefined) return <Fragment>Something went wrong?!</Fragment>

  const showHideAddItem = e => {
    const element = document.getElementById("add-item");
    element.style.display = element.style.display === 'none' ? 'block' : 'none';
  }

  const onChangeAddItem = e => {
    if (e.keyCode === 13 && e.target.value !== '') {
      document.getElementById("add-item").style.display = 'none';
      addItem(project, e.target.value);
      document.getElementById("add-item-value").value = '';
    }
  }

  const showHideEditItem = (e, i) => {
    const elementLabel = document.getElementById(`item-label-${i}`);
    elementLabel.style.display = elementLabel.style.display === 'none' ? 'block' : 'none';
    const elementInput = document.getElementById(`item-input-${i}`);
    elementInput.style.display = elementInput.style.display === 'none' ? 'block' : 'none';
    elementInput.value = content.items[i];
  }

  const onChangeEditItem = (e, i) => {
    if (e.keyCode === 13 && e.target.value !== '') {
      document.getElementById(`item-input-${i}`).style.display = 'none';
      document.getElementById(`item-label-${i}`).style.display = 'block';
      editItem(project, i, e.target.value);
    }
  }

  return (
    <div style={bodyStyle}>
      <h3>{content.name}</h3>
      {content.items.map((item, i) => {
        return (
          <Fragment key={i}>
            <div id='checkbox-div'>
              <div style={{display: 'flex'}}>
                <input id={`${project}-${i}`} type="checkbox"/>
                <label htmlFor={`${project}-${i}`} id={`item-label-${i}`}>{item}</label>
                <input id={`item-input-${i}`} type="text" style={{display: 'none'}} onKeyUp={e => onChangeEditItem(e, i)}/>
              </div>
              <div style={{display: 'flex'}}>
                <button className='edit-btn' onClick={e => showHideEditItem(e, i)}>Edit</button>
                <button className='edit-btn' onClick={e => deleteItem(e, project, i)}>Delete</button>
              </div>
            </div>
            <hr/>
          </Fragment>
        );
      })}

      <div id="add-item" style={{display: 'none'}}>
        <input id='add-item-value' type="text" placeholder="Add item..." onKeyUp={onChangeAddItem}/>
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