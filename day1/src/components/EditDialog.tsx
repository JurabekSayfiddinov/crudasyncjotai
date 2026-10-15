import { useSetAtom } from 'jotai'
import React, { useEffect } from 'react'
import { editUserAtom } from '../store/jotai'
import { useForm } from 'react-hook-form'
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'



const EditDialog = ({open,setEditUser,user}) => {
    let editUser=useSetAtom(editUserAtom)
    let {
        register,
        handleSubmit,
        reset,
        formState:{isSubmitting}
    }=useForm()
    useEffect(() => {
  if (user) {
    reset({
      fullname: user.fullname,
      age: user.age,
      avatar: user.avatar,
      status: String(user.status)
    })
  }
}, [user, reset])
    async function updateUser(data) {
        let updatedUser={
            id:user.id,
            fullname:data.fullname,
            age:data.age,
            status:data.status
        }
        await editUser(updatedUser)
        setEditUser(null)
    }
  return (
    <>
        <Dialog open={open} onClose={()=>setEditUser(null)}>
            <DialogTitle>Edit User</DialogTitle>
        <form onSubmit={handleSubmit(updateUser)}>
        <DialogContent>
         <TextField label="Fullname" {...register("fullname", { required: true })}  />
          <TextField label="Age"  type="number" {...register("age")} />
          <TextField label="Avatar" {...register("avatar")}/>
          <select {...register("status")}>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </DialogContent>
         <DialogActions>
          <Button onClick={() => setEditUser(null)}>
            Cancel
          </Button>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && (
              <CircularProgress size={20} color="inherit" />
            )}
            Save
          </Button>
        </DialogActions>
        </form>
        </Dialog>
    </>
  )
}

export default EditDialog