"""Convert YAML to JSON and {} to {{}} for next-i18next in web app."""

import json
import logging
import pathlib
import re

import yaml

logging.basicConfig(level=logging.INFO, format="%(message)s")

LOGGER_ = logging.getLogger(__name__)
FOLDER = "./l10n"
PATTERN = re.compile(r"{(.*?)}")

for file in pathlib.Path(FOLDER).iterdir():
    if file.suffix == ".yml":
        with open(file, encoding="utf-8") as f:
            data = yaml.safe_load(f)

        for key, value in data.items():
            if isinstance(value, str):
                data[key] = PATTERN.sub(r"{{\1}}", value)

        filepath = pathlib.Path(FOLDER) / "json" / file.name
        with open(filepath.with_suffix(".json"), "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=4)
        LOGGER_.info("Converted %s to %s", file, filepath.with_suffix(".json"))

LOGGER_.info("Conversion done.")
