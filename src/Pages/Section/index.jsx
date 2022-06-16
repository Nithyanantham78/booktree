import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ListComponent from '../../Components/ListComponent';
import AddForm from '../../Components/AddForm';
import LoadingSpinner from '../../Components/Loader';
import { typeOfTree } from '../../Config/config'
import { urlConfig } from '../../Config/urlConfig'

function Section() {
    let params = useParams();
    const [list, setList] = useState([]);
    const [title, setTitle] = useState('');
    const [lessonStatus, setLessonStatus] = useState('');
    const [selectedProduct, setSelectedProduct] = useState({ urn: null });
    const [resource, setResource] = useState('');
    const [apiStatus, setApiStatus] = useState('Pending');
    const [text, setText] = useState();
    const [authorReferenceDto, setAuthorReferenceDto] = useState();

    useEffect(() => {
        axios.get(`api/lesson/${params.sectionId}`).then((res) => {
            setList(res.data.childNodes);
            setAuthorReferenceDto(res.data.authorReferenceDto);
            setLessonStatus(res.data.status)
            setApiStatus('success');
            setSelectedProduct(res.data)
        })
    }, [params.sectionId]);

    useEffect(() => {
        setText('')
    }, [selectedProduct.urn]);
    
    let addDataToList = async (title, index, data) => {
        setResource('')
        setTitle(typeOfTree[title]);
        setSelectedProduct(data);
        setText(data.name)
    }

    let fetchResource = async (resource) => {
        setApiStatus('Pending');
        setText('');
        setTitle('RESOURCE')
        setSelectedProduct(resource);
        await axios.get(`api/resource/${resource.urn}`).then((res) => {
            setResource(res.data);
            setApiStatus('success');
            if (res.data.content && res.data.content["field1"]) {
                setText(res.data.content.field1);
            }
        })

    }

    let submitForm = async (data, type) => {
        setApiStatus('Pending');
        // console.log(data,type);
        // return false;
        if (type === "SECTION") {
            let payload = {
                "name": data.name,
                "new": true,
                "parentUrn": selectedProduct.urn,
                "persisted": true,
                "resourceType":data.resourceType,
                "type": "RESOURCE",
                "content": {
                    "field1": data.name
                }
            }
            setList([]);
            let res = await axios.post(urlConfig['Create'][title], payload)
            
            if (res) {
                axios.get(`api/lesson/${params.sectionId}`).then((res) => {
                    setList(res.data.childNodes);
                    setApiStatus('success');
                })
            }
        } else if (type !== "RESOURCE") {
            setList([]);
            let res = await axios.post(urlConfig['Create'][title], {
                "name": data.name,
                "new": true,
                "parentUrn": selectedProduct.urn,
                "persisted": true,
                "type": selectedProduct.type,
                "content": {
                    "field1": "XYZ"
                }
            })

            if (res) {
                axios.get(`api/lesson/${params.sectionId}`).then((res) => {
                    setList(res.data.childNodes);
                    setApiStatus('success');
                })
            }
        } else {
            setList([]);
            let payload = {
                "urn": resource.urn,
                "persisted": true,
                "content": {
                    "field1": data
                }
            }
            if(data.resourceType === 'QUESTION'){
                payload["content"] = {};
                payload["content"]["field1"] = data.name;
                payload["content"]["answers"] = data.answers;
            }
            axios.patch(`${urlConfig['Create']["RESOURCE"]}/${resource.urn}`, payload).then((res) => {
                setApiStatus('success');
                axios.get(`api/lesson/${params.sectionId}`).then((res) => {
                    setList(res.data.childNodes);
                    setApiStatus('success');
                })
            }).catch(() => {
                setApiStatus('Failed')
            })
            

        }
    }

    let changeLessonStatus = (status) => {
        axios.patch(`http://author-service-lb-341934567.ap-southeast-1.elb.amazonaws.com/api/lesson/status/${status}`,{
            "relatedEntityUrn":params.sectionId
        }).then(()=>{
            setApiStatus('success');
            setLessonStatus(status);
        })
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <div className='header-container'>Header</div>
            <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
                {authorReferenceDto && <Link to={`/product/${authorReferenceDto.productUrn}`}><Button color='secondary'>Back</Button></Link>}
                <br />
                <RenderLessonStatus currentStatus={lessonStatus} changeLessonStatus={changeLessonStatus} />
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        {list.length ? (
                            <ListComponent
                                list={list}
                                first={'parent'}
                                addDataToList={addDataToList}
                                indexOfList={0}
                                fetchResource={fetchResource}
                            >
                            </ListComponent>
                        ) : apiStatus === 'Pending' ? <LoadingSpinner /> : 'No Data Found'}
                    </Grid>
                    {(selectedProduct) && <AddForm title={title} formSubmit={submitForm} text={text} selectedProduct={selectedProduct} apiStatus={apiStatus} />}
                </Grid>
            </Container>
        </Box>
    );
};

export default Section


function RenderLessonStatus({ currentStatus, changeLessonStatus }) {
    if (currentStatus !== 'DRAFT') {
        if (currentStatus === 'REVIEW') {
            return <><Button color='secondary' onClick={()=>changeLessonStatus('DRAFT')} defaultValue="DRAFT">DRAFT</Button> {currentStatus} <Button color='secondary' onClick={()=>changeLessonStatus('VERIFY')} defaultValue="VERIFY">VERIFY</Button></>
        } else if (currentStatus === 'VERIFY') {
            return <><Button color='secondary' onClick={()=>changeLessonStatus('DRAFT')} defaultValue="DRAFT">DRAFT</Button> {currentStatus} <Button color='secondary' onClick={()=>changeLessonStatus('PUB_READY')} defaultValue="PUB_READY">PUB_READY</Button></>
        } else if (currentStatus === 'PUB_READY') {
            return <><Button color='secondary' onClick={()=>changeLessonStatus('DRAFT')} defaultValue="DRAFT">DRAFT</Button> {currentStatus} <Button color='secondary' onClick={()=>changeLessonStatus('LIVE')} defaultValue="LIVE">LIVE</Button></>
        }
    }else{
        return <>{currentStatus} <Button color='secondary' onClick={()=>changeLessonStatus('REVIEW')} defaultValue="REVIEW">REVIEW</Button></>
    }
}