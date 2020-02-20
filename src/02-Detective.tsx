import * as React from 'react';

/**
 * Let's create a generic detective component that can be re-used.
 *
 * What's a component?
 * A component is a function that takes props and returns react element tree.
 * (This definition will evolve as we go through the rest of the files.)
 *
 * - Components communicate with each other through props.
 * - Props are always passed from parent to child. It's called one-way data flow.
 *   This makes it easy to reason about your code.
 * - Props are immutable - they cannot be mutated in the child component.
 *
 * All react components must be pure functions with respect to their props.
 * (https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-pure-function-d1c076bec976)
 */

/**
 * Using TS interface (or a type) results in implicit documentation
 * for the consumers of this component. It also provides us editor features
 * like autocomplete, refactoring,etc (not possible if you use plain JS).
 */
interface IProps {
  readonly name: string;
  readonly casesSolved: number;
}

export const Detective: React.FC<IProps> = props => {
  const {name, casesSolved} = props;
  return <div>{`I'm ${name}. I've solved ${casesSolved} cases.`}</div>;
};

/**
 * Now that `Detective` is reusable, let's use it to render a list of detectives.
 */
interface IDetective {
  readonly name: string;
  readonly casesSolved: number;
}

export const DetectivesList: React.FC = () => {
  const detectives: ReadonlyArray<IDetective> = [
    {
      name: 'Sherlock Holmes',
      casesSolved: 27,
    },
    {
      name: 'CID Daya', // kuch toh gadbad hai Daya
      casesSolved: 0,
    },
  ];

  return (
    <div>
      {/** `map` is exactly same as the mapping function in other functional programming languages
          It runs the mapping function on each element of the array and constructs a
          new array from the returned values. e.g.
          const double = [1, 2, 3].map(x => 2 * x); // returns [2, 4, 6]
       */}
      {detectives.map((detective, index) => (
        /**
         * Since `DetectivesList` is consuming the component `Detective`, it is the
         * "parent" of the component `Detective` here. Similarly `Detective` is a
         * child of the component "DetectivesList".
         *
         * Notice that the parent is passing the props to the child.
         * In this case, the parent `DetectivesList` is passing the props `name` and
         * `casesSolved` to its child `Detective`.
         *
         * In react, data always flows in one direction - from parent to the child.
         * This helps in reasoning about the code.
         */
        <Detective
          /**
           * Whenever you render a list of react elements, provide a unique key
           * for each element. This is for performance optimization.
           *
           * React component vs element example
           * `Detective` is a react component. `<Detective />` is a react element.
           * (See README.tsx for detailed explanation)
           */
          key={detective.name}
          name={detective.name}
          casesSolved={detective.casesSolved}
        />
      ))}
    </div>
  );
};
