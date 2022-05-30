import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { ListContext } from '../../context/ListContext';
import ListComponent from '../../Components/ListComponent';
import AddForm from '../../Components/AddForm';
import {typeOfTree} from '../../Config/config'
import {urlConfig} from '../../Config/urlConfig'
import './Dashboard.css';

function Dashboard() {
  const [list, setList] = useContext(ListContext);
  const [title,setTitle] = useState('Product');
  const [selectedindex,setSelectedIndex] = useState(0);
  const [selectedProduct,setSelectedProduct] = useState();
  const [apiStatus,setApiStatus] = useState();

  useEffect(() => {

    axios.get(`http://author-service-lb-341934567.ap-southeast-1.elb.amazonaws.com/api/product/render-product/urn:product:be9eb3ab-e113-429e-9e3d-424182ae17c8`).then((res) => {
      setList([res.data]);
      console.log(res.data);
    });
  }, []);

  let addDataToList = async (title,index,data) => {
    setTitle(typeOfTree[title]);
    setSelectedIndex(index);
    setSelectedProduct(data);
  }

  let submitForm = (data) => {
      axios.post(urlConfig[selectedProduct.type],{
        name:data,
        parentUrn:selectedProduct.urn            
      }).then((res)=>{
        let listing = list[selectedindex];
        while(1){
          if(listing.urn === selectedProduct.urn){
            listing.childNodes.push(res.data);
            break;
          }else{
            listing = listing.childNodes[0];
          }
        }
        setList([...list]);
        setApiStatus('success');        
      })

  }


  return (
    <Box sx={{ display: 'flex' }}>
      <div className='header-container'>Header</div>
      <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {list.length && (
              <ListComponent
                list={list}
                first={'parent'}
                addDataToList={addDataToList}
                indexOfList={0}
              >
                <Toolbar />
              </ListComponent>
            )}
          </Grid>
          <AddForm title={title} productName={list[selectedindex]?list[selectedindex].name:''} formSubmit={submitForm} apiStatus={apiStatus}/>      
        </Grid>
      </Container>
    </Box>
  );
}

export default Dashboard;
