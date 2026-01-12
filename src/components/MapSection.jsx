import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapSection = () => {
    const [visited, setVisited] = useState([]);
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}assets/data/visited_2025.json`)
            .then(res => res.json())
            .then(data => setVisited(data));

        fetch(`${import.meta.env.BASE_URL}assets/data/plans_2026.json`)
            .then(res => res.json())
            .then(data => setPlans(data));
    }, []);

    return (
        <section className="py-20 px-4 bg-slate-900">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold mb-8 text-center">우리의 발자취</h2>
                <div className="h-[500px] w-full rounded-xl overflow-hidden shadow-2xl border border-slate-700">
                    <MapContainer center={[37.5665, 126.9780]} zoom={11} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {visited.map(place => (
                            <Marker key={`visited-${place.id}`} position={[place.lat, place.lng]}>
                                <Popup>
                                    <strong>{place.name}</strong><br />
                                    Visited on {place.date}
                                </Popup>
                            </Marker>
                        ))}

                        {plans.map(place => (
                            <Marker key={`plan-${place.id}`} position={[place.lat, place.lng]} opacity={0.6}>
                                <Popup>
                                    <strong>{place.name}</strong><br />
                                    Planned for 2026<br />
                                    {place.reason}
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
                <div className="mt-4 flex justify-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
                        <span>방문함 (2025)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-blue-600 opacity-60 rounded-full"></span>
                        <span>방문 예정 (2026)</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MapSection;
