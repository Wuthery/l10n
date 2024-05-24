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
