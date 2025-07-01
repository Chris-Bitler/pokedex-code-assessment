# UI Assessment - Pokédex (Senior)

Requirements for this can be found on the home page of the app or [here](./src/README.md)

# Notes from Chris on implementation
- Installed MUI dependencies for for MUI Dialog
- Left comment regarding necessity of memoization on properties on the `data` result object
- Added jest tests into `src/app/tests/App.test.tsx` but as they are not required for the assessment and to make sure I got this turned in with plenty of time to spare, I did not add the things necessary to run these tests

Github pages hosted version of project: [here](https://code-assessment.cbitler.io/)

Note: Going directly to non-base routes does not working on the github pages domain due to how github pages works. To test something like going to `https://code-assessment.cbitler.io/pokemon/name/Bulbasaur`, run the code locally and go to `http://localhost:3000/pokemon/name/Bulbasaur` - this should show that the direct routing works, but github page's server-side routing interferes with this