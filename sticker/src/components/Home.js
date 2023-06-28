import React,{useState} from 'react'
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  Button as MuiButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
 

export default function Home() {
  const[open,setOpen] = useState(false);
 
  const handleOpen = () =>{
    setOpen(true);
  }
  const handleClose = ()=>{
    setOpen(false);
  }
  const confirm  = () =>{
    handleClose();
  }
  return (
    <div style={{display:"flex" ,justifyContent:"center"}}> 
    <Button type="primary"  icon={<PlusOutlined/>}onClick={handleOpen}>Add</Button>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Paste Your Answers</DialogTitle>
      <DialogContent>
        
      <DialogContent>
        
      <TextField
            label="Type"
            fullWidth
            multiline
            rows={30}
            sx={{ width: '550px' }} 
            variant="outlined"
          />
      </DialogContent>
      </DialogContent>
      <DialogActions>
        <MuiButton onClick={handleClose} color='warning'>
          Cancel
        </MuiButton>
        <MuiButton onClick={confirm} color='primary' autoFocus>
          Add
        </MuiButton>
      </DialogActions>
    </Dialog>
    </div>
      
    )

}
