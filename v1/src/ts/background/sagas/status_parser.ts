import * as commandLineArgs from "command-line-args";
import minimist, { IOptions, IArgv} from "../../common/minimist";

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
        share: boolean;
        twitter: boolean;
        slack: boolean;
        version: boolean;
        options: boolean;
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

function parseCliStyleArgs(args: string, opts: ICommandOptions): {flags: { [key: string]: boolean}, other: string} {
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
            var key = arg.match(/^--(.+)/)[1];

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
        other: other.join(" "),
    };
}

export default function parseStatus(value: string): IParsedStatus {
    let invertedOptions: { [key: string]: ICommandOption } = {};
    Object.keys(options).forEach((key) => {
        const option = options[key];
        invertedOptions[key] = option;
        if (option.alias !== undefined) {
            invertedOptions[option.alias] = { alias: key, isAlias: !option.isAlias };
        }
    });
    const args = parseCliStyleArgs(value, invertedOptions);
    const flags = args.flags;
    // if all flags are false, then user might use old subcommands

    /**
     * TODO: handle old sub commands
     *
     * - [ ] :share
     * - [ ] :options
     * - [ ] :version
     */
    return {
        share: !!flags.share,
        slack: !!flags.slack,
        twitter: !!flags.twitter,
        version: !!flags.version,
        options: !!flags.options,
        status: args.other,
    };
}
