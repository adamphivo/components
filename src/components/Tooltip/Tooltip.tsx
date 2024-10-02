import {
  arrow,
  autoUpdate,
  flip,
  FloatingArrow,
  offset,
  Placement,
  safePolygon,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

interface TooltipProps {
  trigger: React.ReactNode;
  element: React.ReactNode;
  placement: Placement;
  interactive?: boolean;
  renderArrow?: boolean;
  offsetValue?: number;
}

const Tooltip: React.FC<TooltipProps> = ({
  trigger,
  element,
  placement,
  interactive = false,
  renderArrow = false,
  offsetValue = 10,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = React.useRef(null);

  const { refs, floatingStyles, context } = useFloating({
    placement: placement,
    whileElementsMounted: autoUpdate,
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(offsetValue),
      flip(),
      shift(),
      arrow({ element: arrowRef }),
    ],
  });

  const hover = useHover(context, {
    move: true,
    handleClose: interactive ? safePolygon() : undefined,
  });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, {
    role: "tooltip",
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        {trigger}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            {element}
            {renderArrow && (
              <FloatingArrow
                ref={arrowRef}
                context={context}
                fill="white"
                tipRadius={1}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Tooltip;
