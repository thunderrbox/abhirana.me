import './IdleBubble.css';

export default function IdleBubble({ onDismiss }) {
  return (
    <div className="idle-bubble" onClick={onDismiss}>
      Pssst... check out <strong>Code &amp; Feedback</strong> 👀
      <div className="idle-arrow" />
    </div>
  );
}
