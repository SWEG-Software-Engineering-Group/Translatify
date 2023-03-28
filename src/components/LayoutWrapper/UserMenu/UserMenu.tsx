import { Button, Menu, MenuItem} from "@mui/material";
import LogoutButton from "../../../components/buttons/LogoutButton/LogoutButton";
import { NavLink } from "react-router-dom";

interface UserMenuProps{
    userType: String;
}

export default function UserMenu({ userType }: UserMenuProps) {
    //const type = localStorage.getItem("userRole"); //lo lascio dovesse servire per prove al momento
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    const contentUserLinks = [
        { label: "Review Translations", to: "/reviewTexts" },
        { label: "Tenant Texts", to: "/TenantTexts" },
    ];

    const adminLinks = [
        { label: "Admin", to: "/Admin" },
        { label: "Review Texts", to: "/reviewTexts" },
        { label: "Tenant Texts", to: "/TenantTexts" },
    ];

    const superAdminLinks = [
        { label: "Super Admin", to: "/SuperAdmin" },
        { label: "Create Tenant", to: "/CreateTenant" },
        { label: "Create User", to: "/CreateUser" },
    ];

    return (
        <>
            {isAuthenticated && (
                <div>
                    <Menu
                        id="user-menu"
                        anchorEl={null}
                        open={false}
                        onClose={() => {}}
                        MenuListProps={{ "aria-labelledby": "basic-button" }}
                    >
                        {userType === "content" &&
                            contentUserLinks.map((link) => (
                                <MenuItem key={link.label} onClick={() => {}}>
                                    <Button component={NavLink} to={link.to} color="inherit">
                                        {link.label}
                                    </Button>
                                </MenuItem>
                            ))}
                        {userType === "admin" &&
                            adminLinks.map((link) => (
                                <MenuItem key={link.label} onClick={() => {}}>
                                    <Button component={NavLink} to={link.to} color="inherit">
                                        {link.label}
                                    </Button>
                                </MenuItem>
                            ))}
                        {userType === "superadmin" &&
                            superAdminLinks.map((link) => (
                                <MenuItem key={link.label} onClick={() => {}}>
                                    <Button component={NavLink} to={link.to} color="inherit">
                                        {link.label}
                                    </Button>
                                </MenuItem>
                            ))}
                    </Menu>
                    <LogoutButton />
                </div>
            )}
            {!isAuthenticated && (
                <Button component={NavLink} to="/login" color="inherit">
                    Login
                </Button>
            )}
        </>
    );
}
