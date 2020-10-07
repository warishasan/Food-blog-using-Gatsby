import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit"

export interface authState {
    authPageState: "Login" | "Signup" | "Verify Email" | "Profile" | "Forgot Password" ;
    showAuthPage: Boolean;
    forgotPassword:Boolean
}

  const initialState:authState = {
    authPageState: "Login",
    showAuthPage: false,
    forgotPassword:false
  }


const authPage = createSlice({
    name: "Auth Page",
    initialState: initialState,
    reducers: {
    changeAuthPageState: (state, {payload}: PayloadAction<"Login" | "Signup">) => {
          
                return ({
                    ...state, authPageState: payload
                }
                )
            

    },
    setShowAuthPage: (state,  {payload}: PayloadAction<Boolean>) => {
       
        return ({
            ...state, showAuthPage :payload
        })
},





setForgotPassword: (state,  {payload}: PayloadAction<Boolean>) => {
       
    return ({
        ...state, forgotPassword :payload
    })
},

    

    }
    
})






const store = configureStore({

reducer:authPage.reducer

})


export const { changeAuthPageState, setShowAuthPage , setForgotPassword} = authPage.actions


export { authPage, store }