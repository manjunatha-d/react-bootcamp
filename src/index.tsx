import * as React from 'react';
import {render} from 'react-dom';
import {Sherlock} from './01-Sherlock';

/**
 * This guide assumes that you're already familiar with TypeScript. If not, please
 * go through the code sandbox https://codesandbox.io/s/ts-playground-njzhj.
 */

/**
 * DOM (Document Object Model)
 *
 * When we visit a website in a browser, the server sends some HTML. The browser
 * parses this HTML and creates a tree representation of it called the DOM
 * (Document Object Model). DOM is the source of truth for what you see on the screen.
 * The DOM is live, meaning any changes you make to the DOM will be reflected
 * on the screen. That's how JavaSctipt adds interactivity to a website.
 * It modifies the DOM in response to events (user actions, network requests, etc).
 *
 * When you write a react application (which in essence is a tree of react elements),
 * you need to attach it to the DOM. You first need to find a node in the DOM tree to which the react application
 * can be attached as a child.
 */

const containerDomNode = document.getElementById('root');

const reactElementTree = <Sherlock />;

render(reactElementTree, containerDomNode);
