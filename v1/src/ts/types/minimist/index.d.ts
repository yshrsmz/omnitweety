declare module "minimist" {
    export = minimist;

    function minimist<T extends minimist.IArgv>(args: string[], options: minimist.IOptions): T;

    namespace minimist {
        interface IArgv {
            _: string[];
        }
        interface IOptions {
            string?: string | string[];
            boolean?: string | string[];
            alias?: { [key: string]: string; };
            "default"?: { [key: string]: string | boolean };
            stopEarly?: boolean;
            "--"?: boolean;
        }
    }
}
