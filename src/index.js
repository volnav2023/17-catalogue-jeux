import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
// import donneesJson from './Data.json';
import axios from 'axios';

// const axios = require('axios');

class Liste extends React.Component {

    renderGameCard(i) {
        return (
            <div>
                <img key={i.toString()} alt={"jaquette"}
                     src={`./assets/img/${this.props.etat.liste[i].jaquette}`}/>
                <h1>{this.props.etat.liste[i].title}</h1>
                <h2>{this.props.etat.liste[i].date}</h2>
            </div>
        );
    }

    render() {
        console.log("Ici Liste.render : this.props");
        console.log(this.props);
        // debugger;
        return (
            <div className="board-row">
                {this.props.etat.liste.map((item, i) =>
                    this.renderGameCard(i))}
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
        // console.log("Ici Bouton.sortBy:");
        // console.log(this.props.etat.donneesJson.games);
        if (direction === "AZ") {
            this.props.etat.liste.sort(this.compareBy('title'));
        } else {
            this.props.etat.liste.reverse(this.compareBy('title'));
        }
        // this.setState({listeTriee : arrayCopy}); //--> ne fonctionne pas car c'est le state du Catalogue qu'il faut mettre à jour
        // Catalogue.setState({listeTriee : arrayCopy});    //--> ne fonctionne pas
        // Catalogue.setCatalogueState(arrayCopy);   //--> ne fonctionne pas
        //La bonne solution ci-dessous, un callback de la méthode passée en paramètre par Catalogue lorsqu'il appelle Bouton
        this.props.surClique(this.props.etat.liste);
        // console.log(this.props.etat.donneesJson.games); //--> tri non visible car props et state ne changent pas de valeurs avant un ouveau render
        // console.log("Ici Bouton.sortBy:");
        // console.log(this.state.donneesJson);
        // console.log(this.state.sensDuTri);
    }

    // Syntax avec arrow function sans quoi this.props.etat n'est pas définie dans méthode inverserTri'
    inverserTri = () => {
        // console.log("Ici Bouton.inverserTri:");
        // console.log(this.props.etat.liste);
        // console.log(this.props.etat.sensDuTri);
        if (this.props.etat.sensDuTri === "AZ") {
            this.props.etat.sensDuTri = "ZA";
        } else {
            this.props.etat.sensDuTri = "AZ";
        }
        this.sortBy("title", this.props.etat.sensDuTri);

        this.setState({key: Math.random()});    // Pour forcer rafraîchissement (rerender) de Bouton
    };

    render() {
        console.log("Ici Bouton.render : this.props");
        console.log(this.props);
        return (
            <button key={"bouton"} className="bouton" onClick={this.inverserTri}>
                Inverser le Tri : {this.props.etat.sensDuTri}
            </button>
        );
    }
}

class Catalogue extends React.Component {

    constructor(props) {
        super(props);
        // Initialise this.state pour éviter de planter au premier render
        // qui a lieu avant que les données ne soient lues depuis
        // l'API http://127.0.0.1:8000/games dans componentDidMount
        // L'initialisation peut-être à vide.
        // this.state = {
        //     liste: [
        //         {"title": "Assassin\u0027s Creed", "date": "2009", "jaquette": "pic1.jpg"},
        //         {"title": "Infamous: Second Son", "date": "2014", "jaquette": "pic3.jpg"},
        //         {"title": "Monster Hunter World", "date": "2018", "jaquette": "pic4.jpg"},
        //         {"title": "God of War", "date": "2018", "jaquette": "pic2.jpg"}
        //     ],
        //     sensDuTri: "AZ",
        //     listeTriee: [
        //         {"title": "Assassin\u0027s Creed", "date": "2009", "jaquette": "pic1.jpg"},
        //         {"title": "Infamous: Second Son", "date": "2014", "jaquette": "pic3.jpg"},
        //         {"title": "Monster Hunter World", "date": "2018", "jaquette": "pic4.jpg"},
        //         {"title": "God of War", "date": "2018", "jaquette": "pic2.jpg"}
        //     ],
        // };
        this.state = {
            liste: [],
            sensDuTri: "AZ",
        };
        // console.log("Ici Catalogue.constructor : this.state");
        // console.log(this.state);
    }

    componentDidMount() {
        console.log("Ici Catalogue.componentDidMount : this.state avant axios");
        console.log(this.state);
        // debugger;
        axios.get('http://127.0.0.1:8000/game')
            .then(response => {
                    console.log("Ici axios.get : response.data est un tableau de 4 collections");
                    console.log(response.data);
                    console.log("Ici axios.get : response.data[0] est le premier élément du tableau de 4");
                    console.log(response.data[0]);
                    console.log("Ici axios.get : response.data[0].title");
                    console.log(response.data[0].title);
                    console.log("Ici axios.get : response.data[0][0]");
                    console.log(response.data[0][0]);
                    // debugger;
                    // let reponseFormattee = [];
                    // reponseFormattee = response.data;
                    // reponseFormattee[0] = [
                    //     response.data[0][0],
                    //     response.data[0][1],
                    //     response.data[0][2],
                    // ];
                    // reponseFormattee[0] = [
                    //     response.data[0].title,
                    //     response.data[0].date,
                    //     response.data[0].jaquette,
                    // ];
                    // let test = reponseFormattee[0][0];

                    // console.log("Ici axios.get : reponseFormattee");
                    // console.log(reponseFormattee);
                    this.setState({liste: response.data})
                }
            )
            .catch(error => console.log(error));
        console.log("Ici Catalogue.componentDidMount : this.state après axios");
        console.log(this.state);
    }

    // Nécessaire pour forcer un render de Catalogue à chaque click sur Bouton
    setCatalogueState = (array) => {
        this.setState({liste: array})
    }

    render() {
        console.log("Ici Catalogue.render : this.state");
        console.log(this.state);
        return (
            <div className="catalogue">
                {/*on passe la méthode setCatalogueState à Bouton,*/}
                {/*elle se retrouve dans this.props.surClique à l'intérieur de Bouton*/}
                {/*Bouton va faire un callback de cette méthode en lui passant le tableau this.props.etat.liste après l'avoir trié*/}
                <Bouton surClique={this.setCatalogueState} etat={this.state}/>
                {/*on passe this.state à Liste, il se retrouve dans this.props.etat à l'intérieur de Liste*!/*/}
                {/*console.log("Ici Catalogue.render : appel Liste");*/}
                <Liste etat={this.state}/>
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