import * as Configs from "../common/config";

import accessTokenRepository from "../data/access_token_repository";

console.log(Configs.TwitterConfig.API_KEY, Configs.TwitterConfig.API_SECRET, accessTokenRepository.isAuthorized());
