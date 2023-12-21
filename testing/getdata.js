
fetch('https://cms.istad.co/api/km-products',{
    method:"GET",
    body: JSON.stringify(),
    headers:{
       "Content-Type": "application/json"
    }
}).then(res => res.json()).then(data => console.log(data));
