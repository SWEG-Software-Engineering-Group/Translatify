import { putData } from "../../services/axios/axiosFunctions";

export default async function updateTenantInfo(tenantId : string, tenantInfo : any ){
    await putData(`http://localhost:3000/dev/${tenantId}/update`, tenantInfo).then((res : any) => { //MANCA QUESTA API
    console.log("put",res);          
    })
    .catch((err : any) =>{
      console.error(err);
    })
}

//da rivedere 