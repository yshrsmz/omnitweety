'use strict';

const SubCommands = {
    options: {
        name: ':options',
        regex: /^:options(\s*|\s+[\w\W]*)$/,
        description: 'Open options page'
    },
    version: {
        name: ':version',
        regex: /^:version(\s*|\s+[\w\W]*)$/,
        description: 'Show Omnitweety\'s version'
    },
    sl: {
        name: ':sl',
        regex: /^:sl\s+([\w\W]+)$/,
        textRegex: /^:sl\s+([\w\W]+)$/,
        description: 'Post to Slack'
    },
    tw: {
        name: ':tw',
        regex: /^:tw\s+([\w\W]+)$/,
        textRegex: /^:tw\s+([\w\W]+)$/,
        description: 'Post to Twitter'
    },
    share: {
        name: ':share',
        regex: /^:share(\s*|\s+[\w\W]*)$/,
        textRegex: /^:share\s+([\w\W]+)$/,
        description: 'Share url to twitter(and to Slack if configured)'
    },
    sharesl: {
        name: ':sharesl',
        regex: /^:sharesl(\s*|\s+[\w\W]*)$/,
        textRegex: /^:sharesl\s+([\w\W]+)$/,
        description: 'Share url to Slalck(no-op if the Slack integration is disabled)'
    },
    sharetw: {
        name: ':sharetw',
        regex: /^:sharetw(\s*|\s+[\w\W]*)$/,
        textRegex: /^:sharetw\s+([\w\W]+)$/,
        description: 'Share url to Twitter'
    }
};

export default SubCommands;
