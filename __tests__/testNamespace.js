import React from 'react/addons';
import {DefaultNamespace, DefaultEmptyNamespace, expInitializeObject, clearLogs, getLogLength} from './utils/experimentUtils';
import ReactExperiments from '../dist/react-experiments';

const TestUtils = React.addons.TestUtils;
describe('Test that experiment component works with namespaces', () => {

  beforeEach(() => {
    clearLogs();
  });

  it('works when the user is enrolled in the namespace', () => {
    const namespace = new DefaultNamespace(expInitializeObject);
    const experimentComponent = TestUtils.renderIntoDocument(
      <ReactExperiments.Experiment experimentName='SampleExperiment' experiment={namespace}>
        <ReactExperiments.Variation param='foo' name='Variation A'>
          <span className='variation-a'>
            foo
          </span>
        </ReactExperiments.Variation>
        <ReactExperiments.Variation param='foo' name='Variation B'>
          <span className='variation-b'>
            foo
          </span>
        </ReactExperiments.Variation>
      </ReactExperiments.Experiment>);

     //renders only one variation
    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      experimentComponent,
      'experiment-variation-component'
    ).length).toBe(1);

    //renders the correct variation
    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      experimentComponent,
      'variation-b'
    ).length).toBe(1);

    expect(getLogLength()).toEqual(1);
  });

  it('default component works when the user is not enrolled in a namespace', () => {
    const emptyNamespace = new DefaultEmptyNamespace(expInitializeObject);
    const experimentComponent = TestUtils.renderIntoDocument(
      <ReactExperiments.Experiment experimentName='SampleExperiment' experiment={emptyNamespace}>
        <ReactExperiments.Variation param='foo' name='Variation A'>
          <span className='variation-a'>
            foo
          </span>
        </ReactExperiments.Variation>
        <ReactExperiments.Variation param='foo' name='Variation B'>
          <span className='variation-b'>
            foo
          </span>
        </ReactExperiments.Variation>
        <ReactExperiments.Default>
          <span className='default'>
            rawr
          </span>
        </ReactExperiments.Default>
      </ReactExperiments.Experiment>);

    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      experimentComponent,
      'experiment-variation-component'
    ).length).toBe(0);

    //renders the correct variation
    expect(TestUtils.scryRenderedDOMComponentsWithClass(
      experimentComponent,
      'default'
    ).length).toBe(1);

    expect(getLogLength()).toEqual(0);
  });
});