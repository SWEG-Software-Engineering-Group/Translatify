import {useState, useEffect} from "react";

export default function templateForNewComponent(props: type) {
    //HOOKS
    const [componentState, useComponentState] = useState<typeFor_componentState>(initialState);
    useEffect(()=>{
        //algorithm 
    }, [])


    //LOGIC
    //(functions)


    //UI
    return(
        <>
            <InnerComponent />
        </>
    )
}