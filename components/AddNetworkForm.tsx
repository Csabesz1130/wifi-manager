import React, { useState } from 'react';

interface AddNetworkFormProps {
    onNetworkAdded: () => void;
}

const AddNetworkForm: React.FC<AddNetworkFormProps> = ({ onNetworkAdded }) => {
    const [ssid, setSsid] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/networks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ssid, password }),
            });

            if (!response.ok) {
                throw new Error('Failed to add network');
            }

            // Clear form and notify parent component
            setSsid('');
            setPassword('');
            onNetworkAdded();
        } catch (error) {
            console.error('Error adding network:', error);
            // Handle error (e.g., show error message to user)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Add New Network</h2>
            <div className="space-y-4">
                <div>
                    <label htmlFor="ssid" className="block text-sm font-medium text-gray-700">
                        SSID
                    </label>
                    <input
                        type="text"
                        id="ssid"
                        value={ssid}
                        onChange={(e) => setSsid(e.target.value)}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Add Network
                </button>
            </div>
        </form>
    );
};

export default AddNetworkForm;

// File: components/AddNetworkForm.tsx
// Purpose: This component provides a form for adding new WiFi networks.
//
// Components:
// - AddNetworkForm: Renders a form for adding new WiFi networks.
//
// Functions:
// - AddNetworkForm:
//   Input: { onNetworkAdded: () => void }
//   Output: JSX.Element
//   Purpose: Renders and manages the form for adding new WiFi networks.
//
// - handleSubmit:
//   Input: React.FormEvent
//   Purpose: Handles the form submission, sends a POST request to add the network,
//            and manages the form state after submission.
//
// Interfaces:
// - AddNetworkFormProps: Defines the props for the AddNetworkForm component.
//
// Notable elements:
// - Uses React hooks (useState) for form state management
// - Implements error handling for network requests
// - Uses Tailwind CSS for styling
// - Provides feedback to the parent component when a network is added successfully