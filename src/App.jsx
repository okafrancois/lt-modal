import React, {useState} from 'react'
import LtModal from "./lib";

const App = () => {
    const [modalState, setModalState] = useState(false)

    const handleModalToggle = (e) => {
        if (e) {
            e.preventDefault();
        }
        setModalState(!modalState)
    }

    const openModal = (e) => {
        if (e) {
            e.preventDefault();
        }
        setModalState(!modalState)
    }

    return (
        <div className="app">
            <button onClick={openModal}>
                <i className="fa fa-user-circle"></i>
                Add Employee
            </button>
            <LtModal title={"Add new employee"} state={modalState} closeHandler={handleModalToggle}>
                <div>Some modal content</div>
            </LtModal>
        </div>
    )
}

export default App
