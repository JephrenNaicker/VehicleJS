<template>
    <div>
        <h2 class="text-2xl mb-4">Capture Details</h2>
        <form class="space-y-4 mx-auto" @submit.prevent=" handleSubmit()">

            <div>
                <label>Make: </label>
                <input type="text" v-model="vehicle.make" required />
            </div>
            <div>
                <label>Model (YYYY): </label>
                <input type="text" v-model="vehicle.model" name="year" maxlength="4" min="4" max="9999" step="1"
                    placeholder="YYYY" pattern="[0-9]{4}" style="color:#888;" required />
            </div>
            <div>
                <label>Color</label>
                <input type="text" v-model="vehicle.color" required />
            </div>
            <div>
                <label>KM</label>
                <input type="text" v-model="vehicle.km" required />
            </div>
            <div>
                <label>Location</label>
                <input type="text" v-model="vehicle.location" required />
            </div>
            <div>
                <label>Value</label>
                <input type="text" v-model="vehicle.value" required />
            </div>

            <div class="flex justify-between space-x-4">
                <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Save</button>
                <button type="button" @click="clearForm"
                    class="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400">
                    Clear Form
                </button>
            </div>

            <p v-if="errors.km" class="text-red-500 text-sm">{{ errors.km }}</p>
            <p v-if="errors.value" class="text-red-500 text-sm">{{ errors.value }}</p>
            <p v-if="successMessage" class="text-green-500">{{ successMessage }}</p>
            <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
        </form>
    </div>
</template>

<script setup lang="ts">
import { useVehicle } from '@/composables/useVehicle';
import { ref } from 'vue';


const { vehicle, saveVehicle } = useVehicle();

const errors = ref({
    make: '',
    model: '',
    color: '',
    km: '',
    location: '',
    value: ''
});

const successMessage = ref('');
const errorMessage = ref('');

const handleSubmit = async () => {

    if (!validateForm()) {
        errorMessage.value = 'Please correct the errors before submitting.';
        return;
    }


    try {
        vehicle.value.km = parseInt(vehicle.value.km.toString().replace(/\s+/g, ''), 10);
        vehicle.value.value = parseFloat(vehicle.value.value.toString().replace(/\s+/g, ''));

        const result = await saveVehicle(vehicle.value);
        successMessage.value = result.message;
        errorMessage.value = '';
        clearForm();
    } catch (error) {
        errorMessage.value = 'Failed to save vehicle.';
        successMessage.value = '';
    }
};

const clearForm = () => {
    vehicle.value.make = '',
        vehicle.value.model = '',
        vehicle.value.color = '',
        vehicle.value.km = 0,
        vehicle.value.location = '',
        vehicle.value.value = 0
}


function validateForm() {
    let isValid = true;
    Object.keys(errors.value).forEach(key => (errors.value[key] = ''));

    // KM
    if (vehicle.value.km < 0) {
        errors.value.km = 'KM must be a positive number.';
        isValid = false;
    }


    // Value
    if (vehicle.value.value < 0) {
        errors.value.value = 'Value must be a positive number.';
        isValid = false;
    }

    return isValid;
}


</script>