import { Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function LinksView() {
    return(
        <>
            <Link to={"/login"}><Box>LOGIN</Box></Link>
            <Link to={"/CreateTenant"}><Box>CREATE TENANT</Box></Link>
            <Link to={"/CreateUser"}><Box>CREATE USER</Box></Link>
            <Link to={"/SuperAdmin"}><Box>SUPERADMIN</Box></Link>
            <Link to={"/write"}><Box>WRITE</Box></Link>
            <Link to={"/reviewTexts"}><Box>REVIEW TEXTS</Box></Link>
            <Link to={"/Admin"}><Box>ADMIN</Box></Link>
            <Link to={"/User"}><Box>USER</Box></Link>
            <Link to={"/TenantSettings"}><Box>TENANT SETTINGS</Box></Link>
            <Link to={"/TenantTexts"}><Box>TENANT TEXTS</Box></Link>
            <Link to={"/TenantTextCategories"}><Box>TENANT TEXT CATEGORIES</Box></Link>
        </>
    )
}