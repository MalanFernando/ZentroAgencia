import serviciosData from "@/data/servicios";
import { Words } from "@/components/shared/motion/Words";

const { process } = serviciosData;

/**
 * Cómo trabajamos: una fila por fase separada por líneas (número | título |
 * actividades). Al aparecer, una línea roja recorre la fila y las actividades
 * entran escalonadas.
 */
export function Process() {
  return (
    <section aria-labelledby="process-title" className="py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-7">
        <h2
          id="process-title"
          data-reveal="words"
          className="text-3xl font-bold leading-tight text-white md:text-4xl 2md:text-5xl"
        >
          <Words text={process.title} />
        </h2>

        <ol className="process-rows">
          {process.steps.map((step, i) => (
            <li key={step.title} data-reveal className="process-row">
              <span className="process-number" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="process-title">{step.title}</h3>
              <ul className="process-list">
                {step.items.map((item, j) => (
                  <li key={item} style={{ "--j": j } as React.CSSProperties}>
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
