export default function NoData({ message = "No data available." }: { message?: string }) {
  return (
    <div className="text-center">
      <img
        alt="No data found"
        loading="lazy"
        width={176}
        height={176}
        decoding="async"
        className="mx-auto mt-8"
        src="/img/pixchan.png"
        style={{ color: 'transparent' }}
      />
      <p className="text-gray-500 mt-4">{message}</p>
    </div>
  );
}