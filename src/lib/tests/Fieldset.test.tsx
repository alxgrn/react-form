import { render, screen } from '@testing-library/react';
import Fieldset from '../components/Fieldset';

describe('Fieldset', () => {

test('has correct legend and children', () => {
    const legend = 'Legend text';
    const children = 'Children text';
    render(
        <Fieldset legend={legend}>
            <div>{children}</div>
        </Fieldset>
    );
    expect(screen.getByText(legend)).toBeInTheDocument();
    expect(screen.getByText(children)).toBeInTheDocument();
});

}); // describe
