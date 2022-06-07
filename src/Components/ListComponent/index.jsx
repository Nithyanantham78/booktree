import React from 'react';
import {useParams} from 'react-router-dom';
import './index.css';
import Box from '@material-ui/core/Box';
import {Link} from 'react-router-dom';

export default function ListComponent(props) {
  let params = useParams();

  let dragged;
  let id;
  let index;
  let indexDrop;
  let list;

  document.addEventListener("dragstart", ({ target }) => {
  	dragged = target;
  	id = target.id;
  	list = target.parentNode.children;
  	for (let i = 0; i < list.length; i += 1) {
  		if (list[i] === dragged) {
  			index = i;
  		}
  	}
  });

  document.addEventListener("dragover", (event) => {
  	event.preventDefault();
  });

  document.addEventListener("drop", ({ target }) => {
  	if (target.className === "dropzone" && target.id !== id) {
  		dragged.remove(dragged);
  		for (let i = 0; i < list.length; i++) {
  			if (list[i] === target) {
  				indexDrop = i;
  			}
  		}
  		if (index > indexDrop) {
  			target.before(dragged);
  		} else {
  			target.after(dragged);
  		}
  	}
  });
  return (
    <Box>
      <ol className={`${props.first ? 'wtree' : ''}`}>
        {props.list &&
          props.list.length &&
          props.list.map((el, i) => {
            if (el.childNodes && el.childNodes.length) {
              return (
                <li key={`${el.urn}_${el.name}`} id={el.urn} className='li_flex'>
                  <span>
                    {el.name}
                    {(el.type!=='LESSON' && el.type!=='RESOURCE')&&<i className='fa fa-plus' style={{ marginLeft: 'auto',cursor:"pointer" }}
                    onClick={() => {props.addDataToList(el.type,props.indexOfList,el)}}></i>}
                  </span>
                  <ListComponent
                    key={`${el.type}_${el.urn}_${new Date().getMilliseconds()}`}
                    list={el.childNodes}
                    first={false}
                    indexOfList={el.type===1?i:props.indexOfList}
                    addDataToList={props.addDataToList}
                    fetchResource={props.fetchResource}
                  />
                </li>
              );
            }
            return (
              (el.type!=='LESSON' && el.type!=='RESOURCE')?<li key={`${el.urn}_${new Date().getMilliseconds()}`} id={el.urn} className='li_flex'
              >
                <span>
                  {el.name}
                  <i className='fa fa-plus' style={{ marginLeft: 'auto',cursor:"pointer"}} onClick={() => {props.addDataToList(el.type,props.indexOfList,el)}}></i>
                </span>
              </li>:el.type!=='RESOURCE'?<Link to={`/section/${el.urn}`}><li key={`${el.urn}_${new Date().getMilliseconds()}`} id={el.urn} className='li_flex'
              >
                <span>
                  {el.name}
                </span>
              </li></Link>:<Link to={`/section/${params.sectionId}/${el.urn}`}><li draggable="true" key={`${el.type}_${el.urn}_${new Date().getMilliseconds()}`} id={el.urn} className='dropzone li_flex'
              onClick={()=>{props.fetchResource(el)}}
              >
                <span>
                  {el.name}
                </span>
              </li></Link>
            );
          })}
      </ol>
    </Box>
  );
}
