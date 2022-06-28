#!/usr/bin/env sh
# abort on errors

set -e

npm run build

cd dist

git init
git add -addgit commit -m 'New Deployment'
git push -g git@github.com:bondarevv2001/vk-group-analyzer.git main:gh-pages

cd -