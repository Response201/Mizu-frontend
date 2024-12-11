import { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
    const cursorRef = useRef(null); // För att hålla referens till den anpassade cursorn
    const [hovering, setHovering] = useState(false); // För att hålla reda på om musen är över ett mål

    /* Hantera musrörelse */
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

    /* Hantera hover events på elementen */
    const handleMouseOver = () => setHovering(true);
    const handleMouseOut = () => setHovering(false);

    /* Lägg till eventlisteners för musrörelse och hover-effekter */
    useEffect(() => {
        const hoverTargets = document.querySelectorAll('.hover-target');
        hoverTargets.forEach(target => {
            target.addEventListener('mouseover', handleMouseOver);
            target.addEventListener('mouseout', handleMouseOut);
        });

        /* Städar upp när komponenten tas bort */
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
            {/* Här är själva muspekaren */}
            <div
                ref={cursorRef}
                className={`custom-cursor ${hovering ? 'hovering' : ''}`}
               
            />
        </>
    );
};

export default CustomCursor;
