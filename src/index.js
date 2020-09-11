import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import donneesJson from './Data.json';

class Liste extends React.Component {

    renderGameCard(i) {
        return (
            <div>
                <img alt={"jaquette"} src={`./assets/img/${this.props.etat.listeTriee[i].jaquette}`}/>
                <h1>{this.props.etat.listeTriee[i].title}</h1>
                <h2>{this.props.etat.listeTriee[i].date}</h2>
            </div>
        );
    }

    render() {
        return (
            <div className="board-row">
                {this.props.etat.listeTriee.map((item, i) => this.renderGameCard(i))}
            </div>
        );
    }
}

class Bouton extends React.Component {

    compareBy(key) {
        return function (a, b) {
            if ("" + a[key] < ("" + b[key])) return -1;
            if ("" + a[key] > ("" + b[key])) return 1;
            return 0;
        };
    }

    sortBy(key, direction) {
        let arrayCopy = [...this.props.etat.donneesJson.games];
        console.log("Ici Bouton.sortBy:");
        console.log(arrayCopy);
        if (direction === "AZ") {
            arrayCopy.sort(this.compareBy('title'));
        } else {
            arrayCopy.reverse(this.compareBy('title'));
        }
        // this.setState({listeTriee : arrayCopy}); --> ne fonctionne pas car c'est le state du Catalogue qu'il faut mettre à jour
        // Catalogue.setState({listeTriee : arrayCopy});    --> ne fonctionne pas non plus
        //Catalogue.setCatalogueState(arrayCopy);
        this.props.surClique(arrayCopy);
        console.log(arrayCopy);
        console.log("Ici Bouton.sortBy:");
        // console.log(this.state.donneesJson);
        // console.log(this.state.sensDuTri);
    }

    inverserTri = () => {   // Syntax avec arrow function sans quoi this.props.etat n'est pas définie dans méthode inverserTri'
        console.log("Ici Bouton.inverserTri:");
        console.log(this.props.etat.donneesJson);
        console.log(this.props.etat.sensDuTri);
        if (this.props.etat.sensDuTri === "AZ") {
            this.props.etat.sensDuTri = "ZA";
        } else {
            this.props.etat.sensDuTri = "AZ";
        }
        this.sortBy("title", this.props.etat.sensDuTri);

        this.setState({key: Math.random()});    // Pour forcer rafraîchissement (rerender) de Bouton
        // Catalogue.render();
    };

    render() {
        console.log(this.props)
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
            listeTriee: donneesJson.games,
        };
        console.log("Ici Catalogue:");
        console.log(this.state.donneesJson);
        console.log(this.state.sensDuTri);
    }

    setCatalogueState = (array) => {
        this.setState({listeTriee : array})
    }

    render() {
        return (
            <div className="catalogue">
                <div className="menu">
                    <Bouton surClique={this.setCatalogueState} etat={this.state}/>
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
