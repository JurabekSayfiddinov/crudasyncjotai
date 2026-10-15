import axios from "axios";

import { api } from "../utils/api";
import { atomWithRefresh, unwrap } from "jotai/utils";
import { atom } from "jotai";


export const getUsersAtom=atomWithRefresh(async()=>{
    try {
        let {data}=await axios.get(api)
       return data
    } catch (error) {
       console.log(error);
    }

})

export const addUserAtom=atom(null,async(get,set,user)=>{
    try {
        await axios.post(api,user)
        set(getUsersAtom)
    } catch (error) {
        console.log(error);
    }
})

export const loadingDeleteAtom = atom(false)

export const deleteUserAtom=atom(null,async(get,set,id)=>{
    set(loadingDeleteAtom,id)
    try {
        await axios.delete(`${api}/${id}`)
        set(getUsersAtom)
    } catch (error) {
        console.log(error);
    }
    finally{
        set(loadingDeleteAtom,false)
    }
})

export const editUserAtom=atom(null,async(get,set,user)=>{
    try {
        await axios.put(`${api}/${user.id}`,user)
        set(getUsersAtom)
    } catch (error) {
        console.log(error);
        
    }
})

export let dataUnwrapAtom=unwrap(getUsersAtom,(prev)=>prev||[])
