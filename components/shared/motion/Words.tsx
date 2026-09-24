import { Fragment } from "react";

/**
 * Parte un texto en palabras (y líneas por "\n") para la entrada palabra por
 * palabra. El elemento contenedor debe llevar data-reveal="words".
 */
export function Words({ text }: { text: string }) {
  let w = 0;
  return (
    <>
      {text.split("\n").map((line, li) => (
        <Fragment key={li}>
          {li > 0 ? <br /> : null}
          {line.split(" ").map((word, wi) => (
            <Fragment key={wi}>
              {wi > 0 ? " " : null}
              <span className="reveal-word" style={{ "--w": w++ } as React.CSSProperties}>
                {word}
              </span>
            </Fragment>
          ))}
        </Fragment>
      ))}
    </>
  );
}
