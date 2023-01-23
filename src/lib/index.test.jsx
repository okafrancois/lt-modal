import React from 'react';
import renderer from 'react-test-renderer';
import { mount, describe, expect, test, beforeEach } from 'vitest';
import LtModal from './index';

describe('LtModal', () => {
    let component;
    let closeHandler;

    beforeEach(() => {
        closeHandler = jest.fn();
        component = renderer.create(
            <LtModal title="Modal Title" state={true} closeHandler={closeHandler}>
                <p>Modal Content</p>
            </LtModal>
        );
    });

    it('renders correctly', () => {
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('displays the title', () => {
        const wrapper = mount(component);
        expect(wrapper.find('.lt-modal__header').text()).toBe('Modal Title');
    });

    it('displays the content', () => {
        const wrapper = mount(component);
        expect(wrapper.find('.lt-modal__body').text()).toBe('Modal Content');
    });

    it('calls the closeHandler when the close button is clicked', () => {
        const wrapper = mount(component);
        wrapper.find('.lt-modal__close').trigger('click');
        expect(closeHandler).toHaveBeenCalled();
    });
});
