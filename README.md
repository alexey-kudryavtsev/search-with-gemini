# Search with Gemini

This tool lets you use the Google Gemini website as a search engine directly from your browser's URL/search bar.

When you use the configured search engine, the Gemini page will open with your query as the first message in a new chat.

## Installation

You can install this tool either as a Firefox Extension or as a Userscript.

### Option 1: Firefox Extension

You can install the extension directly from the [Mozilla Add-on store](https://addons.mozilla.org/).

### Option 2: Userscript

1.  Install a userscript manager for your browser, such as [Tampermonkey](https://www.tampermonkey.net/) or [Violentmonkey](https://violentmonkey.github.io/).
2.  Install the `search-with-gemini.user.js` script in your userscript manager. Or install from [greasyfork](https://greasyfork.org/en/scripts/543805-search-with-gemini)

## Usage

### If you installed the Firefox Extension:

The extension automatically registers "Gemini" as a new search engine in your browser with the keyword `gem`. You can start using it from your browser's search bar immediately.

### If you installed the Userscript:

You need to manually add a custom search engine in your browser's settings. Use the following URL for the search engine:

```
https://gemini.google.com/?prompt=%s
```

Once added, you can select it as your search engine and use it from the browser's search bar.

**Note:** Gemini will use the last model you selected (e.g., Pro, Flash, etc.) for the new chat.
