declare module "command-line-args" {

    export = commandLineArgs;

    function commandLineArgs(optionDefinitions: commandLineArgs.IOptionDefinition[], options?: commandLineArgs.IOptions): any;

    namespace commandLineArgs {
        interface IOptionDefinition {
            name: string;
            alias: string;
            type: any;
            multiple?: boolean;
            defaultOption?: boolean;
            defaultValue?: boolean | string | number;
        }

        interface IOptions {
            partial?: boolean;
            argv?: string[];
        }
    }
}
