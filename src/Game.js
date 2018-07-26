import React, { Component } from 'react';


class Game extends Component{
    state = {
        timer: '',
        finishTime: 0,
        complexity: 10,
        opA: 0,
        opB: 0,
        opCode: '+',
        result: 0,
        answer: '',
        results: [],
        score: 0,
        status: 'initial'
    };

    startPlay = () => {
        this.setState({
            finishTime: Date.parse(new Date()) + 120000
        });
        this.generateOperation();
        this.timer = setInterval(this.tick, 500);
        this.setState({status: 'game'});
        
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
                result = parseInt(opA/opB);
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

    answer = (event) => {
        event.preventDefault();
        console.log(this.state.result);
        console.log(parseInt(this.state.answer));
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
        this.setState({answer: ''});
        
    }

    finishGame = () => {
        const results = this.state.results;
        let score;
        if(results.length > 0){
            score = results.map((element) => {
                if(element.answer === element.result){
                    return this.state.complexity;
                }
                return 0;
            }).reduce((a, b) => {
                return a + b;
            });
        }else{
            score = 0;
        }
        this.setState({
            score, 
            timer: '',
            finishTime: 0,
            complexity: 10,
            opA: 0,
            opB: 0,
            opCode: '+',
            result: 0,
            answer: 0,
            status: 'done'
        });
    };

    render(){
        return(
            <section className="container" style={{ paddingTop: '60px' }}>
                {
                    this.state.status === 'initial' &&
                    <div>
                        <div className="field">
                            <label className="label">Complexity: </label>
                            <div className="control">
                                <div className="select">
                                    <select onChange={event => {this.setState({complexity: parseInt(event.target.value)})}}>
                                        <option value="10">Mortal</option>
                                        <option value="100">Magician</option>
                                        <option value="1000">Wizard</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="control">
                            <a onClick={this.startPlay} className="button is-large is-fullwidth is-success">Start Playing!</a>                    
                        </div>
                    </div>
                }
                {
                    this.state.status === 'game' &&
                    <div>
                        <div className="field has-text-centered">                
                            <label className="label">{this.state.timer}</label>
                        </div>
                        <div className="columns">
                            <div className="column">
                            </div>
                            <div className="column">
                                <div className="field has-text-centered">
                                    <label className="label">{this.state.opA} {this.state.opCode} {this.state.opB}</label>
                                </div>
                                <form onSubmit={this.answer}>
                                    <div className="field">
                                        <input className="input" value={this.state.answer} onChange={event => this.setState({ answer: event.target.value })} />
                                    </div>
                                    <div className="control">
                                        <button className="button is-link">Answer</button>
                                    </div>
                                </form> 
                            </div>
                            <div className="column">
                            </div>
                        </div>  
                    </div>
                }
                {
                    this.state.status === 'done' &&
                    <section class="hero is-info is-large has-text-centered">
                        <div class="hero-body">
                            <div class="container">
                                <h1 class="title">
                                    Your Score
                                </h1>
                                <h2 class="subtitle">
                                    {this.state.score}
                                </h2>
                            </div>
                        </div>
                    </section>     

                }
            </section>
        );
    }
}

export default Game;