import React, { Component } from 'react';
import web3 from './web3';
import contract from './contract';
import { Link } from 'react-router-dom';

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
        status: 'initial',
        account: '',
        showNoAccountModal: false,
        showInProgressModal: false
    };

    startPlay = async() => {
        const accounts = await web3.eth.getAccounts();
        let userExist = false;
        if(accounts[0]){
            userExist = await contract.methods.userExist(accounts[0])
                .call();  
        }
        if (userExist){
            this.setState({
                finishTime: Date.parse(new Date()) + 120000,
                account: accounts[0]
            });
            this.generateOperation();
            this.timer = setInterval(this.tick, 500);
            this.setState({ status: 'game' });
        }else{
            this.setState({
                showNoAccountModal: true
            });
        }
        
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
        }
        this.setState({
            timer: time
        });
    };

    answer = (event) => {
        event.preventDefault();
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

    finishGame = async() => {
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
            showInProgressModal: true
        });
        await contract.methods.sendScore(score)
            .send({
                from: this.state.account
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
            answer: 0,
            status: 'done',
            showInProgressModal: false
        });
    };

    render(){
        return(
            <section className="container" style={{ paddingTop: '60px' }}>
                {
                    this.state.status === 'initial' &&
                    <div>
                        <article className="message">
                            <div className="message-header">
                                <p>Instructions</p>
                            </div>
                            <div className="message-body">
                                <p>Solve the greatest amount of math challenges in <strong>2 minutes</strong>; you'll have <strong>addition, substraction, multiplication and division.</strong></p>
                                <p>Select a complexity, Mortal: numbers <strong>between 1 - 10</strong>; Magician: numbers <strong>between 1 - 100</strong> and Wizard <strong>between 1 - 1000</strong>.</p>
                                <p>In the division your answer should be just the quotient: <i>i.e. 19/9 should be <strong>2</strong></i> and so on.</p>
                            </div>
                        </article>
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
                    <section className="hero is-info is-large has-text-centered">
                        <div className="hero-body">
                            <div className="container">
                                <h1 className="title">
                                    Your Score
                                </h1>
                                <h2 className="subtitle">
                                    {this.state.score}
                                </h2>
                            </div>
                        </div>
                    </section>     

                }                
                { this.state.showNoAccountModal &&
                    <div className="modal is-active">
                        <div className="modal-background"></div>
                        <div className="modal-content">
                            <div className="box">
                                <div className="content">
                                    <p>You need an Account to Play this Game.</p>
                                    <Link to="/registration" className="navbar-item">Go to registration</Link>
                                </div>
                            </div>
                        </div>                        
                    </div>
                }
                { this.state.showInProgressModal &&
                    <div className="modal is-active">
                        <div className="modal-background"></div>
                        <div className="modal-content">
                            <div className="box">
                                <div className="content has-text-centered">
                                    <p>We are saving your score, please hold on!</p>
                                    <button className="button is-link is-loading"></button>
                                </div>
                            </div>
                        </div>                        
                    </div>
                }
            </section>
        );
    }
}

export default Game;