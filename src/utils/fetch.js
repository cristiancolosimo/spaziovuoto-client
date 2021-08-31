import {get, writable} from 'svelte/store'
import {
   session 
} from './session'
export const fetchWithAuth = async (req)=>{


    let raw = await fetch('http://127.0.0.1:3000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+get(session).token
        },
        body: JSON.stringify(req),
      });
    let data = await raw.json();
    console.log(data)
    return data;    
}