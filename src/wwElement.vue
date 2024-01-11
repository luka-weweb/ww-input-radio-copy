<template v-if="content">
    <div>
        <wwLayout path="triggerLayout" />
        <input
            :id="`${wwElementState.name}-${uniqueId}-${uid}`"
            ref="checkboxInput"
            :checked="value"
            :value="value"
            type="checkbox"
            :name="`${wwElementState.name}-${uniqueId}-${uid}`"
            :class="content.checkbox && 'hidden'"
            :required="content.required"
            :disabled="isReadonly"
            v-bind="attributes"
        />
        <wwLayout path="dropdownLayout" />
    </div>
</template>

<script>
import { computed } from 'vue';

export default {
    props: {
        content: { type: Object, required: true },
        flexboxElement: { type: Object, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
        wwElementState: { type: Object, required: true },
        uid: { type: String, required: true },
    },
    emits: ['trigger-event', 'update:content:effect', 'update:sidepanel-content'],
    setup(props) {
        const { value: variableValue, setValue } = wwLib.wwVariable.useComponentVariable({
            uid: props.uid,
            name: 'value',
            defaultValue: computed(() => (props.content.value === undefined ? '' : props.content.value)),
        });
        return { variableValue, setValue, uniqueId: wwLib.wwUtils.getUid() };
    },
    computed: {
        isEditing() {
            /* wwEditor:start */
            return this.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        },
        value() {
            if (!this.options.some(option => option.value === this.variableValue)) return null;
            return this.variableValue;
        },
        options() {
            if (!this.content.options) return [];
            let data = wwLib.wwCollection.getCollectionData(this.content.options) || [];
            if (data && !Array.isArray(data) && typeof data === 'object') {
                data = new Array(data);
            } else if ((data && !Array.isArray(data)) || typeof data !== 'object') {
                return [];
            }

            return data
                .filter(item => !!item)
                .map(item => {
                    if (typeof item !== 'object') return { label: item, value: item };
                    return {
                        label: wwLib.wwLang.getText(_.get(item, this.content.labelField || 'label') || ''),
                        value: _.get(item, this.content.valueField || 'value'),
                    };
                });
        },
    },
    watch: {
        /* wwEditor:start */
        'wwEditorState.boundProps.options'(isBind) {
            if (!isBind) this.$emit('update:content:effect', { labelField: null, valueField: null });
        },
        /* wwEditor:end */
        'content.value'(newValue) {
            newValue = `${newValue}`;
            if (newValue === this.value) return;
            this.setValue(newValue);
            this.$emit('trigger-event', { name: 'initValueChange', event: { value: newValue } });
        },
    },
    methods: {
        handleManualInput(event) {
            const value = event.target.value;
            if (value === this.value) return;
            this.setValue(value);
            this.$emit('trigger-event', { name: 'change', event: { domEvent: event, value } });
        },
    },
};
</script>

<style lang="scss" scoped>
.ww-input-radio {
    &__radio {
        outline: none;
        margin-right: 0.4rem;

        /* wwEditor:start */
        &.editing {
            pointer-events: none;
        }

        /* wwEditor:end */
    }
}
</style>
