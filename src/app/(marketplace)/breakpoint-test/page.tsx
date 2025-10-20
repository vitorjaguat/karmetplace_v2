'use client';

export default function BreakpointTest() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Breakpoint Debug Test</h1>

      {/* Test with inline styles first */}
      <div
        style={{
          backgroundColor: '#ef4444',
          padding: '1rem',
          marginBottom: '1rem',
          color: 'white',
        }}
        className="test-responsive"
      >
        Inline CSS - Should be red, then green on md+ screens
      </div>

      {/* Test basic Tailwind */}
      <div className="bg-red-500 p-4 mb-4 text-white">
        Basic Tailwind (should be red background)
      </div>

      {/* Test md breakpoint */}
      <div className="bg-blue-500 md:bg-green-500 p-4 mb-4 text-white">
        Should be blue by default, GREEN on md screens (768px+)
      </div>

      {/* Test responsive visibility */}
      <div className="mb-4">
        <div className="bg-yellow-300 p-2 md:hidden">
          MOBILE ONLY - Should disappear on md screens
        </div>
        <div className="bg-purple-300 p-2 hidden md:block">
          MD+ ONLY - Should only appear on md screens (768px+)
        </div>
      </div>

      <style jsx>{`
        .test-responsive {
          background-color: #ef4444 !important;
        }

        @media (min-width: 768px) {
          .test-responsive {
            background-color: #22c55e !important;
          }
        }
      `}</style>
    </div>
  );
}
