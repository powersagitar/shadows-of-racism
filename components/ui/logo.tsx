export default function Logo({ size }: { size: string | number }) {
  return (
    <div
      className={`font-roboto flex flex-col gap-0 overflow-visible leading-[75%] font-medium tracking-tighter`}
      style={{ fontSize: size }}
    >
      <span>SHADOWS</span>
      <span>OF RACISM</span>
    </div>
  );
}
