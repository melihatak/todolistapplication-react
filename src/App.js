import React, {Component} from 'react';
import './App.css';

export default class ListExample extends Component {

    mockData = [
        {
            name: "Fatih",
            surname: "Totrakanlı"
        },
        {
            name: "MockName",
            surname: "MockSurname"
        }
    ]

    render() {
        return (
            <div className="App">
                <ul>{this.renderList()}</ul>
            </div>
        );
    }

    renderList = () => {
        let data = this.mockData;
        let componentArr = [];

        for(let i = 0; i < data.length; i++) {
            let item = data[i];
            componentArr.push(<li>{item.name + " " + item.surname}</li>)
        }

        return (componentArr);
    }
}