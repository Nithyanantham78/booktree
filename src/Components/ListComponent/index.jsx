import React from 'react';
import './index.css';


export default function ListComponent(props) {
	// let dragged;
	// let id;
	// let index;
	// let indexDrop;
	// let list;

	// document.addEventListener("dragstart", ({ target }) => {
	// 	dragged = target;
	// 	id = target.id;
	// 	list = target.parentNode.children;
	// 	for (let i = 0; i < list.length; i += 1) {
	// 		if (list[i] === dragged) {
	// 			index = i;
	// 		}
	// 	}
	// });

	// document.addEventListener("dragover", (event) => {
	// 	event.preventDefault();
	// });

	// document.addEventListener("drop", ({ target }) => {
	// 	if (target.className === "dropzone" && target.id !== id) {
	// 		dragged.remove(dragged);
	// 		for (let i = 0; i < list.length; i++) {
	// 			if (list[i] === target) {
	// 				indexDrop = i;
	// 			}
	// 		}
	// 		if (index > indexDrop) {
	// 			target.before(dragged);
	// 		} else {
	// 			target.after(dragged);
	// 		}
	// 	}
	// });
	return <ol className={`${props.first ? 'wtree' : ''}`}>
		{props.list && props.list.length && props.list.map((el, i) => {
			if (el.childNodes && el.childNodes.length) {
				return <li key={`${el.urn}_${el.name}`} id={el.urn} className="li_flex">
					<span>{el.name}
						<i className="fa fa-plus" style={{ "marginLeft": "auto" }}  onClick={()=>props.addProduct("data")}></i>
					</span>
					<ListComponent key={i} list={el.childNodes} first={false} addProduct={props.addProduct}/>
				</li>
			}
			return <li key={`${el.urn}_${new Date().getMilliseconds()}`} id={el.urn} className="li_flex">
				<span>{el.name}
					<i className="fa fa-plus" style={{ "marginLeft": "auto" }}></i>
				</span>
			</li>;
		})}
	</ol>
}

