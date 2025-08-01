(function() {
    'use strict';

    // --- Configuration ---
    const log = (message) => console.log(`[Gemini Userscript] ${message}`);
    const PROMPT_SELECTOR = '.ql-editor[contenteditable="true"] > p';
    const SUBMIT_BUTTON_SELECTOR = 'button[aria-label="Send message"]';

    log('Script initialized (document-start).');

    // Ensure window.geminiScript object exists
    if (typeof window.geminiScript === 'undefined') {
        window.geminiScript = {};
    }

    // --- Early Execution: Extract prompt and clean URL ---
    const currentUrl = new URL(window.location.href);
    const promptValue = currentUrl.searchParams.get('prompt');

    if (promptValue) {
        log(`Found 'prompt' URL parameter during early execution: "${promptValue}"`);
        window.geminiScript.currentPrompt = promptValue; // Store the prompt
        currentUrl.searchParams.delete('prompt'); // Remove the 'prompt' parameter

        // Replace the URL in the browser's history without reloading
        const cleanUrl = currentUrl.pathname + currentUrl.search + currentUrl.hash;
        history.replaceState(null, '', cleanUrl);
        log(`🧹 URL cleaned. New URL: ${cleanUrl}`);
    } else {
        log("No 'prompt' URL parameter found during early execution. Script is idle for prefill.");
        window.geminiScript.currentPrompt = null; // Ensure it's explicitly null if not found
    }

    /**
     * Finds the prompt input, fills it, finds the submit button, and clicks it.
     * This function will be called AFTER the document is ready.
     * @param {string} textToFill - The prompt text to inject.
     */
    function prefillThenSubmit(textToFill) {
        log('🕵️‍♂️ Starting observer for the input field...');
        const inputObserver = new MutationObserver((mutations, inputObs) => {
            const promptInput = document.querySelector(PROMPT_SELECTOR);
            if (promptInput) {
                log('✅ Step 1: Input field found.');
                inputObs.disconnect();

                // Inject prompt text
                promptInput.textContent = textToFill;
                log(`📝 Text set to: "${textToFill}"`);

                // Now, wait for the submit button to become available
                const submitObserver = new MutationObserver((mutations, submitObs) => {
                    const submitButton = document.querySelector(SUBMIT_BUTTON_SELECTOR);
                    // Also check that it's not disabled
                    if (submitButton && !submitButton.disabled) {
                        log('✅ Step 2: Submit button found and enabled.');
                        submitObs.disconnect();

                        submitButton.click();
                        log('🚀 Prompt submitted!');
                    }
                });

                submitObserver.observe(document.body, {
                    childList: true,
                    subtree: true,
                    attributes: true // Also watch for attribute changes like 'disabled'
                });
            }
        });

        inputObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // --- Main Execution (after document is ready) ---
    // Wait for the DOM to be fully loaded before trying to interact with elements
    document.addEventListener('DOMContentLoaded', () => {
        log('DOMContentLoaded fired. Executing main logic.');
        if (window.geminiScript.currentPrompt) {
            prefillThenSubmit(window.geminiScript.currentPrompt);
        } else {
            log("No prompt stored from early execution. No prefill action needed.");
        }
    });

})();
