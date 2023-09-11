import { createSlice } from "@reduxjs/toolkit";

const usersSlice=createSlice({
    name:"users",
    initialState:{
        // nextId: 1,
        id:0,
        name:'',
        lname:'',
        stuId:'',
        email:'',
        phno:'',
        address:''
    },
    reducers:{
        setUserSlice:(state,action)=>{
            state=action.payload;
            return state;
        },
        deleteUser:(state,action)=>{
            console.log(state)
            console.log(action)
            state.splice(action.payload.id)
            return state;
        },
        // Increment the counter when a new user is added
        // incrementCounter: (state) => {
        //     state.nextId += 1;
        //     return state;
        // },
    }
})

export const{setUserSlice,deleteUser }=usersSlice.actions;
export default usersSlice.reducer;