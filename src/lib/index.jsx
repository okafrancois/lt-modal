import React, {useEffect} from 'react';
import PropTypes from "prop-types";


/**
 * Component configuration
 */

let BASE_CLASS = 'lt-modal';

const CLASSES = {
    MODAL: `${BASE_CLASS}`,
    WRAPPER: `${BASE_CLASS}__wrapper`,
    CLOSE: `${BASE_CLASS}__close`,
    HEADER: `${BASE_CLASS}__header`,
    BODY: `${BASE_CLASS}__body`,
};

const MODIFIERS = {
    OPENED: '--opened',
}

/**
 * Component definition
 */

/**
 @function

 @param {Object} props - The properties of the Re modal component
 @param {ReactNode} props.children - The content to be rendered within the modal body
 @param {string|ReactNode} props.title - The title of the modal. Can be a string or a ReactNode.
 @param {boolean} props.state - The state of the modal, whether it is opened or closed
 @param {Function} props.closeHandler - The function to handle the closing of the modal
 @returns {ReactNode} - Returns a modal component with a header containing the provided title (if provided), and a body containing the provided children
 */
const LtModal = ({children, title, state, closeHandler}) => {
    let headerContent = null;
    const modalStyles = {
        background: "rgba(0, 0, 0, 0.3)",
        position: "fixed",
        inset: "0",
        visibility: `${state ? 'visible' : 'hidden'}`,
        zIndex: "999",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1.8rem",
    }
    const closeBtnStyles = {
        border: "none",
        cursor: "pointer",
        aspectRatio: "1/1",
        width: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: "1rem",
        right: "1rem"
    }
    const modalWrapperStyles = {
        background: "#fff",
        borderRadius: "5px",
        overflow: "hidden",
        width: "100%",
        position: "relative"
    }
    const modalBodyStyles = {
        padding: "1.5rem",
    }
    const modalHeaderStyles = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1.5rem",
        background: "lightgray",
    }

    /**
     @function
     @param {string|ReactNode} content - The content to be formatted as a header. Can be a string or a ReactNode.
     @returns {JSX.Element} - Returns a formatted header, either a string wrapped in a paragraph element or the original ReactNode.
     */
    const formatHeaderContent = (content) => {
        if (typeof content === 'string') {
            return <p>{content}</p>
        } else {
            return content;
        }
    }

    if (title) {
        headerContent = formatHeaderContent(title);
    }

    const outsideClickHandler = (e) => {
        if (e.target.classList.contains(CLASSES.MODAL)) {
            closeHandler();
        }
    }

    const ESCKeyHandler = (e) => {
        if (e.key === 'Escape') {
            e.preventDefault();
            closeHandler();
        }
    }

    useEffect(() => {
        if (state) {
            document.addEventListener('keydown', ESCKeyHandler);
        } else {
            document.removeEventListener('keydown', ESCKeyHandler);
        }
    })

    return (
        <div className={`${CLASSES.MODAL} ${state ? MODIFIERS.OPENED : ''}`} style={modalStyles} onClick={outsideClickHandler}>
            <div className={`${CLASSES.WRAPPER}`} style={modalWrapperStyles}>
                <button className={`${CLASSES.CLOSE}`} style={closeBtnStyles} onClick={closeHandler}>
                    X
                </button>
                {
                    title &&
                    <div className={`${CLASSES.HEADER}`} style={modalHeaderStyles}>
                        {headerContent}
                    </div>
                }
                <div className={`${CLASSES.BODY}`} style={modalBodyStyles}>
                    {children}
                </div>
            </div>
        </div>
    );
};

/**
 * Set props types
 */

LtModal.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    state: PropTypes.bool.isRequired,
    closeHandler: PropTypes.func.isRequired
}

/**
 * Init and export
 */
export default LtModal;
