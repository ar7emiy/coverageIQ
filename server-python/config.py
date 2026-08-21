# Python port of server/config.js — same behavior, same swap pattern.
# Switch INPUT_DIR / OUTPUT_DIR to point at the real M365/MCP-hook folders
# when ready. Override via env vars instead of editing this file if you
# want to keep the test paths as the default:
#   set COVERAGEIQ_INPUT_DIR=... & set COVERAGEIQ_OUTPUT_DIR=... & python server.py
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

INPUT_DIR = Path(os.environ['COVERAGEIQ_INPUT_DIR']) if os.environ.get('COVERAGEIQ_INPUT_DIR') \
    else ROOT / 'test_coverageIQ_data' / 'input'
OUTPUT_DIR = Path(os.environ['COVERAGEIQ_OUTPUT_DIR']) if os.environ.get('COVERAGEIQ_OUTPUT_DIR') \
    else ROOT / 'test_coverageIQ_data' / 'output'

POLL_INTERVAL_MS = 3000
PORT = int(os.environ.get('PORT', 5175))

# ============================================================
# REAL ONEDRIVE FOLDERS (smkenney's laptop)
# To switch over: comment out the whole block above, then uncomment this
# whole block below. Each block is self-contained (defines all four names)
# so a partial swap can't leave PORT/POLL_INTERVAL_MS undefined.
# # ============================================================
# INPUT_DIR = Path(r'C:\Users\smkenney\OneDrive\coverageIQ_AI\input')
# OUTPUT_DIR = Path(r'C:\Users\smkenney\OneDrive\coverageIQ_AI\output')
# POLL_INTERVAL_MS = 3000
# PORT = int(os.environ.get('PORT', 5175))
