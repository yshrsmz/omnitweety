import configDataSource from './ConfigDataSource';
import TweetTemplate from './TweetTemplate';

class TweetTemplateRepository {

    public get(): TweetTemplate {
        const prefix = configDataSource.getStatusPrefix();
        return new TweetTemplate(prefix);
    }

    public set(template: TweetTemplate) {
        configDataSource.setStatusPrefix(template.prefix);
    }

    public clear() {
        configDataSource.clearStatusPrefix();
    }
}

export default new TweetTemplateRepository();
