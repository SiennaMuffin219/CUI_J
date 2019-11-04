enum Action {
    UPDATE = "update",
    CREATE = "create",
    DELETE = "delete",
    UNDEFINED = "undefined"
}

interface ICommand {
    action: Action,
    target: number,
}


export class Command implements ICommand {

    action: Action;
    target: number;

    constructor(action: Action, target: number) {
        this.action = action;
        this.target = target;
    }

    public static parse(data: string): Command {
        const json = JSON.parse(data);
        let action: Action = Action.UNDEFINED;
        Object.keys(Action).forEach((key: string) => {
            // @ts-ignore
            const possibleAction = Action[key];
            if (json['action'] as Action === possibleAction) {
                action = possibleAction;
            }
        });
        return new Command(action, 1);
    }
}