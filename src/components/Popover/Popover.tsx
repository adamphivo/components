import {
  arrow,
  autoUpdate,
  flip,
  FloatingArrow,
  offset,
  Placement,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

interface PopoverProps {
  trigger: React.ReactNode;
  element: React.ReactNode;
  placement: Placement;
  interactive?: boolean;
  renderArrow?: boolean;
  offsetValue?: number;
}

const Popover: React.FC<PopoverProps> = ({
  trigger,
  element,
  placement,
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

  const click = useClick(context);
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, {
    role: "dialog",
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
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

export default Popover;
