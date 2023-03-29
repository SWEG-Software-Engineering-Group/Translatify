import { Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function templateForNewComponent() {
    //HOOKS

    //LOGIC
    //(functions)

    //UI
    return(
        <>
            <Link to={"/login"}><Box>LOGIN</Box></Link>
            <Link to={"/CreateTenant"}><Box>CREATE TENANT</Box></Link>
            <Link to={"/CreateUser"}><Box>CREATE USER</Box></Link>
            <Link to={"/SuperAdmin"}><Box>SUPERADMIN</Box></Link>
            <Link to={"/write"}><Box>WRITE</Box></Link>
            <Link to={"/edit/FOOTER/1"}><Box>EDIT CATEGORY=FOOTER, TEXTID=1</Box></Link>
            <Link to={"/createTranslation"}><Box>CREATE TRANSLATION</Box></Link>
            <Link to={"/reviewTexts"}><Box>REVIEW TEXTS</Box></Link>
            <Link to={"/Admin"}><Box>ADMIN</Box></Link>
            <Link to={"/tenant/1"}><Box>TENANT, ID=1</Box></Link>
            <Link to={"/TenantTexts"}><Box>TENANT TEXTS</Box></Link>
        </>
    )
}