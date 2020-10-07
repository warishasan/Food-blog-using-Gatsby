import firebase from "gatsby-plugin-firebase"



export async function LoginUser (username:string, password:string) {
const user = await firebase.auth().signInWithEmailAndPassword(username, password)
return user;
      
}


export async function SignupUser ( username:string, password:string) {
    const user = await firebase.auth().createUserWithEmailAndPassword(username, password)
    return user;
          
    }


export async function updateUserProfile ( displayName:string) {
    
         const user = firebase.auth().currentUser; 
        const updateUser = await user.updateProfile({
            displayName: displayName,
          })
        return updateUser;
              
        }

export async function SignoutUser() {
 const res = firebase.auth().signOut()
 return res;
}





        
    