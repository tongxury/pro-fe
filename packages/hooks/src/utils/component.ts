import React, {HTMLAttributes, ReactNode} from "react";


function cloneElement(component: ReactNode, props: HTMLAttributes<any>): ReactNode {

    return React.Children.map(component, (child) => {
        if (!React.isValidElement(child)) {
            return null;
        }
        const childProps = {
            ...child.props,
            ...props
            // onClick: () => setOpen(true)
        };
        return React.cloneElement(child, childProps);
    })
}
