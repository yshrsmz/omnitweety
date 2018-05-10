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
    }
};


export default SubCommands;
