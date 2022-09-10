
const btn=document.querySelector('#search');
const pincode=document.querySelector('#pin');
// const date=document.querySelector('#date')
const ul_list=document.querySelector('#list');
const d= new Date();
const table=document.querySelector('#table');

// async function addSearch(data) {
//    // const newSearch= await search();
//     const lists=document.createElement('li')
//     lists.append(data);
//     ul_list.append(lists);    
// }
btn.addEventListener('click',search);

 async function search(){
    try{
    const res=await fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode.value}&date=${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`)
    const data=await res.json();
    let output='';
    data.sessions.forEach(function(center){
        output+=`<div class="card card-body mb-2">
       <div class="row"> 
           <div class="col md-6">
               <h5>${center.name}</h5>
           </div>
           <div class="col md-6">
               <span class="badge bg-primary">${center.vaccine}</span>
               <span class="badge bg-secondary">Dose 1 Available:${center.available_capacity_dose1}</span>
               <span class="badge bg-success">Dose 2 Available:${center.available_capacity_dose2}</span>
               <span class="badge bg-danger">Min Age:${center.min_age_limit}</span>
               <span class="badge bg-warning">Fee:${center.fee}</span>
           </div>
       </div> 
   
   </div>`
   table.innerHTML=output;
    });
    }
    catch(e){
          return 'error!!!'
      }

    }
    

  