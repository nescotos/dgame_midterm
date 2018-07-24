import React, { Component } from 'react';


class Game extends Component{
    state = {
        timer: '',
        finishTime: 0,
        complexity: 100,
        opA: 0,
        opB: 0,
        opCode: '+',
        result: 0,
        answer: 0,
        results: [],
        score: 0
    };

    startPlay = () => {
        this.setState({
            //finishTime: Date.parse(new Date()) + 120000
            finishTime: Date.parse(new Date()) + 60000
        });
        this.generateOperation();
        this.timer = setInterval(this.tick, 500);
        
    }

    generateNumber = () => {
        return Math.floor((Math.random() * this.state.complexity) + 1);
    }

    generateCode = () => {
        const opCode = Math.floor(Math.random() * 10);
        switch(opCode){
            case 0:
            case 1:
            case 2:
                return '+'
            case 3:
            case 4:
            case 5:
                return '-'
            case 6: 
            case 7:
            case 8:
                return '*'
            default:
                return '/'
        }
    }

    generateOperation = () => {
        const opA = this.generateNumber();
        const opB = this.generateNumber();
        const opCode = this.generateCode();
        let result;
        switch(opCode){
            case '+':
                result = opA + opB;
                break;
            case '-':
                result = opA - opB;
                break;
            case '*':
                result = opA * opB;
                break;
            default:
                result = parseInt(opA/opB)
        }
        this.setState({
            opA, opB, opCode, result
        });
    }

    tick = () => {
        let time = this.state.finishTime - Date.parse(new Date());
        time = (time / 1000).toFixed(0);
        if(time <= 0){
            clearInterval(this.timer);
            this.finishGame();
            alert('You are done!');
        }
        this.setState({
            timer: time
        });
    };

    answer = () => {
        console.log(this.state.answer);
        console.log(this.state.result);
        console.log(parseInt(this.state.answer) === this.state.result);
        const submittedAnswer = {
            opA: this.state.opA,
            opB: this.state.opB,
            opCode: this.state.opCode,
            result: this.state.result,
            answer: parseInt(this.state.answer)
        };
        const results = this.state.results;
        results.push(submittedAnswer);
        this.setState({results});
        this.generateOperation();
    }

    finishGame = () => {
        const results = this.state.results;
        const score = results.map((element) => {
            if(element.answer == element.result){
                return this.state.complexity;
            }
            return 0;
        }).reduce((a, b) => {
            return a + b;
        });
        this.setState({
            score, 
            timer: '',
            finishTime: 0,
            complexity: 10,
            opA: 0,
            opB: 0,
            opCode: '+',
            result: 0,
            answer: 0
        });
    };

    render(){
        return(
            <section className="container">
                <div style={{ padding: '60px' }}>
                    <a onClick={this.startPlay} className="button is-large is-fullwidth is-success">Start Playing!</a>
                </div>
                {this.state.timer}
                <h1>{this.state.opA} {this.state.opCode} {this.state.opB}</h1>
                <input  value={this.state.answer} onChange={event => this.setState({answer: event.target.value})}/>
                <button className="button is-link" onClick={this.answer}>Answer</button>
                <h1>Score: {this.state.score}</h1>
            </section>
        );
    }
}

export default Game;