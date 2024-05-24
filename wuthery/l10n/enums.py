"""Enums."""

from __future__ import annotations

from enum import StrEnum

__all__ = ("Language",)


class Language(StrEnum):
    """Language enum."""

    EN_US = "en-US"
    """English (United States)."""
    ZH_TW = "zh-TW"
    """Traditional Chinese."""
    ZH_CN = "zh-CN"
    """Simplified Chinese."""
    UA = "uk-UA"
    """Ukrainian."""
    DE = "de-DE"
    """German."""
    ES = "es-ES"
    """Spanish."""
    JA = "ja-JP"
    """Japanese."""
    KO = "ko-KR"
    """Korean."""
