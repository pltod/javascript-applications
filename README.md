![](https://github.com/pltod/javascript-applications/blob/master/images/logo.png)

# Table of Contents

- [What is inside this repo?](#what-is-inside-this-repo)
- [Scaffolding Explanation](#scaffolding-explanation)
  - [Technical Level](#technical-level)
    - [Programming Model](#programming-model)
    - [Asynchrony Model](#asynchrony-model)
    - [Ecosystem Model](#ecosystem-model)
    - [Component Model](#component-model)
  - [Application Level](#application-level)
  - [Shared](#shared)
- [Test Suites Info](#test-suites-info)
- [License](#license)

# What is inside this repo?

Test suites, diagrams, experiments, and sample apps relevant for JavaScript application development.

# Scaffolding Explanation

Find bellow brief explanation of major folders. Basically they are defined based on particular topic.

## Technical Level

Most often contains test suites and diagrams that explain different programming concept or conceptual topics.

### Programming Model

All things JavaScript...

### Asynchrony Model

Things related with how asynchronos programming works. Controlling the event loop and control flow patterns are the major topics.

### Ecosystem Model

Things related with JavaScript engines and host environments like browsers and nodejs.

### Component Model

Things related with creation of modules, turning them into components, weaving of components into applications, and delivering them to the end users.


## Application Level

Use the technical knowledge to do all sorts of things on application level.

This folder contains all kinds of skeletons, simple apps, tools, integrations that dive into particular topic. Some of these could require running a db or running http server. For these see the appropriate README files in the subfolders of application-level folder.


## Shared

Candidates for reusable pieces of code.


# Test Suites Info

All test suites are written with 'tape' and use 'debug' npm module.

Therefore we have two types of statements in the console:

* Statements written with debug 
* Statements written with tape assertions


For example when running ```npm run test-modules``` you see this: 

![](https://github.com/pltod/javascript-applications/blob/master/images/test-modules.png)


# License

MIT