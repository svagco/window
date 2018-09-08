
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

%TYPEDEF types/index.xml%

%EXAMPLE: example/example.js, ../src => @svag/window%

%FORK-svg example example/example%

![window-terminal](images/window.svg)

To generate a window [without a shadow](t), the `noShadow` option can be set. When `minify` attribute is not set to `false`, the whitespace will be removed.

%EXAMPLE: example/no-shadow.js, ../src => @svag/window%

%FORK-svg example example/no-shadow.js%

![window-no-shadow](images/no-shadow.svg)
