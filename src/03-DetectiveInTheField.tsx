import * as React from 'react';

interface IProps {
  readonly name: string;
  readonly casesSolvedSoFar?: number;
}

/**
 * Sometimes you need a component that changes its output based on user actions,
 * network requests, timers, etc. React allows building such components through state.
 *
 * Let's create a component with state that changes its output based on user actions.
 *
 * What's a component?
 * A component is a function that takes props and returns react element tree.
 * It can also have some state that can change over time.
 * (This definition will evolve as we go through the rest of the files.)
 *
 * State vs Props
 * - State is local to the component, props are passed from the parent
 * - State is mutable, props are immutable in the child component
 */
export const DetectiveInTheField: React.FC<IProps> = ({
  name,
  casesSolvedSoFar = 0,
}) => {
  // Declare a state variable called `casesSolved` and a function to update that variable.
  const [casesSolved, setCasesSolved] = React.useState<number>(
    casesSolvedSoFar, // initial value
  );
  const incrementCasesSolved = () => setCasesSolved(casesSolved + 1);

  return (
    <>
      <div>
        {`I'm ${name}.`}
        <br />
        {/* Conditional rendering in JSX */}
        {casesSolved > 0
          ? `I've solved ${casesSolved} ${casesSolved > 1 ? 'cases' : 'case'}.`
          : "I'm a detective in the making."}
      </div>
      <br />

      <button onClick={incrementCasesSolved}>Solve this case</button>
    </>
  );
};

/**
 * There are 2 ways of writing components in react.
 * 1. Function components (all the components that we have written so far)
 * 2. Class components
 *
 * Historically there were a few things that only class components were capable of doing
 * (state, lifecycle methods, etc). A recent version of react introduced "hooks" to
 * allow function components to use these features. There are only a handful of things
 * that only classes are capable of. Just knowing hooks should be enough to get
 * everything done in Polaris UI.
 *
 * The class component below is equivalent to the function component above. This is
 * just to show how class components look like.
 *
 * Feel free to skip this part.
 */

interface IState {
  casesSolved: number;
}

export class DetectiveInTheFieldClass extends React.Component<IProps, IState> {
  constructor(props) {
    // This is necessary if you want to use `this.props` within the constructor
    super(props);
    /**
     * You can define the state here. To update the state, use `this.setState(stateUpdater)`
     * where stateUpdater = (prevState: IState): IState => { // return the updated state here}
     */
    this.state = {
      casesSolved: this.props.casesSolvedSoFar,
    };
  }

  incrementCasesSolved = () =>
    this.setState(prevState => ({casesSolved: prevState.casesSolved + 1}));

  render() {
    const {name} = this.props;
    const {casesSolved} = this.state;

    return (
      <>
        <div>
          {`I'm ${name}.`}
          <br />
          {/* Conditional rendering in JSX */}
          {casesSolved > 0
            ? `I've solved ${casesSolved} ${
                casesSolved > 1 ? 'cases' : 'case'
              }.`
            : "I'm a detective in the making."}
        </div>
        <br />

        <button onClick={this.incrementCasesSolved}>Solve this case</button>
      </>
    );
  }
}
