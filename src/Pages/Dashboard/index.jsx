import React,{useEffect,useState,useContext} from 'react';
import {ListContext} from '../../context/ListContext';
import ListComponent from "../../Components/ListComponent";
import axios from 'axios';



function Dashboard(){
    const [list,setList] = useContext(ListContext);

    useEffect(()=>{
        axios.get(`/mockdata/tree.json`).then((res)=>{
            setList(res.data.childNodes);
        })
    },[]);

    return <div className="container">Dashboard
        {list.length&&<ListComponent list={list} first={'parent'} addProduct={(event)=>{
            list[0].childNodes[0].childNodes[0].childNodes.push({
                "urn": "629025625367abcfc6bf189de",
                "unitUrn": "dqic:permission:20b06ded-15cd-4d58-a411-1299a1dae2ee",
                "type": 7,
                "name": "LESSON IV",
                "ParentNode": false,
                "childNodes": []
            })
            setList([...list])}}/>}
    </div>;
}

export default Dashboard;