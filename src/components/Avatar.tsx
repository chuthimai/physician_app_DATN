import React from 'react';

interface AvatarProps {
    src?: string | null;
    alt?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
    name?: string;
    className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
                                                  src,
                                                  alt = 'Avatar',
                                                  size = 'md',
                                                  name = '',
                                                  className = '',
                                              }) => {
    const initials = name ? name.split(" ").pop()?.charAt(0).toUpperCase() : '?';

    let sizeClass = 'w-12 h-12 text-base';
    if (size === 'sm') sizeClass = 'w-8 h-8 text-sm';
    if (size === 'lg') sizeClass = 'w-16 h-16 text-lg';
    if (size === 'xl') sizeClass = 'w-20 h-20 text-4xl';
    if (size === '2xl') sizeClass = 'w-24 h-24 text-5xl';
    if (size === '3xl') sizeClass = 'w-32 h-32 text-6xl';

    if (src) {
        return (
            <img
                src={src}
        alt={alt}
        className={`rounded-full object-cover ${sizeClass} ${className}`}
        />
    );
    }

    return (
        <div
            className={`flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-medium ${sizeClass} ${className}`}
        >
    {initials}
    </div>
);
};
