interface ICommandOption {
    alias: string;
    isAlias?: boolean;
}

interface ICommandOptions {
    [ key: string ]: ICommandOption;
}

const options: ICommandOptions = {
    share: { alias: "s" },
    twitter: { alias: "t" },
    slack: { alias: "l" },
    version: { alias: "v" },
    options: { alias: "o" },
};

interface IArgs {
    flags: {
        [key: string]: boolean;
    };
    content: string;
}

export interface IParsedStatus {
    share: boolean;
    slack: boolean;
    twitter: boolean;
    version: boolean;
    options: boolean;
    status: string;
}

function parseCliStyleArgs(args: string, opts: ICommandOptions): IArgs {
    const splittedArgs = args.split(" ");

    const resultFlags: { [key: string]: boolean } = {};
    let metUnknownOrNonCommand = false;
    let index = 0;

    splittedArgs.forEach((arg) => {
        if (metUnknownOrNonCommand) {
            return;
        }
        if (/^--.+$/.test(arg)) {
            // "--twitter"
            const key = arg.match(/^--(.+)/)[1];

            if (opts.hasOwnProperty(key)) {
                let option = opts[key];
                resultFlags[option.isAlias ? option.alias : key] = true;
            } else {
                metUnknownOrNonCommand = true;
            }
        } else if (/^-[^-]+/.test(arg)) {
            // "-ts"
            var letters = arg.slice(1, arg.length).split('');

            letters.forEach((letter) => {
                if (opts.hasOwnProperty(letter)) {
                    let option = opts[letter];
                    resultFlags[option.isAlias ? option.alias : letter] = true;
                } else {
                    if (letters.length == 1) {
                        metUnknownOrNonCommand = true;
                    }
                }
            });
        } else {
            metUnknownOrNonCommand = true;
        }
        if (!metUnknownOrNonCommand) {
                index++;
        }
    });
    const other = splittedArgs.slice(index, splittedArgs.length);

    return {
        flags: resultFlags,
        content: other.join(" "),
    };
}

function parseVimStyleArgs(args: string, opts: ICommandOptions): IArgs {
    const resultFlags: { [key: string]: boolean } = {};
    const splittedArgs = args.trim().split(" ");
    const command = splittedArgs[0].trim();

    let hasCommand = false;
    if (command.startsWith(":")) {
        const key = command.slice(1, command.length);
        if (opts.hasOwnProperty(key)) {
            resultFlags[key] = true;
            hasCommand = true;
        }
    }

    const other = hasCommand ? splittedArgs.slice(1, splittedArgs.length) : [args];

    return {
        flags: resultFlags,
        content: other.join(" "),
    };
}

function invertOptions(options: ICommandOptions): ICommandOptions {
    let invertedOptions: { [key: string]: ICommandOption } = {};
    Object.keys(options).forEach((key) => {
        const option = options[key];
        invertedOptions[key] = option;
        if (option.alias !== undefined) {
            invertedOptions[option.alias] = { alias: key, isAlias: !option.isAlias };
        }
    });
    return invertedOptions;
}

function merge(argA: IArgs, argB: IArgs): IArgs {
    const keysA = Object.keys(argA.flags);
    const keysB = Object.keys(argB.flags);

    const mergedArgs: IArgs = {
        flags: Object.assign({}, argA.flags),
        content: argA.content
    };

    let updated = false;
    Object.keys(argB.flags).forEach((key) => {
        if (argB.flags[key] && !argA.flags[key]) {
            // option is true in argB, and false(not set) in argA
            mergedArgs.flags[key] = true;
            updated = true;
        }
    });

    if (updated) {
        mergedArgs.content = argB.content;
    }

    return mergedArgs;
}

export default function parseStatus(value: string): IParsedStatus {
    let result: IParsedStatus;
    const cliArgs = parseCliStyleArgs(value, invertOptions(options));
    const cliFlags = cliArgs.flags;
    let mergedArgs: IArgs = cliArgs;

    // if all flags are false, then user might use old subcommands
    if (!(cliFlags.share || cliFlags.twitter || cliFlags.slack || cliFlags.version || cliFlags.options)) {
        const vimArgs = parseVimStyleArgs(value, options);
        mergedArgs = merge(cliArgs, vimArgs);
    }
    const mergedFlags = mergedArgs.flags;

    return {
        share: !!mergedFlags.share,
        slack: !!mergedFlags.slack,
        twitter: !!mergedFlags.twitter,
        version: !!mergedFlags.version,
        options: !!mergedFlags.options,
        status: mergedArgs.content,
    };
}
