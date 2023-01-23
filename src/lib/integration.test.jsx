import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {describe, beforeEach, afterEach, expect, test} from 'vitest'
import LtModal from './index';

describe('LtModal', () => {
    let closeHandler;

    beforeEach(() => {
        closeHandler = jest.fn();
    });

    it('renders the title and content', () => {
        const { getByText } = render(
            <LtModal title="Modal Title" state={true} closeHandler={closeHandler}>
                <p>Modal Content</p>
            </LtModal>
        );

        expect(getByText('Modal Title')).toBeInTheDocument();
        expect(getByText('Modal Content')).toBeInTheDocument();
    });

    it('calls the closeHandler when the close button is clicked', () => {
        const { getByText } = render(
            <LtModal title="Modal Title" state={true} closeHandler={closeHandler}>
                <p>Modal Content</p>
            </LtModal>
        );

        fireEvent.click(getByText('X'));
        expect(closeHandler).toHaveBeenCalled();
    });
});
