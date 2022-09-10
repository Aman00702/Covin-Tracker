const btn=document.querySelector('#search');
const pincode=document.querySelector('#pin');
// const date=document.querySelector('#date')
const ul_list=document.querySelector('#list');
const d= new Date();
const div=document.querySelector('#table');

// async function addSearch(data) {
//    // const newSearch= await search();
//     const lists=document.createElement('li')
//     lists.append(data);
//     ul_list.append(lists);    
// }

btn.addEventListener('click',search);
 async function search(){
    try{
    const config={headers:{Accept:'application/json'}}
    const res=await axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode.value}&date=${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`,config);
    let output='';
    for(let i of res.data.sessions){
    //const resp=`${i.name} ${i.vaccine}`;
    //console.log(resp);
       output+=`<div class="card card-body mb-2">
       <div class="row"> 
           <div class="col md-6">
               <h5>${i.name}</h5>
           </div>
           <div class="col md-6">
               <span class="badge bg-primary">${i.vaccine}</span>
               <span class="badge bg-secondary">Dose 1 Available:${i.available_capacity_dose1}</span>
               <span class="badge bg-success">Dose 2 Available:${i.available_capacity_dose2}</span>
               <span class="badge bg-danger">Min Age:${i.min_age_limit}</span>
               <span class="badge bg-warning">Fee:${i.fee}</span>
           </div>
       </div> 
   
   </div>`

     //addSearch(resp);
    }
    div.innerHtml=output;
    }catch(e){
          return 'error!!!'
      }
    }
    // ${pincode.value}${date.value}