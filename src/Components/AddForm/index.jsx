import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

function AddForm(props) {
  const [text, setText] = useState(props.text ? props.text : '');
  const [lessonStatus, setLessonStatus] = useState(1);
  const [resourceType, setResourceType] = useState('');
  const [textarea, setTextarea] = useState('');
  const [inputs,setInputs] = useState({textField:['']});
  useEffect(() => {
    setText(props.text);
  }, [props.text])

  let addDynamic = (e) =>{
    inputs.textField.push('');
    setInputs({...inputs});
  }

  return <Grid item xs={6}>
    <Box sx={{ minWidth: 120 }} style={{ padding: 20 }}>
      <Grid container alignItems='center'>
        <Grid item xs>
          <Typography gutterBottom variant='h4' component='div'>
            {props.type==="RESOURCE"?'Update':'Add'} {props.title}
          </Typography>
        </Grid>
      </Grid>
    </Box>
    <Divider variant='middle' />
    <Box>
      <Grid container spacing={2} style={{ padding: 20 }}>
        <Grid item xs={8}>
          <TextField value={text}
            onChange={(event) => setText(event.target.value)}
          />
          {props.type === "UNIT" && <><br /><br /><select onChange={(e) => { setLessonStatus(e.target.value) }}>
            <option>Draft</option>
            <option>Review</option>
            <option>Verify</option>
            <option>Pre</option>
            <option>Live</option>
          </select></>}
          {props.type === "SECTION" && <> <br /><br />
            <select onChange={(e) => { setResourceType(e.target.value) }}>
            <option>INFO</option>
            <option>CONCEPT</option>
            <option>MUSIC</option>
            <option>QUESTION</option>
            <option>TIMER</option>
          </select></>}
         
          {props.resourceType && props.resourceType === "QUESTION"?<><br /><br /><TextareaAutosize aria-label="minimum height"
            minRows={3}
            placeholder="Minimum 3 rows"
            style={{ width: 200 }} />
            {inputs.textField.map(()=>{return <><TextField value={text}
            onChange={(event) => setText(event.target.value)}
          /><i className='fa fa-plus' style={{ marginLeft: 'auto',cursor:"pointer"}} onClick={() => addDynamic()}></i></>})}
            </>: props.resourceType&&<TextareaAutosize aria-label="minimum height"
            minRows={3}
            placeholder="Minimum 3 rows"
            style={{ width: 200 }} />}
        </Grid>

        <Grid item xs={1} align='end' style={{ padding: 20 }}>
          <Button color='secondary' variant='contained' onClick={() => { if (!text) { return false; } props.formSubmit({ name: text, lessonStatus: lessonStatus,resourceType:resourceType }, props.type) }} disabled={!text}>
            Add
          </Button>
        </Grid>
      </Grid>
    </Box>
  </Grid>;
}

export default AddForm;