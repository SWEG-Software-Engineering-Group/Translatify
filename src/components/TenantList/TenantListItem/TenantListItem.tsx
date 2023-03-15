import Tenant from "../../../types/Tenant";

export interface TenantListItemProps {
    tenant: Tenant;
}

export default function TenantListItem(props: Tenant) {
    //HOOKS

    //LOGIC

    //UI
    return(
        <div>
            <p><span>Nome tenant: {props.name && props.name}</span></p>
        </div>
    )
};