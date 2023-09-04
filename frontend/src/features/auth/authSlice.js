import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const user=JSON.parse(localStorage.getItem('user'))
const initialState={
    user:user ? user:null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''
}

// user in function will come from register form
// those function created with createAsyncThunk  is those that we will dispatch the data to 
export const register= createAsyncThunk('auth/register',async (user,thunkApi)=>{
    try {
        return await authService.register(user);
    } catch (error) {
        const message= (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()
        return thunkApi.rejectWithValue(message)
    }
})

export const login= createAsyncThunk('auth/login',async (user,thunkApi)=>{
    try {
        return await authService.login(user);
    } catch (error) {
        const message= (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()
        return thunkApi.rejectWithValue(message)
    }
})
export const logout= createAsyncThunk('auth/logout',async()=>{
    await authService.logout()
})

export const authSlice=createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
        reset:(state)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=false;
            state.message='';
        },
    },
    // to 
    extraReducers:(builder) =>{
        builder.addCase(register.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            console.log(action.payload);
            state.user=action.payload
        })
        .addCase(register.rejected,(state,action)=>{
            state.isLoading=false;
            state.user=null;
            state.isError=true;
            state.message=action.payload
        })
        .addCase(logout.fulfilled,(state)=>{
            state.user=null;
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.user=action.payload
        })
        .addCase(login.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(login.rejected,(state,action)=>{
            state.isLoading=false;
            state.user=null;
            state.isError=true;
            state.message=action.payload
        })
    }
})
export const {reset}=authSlice.actions
// this will be imported in store
export default authSlice.reducer