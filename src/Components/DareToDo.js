import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import UserContext from './UserContext'
import InfoModal from './InfoModal'
import logo from '../logo.svg'
import '../styles/card.css'
import Spinner from './Spinner';

class DareToDo extends Component {
    static contextType = UserContext;
    state = {
        index: -1,
        display: '',
        dareToDo: [],
        thirdClass: "",
        zIndex: "",
        descDisplay: "",
        modalShow: false
    }
    setData = () => {
        let data = this.context;
        if (data) {
            if (this.state.dareToDo.length === 0)
                this.setState({
                    dareToDo: data.dares.dareToDo.sort(() => Math.random() - 0.5),
                    display: '',
                })
        }
    }

    //bring the data from context
    componentDidUpdate() {//triggered if data changed in the database
        this.setData()
    }
    componentDidMount() { //triggered after the first render and any state changed
        this.setData()
    }
    //next dare button
    handleClick = e => {
        e.preventDefault()
        this.setState(prevState => {
            let display = prevState.display
            if (prevState.index === prevState.dareToDo.length) {
                display = "none"
            }
            return {
                index: prevState.index + 1,
                display: display,
                thirdClass: "animate__animated animate__fadeOutTopRight animate__faster",
                zIndex: 9,
                descDisplay: "none"
            }
        })
        setTimeout(() => {
            this.setState({
                thirdClass: "animate__animated animate__fadeInTopRight animate__faster",
                zIndex: 100
            })
        }, 300)
    }

    setModalShow = (toggleShow) => {
        this.setState({ modalShow: toggleShow })
    }

    render() {
        let content
        if (this.state.dareToDo.length === 0) {
            content = (
                <Spinner />
            )
        }
        else {
            content =
                (<>
                    <div className="row justify-content-between">
                        <Link className="return-btn" to="/dares"> تبي ترجع؟</Link>
                        <button className="info-btn" onClick={() => this.setModalShow(true)}>اعرفنا اكثر</button>
                    </div>

                    <h1 className="first-do-title">اتحداك تصمل</h1>
                    {/* true */}
                    {
                        this.state.index === this.state.dareToDo.length ?
                            <>
                                <h2 class="last-card">انتهت البطايق، جرب لعبه ثانية</h2>
                                <div class="page-container"></div>
                            </> :
                            // false
                            <>
                                <div className="cardContainer row justify-content-center" >
                                    <div className="card" >
                                        <p style={{ display: this.state.descDisplay }}>التعليمات:</p>
                                        <p style={{ display: this.state.descDisplay }}>
                                            تنفع لمجموعة اشخاص تمر التحديات عليهم واحد واحد والكل مجبور ينفذ ولا ترا بيطلع من اللعبة وراح يتم تدشين لقب الكفو على الصامل.
                        </p>

                                    </div>
                                    <div className={`secound ${this.state.thirdClass}`} style={{ zIndex: this.state.zIndex }}>
                                        <p>   {this.state.dareToDo[this.state.index]}</p>
                                        <img src={logo} className="card-ship" alt="اللوقو" />

                                    </div>
                                </div>
                                <button className="hvr-bob game-buttons" onClick={this.handleClick} style={{ display: this.state.display }}>التالي</button>
                            </>
                    }

                    <InfoModal
                        show={this.state.modalShow}
                        onHide={() => this.setModalShow(false)}
                    />‏
                </>
                )
        }

        return content
    }
}
export default DareToDo;