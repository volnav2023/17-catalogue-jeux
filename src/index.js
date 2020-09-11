import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import donneesJson from './Data.json';

class Liste extends React.Component {

    renderGameCard(i) {
        return (
            <div>
                <img alt={"jaquette"} src={`./assets/img/${this.props.etat.donneesJson.games[i].jaquette}`}/>
                <h1>{this.props.etat.donneesJson.games[i].title}</h1>
                <h2>{this.props.etat.donneesJson.games[i].date}</h2>
            </div>
        );
    }

    render() {
        return (
            <div className="board-row">
                {this.props.etat.donneesJson.games.map((item, i) => this.renderGameCard(i))}
            </div>
        );
    }
}

class Bouton extends React.Component {

    inverserTri = () => {
        console.log("Ici inverserTri:");
        console.log(this.props.etat.donneesJson);
        console.log(this.props.etat.sensDuTri);
        if (this.props.etat.sensDuTri === "AZ") {
            this.props.etat.sensDuTri = "ZA";
        } else {
            this.props.etat.sensDuTri = "AZ";
        }
        this.setState({ key: Math.random() });
    };

    render() {
        return (
            <button key={"bouton"} className="bouton" onClick={this.inverserTri}>
                Inverser le Tri {this.props.etat.sensDuTri}
            </button>
        );
    }
}

class Catalogue extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            donneesJson: donneesJson,
            sensDuTri: "AZ",
        };
        console.log("Ici Catalogue:");
        console.log(this.state.donneesJson);
        console.log(this.state.sensDuTri);
    }

    render() {
        return (
            <div className="catalogue">
                <div className="menu">
                    <Bouton etat={this.state}/>
                </div>
                <div className="liste">
                    <Liste etat={this.state}/>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    // <React.StrictMode>
    <>
        <Catalogue/>
    </>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
