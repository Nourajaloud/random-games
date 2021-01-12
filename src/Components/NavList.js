import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../logo.svg'
import '../styles/navList.css';
import InfoModal from './InfoModal'
import '../styles/buttons.css'


function NavList() {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <>
            <div className="row">
                <button className="info-btn col-1 text-right" onClick={() => setModalShow(true)}> اعرفنا اكثر </button>
            </div>

            <h1 className="logo-name">على <span className="yellow-text">الطايــــر</span></h1>
            <img src={logo} className="logo animate__animated animate__bounceInUp" alt="اللوقو" />

            <div className="row justify-content-center align-items-center‏">

                <div className="col-3 ">
                    <Link className="hvr-bob game-buttons" to="/dares"> قدها ؟</Link>
                </div>

                <div className="col-3">
                    <Link className="hvr-bob game-buttons" to="/guess"> على طرف لساني</Link>
                </div>

                <div className="col-3">
                    <Link className="hvr-bob game-buttons" to="/wink"> غمزة</Link>
                </div>

                <InfoModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </div>
        </>

    );

}

export default NavList;
