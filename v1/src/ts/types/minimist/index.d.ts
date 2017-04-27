declare module "minimist" {
    export interface IArgv {
        _: string[];
    }

    export interface IOptions {
        string?: string | string[];
        boolean?: string | string[];
        alias?: { [key: string]: string; };
        "default"?: { [key: string]: string | boolean };
        stopEarly?: boolean;
        "--"?: boolean;
    }

    export default function minimist<T extends IArgv>(args: string[], options: IOptions): T;
}
