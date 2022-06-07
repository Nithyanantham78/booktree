import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import AddForm from '../../Components/AddForm';
import LoadingSpinner from '../../Components/Loader';
import { urlConfig } from '../../Config/urlConfig'

function Dashboard() {
    const [list, setList] = useState([]);
    const [apiStatus, setApiStatus] = useState('Pending');

    useEffect(() => {
        axios.post(urlConfig['getPaginatedProducts'], {
            "pageSize": 10
        }).then((res) => {
            setList(res.data.content)
        })
    }, []);
 
    let submitForm = (data) => {
        setApiStatus('Pending')
        setList([]);
        axios.post(urlConfig['Create']["PRODUCT"], {
            "name": data.name,
            "type": "PRODUCT"
        }).then((res) => {
            list.push(res.data);
            setList([...list]);
            setApiStatus('success');
        }).catch((err)=>{
            console.log(err);
        })

    }

    return (
        <Box sx={{ display: 'flex' }}>
            <div className='header-container'>Header</div>
            <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        {list.length ? (
                            <Box>
                            <ol className={`wtree`}>
                              {list &&
                               list.length &&
                               list.map((el, i) => {
                                  return (
                                   <Link to={`/product/${el.urn}`}><li key={`${el.urn}_${new Date().getMilliseconds()}`} id={el.urn} className='li_flex'
                                    >
                                      <span>
                                        {el.name}
                                      </span>
                                    </li></Link>
                                  );
                                })}
                            </ol>
                          </Box>
                        ):apiStatus==='Pending'?<LoadingSpinner />:'No Data Found'}
                    </Grid>
                    <AddForm title={'PRODUCT'} formSubmit={submitForm} type={"PRODUCT"} apiStatus={apiStatus} />
                </Grid>
            </Container>
        </Box>
    );
};

export default Dashboard