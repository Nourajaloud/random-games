import React from 'react'
import { Link } from 'react-router-dom'
import InfoModal from './InfoModal'
import '../styles/buttons.css'
import '../index.css'

// Transform to Function
function Dares() {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
            <div className="page-container">
                <div className="row justify-content-between">
                    <Link className="return-btn" to="/"> تبي ترجع؟</Link>
                    <button className="info-btn" onClick={() => setModalShow(true)}>اعرفنا اكثر</button>
                </div>
                <div className="row justify-content-center">

                    <h1 className="logo-name animate__animated animate-wobble" > قدها؟ </h1>
                </div>
                <div className="nav-list" ></div>

                <div className="row justify-content-between">

                    <div className="col">
                        <Link className="hvr-bob game-buttons" to="/firstToDo">لك ولا للذيب</Link>
                    </div>

                    <div className="col">
                        <Link className="hvr-bob game-buttons" to="/dareToDo">اتحداك تصمل</Link>
                    </div>
                    <div className="nav-list" ></div>
                </div>

                <InfoModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </div>
        </>
    );

}

export default Dares;
