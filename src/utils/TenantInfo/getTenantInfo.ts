import { getData } from "../../services/axios/axiosFunctions";

export default async function getTenantInfo(tenantId : string){
    await getData(`http://localhost:3000/dev/${tenantId}/info`).then((res : any) =>{
        console.log(res.data.tenant);
        return res.data.tenant;
    })
    .catch((err : any) => {
        console.log(err);
        return;
    });
}