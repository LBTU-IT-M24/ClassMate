<template id="myComponent">
    <div ref="el" class="dragable" :style="style">
        <!-- For testing purposes -->
        <!-- <pre>{{ position }}</pre> -->
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        initialX: {
            type: Number,
            default: 0,
        },
        initialY: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            position: {
                init: false,
                x: this.initialX,
                y: this.initialY,
                width: 0,
                height: 0,
                isDraging: false,
                dragStartX: null,
                dragStartY: null,
            },
        };
    },
    computed: {
        style() {
            if (this.position.init) {
                return {
                    position: 'absolute',
                    left: this.position.x + 'px',
                    top: this.position.y + 'px',
                    width: this.position.width + 'px',
                    height: this.position.height + 'px',
                    'box-shadow': this.position.isDraging ? '3px 6px 16px rgba(0, 0, 0, 0.15)' : '',
                    transform: this.position.isDraging ? 'translate(-3px, -6px)' : '',
                    cursor: this.position.isDraging ? 'grab' : 'pointer',
                };
            }

            return {
                position: 'absolute',
                left: this.position.x + 'px',
                top: this.position.y + 'px',
                'box-shadow': this.position.isDraging ? '3px 6px 16px rgba(0, 0, 0, 0.15)' : '',
                transform: this.position.isDraging ? 'translate(-3px, -6px)' : '',
                cursor: this.position.isDraging ? 'grab' : 'pointer',
            };
        },
    },
    mounted() {
        const el = this.$refs.el;
        if (el instanceof HTMLElement) {
            let rect = el.getBoundingClientRect();
            this.position.init = true;
            this.position.x = Math.round(rect.x);
            this.position.y = Math.round(rect.y);
            this.position.width = Math.round(rect.width);
            this.position.height = Math.round(rect.height);

            el.addEventListener('mousedown', this.onMouseDown);
        }
    },
    methods: {
        onMouseDown(e) {
            e.stopPropagation();
            const { clientX, clientY } = e;
            this.position.dragStartX = clientX - this.position.x;
            this.position.dragStartY = clientY - this.position.y;

            this.position.isDraging = true;

            document.addEventListener('mouseup', this.onMouseUp);
            document.addEventListener('mousemove', this.onMouseMove);
        },
        onMouseMove(e) {
            e.stopPropagation();
            const { clientX, clientY } = e;

            // this might be unnecessary
            const newXPos = clientX - this.position.dragStartX;

            if (newXPos < 0 || newXPos + this.position.width > window.innerWidth) {
                return;
            }

            const newYPos = clientY - this.position.dragStartY;

            if (newYPos < 0 || newYPos + this.position.height > window.innerHeight) {
                return;
            }

            this.position.x = newXPos;
            this.position.y = newYPos;
        },
        onMouseUp(e) {
            e.stopPropagation();
            this.position.isDraging = false;
            this.position.dragStartX = null;
            this.position.dragStartY = null;
            document.removeEventListener('mouseup', this.onMouseUp);
            document.removeEventListener('mousemove', this.onMouseMove);
        },
    },
    template: document?.getElementById('myComponent')?.innerHTML,
};
</script>

<style scoped>
.dragable {
    display: inline-block;
    margin: 0;
    color: rgb(6, 19, 29);
    background-color: rgb(187, 195, 209);
    border-radius: 16px;
    padding: 16px;
    touch-action: none;
    user-select: none;
    -webkit-transform: translate(0px, 0px);
    transform: translate(0px, 0px);
    transition:
        transform 0.1s ease-in,
        box-shadow 0.1s ease-out;
    border: 1px solid rgb(6, 19, 29);
}

pre {
    display: inline-block;
    overflow: hidden;
    font-size: 10px;
}
</style>
