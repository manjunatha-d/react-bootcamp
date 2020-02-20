import * as React from 'react';

/**
 * Let's create a tiny component that introduces Sherlock, the detective.
 * This component is not very useful because you can't change the text.
 * If you want to introduce another detective, for example, you need to write
 * another component.
 *
 * What's a component?
 * A component is a function that renders something on the screen.
 * (This definition will evolve as we go through the rest of the files.)
 */
export const Sherlock: React.FC = () => {
  // Declaratively specify what you want to see on the screen. React will
  // take care of updating the DOM for you.
  return <div>Hi, My name is Sherlock Holmes. I've solved 27 cases.</div>;
  // The XML syntax above is not valid JS. So the JS engine in the browsers
  // cannot parse it. You need to compile this to valid JS during the build step.
  // That's what "Babel" (a JS compiler - https://babeljs.io/) does.
};
