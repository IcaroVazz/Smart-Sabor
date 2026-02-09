// components/UI/Tabs.tsx
'use client';

import { ReactNode } from 'react';

interface TabsProps {
    tabs: {
        id: string;
        label: string;
        icon?: ReactNode;
    }[];
    activeTab: string;
    onTabChange: (tabId: string) => void;
}

export function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
    return (
        <div className="border-b border-gray-200">
            <div className="flex gap-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`
              flex items-center gap-2 px-4 py-3 font-medium border-b-2 transition-colors
              ${activeTab === tab.id
                                ? 'border-orange-500 text-orange-600'
                                : 'border-transparent text-gray-600 hover:text-gray-900'
                            }
            `}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
}