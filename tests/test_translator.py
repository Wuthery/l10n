"""Translator tests."""

import pytest

from wuthery.l10n import Language, Translator


@pytest.mark.asyncio
async def test_translator() -> None:
    """Test the Translator class."""
    translator = Translator()
    await translator.start()
    for lang in Language:
        assert lang in translator.localizations
    await translator.close()


@pytest.mark.asyncio
async def test_translate() -> None:
    """Test the translate method."""
    async with Translator() as translator:
        assert translator.translate(1, Language.EN_US) == "Example string"


@pytest.mark.asyncio
async def test_translate_with_var() -> None:
    """Test the translate method with a variable."""
    async with Translator() as translator:
        assert (
            translator.translate(2, Language.EN_US, variable="Wuthery")
            == "Example string with Wuthery"
        )
