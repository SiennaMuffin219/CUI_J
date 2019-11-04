import React, {Component} from 'react';
import openSocket from 'socket.io-client';
import connectionSetting from './shared/config/connections.json'
import {EventSources, Logger} from "./shared/Logger";

interface IProps {

}

interface IState {
    socket: SocketIOClient.Socket
}

class App extends Component<IProps, IState> {

    logger = new Logger("App");

    componentDidMount(): void {
        this.setState({
            socket: openSocket(`${connectionSetting["socket-front"].host}:${connectionSetting["socket-front"].port}`)
        }, () => {
            this.state.socket.on("test", (content: any) => {
                this.logger.event("test", EventSources.SERVER, content);
            });

            this.state.socket.emit("test", "Coucou c'est le client");
        });
    }

    render() {
        return (
            <div className="App">
               Test Socket.IO 2
            </div>
        );
    }
}

export default App;
