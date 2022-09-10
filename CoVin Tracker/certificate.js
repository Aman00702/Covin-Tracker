import{SHA256} from"./sha256.js";
let tk;
let data;
let btn = document.getElementById('submit');
let sendNo = document.getElementById('Otp');
let sendOtp=document.getElementById('confirm')
let sendbtn=document.getElementById('send')
async function getOtp() {
    try {
        let res = await fetch("https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        "mobile": `${String(sendNo.value)}`
                    }
                )
            });
        
         data= await res.json()
        //console.log(data.txnId)
        //console.log(data.txnId); 
        //return data.txnId;
    }
    catch (e) {
        return "error!!!";
    }
    
};
btn.addEventListener('click', getOtp)
//.then(token=>{console.log(token.txnId)})



//for confirm otp
async function confirmOtp(){
    try{
        let res = await fetch("https://cdn-api.co-vin.in/api/v2/auth/public/confirmOTP",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {   "otp":`${SHA256(String(sendOtp.value))}`,
                    "txnId":`${data.txnId}`
                }
            )
        });
        tk=await res.json();
        console.log(tk.token)
}

catch(e){
    console.log("error")
}
}
sendbtn.addEventListener('click',confirmOtp)

let bId=document.getElementById('bId');
let benId=document.getElementById('benId')
bId.addEventListener('click',certificate);
async function certificate(){
    try{
        const res=fetch(`https://cdn-api.co-vin.in/api/v2/registration/certificate/public/download?beneficiary_reference_id=${benId.value}`,
        {
            method: 'GET',
            headers: {
                //'Content-Type': 'application/json',
                'accept':'application/pdf',
                'Authorization': ` Bearer ${tk.token}`
            }
        })
        
    }
   
catch(e){
    console.log("error");
}
}