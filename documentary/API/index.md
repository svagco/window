
## API

The package is available by importing its default function:

```js
import Window from '@svag/window'
```

```### window => string
[
  ["options", "WindowOptions"]
]
```

Creates a complete `SVG` representing a macOS window.

<img alt="window of a terminal" src="https://raw.github.com/svagco/window/master/images/window.svg?sanitize=true">

%TYPEDEF types/index.xml%

%EXAMPLE: example/example.js, ../src => @svag/window%

%FORK-svg example example/example%

To generate a window [without a shadow](t), the `noShadow` option can be set. When `minify` attribute is not set to `false`, the whitespace will be removed.

%EXAMPLE: example/no-shadow.js, ../src => @svag/window%

%FORK-svg example example/no-shadow.js%

<img alt="window without a shadow" src="https://raw.github.com/svagco/window/master/images/no-shadow.svg?sanitize=true">
