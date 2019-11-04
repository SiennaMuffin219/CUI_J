export enum FormatMode {
    LEFT,
    RIGHT,
    MIX
}

export class StringTools {
    public static format(string: string, nbChars: number, mode: FormatMode): string {
        let charToAdd = nbChars - string.length;
        switch (mode) {
            case FormatMode.LEFT:
                return " ".repeat(charToAdd) + string;
            case FormatMode.RIGHT:
                return string + " ".repeat(charToAdd);
            case FormatMode.MIX:
                return charToAdd % 2 === 0
                    ? " ".repeat(charToAdd / 2) + string + " ".repeat(charToAdd / 2)
                    : " ".repeat(charToAdd / 2) + string + " ".repeat(charToAdd / 2 + 1);

        }
    }
}