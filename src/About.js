import React, {Component} from 'react';

class About extends Component {
     render(){
        return(
             <section className="hero is-success is-fullheight" style={{ paddingTop: '60px' }}>
                <div className="hero-body">
                    <div className="container">
                    <h1 className="title">
                        Credits
                    </h1>
                    <h2 className="subtitle">
                        Created by Néstor Escoto - Midterm Project Batch 2 of Decentralized Applications by Siraj
                    </h2>
                        <p><a href="https://github.com/nestor94/dgame_midterm">Github Repo</a></p>
                    </div>
                </div>
            </section>
        )
    }
}

export default About;