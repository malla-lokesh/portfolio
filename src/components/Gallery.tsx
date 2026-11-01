"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

export type GalleryPhoto = {
  src: string;
  caption: string;
};

type GalleryLayout = "bento" | "row";

type GalleryProps = {
  photos: GalleryPhoto[];
  layout?: GalleryLayout;
};

function tileClass(layout: GalleryLayout, index: number, total: number) {
  if (layout === "bento" && total >= 5 && index === 0) {
    return "col-span-2 aspect-[4/3] sm:col-span-1 sm:row-span-2 sm:aspect-auto sm:h-full";
  }
  if (layout === "bento") {
    return "aspect-[3/4] sm:aspect-auto sm:h-full sm:min-h-0";
  }
  return "aspect-[3/4]";
}

const FOCUSABLE =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function Gallery({ photos, layout = "row" }: GalleryProps) {
  const labelId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const isOpen = activeIndex !== null;
  const activePhoto = isOpen ? photos[activeIndex] : null;

  const close = useCallback(() => setActiveIndex(null), []);

  const showPrev = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current - 1 + photos.length) % photos.length;
    });
  }, [photos.length]);

  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current + 1) % photos.length;
    });
  }, [photos.length]);

  const openAt = (index: number, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setActiveIndex(index);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const mains = Array.from(document.querySelectorAll("main"));
    mains.forEach((el) => el.setAttribute("inert", ""));

    const focusables = dialog
      ? Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE))
      : [];
    focusables[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrev();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
        return;
      }
      if (event.key !== "Tab" || !dialog) return;

      const currentFocusables = Array.from(
        dialog.querySelectorAll<HTMLElement>(FOCUSABLE)
      );
      if (currentFocusables.length === 0) return;

      const first = currentFocusables[0];
      const last = currentFocusables[currentFocusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      mains.forEach((el) => el.removeAttribute("inert"));
      window.removeEventListener("keydown", onKeyDown);
      triggerRef.current?.focus();
    };
  }, [isOpen, close, showPrev, showNext]);

  if (photos.length === 0) return null;

  const gridClass =
    layout === "bento"
      ? "grid grid-cols-2 gap-2 sm:grid-cols-[2fr_1fr_1fr] sm:grid-rows-2 sm:h-[20rem]"
      : photos.length === 1
        ? "grid grid-cols-1 gap-2"
        : photos.length === 2
          ? "grid grid-cols-2 gap-2"
          : "grid grid-cols-2 gap-2 sm:grid-cols-3";

  const lightbox =
    isOpen && activePhoto && mounted
      ? createPortal(
          <div
            ref={dialogRef}
            className="fixed inset-0 z-50 flex flex-col bg-[rgba(20,20,20,0.88)] px-4 pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(1.25rem,env(safe-area-inset-bottom))] motion-safe:animate-[gallery-fade_200ms_ease-out]"
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelId}
            onClick={close}
          >
            <div className="flex justify-end">
              <button
                type="button"
                className="relative flex size-11 items-center justify-center rounded-full border border-white/70 text-white transition-colors duration-150 ease-out hover:bg-white/10 active:scale-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                aria-label="Close gallery"
                onClick={close}
              >
                <span aria-hidden="true" className="text-lg leading-none">
                  ×
                </span>
              </button>
            </div>

            <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activePhoto.src}
                alt={activePhoto.caption}
                className="max-h-[min(68dvh,720px)] w-auto max-w-full rounded-2xl object-contain"
                style={{
                  boxShadow:
                    "0 2px 4px rgba(0,0,0,0.12), 0 12px 28px rgba(0,0,0,0.22), 0 28px 56px rgba(0,0,0,0.28)",
                }}
                onClick={(event) => event.stopPropagation()}
              />
              <p
                id={labelId}
                className="max-w-[36ch] text-center text-[0.95rem] text-white/90"
              >
                {activePhoto.caption}
              </p>
            </div>

            <div
              className="mx-auto flex max-w-full gap-2 overflow-x-auto py-2"
              onClick={(event) => event.stopPropagation()}
            >
              {photos.map((photo, index) => {
                const selected = index === activeIndex;
                return (
                  <button
                    key={photo.src}
                    type="button"
                    className={`relative size-11 shrink-0 overflow-hidden rounded-lg transition-[box-shadow,opacity] duration-150 ease-out active:scale-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                      selected
                        ? "opacity-100 shadow-[0_0_0_2px_#fff]"
                        : "opacity-55 hover:opacity-85"
                    }`}
                    aria-label={`Show photo: ${photo.caption}`}
                    aria-current={selected ? "true" : undefined}
                    onClick={() => setActiveIndex(index)}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo.src}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <div className={`${gridClass} my-[1.65em]`} role="list">
        {photos.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            role="listitem"
            className={`group relative cursor-zoom-in overflow-hidden rounded-2xl bg-[rgba(0,0,0,0.04)] text-left transition-transform duration-150 ease-out active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground ${tileClass(layout, index, photos.length)}`}
            onClick={(event) => openAt(index, event.currentTarget)}
            aria-label={`Open photo: ${photo.caption}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.caption}
              className="h-full w-full object-cover transition-transform duration-150 ease-out motion-safe:group-hover:scale-[1.02]"
              loading="lazy"
              decoding="async"
            />
          </button>
        ))}
      </div>
      {lightbox}
    </>
  );
}
