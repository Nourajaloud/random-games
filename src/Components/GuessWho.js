import React, { Component } from 'react'
import UserContext from './UserContext'
import { Link } from 'react-router-dom'
import InfoModal from './InfoModal'
import '../styles/card.css'
import logo from '../logo.svg'
import Spinner from './Spinner';

class GuessWho extends Component {
    static contextType = UserContext;
    state = {
        guessWho: [],
        items: null,
        index: -1,
        zIndex: "",
        display: '',
        descDisplay: "",
        modalShow: false
    }


    setData = () => {
        let data = this.context;
        if (data) {
            if (this.state.guessWho.length === 0)
                this.setState({ guessWho: data.guess.guessWho.sort(() => Math.random() - 0.5) })
        }
    }

    //bring the data from context
    componentDidUpdate() { //triggered if data changed in the database
        this.setData()
    }

    componentDidMount() {//triggered after the first render and any state changed
        this.setData()
    }

    handleClick = e => {
        e.preventDefault()
        this.setState(prevState => {
            let display = prevState.display
            if (prevState.index === prevState.guessWho.length) {
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
        // const [modalShow, setModalShow] = React.useState(false);
        let output
        output = this.state.guessWho.map((item, index) => {
            return <div key={index}>
                <img className="card-img" src={item.img} />

                <div>{item.name}</div>
            </div>
        })


        let content
        if (this.state.guessWho.length === 0) {
            content = (
                <Spinner />
            )
        }
        else {
            content =
                (<>

                    <div className="row justify-content-between">
                        <Link className="return-btn" to="/guess"> تبي ترجع؟</Link>
                        <button className="info-btn" onClick={() => this.setModalShow(true)}>اعرفنا اكثر</button>
                    </div>

                    <h1 className="first-do-title">حزر فزر :</h1>
                    {/* true */}
                    {
                        this.state.index === output.length ?
                            <>
                                <h2 class="last-card">انتهت البطايق، ادخل لعبه ثانية</h2>
                                <div class="page-container"></div>
                            </> :
                            // false
                            <>
                                <div className="cardContainer row justify-content-center" >
                                    <div className="card" >
                                        <p style={{ display: this.state.descDisplay }}>التعليمات:</p>
                                        <p style={{ display: this.state.descDisplay }}>
                                            مافيها شروط بس حاول تلمح لخويك او للباقين مين شفت وخلهم يجيبونها صح.

                </p>

                                    </div>
                                    <div className={`secound secound-img ${this.state.thirdClass}`} style={{ zIndex: this.state.zIndex }}>
                                        <p>  {output[this.state.index]} </p>

                                        <img src={logo} className="card-ship guess-ship" alt="اللوقو" />

                                    </div>
                                </div>
                                <button className="hvr-bob game-buttons" onClick={this.handleClick} style={{ display: this.state.display }}>التالي</button>
                            </>
                    }


                    <InfoModal
                        show={this.state.modalShow}
                        onHide={() => this.setModalShow(false)}
                    />
                </>
                )
        }

        return content
    }
}


export default GuessWho;
