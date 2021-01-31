import React, { Component } from 'react'
import UserContext from './UserContext'
import { Link } from 'react-router-dom'
import InfoModal from './InfoModal'
import '../styles/card.css'
import logo from '../logo.svg'
import Spinner from './Spinner';

class GuessTheThing extends Component {
    static contextType = UserContext;
    state = {
        guessTheThing: [], //array of guesses
        index: -1,//increased on each click to show the next card
        display: "",
        modalShow: false,
        time: 0, // timer
        timeDisplay: 'none',
        animation: "",
        transform: "",
        id: "",
        startTimer: "none"


    }

    setData = () => { //get data from context and set the array
        let data = this.context;
        if (data) {
            if (this.state.guessTheThing.length === 0)
                // shuffle the array
                this.setState({ guessTheThing: data.guess.guessTheThing.sort(() => Math.random() - 0.5) })
        }
    }

    componentDidUpdate() { //triggered if data changed in the database
        this.setData()
    }
    componentDidMount() { //triggered after the first render and any state changed
        this.setData()
    }


    handleTimer = e => {
        e.preventDefault()
        let interval = setInterval(() => {

            if (this.state.time <= 0 || this.state.index === this.state.guessTheThing.length) {
                clearInterval(interval);
                this.setState({
                    timeDisplay: 'none'
                })
            }

            this.setState(prevState => ({
                time: prevState.time - 1
            }))

        }, 1000);
        this.setState({
            id: interval,
            animation: "countdown 6s linear infinite forwards",
            transform: "rotateY(-180deg) rotateZ(-90deg)",
            startTimer: "none",
            display: ""
        })
        console.log("test")
    }

    //handle the click of 'next' button
    handleClick = e => {
        e.preventDefault()
        clearInterval(this.state.id);

        this.setState(prevState => {
            let display = "none"
            if (prevState.index === prevState.guessTheThing.length) {
                display = "none"
            }

            return {
                time: 5, //start at time 5
                index: prevState.index + 1, //increase to show next card
                display: display,
                timeDisplay: '', //show time
                animated: "animate__animated animate__fadeOutTopRight animate__faster",
                zIndex: 9,
                descDisplay: "none", // hide instructions
                transform: "",
                animation: "",
                startTimer: "",

            }
        })

        // animate the card after 300 ms
        setTimeout(() => {
            this.setState({
                animated: "animate__animated animate__fadeInTopRight animate__faster",
                zIndex: 100 //to front
            })
        }, 300)
    }

    setModalShow = (toggleShow) => {
        this.setState({ modalShow: toggleShow }) //website info 
    }

    render() {
        let output //output array
        output = this.state.guessTheThing.map((item, index) => {
            return (
                <>
                    <p key={index}>{item.name}</p>
                    <p>{item.menu}</p>
                </>
            )
        })

        let content
        // if the guess the thing array is empty show the spinner
        if (this.state.guessTheThing.length === 0) {
            content = (
                <Spinner />
            )
        }
        else {
            content =
                (
                    <>
                        <div className="row justify-content-between">
                            <Link to="/guess" className="return-btn">تبي ترجع؟</Link>
                            <button className="info-btn" onClick={() => this.setModalShow(true)}>اعرفنا اكثر</button>
                        </div>

                        <h1 className="logo-name">حزر الشيء :</h1>
                        {
                            this.state.index === output.length ?
                                <>
                                    <h2 class="last-card">انتهت البطايق، جرب لعبه ثانية</h2>
                                    <div class="page-container"></div>
                                </> :

                                // if the guess the thing array is not empty show the content
                                <>
                                    <div className="cardContainer row justify-content-center" >
                                        <div className="card guess-the-thing-text" >
                                            <p style={{ display: this.state.descDisplay }}>التعليمات:</p>
                                            <p style={{ display: this.state.descDisplay }}>
                                                بتسأل الي بيلعبون اسئلة ولازم يجاوبون قبل مايداهمهم الوقت.. بس ترا ساعدناك وعطيناك اجابات تنقذك لو توهقت وماجاء على بالك شيء، ولا تقولها! احتفظ فيها لين ينتهي الوقت.</p>
                                        </div>

                                        <div className={`secound secound-img ${this.state.animated}`} style={{ zIndex: this.state.zIndex }}>
                                            {/* timer */}
                                            <div class="countdown" style={{ display: this.state.timeDisplay }}>
                                                <div class="countdown-number"><p >{this.state.time}</p></div>
                                                <svg style={{ transform: this.state.transform }}><circle r="18" cx="20" cy="20" style={{ animation: this.state.animation }}></circle></svg>
                                            </div>
                                            {output[this.state.index]}
                                            <img src={logo} className="card-ship guess-ship" alt="اللوقو" />
                                        </div>
                                    </div>
                                    <button className="hvr-bob game-buttons" onClick={this.handleTimer} style={{ display: this.state.startTimer }}>ابدأ الوقت</button>

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

export default GuessTheThing;
