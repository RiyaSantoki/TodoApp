import React, {useState, useEffect } from 'react'
import { FormControl, Container, TextField, Button } from '@material-ui/core';
//import InputLabel from '@material-ui/core/InputLabel';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
//import InputBase from '@material-ui/core/InputBase';
import { alpha, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { CardContent, Card} from '@material-ui/core'
import { Delete, Edit } from '@material-ui/icons'
//import { InputLabel } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DateRangePicker from './DateRangePicker'


const useStyles = makeStyles((theme) => ({
  container: {
    fullWidth: true,
  },
  textField: {
    fullWidth: true,
  },
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

//get local storage

  const getLocalItemes = () => {
    let list = localStorage.getItem('lists');
    console.log(list);
  
    if (list) {
      return JSON.parse(localStorage.getItem('lists'));
    } else{
      return [];
    }
  }
const Todo = () => {
const classes = useStyles();

const [inputData, setInputData] = useState('');
const[items, setItems] = useState((getLocalItemes));
const[toggleSubmit,setToggleSubmit] = useState(true);
const[isEditItem, setIsEditItem] = useState(null);


//AddItem

const addItem = () => {
    if(!inputData){
        alert('plzz fill data')
    }else if( inputData && !toggleSubmit) {
        setItems(
            items.map((elem) => {
                if(elem.id === isEditItem ){
                    return{ ...elem,name:inputData}
                }
                return elem;
            })
        )
        
        setToggleSubmit(true);

        setInputData('');
        
        setIsEditItem(null);

    } else {
        const allInputData = { id: new Date().getTime().toString(), name:inputData }
    setItems([...items, allInputData]);
    setInputData('')
    }

  }
//deleteItem

const deleteItem = (index) =>{
    
    const updateditems = items.filter((elem) => {
        return index !== elem.id;
    });

    setItems(updateditems);
}

//removeAll

const removeAll = () => {
    setItems([]);
}

//add data to localstorage
useEffect(() => {
  localStorage.setItem('lists', JSON.stringify(items))
}, [items]);

//editItem
const editItem = (id) => {
    let newEditItemm = items.find((elem) => {
        return elem.id === id
    });

    console.log(newEditItemm);

    setToggleSubmit(false); 

    setInputData(newEditItemm.name);

    setIsEditItem(id);

    //setIsEditDate(id);
}

    return (
        <Container maxwidth="sm">
            <AppBar position="static">
        <Toolbar>
          <HomeIcon lassName={classes.root} fontSize="large"  />
          <Typography className={classes.title} variant="h6" noWrap>
            <h3> Todos-List</h3> 
          </Typography>
         <DateRangePicker />
        </Toolbar>
      </AppBar>
            <form>
                <FormControl fullWidth={true}>
                    {/*additem*/}
                    
                    <TextField 
                    label="I Will Do This" 
                    required={true}  
                    value={inputData} 
                    style={{ marginTop: 8 }}
                    onChange={(e) => setInputData(e.target.value)}/>
                    <form  noValidate fullWidth={true}>
                      <TextField
                        required={true}
                        label="When will you complete your task?"
                        type="date"             
                        fullWidth={true}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </form>

                    {
                        toggleSubmit ? <Button variant="contained" color="primary" id="date_button"  type="Submit" startIcon={<AddIcon />}  style={{ marginTop: 5 }}  onClick={addItem} onclick={document.getElementById('date_button').innerHTML = Date()}> Add Item </Button>:
                        <Button variant="contained" color="secondary" id="date_button"  type="Submit" startIcon={<EditIcon />} style={{ marginTop: 5 }}  onClick={addItem} onclick={document.getElementById('date_button').innerHTML = Date()}> Update Item </Button>
                    }
                    
                </FormControl>
            </form>

            {/*showItems*/}
            {
                items.map((elem) => {
                 return(
                        <Card variant="outLined" style={{ margin: 30, background: "lightgray"}}>
                                <CardContent>
                                    
                                    <Typography variant="h5" component="h2" key={elem.id} >
                                        {elem.name}
                                        <Typography variant="h6" component="h1" id="Date" >
                                          
                                        <IconButton style={{float:"right" } } >
                                            <Delete style= {{color: "Red" }} onClick={() => deleteItem(elem.id)} />
                                        </IconButton>
                                        <IconButton style={{float:"right" }} >
                                            <Edit style= {{color: "blue" }} onClick={() => editItem(elem.id)} />
                                        </IconButton>
                                        </Typography>
                                  </Typography>
                                    
                                </CardContent>
                            </Card>
                )
            })
        }
       <Button variant="outlined" color="secondary" className={classes.button} fullWidth={true} style={{ marginTop: 8 }} startIcon={<DeleteIcon />}
       onClick={removeAll}  >
        Remove All
      </Button>
        </Container>
        
    )
}

export default Todo
