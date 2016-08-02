Rudolph
------

This is the core extension behind Dashr.


## Development

```bash
npm install
npm run watch
```

Then navigate to your [Chrome Extensions Page](chrome://extensions) and load the
git repository as an unpacked extension.  Then visiting your new tab page should
load your development version of dashr.

To use widgets that require the Chrome Identity API you will need to generate a
development API key from the Google Developer Console and replace the one in the
manifest.json


## Making your own Widgets

Take a look at our generator [Prancr](https://github.com/dashrlabs/prancr).  Once
you have made a widget, make a Pull Request into this repository adding it as a
dependency and loading it in the `constants.js` file.
