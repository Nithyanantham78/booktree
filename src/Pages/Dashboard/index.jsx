import React, { useEffect, useState, useContext } from 'react';
import { ListContext } from '../../context/ListContext';
import ListComponent from '../../Components/ListComponent';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import './Dashboard.css';

function Dashboard() {
  const [list, setList] = useContext(ListContext);
  const [dropDownValue, setDropDownValue] = React.useState('');

  useEffect(() => {
    axios.get(`/mockdata/tree.json`).then((res) => {
      setList(res.data.childNodes);
    });
  }, []);

  const handleChange = (event) => {
    setDropDownValue(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* <AppBar>
        <Toolbar>
          <Typography align='center'>Dashboard</Typography>
        </Toolbar>
      </AppBar> */}
      <div className='header-container'>Header</div>
      <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {list.length && (
              <ListComponent
                list={list}
                first={'parent'}
                addProduct={(event) => {
                  list[0].childNodes[0].childNodes[0].childNodes.push({
                    urn: '629025625367abcfc6bf189de',
                    unitUrn: 'dqic:permission:20b06ded-15cd-4d58-a411-1299a1dae2ee',
                    type: 7,
                    name: 'LESSON IV',
                    ParentNode: false,
                    childNodes: [],
                  });
                  setList([...list]);
                }}
              >
                <Toolbar />
              </ListComponent>
            )}
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ my: 3, mx: 2 }} style={{ padding: 20 }}>
              <Grid container alignItems='center'>
                <Grid item xs>
                  <Typography gutterBottom variant='h4' component='div'>
                    Add Subject
                  </Typography>
                </Grid>
              </Grid>
              <Typography color='text.secondary' variant='body2'>
                Add Subject
              </Typography>
            </Box>
            <Divider variant='middle' />
            <Box>
              <Grid container spacing={2} style={{ padding: 20 }}>
                <Grid item xs={6}>
                  <TextField fullWidth id='outlined-basic' label='Field1' variant='outlined' />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth id='outlined-basic' label='Field2' variant='outlined' />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-label'>Value</InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={dropDownValue}
                      label='Age'
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} align='end' style={{ padding: 20 }}>
                  <Button color='secondary' variant='contained'>
                    Add
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Dashboard;
