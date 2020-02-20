import * as React from 'react';

/**
 * Hooks
 *
 * Hooks let you use state and other react features without writing a class.
 * Before hooks, you had to use a class component for state and lifecycle methods.
 * Hooks let you always use functions instead of constantly switching between
 * functions, classes, HOCs, render props. They greatly reduce the amount of
 * stuff you need to learn.
 *
 * Most of the articles on hooks (including the official documentation) compare
 * the hooks with the old ways of doing the same thing in a class component.
 * This is not very useful for developers not familiar with class components.
 *
 * Let's create a mental model of hooks without worrying about how things were
 * in the not so good old days.
 *
 * A hook is just a fancy name for a function that lets you use state and
 * reuse code within function components.
 * There are 2 kinds of hooks:
 * 1. Built-in hooks (provided by react) e.g. useState, useEffect, etc
 * 2. Custom hooks - you can write your own custom hooks to reuse code between
 *    components. Many libraries expose their functionality through hooks.
 *    (e.g. Apollo provides useQuery, useMutation, etc to interact with a GraphQL server)
 */

/**
 * Let's understand the most commonly used built-in hooks - useState and useEffect.
 *
 * `useState`
 * ============
 * useState allows you to use state in function components.
 * Calling `useState` returns a tuple of state variable and a function to update that variable.
 * You can use array destructuring to name the state variable and its updater function.
 * Whenever the state variable is updated, react takes care of re-rendering the component.
 */
export const Counter = () => {
  // You can pass the initial value of the state variable to `useState`
  const [count, setCount] = React.useState<number>(0);
  // Whenever `count` is updated through `setCount`, react will re-render the component `Counter`
  // to make sure that the latest value is used in the component.

  // You can also use multiple state variables in a component
  const [searchKey, setSearchKey] = React.useState<string>('');
  const [filter, setFilter] = React.useState<string>('');

  /**
   * IMPORTANT NOTE:
   * Don't directly mutate the state variable. Always use the updater function
   * provided by the hook.
   *
   * e.g. If you directly increment count, say `count = count + 1`, the react
   * component will not be re-rendered (which means you won't see the new state on the screen).
   * The react component will be re-rendered only if you update the state through
   * updater function provided by the hook.
   */

  return (
    <>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </>
  );
};

/**
 * `useEffect`
 * ============
 * useState allows you to use state in function components.
 * Calling `useState` returns a tuple of state variable and a function to update that variable.
 * You can use array destructuring to name the state variable and its updater function.
 * Whenever the state variable is updated, react takes care of re-rendering the component.
 */
export const CounterWithSideEffects = () => {
  const [count, setCount] = React.useState<number>(0);

  /**
   * You can introduce side effects (network requests, writing to the console, timers, etc)
   * in a function component through the hook `useEffect`.
   *
   * There are 2 kinds of side effects:
   * 1. Effects that require cleanup (e.g. timers, subscriptions, etc)
   * 2. Effects that do not require cleanup (e.g. updating DOM, network requests, etc)
   */
  React.useEffect(() => {
    document.title = `${count} clicks`; // no cleanup required
  });

  React.useEffect(() => {
    // Set a timer. If the component rerenders before the threshold time, we should
    // clean up the timer.
    const timerId = setTimeout(() => console.log('Some useful message'), 5000);

    // You can return a cleanup function from the effect hook.
    // This gets called on each render
    return () => clearTimeout(timerId);
  });

  /**
   * By default, the effects will be applied on each render.
   * The effect hook accepts an optional parameter to control when that effet should be applied.
   * 1. Omitting the 2nd param => the effect will be applied on each render (default behaviour)
   * 2. Empty array ([]) => the effect will be applied only on the first render
   * 3. Dependencies array ([count]) => the effect will be applied only if the any of the variables
   *                                 in the dependencies array change.
   */
  React.useEffect(() => {
    console.log('Runs on each render');
  });

  React.useEffect(() => {
    console.log('Runs only on the first render');
  }, []);

  React.useEffect(() => {
    console.log('Runs only when count changes');
  }, [count]);

  return (
    <>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </>
  );
};

/**
 * Rules of hooks (https://reactjs.org/docs/hooks-rules.html)
 *
 * There are 2 strict rules that must be followed while using hooks:
 * 1. Hooks can be used only within function components and custom hooks
 * 2. Hooks can be called only at the top level. In other words, hooks must not be called
 *    inside loops, conditions, or nested functions. This is to ensure that the hooks are
 *    always called in the same order on each render.
 *
 * We have lint rules in place to make sure these rules are followed.
 */

/**
 * Custom hooks
 *
 * A custom hook is a function whose name starts with "use" (as a convention) and that may
 * call other hooks.
 *
 * Custom hooks are useful for sharing stateful logic with many function components.
 */
type TUseToggleState = (initialState?: boolean) => [boolean, () => void];

// A tiny custom hook to share the toggle logic
export const useToggleState: TUseToggleState = initialState => {
  const [state, setState] = React.useState<boolean>(initialState);
  const toggleState = () => setState(!state);

  return [state, toggleState];
};

// Example usage
export const Toggle = () => {
  const [state, toggleState] = useToggleState(false);

  return (
    <div style={{color: state ? 'red' : 'black'}} onClick={toggleState}>
      Click to change the color
    </div>
  );
};
