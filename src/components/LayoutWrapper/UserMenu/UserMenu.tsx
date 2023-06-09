import LogoutButton from "../../../components/buttons/LogoutButton/LogoutButton";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { createTheme, styled } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useAuth } from "../../../hooks/useAuth";

interface Link {
  label: string;
  to: string;
}
interface UserMenuProps{
  userType: string | null;
}

export default function UserMenu({ userType }: UserMenuProps) {
  const { tenant } = useAuth() || {};
  const contentUserLinks: Link[] = [
    { label: "User", to: "/User" },
    { label: "Tenant Texts", to: "/TenantTexts" },
  ];
  
  const adminLinks: Link[] = [
    { label: "Admin", to: "/Admin" },
    { label: "User", to: "/User" },
    { label: "Review Texts", to: "/ReviewTexts" },
    { label: "Tenant Texts", to: "/TenantTexts" },
    { label: "Create User", to: tenant?.id ? `/CreateUser/${tenant.id}` : "#" },
    { label: "Tenant Settings", to: "/TenantSettings" },
    { label: "Tenant Categories", to: "/TenantTextCategories" },
  ];
  
  const superAdminLinks: Link[] = [
    { label: "Super Admin", to: "/SuperAdmin" },
    { label: "Create Tenant", to: "/CreateTenant" },
  ];

  const [open, setOpen] = useState(false);

  const links: Record<string, Link[]> = {
    user: contentUserLinks,
    admin: adminLinks,
    superadmin: superAdminLinks,
  };

  const theme = createTheme();

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton onClick={() => setOpen(true)} sx={{ mr: 2 }}>
            <MenuIcon sx={{color:'white'}} />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Translatify
          </Typography>
          {userType !== null ? <LogoutButton /> : <></>}          
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ width: drawerWidth, flexShrink: 0 }}
      >
        <DrawerHeader>
          <IconButton onClick={() => setOpen(false)}>
            {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {
          userType !== null ?
        <List>
          {links[userType]?.map(({ label, to }) => (
            <ListItem key={label} component="a" href={to}>
              <ListItemText primary={label} />
            </ListItem>
          ))}
        </List>
         :
          <ListItem key={'Login'} component="a" href={'/login'}>
            <ListItemText primary={'Login'} />
          </ListItem>
        }
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </>
  );
};

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
    open?: boolean;
    }>(({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: 300,
    }),
    marginLeft: 0,
    ...(open && {
    marginLeft: drawerWidth,
    transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.easeOut,
    duration: 300,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));
