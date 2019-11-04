import {FormatMode, StringTools} from "./StringTools";

interface HasToLog {
    info: boolean,
    debug: boolean,
    error: boolean,
    warn: boolean
}


const print = {
    reset: "\x1b[0m",

    modifier: {
        bright: "\x1b[1m",
        dim: "\x1b[2m",
        underscore: "\x1b[4m",
        blink: "\x1b[5m",
        reverse: "\x1b[7m",
        hidden: "\x1b[8m",
    },

    fore: {
        black: "\x1b[30m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m",
    },
    back: {
        black: "\x1b[40m",
        red: "\x1b[41m",
        green: "\x1b[42m",
        yellow: "\x1b[43m",
        blue: "\x1b[44m",
        magenta: "\x1b[45m",
        cyan: "\x1b[46m",
        white: "\x1b[47m"
    }
};

const defaultState: HasToLog = {
    info: true,
    debug: false,
    error: true,
    warn: true
};

export enum EventSources {
    SERVER = "server",
    CLIENT = "client"
}


export class Logger {

    private logging: HasToLog;

    private module: string;

    constructor(module: string, logging: HasToLog = defaultState) {
        this.logging = logging;
        this.module = module;
    }

    public event(eventName: string, source: EventSources, value: any) {
        let sourceColor = "";

        switch (source) {
            case EventSources.SERVER:
                sourceColor = print.fore.cyan;
                break;

            case EventSources.CLIENT:
                sourceColor = print.fore.magenta;
                break;

        }
        this.log(`${print.back.black}${print.fore.red}${this.title("EVENT")} ${print.reset}[${sourceColor}${source}${print.reset}:${print.fore.green}${eventName}${print.reset}] ${value}`);

    }

    public connection(clientSocket: any, state: boolean) {
        const address = clientSocket.request.connection.remoteAddress;
        const port = clientSocket.request.connection.remotePort;

        const status = state ? "\nCONNECT" : "DISCONNECT";

        this.log(`${print.back.black}${print.fore.red}${this.title(status)} ${print.reset}${print.fore.magenta}${address}${print.reset}:${print.fore.green}${port}${print.reset}`);


    }

    public log(message?: any) {
        if (this.logging.info) {
            if (this.module !== "") console.log(this.module, message);
            else console.log(message);
        }
    }

    public debug(message?: any) {
        if (this.logging.debug) {
            if (this.module !== "") console.debug(this.module, message);
            else console.debug(message);
        }

    }

    public error(message?: any) {
        if (this.logging.error) {
            if (this.module !== "") console.error(this.module, message);
            else console.error(message);
        }
    }

    public warn(message?: any) {
        if (this.logging.warn) {
            if (this.module !== "") console.warn(this.module, message);
            else console.warn(message);
        }
    }

    private title(str: string) {
        return StringTools.format(str, 20, FormatMode.RIGHT)
    }
}