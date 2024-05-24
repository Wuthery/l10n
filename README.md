# l10n

Storage of localization files for Wuthery services, with Python and TS packages to interact with the data

## Setting up the development environment

### Python

```bash
# Clone the repo
git clone https://github.com/Wuthery/l10n

# Install the dependencies
cd l10n
poetry install --with dev --no-root

# If you want to run the tests locally
poetry install --with test --no-root

# Install pre-commit
pre-commit install
```

## Usage

### Python Package

```bash
# Install the package
poetry add wuthery.l10n
```

```py
from wuthery.l10n import Translator, Language

async with Translator() as translator:
    translation = translator.translate(2, Language.EN_US, variable="Wuthery")
```

### TypeScript Package

```ts
'use client'; // Component must be client-side
import { useTranslation, Language } from 'wuthery-l10n';

export const Component = () => {
    const { changeLanguage, getTranslation, language } = useTranslation();
    return (
        <div>
            <h1>{getTranslation(2, {'variable': 0})}</h1>
            <button onClick={() => changeLanguage(language == Language.ZH_TW ? Language.EN_US : Language.ZH_TW)}>Change language</button>
        </div>
    );
};
```