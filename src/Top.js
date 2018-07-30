import React, { Component } from 'react';
import contract from './contract';

class Top extends Component{
    state = {
        wizards: [],
        loading: true
    }

    componentDidMount = async() => {
        const top = [];
        let topAddress = await contract.methods.getTop().call();
        topAddress = topAddress.filter((address, index, self) => {
            return address !== "0x0000000000000000000000000000000000000000" && index === self.indexOf(address);
        });
        for(let i = 0; i < topAddress.length; i++){
            const address = topAddress[i];
            const score = await contract.methods.score(address).call();
            const nickName = await contract.methods.nickName(address).call();
            const elementTop = {
                score,
                nickName,
                address
            };
            top.push(elementTop);
        }
        this.setState({
            wizards: top,
            loading: false
        });
    }
    render(){
        return(
             <section className="hero is-success is-fullheight" style={{ paddingTop: '60px' }}>
                <div className="hero-body">
                    <div className="container">
                    <h1 className="title">
                        Top 10 Wizards
                    </h1>
                    <h2 className="subtitle">
                    {
                        this.state.loading &&
                        <button className="button is-success is-loading"></button>
                    }
                    {
                        !this.state.loading &&
                        this.state.wizards.map((wizard) => {
                            return(
                                <li key={wizard.address}>{wizard.nickName} | {wizard.score} points | {wizard.address}</li>
                            )
                        })
                    }
                    </h2>
                    </div>
                </div>
            </section>
        )
    }
}

export default Top;