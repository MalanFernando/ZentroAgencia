import { Fragment } from "react";

export function Multiline({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, i) => (
        <Fragment key={i}>
          {i > 0 ? <br /> : null}
          {line}
        </Fragment>
      ))}
    </>
  );
}

export function flattenMultiline(text: string) {
  return text.replace(/\n/g, " ");
}
