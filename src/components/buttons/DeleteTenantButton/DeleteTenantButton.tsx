import { Button } from '@mui/material';
import Tenant from '../../../types/Tenant';
import { useState } from 'react';

interface DeleteTenantButtonProps {
    handleDelete: () => void;
    tenant: Tenant;
}

export default function DeleteTenantButton(props: DeleteTenantButtonProps) {
    const [confirmDelete, setConfirmDelete] = useState(false);

    return (
    <>
        {!confirmDelete && (
        <Button variant="contained" color="primary" onClick={() => setConfirmDelete(true)}>
            Delete {props.tenant.name}
        </Button>
        )}
        {confirmDelete && (
        <>
            <p>Are you sure you want to delete this tenant?</p>
            <Button variant="contained" color="primary" onClick={props.handleDelete}>
                Yes
            </Button>
            <Button variant="contained" color="secondary" onClick={() => setConfirmDelete(false)}>
                No
            </Button>
        </>
        )}
    </>
    );
}
