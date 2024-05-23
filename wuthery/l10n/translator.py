"""Translator module."""

from __future__ import annotations

import logging
from typing import Any, Self

import aiohttp
import yaml

from .enums import Language

__all__ = ("Translator",)

SOURCE_LANG = Language.EN_US
FILE_LOCATION = "https://raw.githubusercontent.com/Wuthery/l10n/main/l10n/{lang}.yml"
LOGGER_ = logging.getLogger(__name__)


class Translator:
    """Translator class.

    This class is used to translate keys to different languages.

    Attributes:
        localizations: A dictionary containing the localization files.
        _session: The aiohttp ClientSession.
    """

    def __init__(self) -> None:
        self.localizations: dict[Language, dict[int, str]] = {}
        self._session: aiohttp.ClientSession | None = None

    async def __aenter__(self) -> Self:
        await self.start()
        return self

    async def __aexit__(self, exc_type, exc_value, traceback) -> None:  # noqa: ANN001
        await self.close()

    @property
    def session(self) -> aiohttp.ClientSession:
        """Get the aiohttp ClientSession."""
        if self._session is None:
            msg = "Translator is not started."
            raise RuntimeError(msg)
        return self._session

    async def start(self) -> None:
        """Start the aiohttp ClientSession and fetch the localization files."""
        self._session = aiohttp.ClientSession()
        await self.fetch_localizations()

    async def close(self) -> None:
        """Close the aiohttp ClientSession."""
        await self.session.close()

    async def fetch_localizations(self) -> None:
        """Fetch localizations from Wuthery's l10n repository."""
        for lang in Language:
            async with self.session.get(FILE_LOCATION.format(lang=lang.value)) as resp:
                if resp.status != 200:
                    LOGGER_.warning("Failed to fetch localization file for %s.", lang)
                    continue

                data = await resp.text()
                self.localizations[lang] = yaml.safe_load(data)
                LOGGER_.info("Fetched localization for %s.", lang)

    def translate(
        self, key: int, lang: Language | str, *, use_fallback: bool = True, **kwargs: Any
    ) -> str:
        """Translate a key to a language.

        Args:
            key: The key to translate.
            lang: The language to translate to.
            use_fallback: Whether to fall back to the source language if the key is not found in the target language.
            kwargs: Additional parameters to pass to the translated string.

        Returns:
            The translated string.
        """
        # Validate the language
        if isinstance(lang, str):
            try:
                lang = Language(lang)
            except ValueError as e:
                valid_langs = ", ".join([lang.value for lang in Language])
                msg = f"Invalid language passed in: {lang}, valid languages: {valid_langs}."
                raise ValueError(msg) from e

        if lang not in self.localizations:
            msg = f"Language {lang} not found in localization files."
            raise ValueError(msg)

        # Translate the key
        if key not in self.localizations[lang]:
            if use_fallback:
                msg = f"Key {key} not found in localization file for {lang}. Falling back to {SOURCE_LANG}."
                LOGGER_.warning(msg)
                return self.translate(key, lang, use_fallback=False)

            msg = f"Key {key} not found in localization for {lang}."
            raise ValueError(msg)

        translation = self.localizations[lang][key]
        try:
            translation = translation.format(**kwargs)
        except KeyError as e:
            msg = f"Missing key in translation: {e}."
            raise KeyError(msg) from e

        return translation
