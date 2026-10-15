import { useSetAtom } from 'jotai'
import React from 'react'
import { addUserAtom } from '../store/jotai'
import { useForm } from 'react-hook-form'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import CircularProgress from "@mui/material/CircularProgress"
const AddDialog = ({open,setOpen}) => {
    let addUser=useSetAtom(addUserAtom)
    let {
        register,
        handleSubmit,
        formState:{errors,isSubmitting}
    }=useForm()

    async function addNewUser(data) {
        let newUser={
            fullname:data.fullname,
            age:data.age,
            avatar:data.avatar,
            status:data.status=='true'
        }
        await addUser(newUser)
        setOpen(false)
    }
  return (
    <>
    <Dialog  fullWidth maxWidth="sm" open={open} onClose={()=>setOpen(false)}>
    <DialogTitle>Add User</DialogTitle>
    <form onSubmit={handleSubmit(addNewUser)}>
        <DialogContent sx={{display:'flex', flexDirection:'column',gap:2,pt:2}}>
            <TextField label="fullname" placeholder='Name...' {...register("fullname",{required:true})}/>
            {errors.fullname && <p>Name is required!</p>}
                <TextField placeholder="age" type="text" {...register('age')} />
          <TextField placeholder="image" type="text" {...register('avatar')} />
          <select {...register('status')}>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </DialogContent>
        <DialogActions>
            <Button type='submit' disabled={isSubmitting} startIcon={isSubmitting && <CircularProgress/>}>Add</Button>
            <Button type='button' onClick={()=>setOpen(false)}>Cancel</Button>
        </DialogActions>
    </form>
    </Dialog>
    </>
  )
}

export default AddDialog