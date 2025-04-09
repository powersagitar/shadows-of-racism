import { cn } from "@/lib/utils";
import ReactDOM from "react-dom";
import React, { useCallback, useEffect, useRef, useState } from "react"

type CursorTooltipProps = {
    tooltipContent: React.ReactNode,
    trigger: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
} & React.ComponentProps<'div'>

export default function CursorTooltip({ tooltipContent, trigger, className }: CursorTooltipProps) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [visible, setVisible] = useState(false);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        setPosition({ x: e.clientX+12, y: e.clientY+12 });
    }, []);

    useEffect(() => {
        if (visible) {
            window.addEventListener("mousemove", handleMouseMove);
        } else {
            window.removeEventListener("mousemove", handleMouseMove);
        }

        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [visible]);

    const clonedTrigger = React.cloneElement(trigger, {
        onMouseEnter: (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
            trigger.props?.onMouseEnter?.(e);
            setVisible(true);
        },
        onMouseLeave: (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
            trigger.props?.onMouseLeave?.(e);
            setVisible(false);
        },
    })

    const elRef = useRef(document.createElement("div"));

    useEffect(() => {
        const portalRoot = document.body;
        portalRoot.appendChild(elRef.current);

        return () => {
            portalRoot.removeChild(elRef.current);
        };
    }, []);

    return (<>
        { clonedTrigger }
        { ReactDOM.createPortal(
            <div 
            className={cn(`${!visible && 'hidden'} fixed z-50 bg-white px-3 py-1 border-2 border-black`, className)} 
            style={{
                top: position.y,
                left: position.x
            }}
        >
            { tooltipContent }
        </div>, elRef.current) }
    </>)

}
