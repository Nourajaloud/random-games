import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import InfoModal from './InfoModal'
import '../styles/buttons.css'
import '../styles/card.css'
import logo from '../logo.svg'

class Wink extends Component {
    state = {
        names: ['', '', ''],
        characters: ["شايب", "ولد"],
        showForm: true,
        index: -1,
        descDisplay: "",
        thirdClass: "",
        zIndex: "",
        modalShow: false,
        indexOfNames: 0,
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

    handleChange = (e, index) => {
        e.preventDefault()
        this.state.names[index] = e.target.value
        this.setState({ names: this.state.names })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        //random
        let leng = this.state.names.length - 2
        for (let i = 0; i < leng; i++) {
            this.setState((prevState) => {
                return {
                    characters: [...prevState.characters, "بنت"].sort(() => Math.random() - 0.5),
                    showForm: false
                }
            })
        }
    }

    handleClick = e => {
        e.preventDefault()
        this.setState(prevState => {
            return {
                index: prevState.index + 1,
                indexOfNames: prevState.indexOfNames + 1,
                thirdClass: "animate__animated animate__fadeOutTopRight animate__faster",
                zIndex: 9,
                descDisplay: "none",
            }
        })
        setTimeout(() => {
            this.setState({
                thirdClass: "animate__animated animate__fadeInTopRight animate__faster",
                zIndex: 100
            })
        }, 300)
    }

    handleFlip = e => {
        e.preventDefault()
        this.setState({ thirdClass: "animate__animated animate__flipOutY" })
    }

    setModalShow = (toggleShow) => {
        this.setState({ modalShow: toggleShow })
    }

    render() {
        let output
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

                                    <li>  <b>الشايب :</b> حاول تقفط الولد قبل لا يغمز لكل البنات</li>
                                    <li><b>الولد :</b>  حاول ماتبين انك ولد عشان مايقفطك الشايب وتقدر تختم البنات بغمزتك</li>
                                    <li><b>البنت :</b> اذا غمز لك الولد لاتبينين مين هو بس قولي انغمز لي</li>
                                </ul>


                            </div>
                            <div className={`secound ${this.state.thirdClass}`} style={{ zIndex: this.state.zIndex }} onClick={this.handleFlip}>
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
