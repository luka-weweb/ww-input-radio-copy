function getDataObject(options) {
    if (!options) return {};
    if (Array.isArray(options)) {
        return options[0] || {};
    }
    return {};
}

export default {
    options: {
        layout: ['flex'],
    },
    inherit: {
        type: 'ww-layout',
    },
    editor: {
        label: 'Form Radio',
        icon: 'radio',
    },
    triggerEvents: [
        { name: 'change', label: 'On Change', event: { value: '' }, default: true },
        { name: 'initValueChange', label: 'On Init value change', event: { value: '' } },
    ],
    properties: {
        options: {
            label: 'Choices values',
            type: 'Array',
            section: 'settings',
            options: {
                item: {
                    type: 'Object',
                    options: {
                        item: {
                            label: {
                                label: 'Label',
                                type: 'Text',
                                options: { placeholder: 'Label' },
                            },
                            value: {
                                label: 'Value',
                                type: 'Text',
                                options: { placeholder: 'Value' },
                            },
                        },
                    },
                },
            },
            defaultValue: [
                { value: 'first value', label: 'first label' },
                { value: 'second value', label: 'second label' },
            ],
            multilang: true,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'array',
                tooltip:
                    'A collection of data in array format: \n\n `[{}, {}, ...] || ["string1", "string2", ...] || [1, 2, ...]`',
            },
            /* wwEditor:end */
        },
        value: {
            label: {
                en: 'Init value',
            },
            type: 'Text',
            section: 'settings',
            bindable: true,
            defaultValue: '',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'A string that defines the initial value: `"first value"`',
            },
            /* wwEditor:end */
        },
        labelField: {
            hidden: (content, _sidepanelContent, boundProps) => {
                const options = wwLib.wwCollection.getCollectionData(content.options);
                return !boundProps.options || !options || (options && typeof options[0] !== 'object');
            },
            label: 'Label field',
            type: 'ObjectPropertyPath',
            options: content => ({
                object: getDataObject(wwLib.wwCollection.getCollectionData(content.options)),
            }),
            defaultValue: null,
            section: 'settings',
        },
        valueField: {
            hidden: (content, _sidepanelContent, boundProps) => {
                const options = wwLib.wwCollection.getCollectionData(content.options);
                return !boundProps.options || !options || (options && typeof options[0] !== 'object');
            },
            label: 'Value field',
            type: 'ObjectPropertyPath',
            options: content => ({
                object: getDataObject(wwLib.wwCollection.getCollectionData(content.options)),
            }),
            defaultValue: null,
            section: 'settings',
        },
        required: {
            label: 'Required',
            type: 'OnOff',
            section: 'settings',
            defaultValue: true,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'A boolean that defines if the input is required: `true | false`',
            },
            /* wwEditor:end */
        },
        triggerLayout: {
            hidden: true,
            defaultValue: [],
        },
        checkbox: {
            hidden: true,
            defaultValue: {
                isWwObject: true,
                type: 'ww-checkbox',
                content: {
                    color: '#FFFFFF',
                    fontSize: 10,
                    icon: 'fas fa-check',
                },
                state: {
                    states: [{ id: 'checked', label: 'checked' }],
                    style: {
                        default: {
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #767676',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            height: 'auto',
                            padding: '2px',
                            width: 'auto',
                        },
                        checked_default: {
                            backgroundColor: '#767676',
                        },
                    },
                },
            },
        },
        dropdownLayout: {
            hidden: true,
            defaultValue: [],
        },
    },
};
