import minimist, { IArgv, IOptions } from "minimist";

const options: IOptions = {
    boolean: ["t", "s", "l", "v", "o"],
    alias: {
        t: "twitter",
        s: "share",
        l: "slack",
        v: "version",
        o: "options",
    },
    stopEarly: true,
};

interface IArgs extends IArgv {
    share: boolean;
    twitter: boolean;
    slack: boolean;
    version: boolean;
    options: boolean;
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
    const args: IArgs = minimist<IArgs>(value.split(" "), options);

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
        status: args._.join(" "),
    };
}
