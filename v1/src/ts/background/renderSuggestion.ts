const renderSuggestion = () => {
    chrome.omnibox.setDefaultSuggestion({
        description: "",
    });
};

export default renderSuggestion;
