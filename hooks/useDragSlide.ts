"use client";

import { useRef, useState, type PointerEvent } from "react";

const DRAG_THRESHOLD = 40;

export function useDragSlide(length: number, setIndex: (updater: (i: number) => number) => void) {
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const widthRef = useRef(0);

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    startX.current = e.clientX;
    widthRef.current = e.currentTarget.getBoundingClientRect().width;
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (!dragging) return;
    setDragOffset(e.clientX - startX.current);
  }

  function endDrag(e: PointerEvent<HTMLDivElement>) {
    if (!dragging) return;
    const delta = e.clientX - startX.current;
    setDragging(false);
    setDragOffset(0);

    if (Math.abs(delta) > DRAG_THRESHOLD) {
      if (delta < 0) setIndex((i) => (i + 1) % length);
      else setIndex((i) => (i - 1 + length) % length);
      return;
    }
    const clickX = e.clientX - e.currentTarget.getBoundingClientRect().left;
    if (clickX < widthRef.current / 2) setIndex((i) => (i - 1 + length) % length);
    else setIndex((i) => (i + 1) % length);
  }

  function cancelDrag() {
    setDragging(false);
    setDragOffset(0);
  }

  return {
    dragOffset,
    dragging,
    dragHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: cancelDrag,
    },
  };
}
