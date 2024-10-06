export const SkeletonCard = () => (
    <div className="p-4">
      <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg w-full bg-white">
        <div className="relative">
          <div className="w-full h-32 bg-gray-300 skeleton rounded-t-lg"></div>
        </div>
        <div className="p-4">
          <div className="h-6 bg-gray-300 skeleton mb-2 rounded"></div>
          <div className="h-4 bg-gray-300 skeleton mb-2 rounded"></div>
          <div className="h-4 bg-gray-300 skeleton mb-2 rounded"></div>
          <div className="h-6 bg-gray-300 skeleton mb-2 rounded"></div>
          <div className="h-8 bg-gray-300 skeleton mt-4 rounded"></div>
        </div>
      </div>
    </div>
  );
  