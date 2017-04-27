import minimist, { IArgv, IOptions } from "minimist";

const options: IOptions = {
    boolean: ["t", "s", "l"],
    alias: {
        t: "twitter",
        s: "share",
        l: "slack",
    },
    stopEarly: true,
};

interface IArgs extends IArgv {
    share: boolean;
    twitter: boolean;
    slack: boolean;
}

export interface IParsedStatus {
    share: boolean;
    slack: boolean;
    twitter: boolean;
    status: string;
}

export default function parseStatus(value: string): IParsedStatus {
    const args: IArgs = minimist<IArgs>(value.split(" "), options);

    return {
        share: args.share,
        slack: args.slack,
        twitter: args.twitter,
        status: args._.join(" "),
    };
}
