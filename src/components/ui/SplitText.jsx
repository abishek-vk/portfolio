/**
 * Splits a string into masked words (and optionally chars) for kinetic
 * text reveals. Screen readers get the plain sentence via an sr-only copy;
 * the visual split is aria-hidden so it isn't read letter by letter.
 *
 * Pair with data-reveal="chars" | "words" on a parent (see utils/animations.js).
 */
export default function SplitText({ text, type = "chars", className = "" }) {
  const words = text.split(" ");

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, w) => (
          <span key={w}>
            <span className="split-word">
              {type === "chars" ? (
                [...word].map((ch, c) => (
                  <span key={c} className="split-char-inner">
                    {ch}
                  </span>
                ))
              ) : (
                <span className="split-word-inner">{word}</span>
              )}
            </span>
            {w < words.length - 1 && " "}
          </span>
        ))}
      </span>
    </span>
  );
}
