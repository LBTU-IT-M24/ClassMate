<template>
    <BaseWidgetDraggable
        :title="`Notes`"
        :type="ComponentTypes.NOTES"
        @update-position="$emit('update-position')"
        class="editor"
    >
        <template v-slot:widget>
            <n-el class="editor__wrapper">
                <div
                    ref="quillEditor"
                    class="quill-editor editor__wrapper__text-area"
                    style="width: 400px; height: 320px; overflow: auto"
                ></div>
            </n-el>
        </template>
    </BaseWidgetDraggable>
</template>

<script lang="ts">
import { NEl } from 'naive-ui';
import { ComponentTypes } from '@/enums/ComponentTypes';
import Quill from 'quill';

export interface IPersonalEditorData {
    value: string; // Note - this is an HTML value. For example text - woo, will be translated to <p>woo</p>
    quill: any;
}

export default {
    components: {
        NEl,
    },
    computed: {
        ComponentTypes() {
            return ComponentTypes;
        },
    },
    data(): IPersonalEditorData {
        return {
            quill: null,
            value: '',
        };
    },
    mounted() {
        this.quill = new Quill(this.$refs.quillEditor as any, {
            theme: 'snow',
            modules: {
                toolbar: [
                    [{ header: [1, 2, 3] }],
                    [{ font: [] }],
                    ['bold', 'italic', 'underline'],
                    [{ color: [] }, { background: [] }],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    [{ align: [] }],
                    ['link', 'image', 'code'],
                    ['clean'],
                ],
            },
        });

        const Link = Quill.import('formats/link');
        Link.sanitize = (url: string) => {
            if (!url.startsWith('http')) {
                return `https://${url}`;
            }
            return url;
        };
        Quill.register(Link, true);

        document.querySelectorAll('.ql-toolbar').forEach((item) => {
            item.classList.add('editor__wrapper__toolbar');
        });
    },
};
</script>

<style lang="scss">
$text-color: var(--text-color-1);
$hover-color: var(--primary-color);
$selected-color: var(--primary-color);
$border-radius: var(--border-radius);
$border-color: var(--border-color);

.editor {
    &__wrapper {
        background-color: var(--card-color);
        color: $text-color;

        &__toolbar {
            border-top-left-radius: $border-radius;
            border-top-right-radius: $border-radius;
            font-size: var(--font-size);
        }

        &__text-area {
            border-bottom-left-radius: $border-radius;
            border-bottom-right-radius: $border-radius;
            font-size: inherit;
        }

        &__text-area,
        &__toolbar {
            border-color: $border-color !important;
        }
    }
}

.ql-editor {
    code {
        background-color: inherit !important;
    }
}

.ql-stroke {
    stroke: $text-color !important;
}

.ql-fill {
    fill: $text-color !important;
}

.ql-formats {
    button:hover .ql-stroke {
        stroke: $hover-color !important;
    }

    button:hover .ql-fill {
        fill: $hover-color !important;
    }
}

.ql-active {
    .ql-stroke {
        stroke: $selected-color !important;
    }

    .ql-fill {
        fill: $selected-color !important;
    }

    .ql-picker-label {
        color: $selected-color !important;
    }
}

.ql-picker-label {
    color: $text-color !important;

    :hover {
        color: $hover-color !important;
    }

    :hover svg {
        stroke: $hover-color !important;
    }

    .ql-active {
        color: $selected-color !important;
    }
}

.ql-underline {
    &.ql-active {
        .ql-stroke {
            stroke: $selected-color !important;
        }
    }
}

.ql-picker-options {
    background-color: var(--card-color) !important;
    border-radius: $border-radius !important;
    border-color: $border-color !important;

    :hover {
        color: $selected-color !important;
    }

    .ql-picker-item:hover {
        .ql-stroke {
            stroke: $hover-color !important;
        }
    }
}

.ql-picker-item {
    color: $text-color !important;

    :hover {
        color: $hover-color !important;
    }
}

.ql-header,
.ql-font,
.ql-align,
.ql-color,
.ql-background {
    .ql-picker-label {
        &:hover {
            color: $hover-color !important;

            .ql-stroke {
                stroke: $hover-color !important;
            }
            .ql-fill {
                fill: $hover-color !important;
            }
        }

        &.ql-active {
            color: $selected-color !important;

            .ql-stroke {
                stroke: $selected-color !important;
            }
        }
    }

    &.ql-expanded {
        .ql-picker-label {
            color: $selected-color !important;
            border-radius: $border-radius !important;
            border-color: $border-color !important;

            .ql-stroke {
                stroke: $selected-color !important;
            }

            .ql-fill {
                fill: $selected-color !important;
            }
        }
    }
}
</style>
