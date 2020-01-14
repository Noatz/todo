import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles.css';
import '../Body/styles.css';

const SideNav = ({data, addProject}) => {

  const showHideAddProject = e => {
    const element = document.getElementById("add-project");
    element.style.display = element.style.display === 'none' ? 'block' : 'none';
  }

  const onChange = e => {
    console.log(e.keyCode);
    if (e.keyCode === 13 && e.target.value !== '') {
      document.getElementById("add-project").style.display = 'none';
      addProject(e.target.value);
      document.getElementById("add-project-value").value = '';
    }
  }

  return (
    <nav>
      <b>Projects</b>
      <hr/>
      <div id="projects">
        {data.map((project, i) => (
          <NavLink key={i} to={`${i}`} className="link-item" activeClassName="link-item-active">
            <h4 className="project-item">{project.name}</h4>
          </NavLink>
        ))}

        <div id="add-project" style={{display: 'none'}}>
          <input id='add-project-value' type="text" placeholder="Add item..." onKeyUp={onChange}/>
        </div>
        <button className="add" onClick={showHideAddProject}>+ Add Project</button>
      </div>
    </nav>
  );
}

export default SideNav;