export default function Logo({ size }: { size: string | number }){
    return (
        <div className={`flex flex-col gap-0 font-medium font-roboto leading-[75%] overflow-visible tracking-tighter`} style={{ fontSize: size }}>
            <span>SHADOWS</span>
            <span>OF RACISM</span>
        </div>
    )
}
