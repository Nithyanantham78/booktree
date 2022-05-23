import React from 'react';


export default function ListComponent(props){
	return <ul>
		{props.list&&props.list.length&&props.list.map((el,i)=>{
			if(Array.isArray(el)){
				return <ListComponent key={new Date().getMilliseconds()} list={el}/>
			}
			return <li className="dropzone" draggable="true" id={el.id} key={el.id}>{el.name}</li>
		})}
	</ul>
}


// Code By Webdevtrick ( https://webdevtrick.com )
let dragged;
let id;
let index;
let indexDrop;
let list;

  document.addEventListener("dragstart", ({target}) => {
      dragged = target;
      id = target.id;
      list = target.parentNode.children;
      for(let i = 0; i < list.length; i += 1) {
      	if(list[i] === dragged){
          index = i;
        }
      }
  });

  document.addEventListener("dragover", (event) => {
      event.preventDefault();
  });

  document.addEventListener("drop", ({target}) => {
   if(target.className === "dropzone" && target.id !== id) {
       dragged.remove( dragged );
      for(let i = 0; i < list.length; i += 1) {
      	if(list[i] === target){
          indexDrop = i;
        }
      }
      console.log(index, indexDrop);
      if(index > indexDrop) {
      	target.before( dragged );
      } else {
       target.after( dragged );
      }
    }
  });