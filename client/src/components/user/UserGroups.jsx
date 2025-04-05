import { useState } from 'react';

const UserGroups = ({ groups }) => {
    const [showAll, setShowAll] = useState(false);
    const initialDisplayCount = 2;
    
    // Determine which groups to display based on showAll state
    const displayedGroups = showAll ? groups : groups?.slice(0, initialDisplayCount);

    return (
        <div className="bg-slate-100 rounded-lg shadow-lg p-6 max-h-[250px]  overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Groups</h3>
            <div className="space-y-4">
                {displayedGroups?.map((group, index) => (
                    <div key={index} className="flex items-center space-x-4">
                        <img
                            src={group.groupIcon}
                            alt={group.name}
                            className="w-10 h-10 rounded-md object-cover"
                            loading="lazy"
                        />
                        <div>
                            <h4 className="text-gray-800 font-medium">{group.name}</h4>
                            <p className="text-gray-500 text-sm">{group.members.length} Members</p>
                        </div>
                    </div>
                ))}
            </div>
            {/* Only show button if there are more groups than initial count */}
            {groups?.length > initialDisplayCount && (
                <button 
                    className="mt-4 text-blue-500 hover:underline"
                    onClick={() => setShowAll(!showAll)}
                >
                    {showAll ? 'Show Less' : 'View All'}
                </button>
            )}
        </div>
    );
};

export default UserGroups;