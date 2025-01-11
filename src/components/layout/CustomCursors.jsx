import { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
    const cursorRef = useRef(null); // To hold the reference to the custom cursor
    const [hovering, setHovering] = useState(false);// To track if the mouse is over a target

    /* Handle mouse movement */
    const handleMouseMove = (e) => {
        if (cursorRef.current) {
            const scrollOffset = {
                x: window.scrollX,
                y: window.scrollY,
            };
            cursorRef.current.style.left = `${e.clientX + scrollOffset.x}px`;
            cursorRef.current.style.top = `${e.clientY + scrollOffset.y}px`;
        }
    };

    /* Handle hover events on elements */
    const handleMouseOver = () => setHovering(true);
    const handleMouseOut = () => setHovering(false);

    /* Add event listeners for mouse movement and hover effects */
    useEffect(() => {
        const hoverTargets = document.querySelectorAll('.hover-target');
        hoverTargets.forEach(target => {
            target.addEventListener('mouseover', handleMouseOver);
            target.addEventListener('mouseout', handleMouseOut);
        });

        /* Clean up when the component is removed */
        return () => {
            hoverTargets.forEach(target => {
                target.removeEventListener('mouseover', handleMouseOver);
                target.removeEventListener('mouseout', handleMouseOut);
            });
        };
    }, []);

    useEffect(() => {
        document.body.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.body.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <>
            {/* custom cursor */}
            <div
                ref={cursorRef}
                className={`custom-cursor ${hovering ? 'hovering' : ''}`}

            />
        </>
    );
};

export default CustomCursor;
