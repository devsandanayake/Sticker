import axios from 'axios'

export const register = newUser => {
    return axios
        .post('http://localhost:8080/register',{
            username:newUser.username,
            email:newUser.email,
            password:newUser.password
        })
         .then(res => {
            console.log("Registered")
         })
        
};

export const login =  async user => {
    const res = await axios
        .post('http://localhost:8080/login',{
            email:user.email,
            password:user.password
    
    });  
    localStorage.setItem('usertoken',res.data);
    return res.data;
    
}