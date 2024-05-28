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

### Typescript

```bash
# Clone the repo
git clone https://github.com/Wuthery/l10n

# Install the dependencies
cd wuthery-l10n
npm i
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

```bash
# Install the package
npm i wuthery-l10n
```

On server side (layout.tsx):

```ts
import { I18nProvider, Language } from 'wuthery-l10n/client';
import {
    LANGUAGE_KEY,
    detectReqLanguage,
    fetchTranslation,
} from 'wuthery-l10n/server';
import { getCookie } from 'cookies-next';
import { headers, cookies } from 'next/headers';


const Layout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    let language = getCookie(LANGUAGE_KEY, { cookies }) as Language || undefined;
    if (!language) {
        const reqHeaders = headers();
        language = detectReqLanguage(reqHeaders.get('accept-language') || '');
    }
    const translation = await fetchTranslation(language);
    return (
        <I18nProvider
            initialLanguage={language}
            initialTranslations={{[language]: translation}}
        >
            <html>
                <body>
                    {children}
                </body>
            </html>
        </I18nProvider>
    );
};
export default Layout;
```

In component:

```ts
'use client';
import { useTranslation, Language } from 'wuthery-l10n/client';

const Component = () => {
    const { changeLanguage, t, language } = useTranslation();
    return (
        <div>
            <h1>{t('test_str', {'variable': 0})}</h1>
            <button onClick={() => changeLanguage(language == Language.ZH_TW ? Language.EN_US : Language.ZH_TW)}>Change language</button>
        </div>
    );
};
export default Component;
```

## String conventions

- Use `-` instead of `_` to seperate words, e.g. `test-str` instead of `test_str`
- Use `/` to seperate scopes, e.g. `scope/test-str`
