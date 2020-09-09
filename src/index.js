import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Grille extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jaquettes: Array(4).fill(null),
            xIsNext: true,
        };
        for (let i = 0; i < 4; i++) {
            this.state.jaquettes [i] = 'pic'.concat(i + 1, '.jpg');
        }
        ;
    }

    handleClick(i) {
        const squares = this.state.jaquettes.slice();
        squares[i] = this.state.xIsNext ? 'X' : 'O';

        this.setState({squares: squares, xIsNext: !this.state.xIsNext});
    }

    renderSquare(i) {
        return (
            <Square
                value={this.state.jaquettes[i]}
            />
        );
    }

    render() {
        let status;
        return (
            <div>
                <div className="menu">
                    <div className="boutons"></div>
                </div>

                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                </div>
                <div className="board-row">
                    {this.renderSquare(2)}
                    {this.renderSquare(3)}
                </div>
            </div>
        );
    }
}

class Catalogue extends React.Component {
    render() {
        return (
            <div className="catalogue">
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
