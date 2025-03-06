import { useIsMutating } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function SpinnerOverlay() {
    const isMutating = useIsMutating();
    const [showSpinner, setShowSpinner] = useState(false);
    
    useEffect(() => {
        let timeout: NodeJS.Timeout;
        
        if (isMutating) {
            // Only show spinner if operation takes longer than 400ms
            timeout = setTimeout(() => {
                setShowSpinner(true);
            }, 200);
        } else {
            setShowSpinner(false);
        }
        
        // Cleanup timeout if component unmounts or isMutating changes
        return () => {
            clearTimeout(timeout);
        };
    }, [isMutating]);
    
    // Don't render anything if we shouldn't show spinner yet
    if (!showSpinner) return null;
    
    return (
        <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="w-12 h-12 border-4 border-t-white border-white border-opacity-30 rounded-full animate-spin"></div>
        </div>
    );
}