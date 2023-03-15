import { ListItem, ListItemText } from '@mui/material';
import Tenant from '../../../types/Tenant';

export interface TenantListItemProps {
    tenant: Tenant;
}

export default function TenantListItem({ tenant }: TenantListItemProps) {
    // UI
    return (
        <ListItem>
            <ListItemText primary={`Nome tenant: ${tenant.name}`} />
        </ListItem>
    );
}
