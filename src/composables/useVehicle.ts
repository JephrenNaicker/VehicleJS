import { ref } from 'vue';

interface Vehicle {
  vehicleId: number;
  make: string;
  model: string;
  km: number;
  color:string;
  location: string;
  value: number;
}

export function useVehicle() {
  const vehicle = ref<Vehicle>({
    vehicleId: 0,
    make: '',
    model: '',
    km: 0,
    color:'',
    location: '',
    value: 0,
  });
  

  const vehicles = ref<Vehicle[]>([]);  
  const fetchVehicles = async () => {
    try {
      const response = await fetch('http://localhost:5000/veh');
      const data = await response.json();
      //console.log('Raw API Data:', data);

      const vehicleList = data.recordset; 

      if (!Array.isArray(vehicleList)) {
        console.error('Expected an array but got:', vehicleList);
        return;
      }

      vehicles.value = vehicleList.map((item: any) => ({
        vehicleId: item.VehicleID,
        make: item.Make,
        model: item.Model,
        km: item.KM,
        color: item.Color,
        location: item.Location,
        value: item.Value
      }));
  
      console.log('Mapped Vehicles:', vehicles.value);

    } catch (e)
    {
      console.error('Error fetching vehicles:', e);
    } 
    finally {
     
    }
  }

  const saveVehicle = async (vehicle: Omit<Vehicle, 'vehicleId'>) => {
    try {
      const response = await fetch('http://localhost:5000/veh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vehicle)
      });
  
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
  
      const result = await response.json();
      console.log('Vehicle captured successfully:', result);
      return result; 
    } catch (error) {
      console.error('Error capturing vehicle:', error);
      throw error;
    }
  };


  return {
    vehicle,
    vehicles,
    fetchVehicles,
    saveVehicle
  };
}
