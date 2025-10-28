import {test, expect, request } from '@playwright/test';

const baseURL= "https://revamp-auth.moddakir.com";


test('LoginAPI', async({request})=>{
    const payload ={     
  "email": "hmontaser00@moddakir.com",
  "username": "RVaR2HxUiVMEEc26WZvv",
  "password": "Abc@@12345"
    }

const response = await request.post(`${baseURL}/api/auth/public/login`,{
  
data:payload
});

let responseBody = await response.json();
console.log(responseBody);
expect(response.status()).toBe(200);
expect(responseBody.data.student.phone).toEqual("+201054777899");
let accessToken = responseBody.data.accessToken;
console.log("accessToken=" + accessToken);

})