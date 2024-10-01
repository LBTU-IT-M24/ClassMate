<template>
    <div class="row custom-width align-items-center vh-100">
        <div
            class="col-12 col-md-5 d-flex flex-column align-items-center justify-content-center mb-4 mb-md-0 text-center bg-light p-4"
        >
            <h2>Choose your role</h2>
            <button
                @click="chooseUserType('Teacher')"
                class="btn btn-outline-primary mb-3 w-75"
                style="border-radius: 30px"
            >
                Teacher
            </button>
            <button @click="chooseUserType('Student')" class="btn btn-outline-primary w-75" style="border-radius: 30px">
                Student
            </button>
        </div>
        <div class="col-12 col-md-7 d-flex flex-column align-items-start">
            <img src="https://via.placeholder.com/300x200" alt="placeholder" class="mb-3 img-fluid" />
            <p>
                Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae legendos at vix ad putent
                delectus delicata usu. Vidit dissentiet eos cu eum an brute copiosae hendrerit. Eos erant dolorum an.
                Per facer affert ut. Mei iisque mentitum moderatius cu.
            </p>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        chooseUserType(type) {
            this.$emit('userTypeChosen', type);
        },
    },
};
</script>

<style scoped>
.custom-width {
    width: 100%;
}

@media (min-width: 1408px) {
    .custom-width {
        width: 50%;
    }
}
</style>
