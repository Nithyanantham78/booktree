import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {useParams, Link} from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { ListContext } from '../../context/ListContext';
import ListComponent from '../../Components/ListComponent';
import AddForm from '../../Components/AddForm';
import LoadingSpinner from '../../Components/Loader';
import {typeOfTree} from '../../Config/config'
import {urlConfig} from '../../Config/urlConfig'
import './index.css';

function Product() {
  let params = useParams();
  const [list, setList] = useContext(ListContext);
  const [title,setTitle] = useState('');
  const [selectedProduct,setSelectedProduct] = useState();
  const [apiStatus,setApiStatus] = useState('Pending');

  useEffect(() => {

    axios.get(`/api/product/render-product/${params.productId}`).then((res) => {
      setList([res.data]);
    });
    return ()=>{
      setList([])
      setTitle('')
      setSelectedProduct('')
    }
  }, [params.productId]);

  let addDataToList = async (title,index,data) => {
    setTitle(typeOfTree[title]);
    setSelectedProduct(data);
  }

  let submitForm = async (data) => {
    setApiStatus('Pending')
    setList([]);
    let payload = {
      "name":data.name,
      "parentUrn":selectedProduct.urn,
      "type": title
    }
    if(title==="LESSON"){
      payload.status=data.lessonStatus
    }
      let res = await axios.post(urlConfig['Create'][title],payload);
      if(res){
      await axios.get(`/api/product/render-product/${params.productId}`).then((res) => {
          setList([res.data]);
        });
        setApiStatus('success');
      }        
  }


  return (
    <Box sx={{ display: 'flex' }}>
      <div className='header-container'>Header</div>
      <Link to={`/`}><Button color='secondary'>Home</Button></Link>
      <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {list.length ? (
              <ListComponent
                list={list}
                first={'parent'}
                addDataToList={addDataToList}
                indexOfList={0}
                key={`product_${0}`}
              >
                <Toolbar />
              </ListComponent>
            ):apiStatus==='Pending'?<LoadingSpinner />:'No Data Found'}
          </Grid>
          {title&&<AddForm title={title} type={selectedProduct.type} formSubmit={submitForm} apiStatus={apiStatus}/>}      
        </Grid>
      </Container>
    </Box>
  );
}

export default Product;
