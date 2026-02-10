export default function Spinner() {
  return (
    <>
      <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>

      <style jsx>{`
        .spinner {
          width: 50px;
          height: 50px;
          position: relative;
          margin: 50px auto;
        }

        .double-bounce1,
        .double-bounce2 {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: #3498db;
          opacity: 0.6;
          position: absolute;
          top: 0;
          left: 0;

          animation: bounce 2s infinite ease-in-out;
        }

        .double-bounce2 {
          animation-delay: -1s;
        }

        @keyframes bounce {
          0%,
          100% {
            transform: scale(0);
          }
          50% {
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}
