import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import InfoModal from './InfoModal'
import '../styles/buttons.css'
import '../styles/card.css'
import logo from '../logo.svg'

class Wink extends Component {
    state = {
        names: ['', '', ''], // the inital of the players namea array
        characters: ["شايب", "ولد"], // the main characters 
        index: -1, //increased on each click to show the next card
        indexOfNames: 0, //increased on each click to show the next player name
        descDisplay: "", //description display
        animateIt: "", //toggle animation of the card on each click
        zIndex: "", //to send the card backward and bring the next upward
        showForm: true,
        modalShow: false,
    }

    addPlayer = () => {
        this.setState({
            names: [...this.state.names, ""]
        })
    }

    removePlayer = (index) => {
        let newArray = []
        let tempArray = [...this.state.names]
        for (let i = 0; i < tempArray.length; i++) {
            if (i !== index) {
                newArray.push(tempArray[i])
            }
        }
        this.setState({
            names: newArray
        })
    }

    //on player's input register the value
    handleChange = (e, index) => {
        e.preventDefault()
        this.state.names[index] = e.target.value
        this.setState({ names: this.state.names })
    }

    //show the names with assigned characters
    handleSubmit = (e) => {
        e.preventDefault()

        //assign random characters to the palyer
        let leng = this.state.names.length - 2
        for (let i = 0; i < leng; i++) {
            this.setState((prevState) => {
                return {
                    characters: [...prevState.characters, "بنت"].sort(() => Math.random() - 0.5), //suffle the characters
                    showForm: false //hide the form
                }
            })
        }
    }

    //show next name with the assigned character
    handleClick = e => {
        e.preventDefault()
        this.setState(prevState => {
            return {
                index: prevState.index + 1,
                indexOfNames: prevState.indexOfNames + 1,
                animateIt: "animate__animated animate__fadeOutTopRight animate__faster",
                zIndex: 9,
                descDisplay: "none",
            }
        })

        // animate the card after 300 ms
        setTimeout(() => {
            this.setState({
                animateIt: "animate__animated animate__fadeInTopRight animate__faster",
                zIndex: 100
            })
        }, 300)
    }

    // after clicking the card it will be animated as a flip
    handleFlip = e => {
        e.preventDefault()
        this.setState({ animateIt: "animate__animated animate__flipOutY" })
    }

    setModalShow = (toggleShow) => { //show info modal
        this.setState({ modalShow: toggleShow })
    }

    render() {
        let output //output array
        let characters = [...this.state.characters]
        let names = [...this.state.names]
        output = characters.map((ele, index) => {
            return <div>
                أنت يا {names[index]}
                &nbsp; ‏تراك {characters[index]}
            </div>
        })

        return (
            <div className="page-container">
                <div className="row justify-content-between">
                    <Link to="/" className="return-btn">تبي ترجع</Link>
                    <button className="info-btn" onClick={() => this.setModalShow(true)}>اعرفنا اكثر</button>
                </div>
                {this.state.showForm ?
                    <form onSubmit={this.handleSubmit}>
                        {
                            this.state.names.map((name, index) => {
                                return (
                                    <div key={index}>
                                        {/* default three players */}
                                        {index > 2 ?
                                            <>
                                                <input className="playersName" type="text" value={name} onChange={(e) => this.handleChange(e, index)} placeholder="اسم اللاعب"></input>
                                                <i className="fas fa-trash removePlayer" onClick={(e) => this.removePlayer(index)}></i>
                                            </>
                                            : <input className="playersName" style={{ marginLeft: 20 }} type="text" value={name} onChange={(e) => this.handleChange(e, index)} placeholder="اسم اللاعب"></input>}
                                    </div>
                                )
                            })
                        }
                        <i className="fas fa-user-plus" onClick={(e) => this.addPlayer(e)}></i>

                        <button className="game-buttons d-block" style={{ margin: "0 auto" }} type="submit">يلا نلعب</button>

                    </form>
                    : ""}

                {!this.state.showForm ?
                    <>
                        <h2 className="logo-name">
                            {this.state.indexOfNames !== this.state.names.length ?
                                ` عط الجوال ${this.state.names[this.state.indexOfNames]}`
                                : ""}
                        </h2>
                        <div className="cardContainer row justify-content-center">
                            <div className="card">
                                <p style={{ display: this.state.descDisplay }}>التعليمات:</p>

                                <ul style={{ display: this.state.descDisplay }}>

                                    <li><b>الشايب :</b> حاول تقفط الولد قبل لا يغمز لكل البنات</li>
                                    <li><b>الولد :</b>  حاول ماتبين انك ولد عشان مايقفطك الشايب وتقدر تختم البنات بغمزتك</li>
                                    <li><b>البنت :</b> اذا غمز لك الولد لاتبينين مين هو بس قولي انغمز لي</li>
                                </ul>
                            </div>

                            <div className={`secound ${this.state.animateIt}`} style={{ zIndex: this.state.zIndex }} onClick={this.handleFlip}>
                                <p >{output[this.state.index]}&nbsp; لا تنسى تقلب البطاقة</p>
                                <img src={logo} className="card-ship" alt="اللوقو" />

                            </div>
                        </div>
                        {this.state.index !== this.state.names.length - 1 ?
                            <button className="hvr-bob game-buttons" onClick={this.handleClick} >التالي</button>
                            : ""
                        }
                    </>
                    : ""
                }
                <InfoModal
                    show={this.state.modalShow}
                    onHide={() => this.setModalShow(false)}
                />
            </div>
        );
    }
}

export default Wink;
