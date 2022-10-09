import { useState } from "react";

export const Togglable = ({
    showButtonLabel,
    hideButtonLabel,
    margin,
    children,
}) => {
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: visible && "none" };
    const showWhenVisible = { display: !visible && "none" };

    const toggleVisibilite = () => {
        setVisible(!visible);
    };

    return (
        <div>
            <div style={hideWhenVisible}>
                <button
                    className={margin && `togglable-button-margin`}
                    onClick={toggleVisibilite}
                >
                    {showButtonLabel}
                </button>
            </div>
            <div style={showWhenVisible}>
                {children}
                <button
                    className={margin && `togglable-button-margin`}
                    onClick={toggleVisibilite}
                >
                    {hideButtonLabel}
                </button>
            </div>
        </div>
    );
};
