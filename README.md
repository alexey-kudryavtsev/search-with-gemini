# Search with Gemini Userscript
Simple userscript for Violentmonkey/Tampermonkey that lets you use Google Gemini webpage as a search engine.

# Usage
- Install userscript
- Add a custom search engine in your browser with search url equal to `https://gemini.google.com/?prompt=%s`
- Use this search engine from your browser's URL/search bar. When you press enter, Gemini page will open with your query as the first message in a new chat
- Enjoy.

Note: Gemini will use the last used model for the chat (Pro or Flash or whatever you have in the dropdown). 

## Firefox Extension
A Firefox extension is available in the `ff-ext` folder. It registers Gemini as a search engine with the keyword `gem` and uses the same auto-fill logic as the userscript. You can build it with `npm run build` from the `ff-ext` directory or load the folder directly as a temporary add-on.
