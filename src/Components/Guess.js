import React from 'react'
import { Link } from 'react-router-dom'
import InfoModal from './InfoModal'
import '../styles/buttons.css'

// Transform to Function
function Guess() {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <>
            <div className="page-container">

                <div className="row justify-content-between">
                    <Link className="return-btn" to="/"> تبي ترجع؟</Link>
                    <button className="info-btn" onClick={() => setModalShow(true)}>اعرفنا اكثر</button>
                </div>
                {/* <div style={{ height: 50 }}></div> */}

                <h1 className="logo-name animate__animated animate-wobble"> على طرف لساني</h1>
                <div className="nav-list"></div>

                <div className="row justify-content-between">
                    <div className="col">
                        <Link className="game-buttons hvr-bob" to="/guessWho">حزر مين</Link>
                    </div>
                    <div className="col">
                        <Link className="game-buttons green hvr-bob" to="/guessTheThing">حزر الشي</Link>
                    </div>
                </div>

                <InfoModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </div>
        </>
    );

}

export default Guess;
