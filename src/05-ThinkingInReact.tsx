import * as React from 'react';
/**
 * Thinking in react
 *
 * Let's walk through the thought process of building SLA list page.
 * (https://rubrik.dev.my.rubrik-lab.com/sla/list)
 *
 * Imagine that's the mock given to you by the UX team.
 */

// =====================

/**
 * Step 1:
 *
 * Break the page into a component hierarchy (https://pasteboard.co/IOOA9el.png)
 *
 * How do you know what should be its own component? Follow the single responsibility
 * principle. Ideally a component should do just one thing. Start with a small component.
 * If it grows too big, break it down into smaller components like you do with normal functions.
 *
 * For the SLA list page, the component hierarchy would look something like this:
 * SlaListPage
 *    SlaPageTitle
 *    SlaActionBar
 *        ActionButton
 *        SearchBar
 *    SlaFilters
 *    SlaTable
 *      SlaRow
 */

// =====================

/**
 * Step 2:
 *
 * Build a static version (no interactions)
 *
 * Building a version of the page without any interactions requires a lot of typing
 * but not much thinking. Let's get it out of the way first.
 */

// Start with the SlaPageTitle component. Just hard-code the page title.
// In a large application, you should create a component that takes `title` as a prop.
export const SlaPageTitle = () => (
  <div style={{fontSize: '40px'}}>SLA list</div>
);

// Let's create the action bar
export const SlaActionBar = () => (
  <>
    {/* Note that we are not adding any interactions here (through event listeners like onClick) */}
    <button>Create SLA Domain</button>
    {/* Again, no interactions here - we are not binding it to a state variable*/}
    <input placeholder="Search by name" />
  </>
);

// ... and so on. The idea is to create a barebones structure first and then build on top of that.
// If a component depends on data from server, mock the data while you're working on the static version.

// =====================

/**
 * Step 3: Represent the minimal state
 *
 * Let's introduce a constraint on the search feature - we'll search only if the key is longer than 3 chars.
 *
 * Let's make a list of all the pieces of data in the application:
 * - Search text
 * - Length of the search text
 * - Filters selected
 * - List of SLAs
 *
 * For each piece of data, ask the following questions to determine if should be state:
 * 1. Does it change over time?  If it doesn't, it shouldn't be state.
 * 2. Can it be computed from based on other state or props? If yes, it shouldn't be state.
 * 3. Is it coming from props? If yes, it shouldn't be state.
 *
 * Let's ask these questions for the list of data we made:
 * 1. Search text - It does change as the user types, and it cannot be computed - should be state.
 * 2. Length of the search text - It does change over time, but it can be computed from the search text - shouldn't be state.
 * 3. Filters selected - Changes over time - should be state.
 * 4. List of SLAs - We get the list of SLAs from the API server based on the search text and filters selected - shouldn't be state.
 *
 * The minimal state we need to represent the page is:
 * 1. Search text
 * 2. Filters selected
 */

// =====================

/**
 * Step 4: Decide where the state should live
 *
 * Now that we have identified the minimal state we need, it's time to determine
 * which component owns that state.
 *
 * For each of the state that we identified in the previous step, follow these steps to
 * determine where to put that state:
 * 1. Identify all the components that render based on that state.
 * 2. Identify the common ancestor of those components. This is the component that should own the state.
 *
 * Let's follow the steps for search text. Look at the component hierarchy in step 1 before proceeding.
 * 1. Search text is needed by the components `SearchBar` and `SlaTable`. The common ancestor of
 *    these components is `SlaListPage`. The state `searchText` should live in the `SlaListPage` component.
 * 2. The filters selected is needed by the components `SlaFilters` and `SlaTable`. The common ancestor of
 *    these components is `SlaListPage`. The state `slaFilters` should live in the `SlaListPage` component.
 *
 * Let's partially implement the `SlaListPage` component.
 */

export const SlaListPage = () => {
  const [searchText, setSearchText] = React.useState<string>('');
  const [filters, setFilters] = React.useState<ReadonlyArray<string>>([]);

  return (
    <>
      <SlaPageTitle />
      {/* SlaActionBar will render something like
        <input value={searchText} onChange={event => setSearchText(event.target.value)}
      */}
      <SlaActionBar searchText={searchText} setSearchText={setSearchText} />
      <SlaFilters filters={filters} setFilters={setFilters} />
      {/* SlaTable needs the search text and the filters to make the GraphQL query */}
      <SlaTable searchText={searchText} filters={filters} />
    </>
  );
};

// =====================

/**
 * Step 5: See if something can be rewrittern as a more generic component. Refactor!
 *
 * For example, instead of writing `SlaPageTitle` with a hardcoded title, create
 * a component that accepts `title` as a prop.
 */

interface IProps {
  readonly title: string;
}
export const PageTitle: React.FC<IProps> = title => {
  // Create a page title with some styles here
  return <div style={{fontSize: '40px', color: 'teal'}}>{title}</div>;
};
