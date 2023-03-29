import { Button, Menu, MenuItem, Box} from "@mui/material";
import LogoutButton from "../../../components/buttons/LogoutButton/LogoutButton";
import { NavLink } from "react-router-dom";
import React from "react";
import MenuUnstyled, { MenuUnstyledActions } from '@mui/base/MenuUnstyled';
import MenuItemUnstyled, {
  menuItemUnstyledClasses,
} from '@mui/base/MenuItemUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { styled } from '@mui/system';

const blue = {
    100: '#DAECFF',
    200: '#99CCF3',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  };
  
  const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
  };
  
  const StyledListbox = styled('ul')(
    ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    padding: 6px;
    margin: 12px 0;
    min-width: 200px;
    border-radius: 12px;
    overflow: auto;
    outline: 0px;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
    `,
  );
  
  const StyledMenuItem = styled(MenuItemUnstyled)(
    ({ theme }) => `
    list-style: none;
    padding: 8px;
    border-radius: 8px;
    cursor: default;
    user-select: none;
  
    &:last-of-type {
      border-bottom: none;
    }
  
    &.${menuItemUnstyledClasses.focusVisible} {
      outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    }
  
    &.${menuItemUnstyledClasses.disabled} {
      color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
    }
  
    &:hover:not(.${menuItemUnstyledClasses.disabled}) {
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    }
    `,
  );
  
  const TriggerButton = styled('button')(
    ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    min-height: calc(1.5em + 22px);
    border-radius: 12px;
    padding: 12px 16px;
    line-height: 1.5;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 120ms;
  
    &:hover {
      background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      outline: 3px solid ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
    }
    `,
  );
  
  const Popper = styled(PopperUnstyled)`
    z-index: 1;
  `;

interface UserMenuProps{
    userType: String;
}

export default function UserMenu({ userType }: UserMenuProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const isOpen = Boolean(anchorEl);
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const menuActions = React.useRef<MenuUnstyledActions>(null);
    const preventReopen = React.useRef(false);
    
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    
    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (preventReopen.current) {
          event.preventDefault();
          preventReopen.current = false;
          return;
        }
    
        if (isOpen) {
          setAnchorEl(null);
        } else {
          setAnchorEl(event.currentTarget);
        }
      };
    
      const handleButtonMouseDown = () => {
        if (isOpen) {
          // Prevents the menu from reopening right after closing
          // when clicking the button.
          preventReopen.current = true;
        }
      };
    
      const handleButtonKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          event.preventDefault();
          setAnchorEl(event.currentTarget);
          if (event.key === 'ArrowUp') {
            menuActions.current?.highlightLastItem();
          }
        }
      };
    
      const close = () => {
        setAnchorEl(null);
        buttonRef.current!.focus();
      };
    
      const createHandleMenuClick = (menuItem: string) => {
        return () => {
          console.log(`Clicked on ${menuItem}`);
          close();
        };
      };

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
        <Box sx={{ display: 'flex', alignContent: 'center', justifyContent: 'space-evenly', overflow: "hidden", zIndex: 9}}>
            <TriggerButton
                type="button"
                onClick={handleButtonClick}
                onKeyDown={handleButtonKeyDown}
                onMouseDown={handleButtonMouseDown}
                ref={buttonRef}
                aria-controls={isOpen ? 'simple-menu' : undefined}
                aria-expanded={isOpen || undefined}
                aria-haspopup="menu"
            >
                MENU 
            </TriggerButton>
            <MenuUnstyled
                actions={menuActions}
                open={isOpen}
                onClose={close}
                anchorEl={anchorEl}
                slots={{ root: Popper, listbox: StyledListbox }}
                slotProps={{ listbox: { id: 'simple-menu' } }}
            >
                    {userType === "content" &&
                        contentUserLinks.map((link) => (
                            <StyledMenuItem key={link.label} onClick={createHandleMenuClick('Content Link')}>
                                <Button component={NavLink} to={link.to} color="inherit">
                                    {link.label}
                                </Button>
                            </StyledMenuItem >
                        ))}
                    {userType === "admin" &&
                        adminLinks.map((link) => (
                            <StyledMenuItem key={link.label} onClick={createHandleMenuClick('Admin Link')}>
                                <Button component={NavLink} to={link.to} color="inherit">
                                    {link.label}
                                </Button>
                            </StyledMenuItem>
                        ))}
                    {userType === "superadmin" &&
                        superAdminLinks.map((link) => (
                            <StyledMenuItem key={link.label} onClick={createHandleMenuClick('Superadmin Link')}>
                                <Button component={NavLink} to={link.to} color="inherit">
                                    {link.label}
                                </Button>
                            </StyledMenuItem>
                        ))}
                </MenuUnstyled>
                <LogoutButton />
            </Box>
            
        </>
    );
}
