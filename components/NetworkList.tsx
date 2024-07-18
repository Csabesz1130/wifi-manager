import React, { useEffect, useState } from 'react';

interface Network {
    id: string;
    ssid: string;
}

const NetworkList: React.FC = () => {
    const [networks, setNetworks] = useState<Network[]>([]);

    useEffect(() => {
        // Fetch networks from API
        const fetchNetworks = async () => {
            try {
                const response = await fetch('/api/networks');
                if (!response.ok) {
                    throw new Error('Failed to fetch networks');
                }
                const data = await response.json();
                setNetworks(data);
            } catch (error) {
                console.error('Error fetching networks:', error);
                // Handle error (e.g., show error message to user)
            }
        };

        fetchNetworks();
    }, []);

    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Saved Networks</h2>
            <ul className="space-y-2">
                {networks.map((network) => (
                    <li key={network.id} className="bg-gray-100 p-3 rounded-md">
                        {network.ssid}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NetworkList;

// File: components/NetworkList.tsx
// Purpose: This component displays a list of saved WiFi networks.
//
// Components:
// - NetworkList: Renders a list of saved WiFi networks.
//
// Functions:
// - NetworkList:
//   Input: None
//   Output: JSX.Element
//   Purpose: Fetches and displays a list of saved WiFi networks.
//
// - useEffect hook:
//   Purpose: Fetches the list of networks from the API when the component mounts.
//
// Interfaces:
// - Network: Defines the structure of a network object with id and ssid properties.
//
// Notable elements:
// - Uses React hooks (useState, useEffect) for state management and side effects
// - Implements error handling for network requests
// - Uses Tailwind CSS for styling