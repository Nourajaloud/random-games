import React from 'react'
import UserContext from './../UserContext'

class Dares extends React.Component {
    static contextType = UserContext;
    state = {
        index: -1,
        display: '',
        daresData: [],
        thirdClass: "",
        zIndex: "",
        descDisplay: "",
        gameData: this.props.gameData
    }
    setData = () => {
        let data = this.context;
        let str = this.state.gameData
        if (data) {
            // const newData = `${data}.${dares}.${str}`
            if (this.state.daresData.length === 0)
                this.setState({
                    daresData: data.dares[this.state.gameData].sort(() => Math.random() - 0.5),
                    display: '',
                })
            console.log('set Data => ', this.state.daresData)
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
            if (prevState.index === prevState.daresData.length) {
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
    render() {
        console.log('Render => ', this.state.daresData)

        const Component = this.props.component
        return (
            <Component
                descDisplay={this.state.descDisplay}
                handleClick={this.handleClick}
                index={this.state.index}
                zIndex={this.state.zIndex}
                thirdClass={this.state.thirdClass}
                daresData={this.state.daresData}
                display={this.state.display} {...this.props} />
        )
    }
}

export function withDares(component, optionsObj) {
    return function (props) {
        return (
            <Dares component={component} gameData={optionsObj.dataSource} {...props} />
        )
    }
}