<template>
    <n-page-header class="w-100 p-3 shadow-sm border-bottom">
        <template #title>
            <RouterLink to="/">
                <n-h2 class="mb-0">
                    <n-gradient-text
                        gradient="{
                      deg: 180,
                      from: 'rgb(164, 200, 225)',
                      to: 'rgb(244, 200, 212)',
                    }"
                    >
                        {{ isTeacher ? 'Teacher' : 'Student' }}
                    </n-gradient-text>
                </n-h2>
            </RouterLink>
        </template>
        <template #extra>
            <n-flex justify="space-between">
                <button class="btn btn-outline-secondary" @click="showOptions = !showOptions">
                    <IconSettings />
                </button>
                <NavConfigurationModal :showOptions="showOptions" @closeOptions="showOptions = false" />
            </n-flex>
        </template>
    </n-page-header>

    <div class="w-100 p-4 woosh_background">
        <div v-if="activeWidgets.length" v-for="item in activeWidgets" :key="item.type">
            <component
                v-if="item.isVisible"
                :initial-position="getPosition(item.type)"
                :is="item.renderer"
                @update-position="updateWidgetPosition"
            />
        </div>
        <div v-else class="d-flex main-area justify-content-center align-items-center">
            <div class="text-left">
                <n-h1>
                    Looks like your board <n-gradient-text type="danger">has no active tools!</n-gradient-text>
                </n-h1>
                <n-h1> Open settings & <n-gradient-text type="success">enable some!</n-gradient-text> </n-h1>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapState, mapStores } from 'pinia';
import { useWidget } from '@/stores/useWidget';
import NavConfigurationModal from '@/App/Navbar/NavConfigurationModal.vue';
import { NFlex, NGradientText, NH1, NH2, NPageHeader, NSpace } from 'naive-ui';
import { useAuth } from '@/stores/useAuth';
import IconSettings from '@/components/icons/IconClock.vue';

export default defineComponent({
    name: 'PersonalBoard',
    components: { NH1, IconSettings, NH2, NGradientText, NFlex, NPageHeader, NSpace, NavConfigurationModal },
    data() {
        return {
            showOptions: false,
        };
    },
    computed: {
        ...mapStores(useWidget, useAuth),
        ...mapState(useWidget, ['activeWidgets', 'position']),
        ...mapState(useAuth, ['isTeacher']),
    },
    methods: {
        ...mapActions(useWidget, ['getPosition', 'updatePosition']),

        updateWidgetPosition(data: any) {
            if (data) {
                this.updatePosition(data.type, data.position);
            }
        },
    },
});
</script>

<style scoped>
.main-area {
    height: calc(100vh - 119px);
}
.text-left {
    text-align: left;
    width: 75%;
}
</style>
