import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';


function AddForm(props) {
  const [text, setText] = useState();
  return <Grid item xs={6}>
    <Box sx={{ my: 3, mx: 2 }} style={{ padding: 20 }}>
              <Grid container alignItems='center'>
                <Grid item xs>
                  <Typography gutterBottom variant='h4' component='div'>
                    Add {props.title}
                  </Typography>
                </Grid>
              </Grid>
              <Typography color='text.secondary' variant='body2'>
                {props.productName}
              </Typography>
            </Box>
    <Divider variant='middle' />
    <Box>
      <Grid container spacing={2} style={{ padding: 20 }}>
        <Grid item xs={6}>
          <TextField value={text}
            onChange={(event) => setText(event.target.value)}
            />
        </Grid>
        <Grid item xs={1} align='end' style={{ padding: 20 }}>
          <Button color='secondary' variant='contained' onClick={() => { if(!text){return false;}props.formSubmit(text) }}  disabled={!text}>
            Add
          </Button>
        </Grid>
      </Grid>
    </Box>
  </Grid>;
}

export default AddForm;