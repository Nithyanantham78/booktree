import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
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
    let navigate = useNavigate();
    const [list, setList] = useState([]);
    const [title, setTitle] = useState('Product');
    const [selectedProduct, setSelectedProduct] = useState();
    const [resource, setResource] = useState('');
    const [apiStatus, setApiStatus] = useState();
    const [text, setText] = useState('');

    useEffect(() => {
        axios.get(`api/lesson/${params.sectionId}`).then((res) => {
            setList(res.data.childNodes)
        })
    }, [params.sectionId]);

    let addDataToList = async (title, index, data) => {
        setTitle(typeOfTree[title]);
        setSelectedProduct(data);
    }

    let fetchResource = async (resource) => {
        setApiStatus('Pending');
        setSelectedProduct(resource);
        await axios.get(`api/resource/${resource.urn}`).then((res) => {
            setResource(res.data);
            if (res.data.content && res.data.content["field1"]) {
                setText(res.data.content.field1);
                setApiStatus('success');
            }
        })

    }

    let submitForm = async (data) => {
        setApiStatus('Pending');
        if (!params.resourceId) {
            setList([]);
            let res = await axios.post(urlConfig['Create'][title], {
                "name": data,
                "new": true,
                "parentUrn": selectedProduct.urn,
                "persisted": true,
                "type": selectedProduct.type,
                "content": {
                    "field1": "XYZ"
                }
            })
        
        if (res) {
            await axios.get(`api/lesson/${params.lessonId}`).then((res) => {
                setList(res.data.childNodes);
                setApiStatus('success');
            })
        }
    }else{
        await axios.patch(`${urlConfig['Create']["RESOURCE"]}/${resource.urn}`, {
            "urn": resource.urn,
            "persisted": true,
            "content": {
                "field1": data
            }
        }).then((res)=>{
            setApiStatus('success');
        }).catch(()=>{
            setApiStatus('Failed')
        })
    }

    }



    return (
        <Box sx={{ display: 'flex' }}>
            <div className='header-container'>Header</div>
            <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
                <Button color='secondary' onClick={() => { navigate(-1) }}>Back</Button>
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
                    <AddForm title={title} text={text} formSubmit={submitForm} apiStatus={apiStatus} />
                </Grid>
            </Container>
        </Box>
    );
};

export default Section