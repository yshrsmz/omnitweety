declare module "remote-redux-devtools" {
    export function composeWithDevTools(config: IConfig): any;

    export interface IConfig {
        realtime?: boolean;
        port?: number;
        hostname?: string;
    }
}
