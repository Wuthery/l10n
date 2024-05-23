"""Enums."""

from __future__ import annotations

from enum import StrEnum

__all__ = ("Language",)


class Language(StrEnum):
    """Language enum."""

    EN_US = "en-US"
    """English (United States)."""
    UK_UA = "uk-UA"
    """Ukrainian."""
    ZH_TW = "zh-TW"
    """Traditional Chinese."""
