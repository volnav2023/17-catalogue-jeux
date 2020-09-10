import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import donneesJson from './Data.json';

class Grille extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            donneesJsondansState: donneesJson,
        };
        console.log(this.state.donneesJsondansState);

        // for (let i = 0; i < 4; i++) {
        //     this.state.jaquettes[i] = '/assets/img/pic'.concat(i + 1, '.jpg');
        // }
    }

    handleClick(i) {
        const jaquettes = this.state.jaquettes.slice();
        this.setState({jaquettesdansState: jaquettes});
    }

    renderGameCard(i) {
        return (
            <div>
                <img src={`./assets/img/${this.state.donneesJsondansState.games[i].jaquette}`}/>
                <h1>{this.state.donneesJsondansState.games[i].title}</h1>
                <h2>{this.state.donneesJsondansState.games[i].date}</h2>
            </div>
        );
    }

    render() {
        return (
            <div className="board-row">
                {this.state.donneesJsondansState.games.map((item, i) => this.renderGameCard(i))}
            </div>
        );
    }
}

// class Consigne extends React.Component {
//
//     constructor(props) {
//         super(props);
//         };
//
//     render() {
//         return (
//             <button className="consigne" onClick={props.onClicktata}>
//                 {props.valeur}
//             </button>
//         );
//     }
//
// }

class Catalogue extends React.Component {
    render() {
        return (
            <div className="catalogue">
                <div className="consigne">
                    {/*<Consigne/>*/}
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
