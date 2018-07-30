import React, { Component } from 'react';
import web3 from './web3';
import contract from './contract';

class Registration extends Component {
    state = {
        nickname: '',
        loading: false,
        showModal: false,
        modalMessage: 'Install and create an account using Metamask or use Mist Browser'
    }

    createUser = async() => {
        this.setState({ loading: true });
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
            const result = await contract.methods.registerUser(this.state.nickname)
                .send({
                    from: accounts[0]
                });
            this.setState({
                modalMessage: `User ${this.state.nickname} has been created!`,
                showModal: true,
                nickname: ''
            });
        } else {
            this.setState({
                modalMessage: 'Install and create an account using Metamask or use Mist Browser',
                showModal: true
            });
        }
        this.setState({ loading: false });
    }

    render(){
        return(
            <section className="container" style={{ paddingTop: '60px' }}>
                <div>
                    <div className="field">
                        <label className="label">Nickname</label>
                        <input className="input" type="text" value={this.state.nickname} onChange={event => this.setState({ nickname: event.target.value })} />
                    </div>
                    <div className="control">
                        <a onClick={this.createUser} className={`button is-large is-fullwidth is-success ${this.state.loading ? 'is-loading' : ''}`}>Register</a>
                    </div>
                </div>
                {   this.state.showModal && 
                    <div className="modal is-active">
                        <div className="modal-background"></div>
                        <div className="modal-content">
                            <div className="box">
                                <div className="content">
                                    <p>{this.state.modalMessage}</p>
                                </div>
                            </div>
                        </div>
                        <button className="modal-close is-large" aria-label="close" onClick={event => this.setState({showModal: false})}></button>
                    </div>
                }
            </section>
        )
    }
}

export default Registration;