"""Sort localizations strings alphabetically."""

import logging
import pathlib

import yaml

logging.basicConfig(level=logging.INFO, format="%(message)s")

LOGGER_ = logging.getLogger(__name__)
FOLDER = "./l10n"

for file in pathlib.Path(FOLDER).iterdir():
    if file.suffix == ".yml":
        with open(file, encoding="utf-8") as f:
            data = yaml.safe_load(f)

        data = dict(sorted(data.items()))

        filepath = pathlib.Path(FOLDER) / file.name
        with open(filepath.with_suffix(".yml"), "w", encoding="utf-8") as f:
            yaml.dump(data, f, allow_unicode=True)
        LOGGER_.info("Sorted %s", file)

LOGGER_.info("Sort done.")
