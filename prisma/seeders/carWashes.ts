const { v4: uuidv4 } = require('uuid');

const unId = uuidv4()
export function getCarWashes() {
    return [
        
  {

    id: unId, 
    name: "Clean N' Shine Car Wash",
    location: '123 Main Street, Cityville',
    mapsLink: 'https://maps.example.com/clean-n-shine',
  },
  {

    id: unId, 
    name: 'City Car Spa',
    location: '456 Elm Avenue, Urban City',
    mapsLink: 'https://maps.example.com/city-car-spa',
  },
  {

    id: unId, 
    name: 'Quick Clean Auto Detailing',
    location: '789 Oak Drive, Metroville',
    mapsLink: 'https://maps.example.com/quick-clean-auto',
  },
]
}