/**
 * Texto de botón cuyas letras suben una a una al pasar el mouse sobre el botón
 * (cada letra tiene una copia debajo que ocupa su lugar). Las letras animadas
 * salen de pseudo-elementos (data-c), así el HTML solo contiene el texto una
 * vez: lectores de pantalla y buscadores leen el texto normal.
 */
export function RollText({ text }: { text: string }) {
  return (
    <span className="roll">
      <span className="sr-only">{text}</span>
      <span className="roll-track" aria-hidden="true">
        {[...text].map((ch, i) => (
          <span
            key={i}
            className="roll-ch"
            data-c={ch === " " ? " " : ch}
            style={{ "--i": i } as React.CSSProperties}
          />
        ))}
      </span>
    </span>
  );
}
