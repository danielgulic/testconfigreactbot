# testconfigreactbot

A Discord bot that can be managed on a React web dashboard, adopting a YAML config.

## Goal
The aim of this repo is to have a functioning Discord bot that does the following:
- Allow the end user to login to a web dashboard using Discord;
- Allow the end user to configure various settings via a per-guild YAML config on the web dashboard;
- Allow the end user to view a guild overview on the web dashboard; and
- Implement some basic Discord bot commands to demonstrate the configuration.

This is for me to learn the following:
- YAML with Node.js, it uses YAML so it's user-friendly, but it should be stored as JSON; and
- most importantly React with React-Router.

## Planned
- Better misconfiguration error handling? (not sure how I'm going to implement this)
- Some sort of caching on the frontend

> This is an example implementation. A proof-of-concept, if you will. This is not intended to be used
on production. Period. While it is functional enough, I strongly recommend you do not. If you want to fork it
and fix it up for production, go ahead, but at the moment there is no caching, little to no error handling and
no file organization on the server side.