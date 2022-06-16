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
  const [resourceType, setResourceType] = useState('INFO');
  const [textarea, setTextarea] = useState('');
  const [inputs, setInputs] = useState({ answers: [{ 'value': '' }] });
  useEffect(() => {
    setText(props.text);
    if (props.selectedProduct.resourceType) {
      setResourceType(props.selectedProduct.resourceType);
    }

    return () => {
      setText('');
      setLessonStatus(1);
      setInputs({ answers: [{ 'value': '' }] });
    }
  }, [props.text])

  useEffect(() => {
    if (props.selectedProduct.resourceType === "QUESTION" && props.selectedProduct.content && props.selectedProduct.content.answers) {
      setInputs({ answers: [...props.selectedProduct.content.answers] })
      setText(props.selectedProduct.name);
    }
  },[props.selectedProduct.resourceType])


  let addDynamic = (e) => {
    inputs.answers.push({ 'value': '' });
    setInputs({ ...inputs });
  }

  let answers = (e, idx) => {
    for (let i = 0; i < inputs.answers.length; i++) {
      if (idx == i) {
        inputs.answers[i].value = e.target.value;
      }
    }
    setInputs({ ...inputs })
  }
  return <Grid item xs={6}>
    <Box sx={{ minWidth: 120 }} style={{ padding: 20 }}>
      <Grid container alignItems='center'>
        <Grid item xs>
          <Typography gutterBottom variant='h4' component='div'>
            {props.selectedProduct.type === "RESOURCE" ? 'Update' : 'Add'} {props.title}
          </Typography>
        </Grid>
      </Grid>
    </Box>
    <Divider variant='middle' />
    <Box>
      <Grid container spacing={2} style={{ padding: 20 }}>
        <Grid item xs={8}>
          {(!props.selectedProduct.resourceType || props.selectedProduct.resourceType !== "QUESTION") && <TextField value={text}
            onChange={(event) => setText(event.target.value)}
          />}
          {props.selectedProduct.type === "UNIT" && <><br /><br /><select onChange={(e) => { setLessonStatus(e.target.value) }}>
            <option>DRAFT</option>
            <option>REVIEW</option>
            <option>VERIFY</option>
            <option>PUB_READY</option>
            <option>LIVE</option>
          </select></>}
          {props.selectedProduct.type === "SECTION" && <> <br /><br />
            <select onChange={(e) => { setResourceType(e.target.value) }}>
              <option>INFO</option>
              <option>CONCEPT</option>
              <option>MUSIC</option>
              <option>QUESTION</option>
              <option>TIMER</option>
            </select></>}

          {props.selectedProduct.resourceType && props.selectedProduct.resourceType === "QUESTION" ? <><TextareaAutosize aria-label="minimum height"
            minRows={3}
            placeholder="Minimum 3 rows"
            style={{ width: 200 }} value={props.selectedProduct.name} onChange={(event) => setText(event.target.value)} />
            {inputs.answers.map((el, i) => {
              return <><TextField key={i} value={el.value}
                onChange={(event) => answers(event, i)}
              /><i className='fa fa-plus' style={{ marginLeft: 'auto', cursor: "pointer" }} onClick={() => addDynamic()}></i></>
            })}
          </> : ''}
        </Grid>

        <Grid item xs={1} align='end' style={{ padding: 20 }}>
          <Button color='secondary' variant='contained' onClick={() => { if (!text && props.selectedProduct.type !== "RESOURCE") { return false; } props.formSubmit({ name: text, lessonStatus: lessonStatus, resourceType: resourceType, answers: inputs.answers }, props.selectedProduct.type) }} disabled={!text && props.selectedProduct.type !== "RESOURCE"}>
            {props.selectedProduct.type === "RESOURCE" ? 'Update' : 'Add'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  </Grid>;
}

export default AddForm;