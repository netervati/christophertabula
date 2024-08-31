#!/bin/bash

set -ex

npm run --prefix portfolio generate
python3 -m http.server --directory portfolio/.output/public 43000
