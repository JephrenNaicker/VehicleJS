<script setup lang="js">
import { onMounted, ref, computed } from 'vue';
import { useVehicle } from '@/composables/useVehicle';
const { vehicles, fetchVehicles } = useVehicle();

const filterVehicle = ref('');

const findVehicle = computed(() =>
    vehicles.value.filter(item =>
        item.vehicleId.toString().includes(filterVehicle.value)
    )
);


onMounted(() => {
    fetchVehicles()
});
</script>

<template>
    <div class="p-4">
        Search : <input type="text" placeholder="VehicleId" v-model="filterVehicle" />
    </div>
    <div v-if="findVehicle.length === 0">
        <p>No Vehicle found or add some vehicles!</p>
    </div>
    <div v-else class="p-4">
        <h2>Fetched Vehicles:</h2>
        <div v-for="(item, index) in findVehicle" :key="item.vehicleId"
            class="p-4 font-medium text-xl border-b border-gray-200">
            <p> VehicleId : {{ item.vehicleId }} </p>
            <p> Make : {{ item.make }} </p>
            <p> Model : {{ item.model }} </p>
            <p> KM : {{ item.km }} </p>
            <p> Color : {{ item.color }} </p>
            <p> Location : {{ item.location }} </p>
            <p> Value : R{{ item.value.toFixed(2) }} </p>
        </div>
    </div>
</template>