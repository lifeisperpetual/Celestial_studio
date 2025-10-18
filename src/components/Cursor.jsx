import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile/tablet
    const checkMobile = () => {
      setIsMobile(
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        window.innerWidth < 768 ||
        'ontouchstart' in window
      );
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const updateMousePosition = (e) => {
      if (!isMobile) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseEnter = () => !isMobile && setIsHovering(true);
    const handleMouseLeave = () => !isMobile && setIsHovering(false);

    if (!isMobile) {
      window.addEventListener('mousemove', updateMousePosition);

      // Function to add event listeners to interactive elements
      const addInteractiveListeners = () => {
        const interactiveElements = document.querySelectorAll('button, a, [role="button"], input, textarea, select');
        interactiveElements.forEach(el => {
          el.addEventListener('mouseenter', handleMouseEnter);
          el.addEventListener('mouseleave', handleMouseLeave);
        });
        return interactiveElements;
      };

      // Initial setup
      let interactiveElements = addInteractiveListeners();

      // Observer to watch for DOM changes (like cart sidebar opening)
      const observer = new MutationObserver(() => {
        // Remove old listeners
        interactiveElements.forEach(el => {
          el.removeEventListener('mouseenter', handleMouseEnter);
          el.removeEventListener('mouseleave', handleMouseLeave);
        });
        // Add new listeners
        interactiveElements = addInteractiveListeners();
      });

      // Observe changes to the entire document
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: false
      });

      return () => {
        window.removeEventListener('mousemove', updateMousePosition);
        window.removeEventListener('resize', checkMobile);
        observer.disconnect();
        interactiveElements.forEach(el => {
          el.removeEventListener('mouseenter', handleMouseEnter);
          el.removeEventListener('mouseleave', handleMouseLeave);
        });
      };
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  // Don't render custom cursor on mobile devices
  if (isMobile) {
    return null;
  }

  return (
    <>
      <motion.div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: "tween", duration: 0 }}
      >
        <div className="w-8 h-8 rounded-full bg-white"></div>
      </motion.div>
      
      <motion.div
        className="fixed pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 2,
          y: mousePosition.y - 2,
        }}
        transition={{ type: "tween", duration: 0 }}
      >
        <div className="w-1 h-1 rounded-full bg-white"></div>
      </motion.div>
    </>
  );
}
