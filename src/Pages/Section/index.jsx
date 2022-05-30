import React from 'react';
import {useParams} from 'react-router-dom';

function Section(){
    let params = useParams();
    console.log('section',params)

    return <div>{params.lessonId}</div>
}


export default Section;