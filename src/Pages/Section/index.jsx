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
    const [selectedProduct, setSelectedProduct] = useState({ urn: null });
    const [resource, setResource] = useState('');
    const [apiStatus, setApiStatus] = useState('Pending');
    const [text, setText] = useState();
    const [authorReferenceDto, setAuthorReferenceDto] = useState();

    useEffect(() => {
        axios.get(`api/lesson/${params.sectionId}`).then((res) => {
            setList(res.data.childNodes);
            setAuthorReferenceDto(res.data.authorReferenceDto);
            setApiStatus('success');
        })
    }, [params.sectionId]);

    useEffect(() => {
        setText('')
    }, [selectedProduct.urn]);

    let addDataToList = async (title, index, data) => {
        setResource('')
        setTitle(typeOfTree[title]);
        setSelectedProduct(data);
    }

    let fetchResource = async (resource) => {
        setApiStatus('Pending');
        setText('');
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
        if (type === "SECTION") {
            setList([]);
            let res = await axios.post(urlConfig['Create'][title], {
                "name": data.name,
                "new": true,
                "parentUrn": selectedProduct.urn,
                "persisted": true,
                "resourceType":data.resourceType,
                "type": selectedProduct.type,
                "content": {
                    "field1": data.name
                }
            })

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
                axios.get(`api/lesson/${params.lessonId}`).then((res) => {
                    setList(res.data.childNodes);
                    setApiStatus('success');
                })
            }
        } else {
            axios.patch(`${urlConfig['Create']["RESOURCE"]}/${resource.urn}`, {
                "urn": resource.urn,
                "persisted": true,
                "content": {
                    "field1": data
                }
            }).then((res) => {
                setApiStatus('success');
            }).catch(() => {
                setApiStatus('Failed')
            })
        }
    }

    let changeLessonStatus = () => {

    }

    return (
        <Box sx={{ display: 'flex' }}>
            <div className='header-container'>Header</div>
            <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
                {authorReferenceDto && <Link to={`/product/${authorReferenceDto.productUrn}`}><Button color='secondary'>Back</Button></Link>}
                <br />
                <RenderLessonStatus currentStatus={'Verify'} changeLessonStatus={changeLessonStatus} />
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
                    {(title || params.resourceId) && <AddForm title={title} formSubmit={submitForm} text={text} type={selectedProduct && selectedProduct.type} apiStatus={apiStatus} />}
                </Grid>
            </Container>
        </Box>
    );
};

export default Section


function RenderLessonStatus({ currentStatus, changeLessonStatus }) {
    if (currentStatus !== 'Draft') {
        if (currentStatus === 'Review') {
            return <><Button color='secondary' onClick={changeLessonStatus} defaultValue="Draft">Draft</Button> {currentStatus} <Button color='secondary' onClick={changeLessonStatus} defaultValue="Verify">Verify</Button></>
        } else if (currentStatus === 'Verify') {
            return <><Button color='secondary' onClick={changeLessonStatus} defaultValue="Draft">Draft</Button> {currentStatus} <Button color='secondary' onClick={changeLessonStatus} defaultValue="Pre">Pre</Button></>
        } else if (currentStatus === 'Pre') {
            return <><Button color='secondary' onClick={changeLessonStatus} defaultValue="Draft">Draft</Button> {currentStatus} <Button color='secondary' onClick={changeLessonStatus} defaultValue="Live">Live</Button></>
        }
    }
}