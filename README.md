# generator-dawg [![Build Status](https://secure.travis-ci.org/chrisfelix82/generator-dawg.png?branch=master)](https://travis-ci.org/chrisfelix82/generator-dawg)

A generator for [Yeoman](http://yeoman.io).


## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```
$ npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-dawg from npm, run (currently not published to npm. Install from repo instead):

```
$ npm install -g git://github.com/chrisfelix82/dawg.git
```

Once installed, cd to the Worklight project directory to issue the following commands:

To add custom dojo build support to your Worklight 6 Dojo enabled project:

```
$ yo dawg:build profile
```

To scaffold a basic dojox/app with one sample view, run the following in a Worklight 6 Dojo enabled project:

```
$ yo dawg
```

If you add a new environment (e.g. iphone), scaffold that environment with the following command. NOTE: replace main with the Worklight app name:

```
$ yo dawg:env main
```

To create a new dojox/app based view/template.  NOTE: replace main with the Worklight app name:

```
$ yo dawg:view main
```

### Video Tutorials

yo dawg - dojox/app with IBM Worklight generator (Part 1 of 3)
http://www.youtube.com/watch?v=x9I9dKC2BGU

yo dawg - dojox/app with IBM Worklight generator (Part 2 of 3)
http://www.youtube.com/watch?v=hRXmcnukIz8

yo dawg - dojox/app with IBM Worklight generator (Part 3 of 3)
http://www.youtube.com/watch?v=-qmB69gefIc

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
