import * as minimist from "minimist";
import * as commandLineArgs from "command-line-args";

const options: minimist.IOptions = {
    boolean: true,
    alias: {
        twitter: "t",
        share: "s",
        slack: "l",
        version: "v",
        options: "o",
        // t: "twitter",
        // s: "share",
        // l: "slack",
        // v: "version",
        // o: "options",
    },
    stopEarly: true,
    unknown: (arg: string):boolean => {
        console.log("arg", arg);
        return !(arg.startsWith("-") || arg.startsWith("--"));
    }
};

interface IArgs extends minimist.IArgv {
    share: boolean;
    twitter: boolean;
    slack: boolean;
    version: boolean;
    options: boolean;
    _unknown: string[];
}

export interface IParsedStatus {
    share: boolean;
    slack: boolean;
    twitter: boolean;
    version: boolean;
    options: boolean;
    status: string;
}

export default function parseStatus(value: string): IParsedStatus {
    // const args: IArgs = minimist<IArgs>(value.split(" "), options);
    const args: IArgs = commandLineArgs([
        { name: "twitter", alias: "t", type: Boolean, defaultValue: false },
        { name: "share", alias: "s", type: Boolean, defaultValue: false },
        { name: "slack", alias: "l", type: Boolean, defaultValue: false },
        { name: "version", alias: "v", type: Boolean, defaultValue: false },
        { name: "options", alias: "o", type: Boolean, defaultValue: false },
    ], {
        partial: true,
        argv: value.split(" "),
    });

    // if all flags are false, then user might use old subcommands

    /**
     * TODO: handle old sub commands
     *
     * - [ ] :share
     * - [ ] :options
     * - [ ] :version
     */
    return {
        share: args.share,
        slack: args.slack,
        twitter: args.twitter,
        version: args.version,
        options: args.options,
        status: args._unknown.join(" "),
    };
}
