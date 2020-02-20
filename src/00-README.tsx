/**
 * React terminology
 *
 * This guide explains some of the terminology used in react.
 */

/**
 * Let's write the classic Hello, World! program in React.
 */
import * as React from 'react';
import {render as reactDomRender} from 'react-dom';

/**
 * JSX
 *
 * The XML like syntax (e.g. <h1 id="title">Hello, World!</h1>) in JavaScript
 * (and thereby TypeScript) is called JSX. Itis an unofficial syntax
 * extension to the JavaScript language (spec - https://facebook.github.io/jsx/).
 *
 * Since it is not part of the JS langauge, the JS engines will not parse it.
 * So we need to convert JSX into valid JS. That's where `Babel` comes in.
 * It takes JSX and emits equivalent JS code (React.createElement calls).
 * You can try it out here - https://babeljs.io/repl
 *
 * e.g. <h1 id="title">Hello, World!</h1> gets compiled to
 * React.createElement("h1", {id: "title"}, "Hello, World!");
 *
 * The imported module (import * as React from 'react';) provides a function
 * called `createElement` that takes some params and returns a "react element".
 *
 * Okay, what is a react element?
 *
 * A react element is the smallest building block of React.
 * It is just a plain object that describes what you want to see on the screen.
 * For example, the react element for <h1 id="title">Hello, World!</h1> would look like
 * {type: "h1", props: {id: "title", children: "Hello, World!"}}
 * (other internal properties are omitted for brevity).
 */
const reactElementTree = <h1 id="title">Hello, World!</h1>;

/**
 * This react element can be rendered to different hosts like DOM, Android, iOS, etc.
 * Each of these hosts have their own representation of what gets displayed
 * on the screen. e.g. Browser has DOM (https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
 * We now need a "renderer" that converts react elements to "host representation" of it.
 * In case of browser, for example, "react-dom" (the official renderer for browsesr)
 * converts react elements to DOM nodes and takes care of updating them when needed.
 * Similarly we have renderers for other hosts like Android, iOS, etc (react-native)
 * We can also write our own custom renderers.
 *
 * Let's the render the newly created react element in the DOM.
 * First we need to find a "container node" in the DOM to attach our react element tree.
 * `document.getElementById` is Browser API to select a DOM node with the given ID.
 *
 * This react element tree is also known as virtual DOM (VDOM).
 */
const domContainer = document.getElementById('root');

// render the react element tree to the container node
reactDomRender(reactElementTree, domContainer);
