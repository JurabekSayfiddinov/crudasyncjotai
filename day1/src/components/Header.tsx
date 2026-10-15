import { useAtomValue, useSetAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import  {deleteUserAtom, getUsersAtom, loadingDeleteAtom}  from '../store/jotai'
import { Button, CircularProgress } from '@mui/material'
import AddDialog from './AddDialog'
import EditDialog from './EditDialog'



const Header = () => {
    let data=useAtomValue(getUsersAtom)
    let [open,setOpen]=useState(false)
    let deleteUser=useSetAtom(deleteUserAtom)
    let [editUser,setEditUser]=useState(null)
    let loading=useAtomValue(loadingDeleteAtom)
  return (
    <>
                <Button onClick={()=>setOpen(true)}>Add New</Button>
                <AddDialog open={open} setOpen={setOpen}/>
                <EditDialog open={Boolean(editUser)} user={editUser}  setEditUser={setEditUser} />
    {data.map((e)=>(
        <div key={e.id}>
                 <img src={e.avatar} width="60" />
            <h2>{e.fullname}</h2>
            <p>{e.age}</p>
            <p>{e.status ? "Active" : "Inactive"}</p>
           <Button color="error" variant="contained"disabled={loading===e.id}
  onClick={() => deleteUser(e.id)}>
  {loading===e.id && <CircularProgress size={20} color="inherit" />}
  Delete
</Button>
            <Button variant='contained' onClick={()=>setEditUser(e)}>Edit</Button>
            </div>
        ))
    }
    </>
  )
}

export default Header