<template>
    <navbarComp></navbarComp>
    <UpnavbarComp></UpnavbarComp>
    <div class="dashboard-admin-panel-main-class">
        
    </div>
</template>
<script>
import navbarComp from '@/pages/DashboardAdmin/dashboardComponents/navbarComp.vue'
import UpnavbarComp from '@/pages/DashboardAdmin/dashboardComponents/UpnavbarComp.vue'
export default {
    data() {
        return {
            
        }
    },
    components: {
        navbarComp, UpnavbarComp
    }
}
</script>
<style lang="scss" scoped>

.dashboard-admin-panel-main-class {
    width: 100%;
    height: 100vh;
    background-color: #191a22;
}

</style>