import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import jsondata from './Data.json';

class Grille extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datajson: jsondata,
        };
        console.log(this.state.datajson);

        // for (let i = 0; i < 4; i++) {
        //     this.state.jaquettes[i] = '/assets/img/pic'.concat(i + 1, '.jpg');
        // }
    }

    handleClick(i) {
        const jaquettes = this.state.jaquettes.slice();
        this.setState({jaquettes: jaquettes, xIsNext: !this.state.xIsNext});
    }

    renderGameCard(i) {
        return (
            <div>
                <img src={`./assets/img/${this.state.datajson.games[i].jaquette}`}/>
                <h1>{this.state.datajson.games[i].title}</h1>
                <h2>{this.state.datajson.games[i].date}</h2>
            </div>
        );
    }

    render() {
        let status;
        return (
            <div className="board-row">
                {this.state.datajson.games.map((item, i) => this.renderGameCard(i))}
            </div>
        );
    }
}

class Catalogue extends React.Component {
    render() {
        return (
            <div className="catalogue">
                <div className="menu">
                </div>
                <div className="grille">
                    <Grille/>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <React.StrictMode>
        <Catalogue/>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
